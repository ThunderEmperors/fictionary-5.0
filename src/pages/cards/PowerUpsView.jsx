import React, { useEffect, useState } from "react";
import "./PowerUpsView.css";
import useContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ENDPOINTS from "../../utils/APIendpoints";
//import powercard from "/assets/powercard.jpg";
import TesseractFold from "/assets/TesseractFold.png";
import MobiusLoop from "/assets/MobiusLoop.png";
import FracturedManifold from "/assets/FracturedManifold.png";
import NonEuclidAnchor from "/assets/NonEuclidAnchor.png";
import ObserverParadox from "/assets/ObserverParadox.png";
import DimensionShear from "/assets/DimensionShear.png";

const CARD_UI_MAP = {
  3: {
    bg: TesseractFold,
    glow: "glow-yellow",
    title: "Tesseract Fold",
  },
  4: {
    bg: NonEuclidAnchor,
    glow: "glow-yellow",
    title: "Non-Euclid Anchor"
  },
  5: {
    bg: ObserverParadox,
    glow: "glow-yellow",
    title: "Observer Paradox"
  },
  0: {
    bg: MobiusLoop,
    glow: "glow-yellow",
    title: "Mobius Loop"
  },
  1: {
    bg: DimensionShear,
    glow: "glow-yellow",
    title: "Dimension Shear"
  },
  2: {
    bg: FracturedManifold,
    glow: "glow-yellow",
    title: "Fractured Manifold"
  }
};

const PowerUpsViews = ({ card, refreshUpdateState, onCardRedeemed }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [available, setAvailable] = useState(false);

  const navigate = useNavigate();
  const context = useContext();

  const ui = CARD_UI_MAP[card.index] || CARD_UI_MAP[1];

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
   /* <div
      className={`p-6 max-w-sm rounded-lg shadow-lg text-white relative ${
        available ? "hover:shadow-green" : "hover:shadow-red"
      }`}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${ui.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "350px",
      }}
    >*/
   

 <div className="flex flex-col items-center gap-1">
  {/* CARD */}
  <div className="relative w-[280px] h-[420px]">
    <img
      src={ui.bg}
      alt={ui.title}
      className={`w-full h-full card-hover object-contain ${ui.glow}`}
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

  );
};

export default PowerUpsViews;
