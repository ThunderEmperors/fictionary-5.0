import React, { useEffect, useState } from "react";
import useContext from "../context/UserContext";
import endpoints from "../../utils/APIendpoints";
import { useNavigate } from "react-router-dom";
import PowerUpShopView from "./PowerUpShopView";
import "./PowerUpShop.css"; 
import FlowerDisplay from "/assets/FlowerDisplay.ttf";
import bgps3 from "/assets/bgps3.jpg"

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

    const cardItems =
    cards.cardList.length !== 0 ? (
      cards.cardList.map((card, index) => (
        <PowerUpShopView  card={card} refreshUpdateState={refreshUpdateState} />
      ))
    ) : (
      <p className="text-white text-lg font-gen text-center">No Power-Ups Available</p>
    );

  return (
    <div
          className="bg-dark-blue min-h-screen flex flex-col relative overlay"
          style={{
            backgroundImage: `url(${bgps3})`,
            backgroundSize: "contain",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
          }}
        >
    
      <h1 className="xl:text-15xl sm:text-6xl md:text-8xl lg:text-13xl multiverse-title mt-8 mb-10 font-arcade text-center">Power-Up Shop</h1>
      <h2 className="xl:text-3xl sm:text-2xl md:text-3xl lg:text-3xl flicker font-coins text-center">
        Coins: <span className="font-coins flicker">{userCoins}</span>
      </h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-item-scenter px-8">
        {cardItems}
      </div>
    </div>
  );
};

export default PowerUpShop;
