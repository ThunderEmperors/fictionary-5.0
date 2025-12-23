import React, { useState, useEffect, useRef, useCallback } from "react";
import { Menu, Close } from "@mui/icons-material";
<<<<<<< HEAD
=======
import { useGoogleLogin } from "@react-oauth/google";
>>>>>>> ishita2
import styles from "./NavBar.module.css";
import RulesModal from "../../pages/Rules/RulesModal";
import useContext from "../../pages/context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import endpoints from "../../utils/APIendpoints";
<<<<<<< HEAD
import CloseIcon from "@mui/icons-material/Close";
=======
import CloseIcon from '@mui/icons-material/Close';
>>>>>>> ishita2

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
<<<<<<< HEAD
  const [gameLive, setGameLive] = useState({
    game_live: false,
    time_up: false,
    date: new Date(),
  });
=======
>>>>>>> ishita2

  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const context = useContext();
  const navigate = useNavigate();
<<<<<<< HEAD

=======
>>>>>>> ishita2
  const refresh = useCallback(() => {
    fetch(endpoints.CHECK_GAME_LIVE).then((res) => {
      if (res.status === 200) {
        res.json().then((serverResponse) => {
<<<<<<< HEAD
          setGameLive((prev) => ({ ...prev, ...serverResponse }));
=======
          setGameLive((live) => ({ ...live, ...serverResponse }));
>>>>>>> ishita2
        });
      }
    });
  }, []);
<<<<<<< HEAD

  useEffect(() => {
    const token = context.token || localStorage.getItem("fictionary_frontend");
    if (!token) refresh();
  }, [context.token, refresh]);
=======
  const [gameLive, setGameLive] = useState({
      game_live: false,
      time_up: false,
      date: new Date(),
    });
  useEffect(() => {
    const token = context.token || localStorage.getItem("fictionary_frontend");
    if (token) {
      if (gameLive.game_live) {
       setGameLive(true)
      }
    } else {
      refresh();
    }
  }, [context.token, gameLive.game_live, navigate, refresh]
);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)
        .then((res) => res.json())
        .then((userInfo) => {
          fetch(endpoints.SOCIAL_LOGIN_TOKEN, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: tokenResponse.access_token, 
              ...userInfo, 
            }),
          })
            .then((response) => response.json())
            .then((backendResponse) => {
              if (backendResponse.token) {
                context.login(backendResponse.token);
                navigate("/play");
              } else {
                console.error("Failed to log in:", backendResponse.message);
              }
            })
            .catch((error) => console.error("Backend login error:", error));
        })
        .catch((error) => console.error("Google login error:", error));
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
>>>>>>> ishita2

  const handleLogout = () => {
    context.logout();
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
<<<<<<< HEAD
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target)
=======
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
>>>>>>> ishita2
      ) {
        setIsOpen(false);
      }
    };
