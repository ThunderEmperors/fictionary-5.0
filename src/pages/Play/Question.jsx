import React, { useState, useEffect } from "react";
import "./Question.css";

import HintModal from "./HintModal";
import SnackBar from "./SnackBar";
import HintCountDown from "./HintCountDown";
import useContext from "../context/UserContext";
import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const QuestionTextRenderer = ({ text }) => {
  text = typeof text === "string" ? text : "";

  while (text.indexOf("\n") > -1) {
    text = text.replace("\n", "<br />");
  }

  const start = text.indexOf("__linkstart__");
  const end = text.indexOf("__linkend__");

  if (start > -1 && end > -1) {
    text =
      text.slice(0, start) +
      '<a href="' +
      text.slice(start + 13, end) +
      '" target="blank">' +
      text.slice(start + 13, end) +
      "</a>" +
      text.slice(end + 11);
  }

  return (
    <p
      className="question-text text-[0.8rem] md:text-[14px] lg:text-[18px]"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

const Question = () => {
  const [state, setState] = useState({
    question: {
      text: "Loading...",
      round: 0,
      ogmedia: "",
      year: 0,
      country: "",
      language: "",
      show_country: false,
      show_media: false,
      show_language: false,
      show_year: false,
      media: " ",
    },
    loaded: true,
  });

  const [hintModalOpen, setHintModalOpen] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState({
    show: false,
    text: "",
    success: false,
  });
  const [hintAvailable, setHintAvailable] = useState(null);
  const [hintCountdown, setHintCountdown] = useState(null);
  const [timer, setTimer] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [gameLive, setGameLive] = useState(true);

  const navigate = useNavigate();
  const context = useContext();

  const updateHint = () => {
    fetch(endpoints.CHECK_HINT_AVAILABLE, {
      headers: {
        Authorization: `Token ${
          context.token || localStorage.getItem("fictionary_token")
        }`,
      },
    }).then((res) =>
      res.json().then((serverResponse) => {
        if (res.status === 200) {
          clearTimeout(timer);

          if (serverResponse["not-available"]) {
            setHintAvailable(false);
            setHintCountdown(null);
          } else if (serverResponse.available) {
            setHintAvailable(true);
            setHintCountdown(null);
          } else {
            setHintAvailable(false);
            setHintCountdown(serverResponse.timeleft);

            const t = setTimeout(
              updateHint,
              serverResponse.timeleft * 1000
            );
            setTimer(t);
          }
        }
      })
    );
  };

  const getQuestion = () => {
    setState((s) => ({ ...s, loaded: false }));

    fetch(endpoints.QUESTION, {
      headers: {
        Authorization: `Token ${
          context.token || localStorage.getItem("fictionary_token")
        }`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          context.logout();
          navigate("/sign-in?redirected=true");
          return;
        }
        return res.json();
      })
      .then((res) => {
        if (!res) return;

        if (res.game_not_live) {
          setGameLive(false);
          navigate("/?redirected=true");
        } else if (res.gameOver) {
          navigate("/game-finished");
        } else {
          clearTimeout(timer);
          updateHint();
          setGameLive(true);
          setState({ question: res, loaded: true });
        }
      });
  };

  const checkAnswer = () => {
    const answer = document.getElementById("answerInput");
    fetch(endpoints.ANSWER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${
          context.token || localStorage.getItem("fictionary_token")
        }`,
      },
      body: JSON.stringify({ answer: answer.value }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.game_not_live) navigate("/?redirected=true");

        if (res.success) {
          answer.value = "";
          setSnackbarOptions({
            show: true,
            text: "Correct Answer!!",
            success: true,
          });
          setTimeout(
            () => setSnackbarOptions((p) => ({ ...p, show: false })),
            3000
          );
          getQuestion();
        } else {
          setSnackbarOptions({
            show: true,
            text: "Wrong Answer. Try again.",
            success: false,
          });
          setTimeout(
            () => setSnackbarOptions((p) => ({ ...p, show: false })),
            3000
          );
        }
      });
  };

  useEffect(() => {
    getQuestion();
  }, [context.token, gameLive]);

  return (
    <div className="matrix-bg">
      <div className="bg-container">
        <HintModal open={hintModalOpen} onClose={() => setHintModalOpen(false)} />
        <SnackBar {...snackbarOptions} />



        {!state.loaded ? (<ColorRing colors={['#18230F','#27391C','#000000','#18230F','#27391C']} height="130" width="130" visible />) : ( 
          <div className="arcade-screen sci-question-box">
            {state.question.round < 10 ? (
              <>
                <div className="round-parallelogram">
                  ROUND {state.question.round}
                </div>

                <QuestionTextRenderer text={state.question.text} />

                <input
                  className="answer-input text-[0.8rem] md:text-[14px] lg:text-[14px]"
                  id="answerInput"
                  type="text"
                  placeholder="TYPE ANSWER"
                  onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
                />

                {hintCountdown && <HintCountDown time={hintCountdown} />}

                <div className="controls">
                  <button
                    className={`sci-btn  ${
                      hintCountdown !== null || !hintAvailable ? "disabled" : ""
                    }`}
                    onClick={
                      hintCountdown !== null || !hintAvailable
                        ? () => {}
                        : () => setHintModalOpen(true)
                    }
                  >
                    HINT
                  </button>
                  <button className="sci-btn" onClick={checkAnswer}>
                    SUBMIT
                  </button>
                </div>

                <div className="question-meta">
                  {state.question.show_country && (
                    <>Country: {state.question.country}<br /></>
                  )}
                  {state.question.show_media && (
                    <>Original Media: {state.question.ogmedia}<br /></>
                  )}
                  {state.question.show_language && (
                    <>Language: {state.question.language}<br /></>
                  )}
                  {state.question.show_year && (
                    <>Year: {state.question.year}</>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="thank-you-message text-center text-white">
                  <h2 className="text-3l font-bold">
                    Thank you for playing!
                  </h2>
                  <p className="text-xl mt-4">
                    The next round begins in <span className="text-red-500 font-bold">few hours</span> <br/> Stay Tuned-see you then!
                  </p>
                </div>
              
              </>
              )
              }
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
