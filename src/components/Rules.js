import React from "react";
import { useHistory } from "react-router-dom";

function Rules() {
  let history = useHistory();

  const initialPlayerSkills = () => {
    localStorage.setItem("monsterLvl", "0");
    localStorage.setItem("attack", "2");
    localStorage.setItem("rawSpeed", "1000");
    localStorage.setItem("speed", "10");
    localStorage.setItem("life", "100");
    localStorage.setItem("armor", "0");
    localStorage.setItem("dodge", "0");
    localStorage.setItem("accuracity", "0");
    localStorage.setItem("vitality", "10");
    localStorage.setItem("agility", "0");
  };

  function goToGame() {
    history.push("/game");
    initialPlayerSkills();
  }
  return (
    <div>
      <p>
        Quisque bibendum enim ante, consequat vestibulum arcu cursus sed. Sed
        consectetur mi in nisl convallis cursus. Curabitur sagittis lacus mi,
        non vehicula nibh dictum a. Etiam luctus libero id nisi elementum
        aliquet. Quisque eget maximus ligula, a egestas nulla. Quisque et
        tristique tortor. Suspendisse vulputate dolor eu nibh ornare vulputate.
        In vulputate tristique mauris, id fermentum erat rhoncus et. Morbi
        posuere, sapien at rutrum condimentum, lacus leo venenatis felis, vel
        semper erat sem id ligula. Proin et lorem nunc. Cras eu nulla sem. Sed
        vel neque eros. Cras cursus felis vel libero mollis, non ullamcorper
        neque lacinia. Fusce ullamcorper dictum odio, condimentum lacinia purus
        condimentum ut.
      </p>
      <button type="button" onClick={goToGame}>
        Fight
      </button>
    </div>
  );
}

export default Rules;
