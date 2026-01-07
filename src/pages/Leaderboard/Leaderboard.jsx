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
        Authorization: `Token ${
          token || localStorage.getItem("fictionary_token")
        }`,
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

  useEffect(() => getLeaderboard(), [token]);

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="lb-bg">

      <h1 className="lb-title">LEADERBOARD</h1>

      <div className="podium-wrapper">
        {loading ? (
          <></>
        ) : (
          <div className="podium">

            {/* SECOND PLACE */}
            {top3[1] && (
              <div className="podium-card second">
                <div className="hex-frame">
                  <img src={top3[1].avatar} className="hex-img" />
                </div>
                <div className="badge silver">2</div>
                <div className="pod-name">{top3[1].name}</div>
                <div className="pod-score pop-anim">{top3[1].points}</div>
              </div>
            )}

            {/* FIRST PLACE */}
            {top3[0] && (
              <div className="podium-card first">
                <div className="hex-frame glow-pulse">
                  <img src={top3[0].avatar} className="hex-img" />
                </div>
                <div className="badge gold">1</div>
                <div className="crown sparkle">👑</div>
                <div className="pod-name">{top3[0].name}</div>
                <div className="pod-score pop-anim">{top3[0].points}</div>
              </div>
            )}

            {/* THIRD PLACE */}
            {top3[2] && (
              <div className="podium-card third">
                <div className="hex-frame">
                  <img src={top3[2].avatar} className="hex-img" />
                </div>
                <div className="badge bronze">3</div>
                <div className="pod-name">{top3[2].name}</div>
                <div className="pod-score pop-anim">{top3[2].points}</div>
              </div>
            )}

          </div>
        )}
      </div>

      <div className="lower-list">
        {rest.map((elem, i) => (
          <div className="list-row fade-in" style={{ "--i": i }} key={i}>
            <div className="list-rank">{i + 4}</div>
            {elem.avatar && <img src={elem.avatar} className="list-avatar" />}
            <div className="list-name">{elem.name}</div>
            <div className="list-score">{elem.points}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Leaderboard;
