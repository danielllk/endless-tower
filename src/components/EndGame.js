import React from "react";
import { useHistory } from "react-router-dom";

function EndGame() {
  let history = useHistory();

  const goToStart = () => {
    history.push("/");
  };
  return (
    <div className="EndGame">
      <div>
        <p>Congratulations!</p>
        <p>You finished the Game!</p>
        <p>
          P.S. The game is still in development. If I will have enough time I
          will continue adding more features. Feel free to contact me:{" "}
          <a href="mailto:daniel@fractaart.com">daniel@fractaart.com</a>
        </p>
        <button type="button" onClick={goToStart}>
          Start Again
        </button>
      </div>
    </div>
  );
}

export default EndGame;
