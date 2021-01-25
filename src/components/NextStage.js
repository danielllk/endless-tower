import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function NextStage() {
  const [stageFloor, setStageFloor] = useState(
    parseInt(localStorage.getItem("monsterLvl")) + 1
  );
  let history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/game");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="NextStage">
      <p>Stage {stageFloor}</p>
    </div>
  );
}

export default NextStage;