<<<<<<< HEAD
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!context.token && !localStorage.getItem("fictionary_frontend")) {
    return null;
  }

  return (
    <>
      <nav className="bg-black px-8 py-3 flex justify-between items-center border-b border-green-500">

        {/* BRAND */}
        <Link to="/">
          <div className={styles.brand}>
            FICTIONARY
          </div>
        </Link>

        {/* MOBILE ICON */}
        <div
          ref={toggleButtonRef}
          className="xl:hidden ml-3 p-1 cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <Close className="text-green-400 text-xl" />
          ) : (
            <Menu className="text-green-400 text-xl" />
          )}
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden xl:flex items-center gap-x-6">
          {["Play", "Leaderboard"].map((item) => (
            <li key={item} className={styles.navItem}>
=======

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {context.token || localStorage.getItem("fictionary_frontend") ? (
        <nav className="bg-gray-900 py-3 px-8 flex justify-between items-center border-b-4 border-pink-500">
          <Link to="/">
            <div className={`${styles.flickering} text-pink-500 cursor-pointer font-operius  sm:text-1xl md:text-2xl lg:text-3xl xl:text-3xl`}>
              FICTIONARY
            </div>
          </Link>
          <div ref={toggleButtonRef} className="2xl:hidden" onClick={toggleMenu}>
            {isOpen ? <Close className="text-pink-500" /> : <Menu className="text-pink-500" />}
          </div>

          {/* Desktop menu */}
          <ul className="hidden xl:flex space-x-8 mt-4">
            {["Play", "Leaderboard"].map((item, index) => (
              <li
                key={index}
                className={`text-blue-300 font-pixel text-xl cursor-pointer ${styles.neonEffect}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
>>>>>>> ishita2
              <Link to={`/${item.toLowerCase()}`}>{item}</Link>
            </li>
          ))}

<<<<<<< HEAD
          {gameLive &&
            ["PowerUps", "PowerUpShop", "Updates"].map((item) => (
              <li key={item} className={styles.navItem}>
                <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              </li>
            ))}

          <li className={styles.navItem} onClick={openModal}>
            Rules
          </li>

          <li className="ml-3">
            <button onClick={handleLogout} className={styles.logoutButton}>
              LOG OUT
            </button>
          </li>
        </ul>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center z-50 xl:hidden"
        >
          <button
            className="absolute top-5 right-5 p-1 text-green-400"
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon fontSize="medium" />
          </button>

          <ul className="flex flex-col space-y-7 text-center">
            {["Play", "Leaderboard", "PowerUps", "PowerUpShop", "Updates"].map(
              (item) => (
                <li key={item} className={styles.navItem}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              )
            )}

            <li className={styles.navItem} onClick={openModal}>
              Rules
            </li>

            <li className="pt-2">
=======
            {gameLive && ["PowerUps", "PowerUpShop","Updates"].map((item, index) => (
              <li
                key={index}
                className={`text-blue-300 font-pixel text-xl cursor-pointer ${styles.neonEffect}`}
              >
                <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              </li>
            ))}
            <li className={`text-blue-300 font-pixel text-xl cursor-pointer ${styles.neonEffect}`} onClick={openModal}>
              Rules
            </li>
            <li className="text-blue-300 font-pixel text-xl cursor-pointer mb-2">
              <button onClick={handleLogout} className={styles.logoutButton}>LOG OUT</button>
            </li>
          </ul>
          {isOpen && (
            <div
              ref={menuRef}
              className="fixed inset-0 bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center xl:hidden z-50"
            >
              <button
                className="absolute top-5 right-5 text-white text-1xl"
                onClick={() => setIsOpen(false)}
              >
                <CloseIcon />
              </button>

              <ul className="flex flex-col space-y-12 mt-3 pt-7 text-1xl">
                {["Play", "Leaderboard"].map((item, index) => (
                  <li
                    key={index}
                    className={`text-blue-300 font-pixel text-1xl cursor-pointer mt-6 ${styles.neonEffect}`}
                  >
                    <Link to={`/${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                      {item}
                    </Link>
                  </li>
                ))}
                {gameLive && ["PowerUps", "PowerUpShop","Updates"].map((item, index) => (
                  <li
                    key={index}
                    className={`text-blue-300 font-pixel text-1xl cursor-pointer mt-6 ${styles.neonEffect}`}
                  >
                    <Link to={`/${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                      {item}
                    </Link>
                  </li>
                ))}
                <li
                  className={`text-blue-300 font-pixel text-1xl cursor-pointer ${styles.neonEffect}`}
                  onClick={openModal}
                >
                  Rules
                </li>
                <li className="text-xl text-pink-500 font-pixel py-2">
>>>>>>> ishita2
              <button onClick={handleLogout} className={styles.logoutButton}>
                LOG OUT
              </button>
            </li>
          </ul>
        </div>
      )}

      <RulesModal isOpen={isModalOpen} onClose={closeModal} />
<<<<<<< HEAD
=======
        </nav>
      ) : (
        <></>
      )}
>>>>>>> ishita2
    </>
  );
};

export default Navbar;
