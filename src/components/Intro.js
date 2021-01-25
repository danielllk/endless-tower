import React from "react";
import { useHistory } from "react-router-dom";
function Intro() {
  let history = useHistory();

  function goToRules() {
    history.push("/rules");
  }
  return (
    <div>
      <h1>Endess Tower of Fracta</h1>
      <p>How far can you go?</p>
      <button type="button" onClick={goToRules}>
        Start
      </button>
    </div>
  );
}

export default Intro;
