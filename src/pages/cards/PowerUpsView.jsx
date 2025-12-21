import React, { useEffect, useState } from "react";
import "./PowerUpsView.css";
import useContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ENDPOINTS from "../../utils/APIendpoints";
<<<<<<< HEAD
import powercard from "/assets/powercard.jpg";
=======
//import powercard from "/assets/powercard.jpg";
import AsteroidCard from "/assets/AsteroidCard.png";
import PlanetBoostCard from "/assets/PlanetBoostCard.png";
import CosmicRevealCard from "/assets/CosmicRevealCard.png";
import DimEchoCard from "/assets/DimEchoCard.png";
import TimeFractureCard from "/assets/TimeFractureCard.png"
import OraclePowerCard from "/assets/OraclePowerCard.png";

const CARD_UI_MAP = {
  0: {
    bg: AsteroidCard,
    icon: "🧠",
    glow: "glow-red",
  },
  1: {
    bg: PlanetBoostCard,
    icon: "🔥",
    glow: "hover:glow-green",
  },
  2: {
    bg: CosmicRevealCard,
    icon: "⏳",
    glow: "glow-purple",
  },
  3: {
      bg: DimEchoCard,
      glow: "hover:shadow-blue-500",
    },
  4: {
      bg: TimeFractureCard,
      glow: "glow-white",
      title: "Time Fracture",
    },
  5: {
        bg: OraclePowerCard,
        glow: "glow-orange",
        title: "Oracle Power"
      }
};

>>>>>>> ishita2

const PowerUpsViews = ({ card, refreshUpdateState, onCardRedeemed }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [available, setAvailable] = useState(false);

  const navigate = useNavigate();
  const context = useContext();

<<<<<<< HEAD
=======
  const ui = CARD_UI_MAP[card.index] || CARD_UI_MAP[1];

>>>>>>> ishita2
  const checkAval = () => {
    setAvailable(card.aval_cards[card.index] === "1");
    console.log("CheckAval");
  };

  const handleClick = () => {
    fetch(ENDPOINTS.CHANGE_CARD_STATUS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${
          context.token || localStorage.getItem("fictionary_token")
        }`,
      },
      body: JSON.stringify({ index: card.index, coins: card.coins }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Button clicked");
        console.log(card.coins);
        refreshUpdateState(); 
        if (onCardRedeemed) {
          onCardRedeemed(card.desc);
        }
      });

    setIsClicked(!isClicked);
  };

  useEffect(() => {
    checkAval();
  }, [card, isClicked]);

  if (!available) return null;

  return (
<<<<<<< HEAD
    <div
=======
   /* <div
>>>>>>> ishita2
      className={`p-6 max-w-sm rounded-lg shadow-lg text-white relative ${
        available ? "hover:shadow-green" : "hover:shadow-red"
      }`}
      onClick={handleClick}
      style={{
<<<<<<< HEAD
        backgroundImage: `url(${powercard})`,
=======
        backgroundImage: `url(${ui.bg})`,
>>>>>>> ishita2
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "350px",
      }}
<<<<<<< HEAD
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg">
        <div className="relative z-10 text-xl font-arcade uppercase mb-4 flex-auto mt-12 text-center">
          {card.text}
        </div>
        <div className="relative z-10 text-sm mb-2 ml-5 mr-5 text-center">{card.desc}</div>
        <div className="relative z-10 text-lg font-bold text-center">Coins: {card.coins}</div>
      </div>
    </div>
=======
    >*/
   

 <div className="flex flex-col items-center gap-1">
  {/* CARD */}
  <div className="relative w-[280px] h-[420px]">
    <img
      src={ui.bg}
      alt={ui.title}
      className={`w-full h-full card-float object-contain ${ui.glow}`}
      draggable={false}
    />

    {/* TITLE OVERLAY */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <h3 className="card-title-overlay card-title-glitch">
        {ui.title}
      </h3>
    </div>
  </div>

  {/* DESCRIPTION */}
  <p className="xl:text-3xl sm:text-2xl md:text-3xl lg:text-3xl text-sm font-cd2 leading-tight text-white text-center px-4 max-w-[260px] opacity-90 -mt-3">
    {card.desc}
  </p>

  {/* COINS */}
  <div className="text-base font-bold font-cd1 text-green-300 -mt-1">
    Coins: {card.coins}
  </div>
</div>

>>>>>>> ishita2
  );
};

export default PowerUpsViews;
