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
import Fireflies from "../../components/Fireflies";

const Home = () => {
  const navigate = useNavigate();
  const context = useContext();

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

  useEffect(() => {
    const t = setTimeout(() => setDialogue("Let's Begin!"), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="home-bg" style={{ backgroundImage: `url(${bg})` }}>
      

      {/* 🔒 HARD CENTER LOCK */}
      <div className="home-center">
        {/* Character */}
        <div className="character-container">
          <img
            src={characterSprite}
            alt="Character"
            className="character-sprite"
          />
          <div className="speech-bubble">{dialogue}</div>
        </div>

        {/* Title */}
        <div className="sign">FICTIONARY</div>

        {/* CTA */}
        {context.token || localStorage.getItem("fictionary_frontend") ? (
          gameLive.game_live ? (
            <Link to="/question" className="play">
              PLAY NOW
            </Link>
          ) : (
            <Timer timer={timeoutDate} refresh={refresh} />
          )
        ) : (
          <button className="play" onClick={handleGoogleLogin}>
            SIGN IN
          </button>
        )}

        {/* Social Icons */}
        <div className="social-center">
          <Footer className="footer" />
        </div>
      </div>
    </div>
  );
};

export default Home;
