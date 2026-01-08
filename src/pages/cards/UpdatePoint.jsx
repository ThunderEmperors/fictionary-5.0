import "../Leaderboard/Score.css";
const UpdatePoint = (props) => {
  return (
    <div className="scores">
      <div className="scoreUpdate">
        <div className="start">
          <h3 className="text-xs md:text-lg lg:text-xl xl:text-xl">{props.text}</h3>
        </div>
      </div>
    </div>
  );
};

export default UpdatePoint;