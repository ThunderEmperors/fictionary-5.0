import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import useContext from "../context/UserContext";
import Footer from "../../components/Footer/Footer";
import characterSprite from "/assets/character.png";
import endpoints from "../../utils/APIendpoints";
import "./Home.css";
import bg from "/assets/bg.jpg";
import Timer from "../../components/Timer/Timer";

const Home = () => {
  const navigate = useNavigate();
  const context = useContext();

  const [characterPosition, setCharacterPosition] = useState({
    left: 0,
    top: 0,
  });
  const [dialogue, setDialogue] = useState("Welcome, Player!");

  const [gameLive, setGameLive] = useState({
    game_live: false,
    time_up: false,
    date: new Date(),
  });

  const refresh = useCallback(() => {
    fetch(endpoints.CHECK_GAME_LIVE).then((res) => {
      if (res.status === 200) {
        res.json().then((serverResponse) => {
          setGameLive((live) => ({ ...live, ...serverResponse }));
        });
      }
    });
  }, []);

  useEffect(() => {
    const token = context.token || localStorage.getItem("fictionary_frontend");
    if (token && gameLive.game_live) navigate("/play");
    else if (gameLive.time_up) navigate("/game-finished");
    else refresh();
  }, [context.token, gameLive.game_live, gameLive.time_up, navigate, refresh]);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
      )
        .then((res) => res.json())
        .then((userInfo) => {
          fetch(endpoints.SOCIAL_LOGIN_TOKEN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              access_token: tokenResponse.access_token,
              ...userInfo,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.token) {
                context.login(data.token);
                navigate("/play");
              }
            });
        });
    },
  });

  const timeoutDate = useMemo(() => gameLive.date, [gameLive]);

  /* Small character animation */
  useEffect(() => {
    setCharacterPosition({ left: "50%", top: "75%" });

    const t = setTimeout(() => {
      setCharacterPosition({ left: "50%", top: "70%" });
      setDialogue("Let's Begin!");
    }, 1500);

    return () => clearTimeout(t);
  }, []);

  return (
    <div
  className="home-bg"
  style={{
    backgroundImage: `url(${bg})`,
  }}
>

      <div className="bg-container">
       


        {/* Title */}
        <div className="sign text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
          FICTIONARY
        </div>

        <br />

        {/* Controls */}
        {context.token || localStorage.getItem("fictionary_frontend") ? (
          gameLive.game_live ? (
            <div className="play_now mt-7">
              <Link to="/question" className="play">
                PLAY NOW
              </Link>
            </div>
          ) : (
            <Timer timer={timeoutDate} refresh={refresh} />
          )
        ) : (
          <div className="play_now mt-7">
            <button className="play" onClick={handleGoogleLogin}>
              SIGN IN
            </button>
          </div>
        )}

        <Footer className="footer mt-7" />
      </div>
    </div>
  );
};

export default Home;
