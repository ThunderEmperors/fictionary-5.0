import React, { useEffect, useState } from "react";
import "./PowerUpShopView.css";
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
  0: {
    bg: TesseractFold,
    glow: "glow-yellow",
    title: "Tesseract Fold",
  },
  1: {
    bg: NonEuclidAnchor,
    glow: "glow-yellow",
    title: "Non-Euclid Anchor"
  },
  2: {
    bg: ObserverParadox,
    glow: "glow-yellow",
    title: "Observer Paradox"
  },
  3: {
    bg: MobiusLoop,
    glow: "glow-yellow",
    title: "Mobius Loop"
  },
  4: {
    bg: DimensionShear,
    glow: "glow-yellow",
    title: "Dimension Shear"
  },
  5: {
    bg: FracturedManifold,
    glow: "glow-yellow",
    title: "Fractured Manifold"
  }
};

const PowerUpShopView = ({ card, refreshUpdateState }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [available, setAvailable] = useState(false);

  const ui = CARD_UI_MAP[card.index] || CARD_UI_MAP[1];

  const navigate = useNavigate();
  const context = useContext();

  const checkAval = () => {
    setAvailable(card.aval_cards[card.index] === '1');
    console.log('CheckAval')
  };


  const handleAvalText = () => {
    return !available ? (
      <></>
    ) : <> </>;
  };
 
  const handleClick = () => {
    // if (!available) {
    //   console.log("asdf");
    //   return; 
    // }

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
      .then((res) => {
        console.log("button clicked");
        console.log(card.coins);
        refreshUpdateState();
      });

    setIsClicked(!isClicked);
  };

  useEffect(checkAval, [card, isClicked]);

  if(!available){return (
   /* <div
      className={`p-6 max-w-sm rounded-lg shadow-lg text-white relative cards`}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${powercard})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "370px",
      }}
    >*/

   

    <div className="flex justify-center">
  {/* CARD WRAPPER */}
  <div
    className="card-wrapper relative w-[280px] h-[420px] cursor-pointer"
    onClick={handleClick}
  >
    {/* CARD IMAGE */}
    <img
      src={ui.bg}
      alt={ui.title}
      className={`w-full h-full object-contain card-float ${ui.glow}`}
      draggable={false}
    />
    
         {/* DESCRIPTION PANEL (MUST BE INSIDE) */}
    <div className="card-info text-center ">
      <p>{card.desc}</p>
  

  {/* COINS */}
  <div className="text-[1rem] font-bold font-cd1 text-center text-green-100 mt-0">
    Coins: {card.coins}
  </div>  </div>
  </div>

  {handleAvalText()}
</div>



    )
  }
};

export default PowerUpShopView;
/*
 {/* TITLE OVERLAY 
    <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 flex items-center justify-center pointer-events-none">
      <h3 className="card-title-overlay card-title-glitch">
        {ui.title}
      </h3>
    </div>*/