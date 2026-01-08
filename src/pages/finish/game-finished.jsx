import React from "react";
import "./EventAd.css";          // ✅ GLOBAL CSS (important)
import bgImage from "/assets/bg.jpg";
import "../../index.css";

const GameFinished = () => {
  return (
    <div
      className="arcadeBackground"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overlay */}
      <div className="overlay-background"></div>

      {/* Floating stars */}
      <div className="stars">
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      {/* CONTENT */}
     <div className="content-wrapper hologram-panel">

        <h1 className="title-main flicker font-pixel">
          GAME OVER
        </h1>


        <h2 className="title-event font-pixel">
          AUDITIONS COMING SOON!
        </h2>

        <a
          href="https://debsocnitdgp.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="register-btn font-pixel glowButton">
            Register Now
          </button>
        </a>
      </div>

      {/* Ambient particles */}
      <div className="floatingStars">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
    </div>
  );
};

export default GameFinished;