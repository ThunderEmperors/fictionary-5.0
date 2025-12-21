import React, { useEffect, useState } from "react";
import "./PowerUpShopView.css";
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
import TimeFractureCard from "/assets/TimeFractureCard.png";
import OraclePowerCard from "/assets/OraclePowerCard.png";

const CARD_UI_MAP = {
  0: {
    bg: AsteroidCard,
    glow: "glow-red",
    title: "Asteroid Strike",
  },
  1: {
    bg: PlanetBoostCard,
    glow: "glow-green",
    title: "Planet Boost"
  },
  2: {
    bg: CosmicRevealCard,
    glow: "glow-purple",
    title: "Cosmic Reveal"
  },
  3: {
    bg: DimEchoCard,
    glow: "glow-blue",
    title: "Dimensional Echo"
  },
  4: {
    bg: TimeFractureCard,
    glow: "glow-white",
    title: "Time Fracture"
  },
  5: {
    bg: OraclePowerCard,
    glow: "glow-orange",
    title: "Oracle Power"
  }
};
>>>>>>> ishita2

const PowerUpShopView = ({ card, refreshUpdateState }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [available, setAvailable] = useState(false);

<<<<<<< HEAD
=======
  const ui = CARD_UI_MAP[card.index] || CARD_UI_MAP[1];

>>>>>>> ishita2
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
<<<<<<< HEAD
    <div
=======
   /* <div
>>>>>>> ishita2
      className={`p-6 max-w-sm rounded-lg shadow-lg text-white relative cards`}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${powercard})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "370px",
      }}
<<<<<<< HEAD
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg">
        <div className="relative z-10 text-xl font-arcade uppercase mb-4 text-center mt-12">
          {card.text}
        </div>
        <div className="relative z-10 text-md mb-2 text-center ml-7 mr-7">
          {card.desc}
        </div>
        <div className="relative z-10 text-lg font-bold text-center">
          Coins: {card.coins}
        </div>
        {handleAvalText()}
      </div>
    </div>
  );} else {
    return (
      <></>
=======
    >*/

   

     <div className="flex flex-col items-center">
  {/* CARD WRAPPER */}
  <div
    className="card-wrapper relative w-[280px] h-[420px] cursor-pointer"
    onClick={handleClick}
  >
    {/* CARD IMAGE */}
    <img
      src={ui.bg}
      alt={ui.title}
      className={`w-full h-full card-float object-contain card-hover ${ui.glow}`}
      draggable={false}
    />

    {/* TITLE OVERLAY */}
    <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 flex items-center justify-center pointer-events-none">
      <h3 className="card-title-overlay card-title-glitch">
        {ui.title}
      </h3>
    </div>
  </div>

  {/* DESCRIPTION */}
 <p
  className="
    text-sm
    xl:text-3xl sm:text-2xl md:text-3xl lg:text-3xl
    font-cd2
    glow
    text-center
    px-4
    max-w-[260px]
    opacity-90
    -mt-20
    leading-snug
  "
>
    {card.desc}
  </p>

  {/* COINS */}
  <div className="text-base font-bold font-cd1 text-green-300">
    Coins: {card.coins}
  </div>

  {handleAvalText()}
</div>


>>>>>>> ishita2
    )
  }
};

export default PowerUpShopView;
