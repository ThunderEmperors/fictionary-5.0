import React, { useEffect, useState } from "react";
import useContext from "../context/UserContext";
import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";
import PowerUpShopView from "./PowerUpShopView";
import "./PowerUpShop.css"; 
import FlowerDisplay from "/assets/FlowerDisplay.ttf";
import bgps9 from "/assets/bgps9.jpg";
import powerupshop from "/assets/powerupshop.png";

const PowerUpShop = () => {
  const [cards, setCards] = useState({ cardList: [], loaded: true });
  const [userCoins, setUserCoins] = useState(0);
  const [updateState, setUpdateState] = useState(false);
  const [gameLive, setGameLive] = useState(true);
  const refreshUpdateState = () => {
    setUpdateState(!updateState);
  };


  const navigate = useNavigate();
  const context = useContext();

  const getCards = () => {
    setCards({ ...cards, loaded: false });

    fetch(endpoints.CARDS, {
      headers: {
        Authorization: `Token ${context.token || localStorage.getItem("fictionary_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        context.logout();
        navigate("/signin?redirected=true");
        return;
      }
      res.json().then((res) => {
        if (res.game_not_live) {
          setGameLive(false);
          navigate("/?redirected=true");
        } else {
          setCards({
            cardList: res.cards,
            loaded: true,
          });
        }
      });
    });
  };

  const getUserCoins = () => {
    fetch(endpoints.GET_USER_COINS, {
      headers: {
        Authorization: `Token ${context.token || localStorage.getItem("fictionary_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        context.logout();
        navigate("/sign-in?redirected=true");
        return;
      }
      res.json().then((res) => {
        setUserCoins(res.coins);
      });
    });
  };

  useEffect(() => {
    if (gameLive) {
      getCards();
      getUserCoins();
    } else {
      navigate("/?redirected=true");
    }
  }, [context.token, updateState, gameLive]);

 return (
  <div className="shop-page-wrapper">
    <div className="shop-page">
     
      <div className="shop-bg">
        <img
          src={bgps9}
          alt=""
          className="w-full h-full object-cover object-top"
          draggable={false}
        />
      </div>

   
      <div className="shop-content">
        <h1 className="xl:text-15xl sm:text-6xl md:text-8xl lg:text-13xl
                       multiverse-title metallic-text
                       mt-7 mb-5 text-center">
          POWER UP SHOP
        </h1>

        <h2 className="xl:text-3xl sm:text-2xl md:text-3xl lg:text-3xl
                       flicker font-coins -mt-3 text-center">
          Coins: <span>{userCoins}</span>
        </h2>

        <div className="cards-grid">
          {cards.cardList.map((card, index) => (
            <PowerUpShopView
              key={index}
              card={card}
              refreshUpdateState={refreshUpdateState}
            />
          ))}
        </div>
      </div>

    </div>
  </div>
);
}

export default PowerUpShop;

/*        <div
          className="bg-dark-blue overlayPower"
           style={{
            backgroundImage: `url(${bgps8})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat"
          }}

              <div className="bg-black/50 rounded-md flex justify-center mx-auto">
  <h1 className="xl:text-15xl sm:text-6xl md:text-8xl lg:text-13xl multiverse-title mt-7 mb-5 font-arcade text-center">
    Power-Up Shop
  </h1>
</div> 

 <img
      src={powerupshop}
      alt=""
      className="mx-auto block object-contain"
      draggable={false}
    />

        >*/
