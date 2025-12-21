import React, { useState, useEffect, useRef, useCallback } from "react";
import { Menu, Close } from "@mui/icons-material";
import styles from "./NavBar.module.css";
import RulesModal from "../../pages/Rules/RulesModal";
import useContext from "../../pages/context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import endpoints from "../../utils/APIendpoints";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameLive, setGameLive] = useState({
    game_live: false,
    time_up: false,
    date: new Date(),
  });

  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const context = useContext();
  const navigate = useNavigate();

  const refresh = useCallback(() => {
    fetch(endpoints.CHECK_GAME_LIVE).then((res) => {
      if (res.status === 200) {
        res.json().then((serverResponse) => {
          setGameLive((prev) => ({ ...prev, ...serverResponse }));
        });
      }
    });
  }, []);

  useEffect(() => {
    const token = context.token || localStorage.getItem("fictionary_frontend");
    if (!token) refresh();
  }, [context.token, refresh]);

  const handleLogout = () => {
    context.logout();
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
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
              <Link to={`/${item.toLowerCase()}`}>{item}</Link>
            </li>
          ))}

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
              <button onClick={handleLogout} className={styles.logoutButton}>
                LOG OUT
              </button>
            </li>
          </ul>
        </div>
      )}

      <RulesModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Navbar;
