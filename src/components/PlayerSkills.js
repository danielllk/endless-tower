import React, { useState, useEffect } from "react";
import { PlayerAttributesStorage } from "./PlayerAttributesStorage";
import { useHistory } from "react-router-dom";

function PlayerSkills() {
  let history = useHistory();
  const [playerAttack, setPlayerAttack] = PlayerAttributesStorage(
    "attack",
    localStorage.getItem("attack")
  );
  const [playerAgility, setPlayerAgility] = PlayerAttributesStorage(
    "agility",
    localStorage.getItem("agility")
  );
  const [playerDodge, setPlayerDodge] = PlayerAttributesStorage(
    "dodge",
    localStorage.getItem("dodge")
  );
  const [playerVitality, setPlayerVitality] = PlayerAttributesStorage(
    "vitality",
    localStorage.getItem("vitality")
  );
  const [playerRawSpeed, setPlayerRawSpeed] = PlayerAttributesStorage(
    "rawSpeed",
    localStorage.getItem("rawSpeed")
  );
  const [playerSpeed, setPlayerSpeed] = PlayerAttributesStorage(
    "speed",
    localStorage.getItem("speed")
  );
  const [playerAccuracity, setPlayerAccuracity] = PlayerAttributesStorage(
    "accuracity",
    localStorage.getItem("accuracity")
  );
  const [playerArmor, setPlayerArmor] = PlayerAttributesStorage(
    "armor",
    localStorage.getItem("armor")
  );
  const [availableSkills, setAvailableSkills] = PlayerAttributesStorage(
    "availableSkills",
    localStorage.getItem("availableSkills")
  );
  const [monsterLvl, setMonsterLvl] = PlayerAttributesStorage(
    "monsterLvl",
    localStorage.getItem("monsterLvl")
  );
  const [nextStageDelay, setNextStageDelay] = useState(false);
  console.log(localStorage);

  const handleAttack = () => {
    if (availableSkills > 0) {
      setPlayerAttack(parseInt(playerAttack) + 1);
      setAvailableSkills(parseInt(availableSkills) - 1);
    }
  };

  const handleLife = () => {
    if (availableSkills > 0) {
      setPlayerVitality(parseInt(playerVitality) + 1);
      setAvailableSkills(parseInt(availableSkills) - 1);
    }
  };

  const handleAgility = () => {
    if (availableSkills > 0) {
      setPlayerAgility(parseInt(playerAgility) + 1);
      setPlayerDodge(parseInt(playerDodge) + 1);
      setAvailableSkills(parseInt(availableSkills) - 1);
    }
  };

  const handleSpeed = () => {
    if (availableSkills > 0) {
      setPlayerSpeed(parseInt(playerSpeed) + 1);
      setPlayerRawSpeed(parseInt(playerRawSpeed) - 20);
      setAvailableSkills(parseInt(availableSkills) - 1);
    }
  };

  const handleAccuracity = () => {
    if (availableSkills > 0) {
      setPlayerAccuracity(parseInt(playerAccuracity) + 1);
      setAvailableSkills(parseInt(availableSkills) - 1);
    }
  };

  const handleArmor = () => {
    if (availableSkills > 0) {
      setPlayerArmor(parseInt(playerArmor) + 1);
      setAvailableSkills(parseInt(availableSkills) - 1);
    }
  };

  const goNextStage = () => {
    setMonsterLvl(parseInt(monsterLvl) + 1);
    setTimeout(() => {
      history.push("/nextstage");
    }, 1000);
  };

  return (
    <div className="PlayerSkills">
      <div>
        <p>You gain a New Level!</p>
        <p>You have {availableSkills} skills avaliable </p>
        <div>
          <div>
            <span>Strength: </span>
            <span> {playerAttack}</span>
            <button onClick={() => handleAttack()}>+</button>
          </div>
          <div>
            <span>Vitality: </span>
            <span>{playerVitality}</span>
            <button onClick={() => handleLife()}>+</button>
          </div>
          <div>
            <span>Agility: </span>
            <span>{playerAgility}</span>
            <button onClick={() => handleAgility()}>+</button>
          </div>
          <div>
            <span>Speed: </span>
            <span> {playerSpeed}</span>
            <button onClick={() => handleSpeed()}>+</button>
          </div>
          <div>
            <span>Accuracity: </span>
            <span>{playerAccuracity}</span>
            <button onClick={() => handleAccuracity()}>+</button>
          </div>
          <div>
            <span>Armor: </span>
            <span>{playerArmor}</span>
            <button onClick={() => handleArmor()}>+</button>
          </div>
          <button onClick={() => goNextStage()}>next stage</button>
        </div>
      </div>
    </div>
  );
}

export default PlayerSkills;
