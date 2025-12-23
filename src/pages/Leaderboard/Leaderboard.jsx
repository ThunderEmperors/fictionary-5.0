import React, { useEffect, useState } from "react";
import useContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import endpoints from "../../utils/APIendpoints";
import { ColorRing } from "react-loader-spinner";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useContext().token;
  const navigate = useNavigate();

  const getLeaderboard = () => {
    setLoading(true);
    fetch(endpoints.LEADERBOARD, {
      headers: {
        Authorization: `Token ${token || localStorage.getItem("fictionary_token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/sign-in?redirected=true");
        } else {
          res.json().then((res) => {
            if (res.game_not_live) navigate("/?redirected=true");
            else setLeaderboard(res.leaderboard);
          });
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getLeaderboard();
  }, [token]);

  return (
    <div className="matrix-bg">
      <div className="leaderboard-container">
        <div className="leaderboardItems">
          <h1 className="leaderboardHeader">Leaderboard</h1>

          {loading ? (
            <div className="loader">
              <ColorRing
                visible={true}
                height="135"
                width="135"
                ariaLabel="loading"
                colors={["#ff00e4", "#00ffcc", "#fffb00", "#ff6f00", "#0000ff"]}
              />
            </div>
          ) : leaderboard.length ? (
            leaderboard.map((elem, index) => (
              <div
                className={`score ${
                  index === 0
                    ? "first-place"
                    : index === 1
                    ? "second-place"
                    : index === 2
                    ? "third-place"
                    : ""
                }`}
                key={index}
              >
                <div className="rank">{index + 1}</div>
                {elem.avatar && (
                  <img src={elem.avatar} alt="avatar" className="avatar" />
                )}
                <div className="name">{elem.name}</div>
                <div className="score-value">{elem.points}</div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No data available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
