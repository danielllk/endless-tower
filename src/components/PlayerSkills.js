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
  const [playerAccuracy, setPlayerAccuracy] = PlayerAttributesStorage(
    "accuracy",
    localStorage.getItem("Accuracy")
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

  const handleAttackReturn = () => {
    if (availableSkills < 3 && availableSkills >= 0) {
      if (playerAttack > 2) {
        setPlayerAttack(parseInt(playerAttack) - 1);
        setAvailableSkills(parseInt(availableSkills) + 1);
      }
    }
  };

  const handleLife = () => {
    if (availableSkills > 0) {
      setPlayerVitality(parseInt(playerVitality) + 1);
      setAvailableSkills(parseInt(availableSkills) - 1);
    }
  };

  const handleLifeReturn = () => {
    if (availableSkills < 3 && availableSkills >= 0) {
      if (playerVitality > 10) {
        setPlayerVitality(parseInt(playerVitality) - 1);
        setAvailableSkills(parseInt(availableSkills) + 1);
      }
    }
  };

  const handleAgility = () => {
    if (availableSkills > 0) {
      setPlayerAgility(parseInt(playerAgility) + 1);
      setPlayerDodge(parseInt(playerDodge) + 1);
      setAvailableSkills(parseInt(availableSkills) - 1);
    }
  };

  const handleAgilityReturn = () => {
    if (availableSkills < 3 && availableSkills >= 0) {
      if (playerAgility > 0) {
        setPlayerAgility(parseInt(playerAgility) - 1);
        setPlayerDodge(parseInt(playerDodge) - 1);
        setAvailableSkills(parseInt(availableSkills) + 1);
      }
    }
  };

  const handleSpeed = () => {
    if (availableSkills > 0 && playerSpeed !== 45) {
      setPlayerSpeed(parseInt(playerSpeed) + 1);
      setPlayerRawSpeed(parseInt(playerRawSpeed) - 20);
      setAvailableSkills(parseInt(availableSkills) - 1);
    }
  };

  const handleSpeedReturn = () => {
    if (availableSkills <= 3 && availableSkills >= 0) {
      if (playerSpeed > 10) {
        setPlayerSpeed(parseInt(playerSpeed) - 1);
        setPlayerRawSpeed(parseInt(playerRawSpeed) + 20);
        setAvailableSkills(parseInt(availableSkills) + 1);
      }
    }
  };

  const handleAccuracy = () => {
    if (availableSkills > 0) {
      setPlayerAccuracy(parseInt(playerAccuracy) + 1);
      setAvailableSkills(parseInt(availableSkills) - 1);
    }
  };

  const handleAccuracyReturn = () => {
    if (availableSkills < 3 && availableSkills >= 0) {
      if (playerAccuracy > 0) {
        setPlayerAccuracy(parseInt(playerAccuracy) - 1);
        setAvailableSkills(parseInt(availableSkills) + 1);
      }
    }
  };

  const handleArmor = () => {
    if (availableSkills > 0) {
      setPlayerArmor(parseInt(playerArmor) + 1);
      setAvailableSkills(parseInt(availableSkills) - 1);
    }
  };

  const handleArmorReturn = () => {
    if (availableSkills < 3 && availableSkills >= 0) {
      if (playerArmor > 0) {
        setPlayerArmor(parseInt(playerArmor) - 1);
        setAvailableSkills(parseInt(availableSkills) + 1);
      }
    }
  };

  const goNextStage = () => {
    setMonsterLvl(parseInt(monsterLvl) + 1);
    setTimeout(() => {
      history.push("/nextstage");
    }, 100);
  };

  return (
    <div className="PlayerSkills">
      <div className="skills-container">
        <p>You gain a New Level!</p>
        <p>
          You have <span className="skills-avaliable">{availableSkills}</span>{" "}
          skills avaliable{" "}
        </p>
        <div className="skills-box">
          <div>
            <span>Strength: </span>
            <span> {playerAttack}</span>
            <span>
              <button
                className="btn-add-points"
                onClick={() => handleAttackReturn()}
              >
                -
              </button>
              <button className="btn-add-points" onClick={() => handleAttack()}>
                +
              </button>
            </span>
          </div>
          <div className="skills-explain">Your attack points.</div>
          <div>
            <span>Vitality: </span>
            <span>{playerVitality}</span>
            <span>
              <button
                className="btn-add-points"
                onClick={() => handleLifeReturn()}
              >
                -
              </button>
              <button className="btn-add-points" onClick={() => handleLife()}>
                +
              </button>
            </span>
          </div>
          <div className="skills-explain">
            Your vitality points. 1 point - 10 lifes.
          </div>
          <div>
            <span>Agility: </span>
            <span>{playerAgility}</span>
            <span>
              <button
                className="btn-add-points"
                onClick={() => handleAgilityReturn()}
              >
                -
              </button>
              <button
                className="btn-add-points"
                onClick={() => handleAgility()}
              >
                +
              </button>
            </span>
          </div>
          <div className="skills-explain">Your doge chance.</div>
          <div>
            <span>Speed: </span>
            <span>
              {" "}
              {playerSpeed < 45 ? playerSpeed : playerSpeed + " (max)"}
            </span>
            <span>
              <button
                className="btn-add-points"
                onClick={() => handleSpeedReturn()}
              >
                -
              </button>
              <button
                className={`btn-add-points ${
                  playerSpeed < 45 ? "" : "block-button"
                }`}
                onClick={() => handleSpeed()}
              >
                +
              </button>
            </span>
          </div>
          <div className="skills-explain">
            Your speed. More speed - faster attacks.
          </div>
          <div>
            <span>Accuracy: </span>
            <span>{playerAccuracy}</span>
            <span>
              <button
                className="btn-add-points"
                onClick={() => handleAccuracyReturn()}
              >
                -
              </button>
              <button
                className="btn-add-points"
                onClick={() => handleAccuracy()}
              >
                +
              </button>
            </span>
          </div>
          <div className="skills-explain">Counter the agility skill.</div>
          <div>
            <span>Armor: </span>
            <span>{playerArmor}</span>
            <span>
              <button
                className="btn-add-points"
                onClick={() => handleArmorReturn()}
              >
                -
              </button>
              <button className="btn-add-points" onClick={() => handleArmor()}>
                +
              </button>
            </span>
          </div>
          <div className="skills-explain">
            Counter the strength skill. But min damage recived - 1.
          </div>
          <div
            className={`next-stage-btn ${
              availableSkills === 0 ? "next-stage-active" : ""
            }`}
          >
            <button onClick={() => goNextStage()}>next stage</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerSkills;
