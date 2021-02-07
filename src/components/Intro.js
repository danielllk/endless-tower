import React from "react";
import { useHistory } from "react-router-dom";
import whiteLogo from "../assets/img/logo/fractaart-logo.svg";
function Intro() {
  let history = useHistory();

  const goToRules = () => {
    history.push("/rules");
  };
  return (
    <div className="intro">
      <div>
        <img src={whiteLogo} alt="fractaart logo" />
        <h1>The Tower of Fracta</h1>
        <p>How far can you go?</p>
        <button type="button" onClick={goToRules}>
          Start
        </button>
      </div>
    </div>
  );
}

export default Intro;
