import React, { useState, useEffect } from "react";
import monsters from "../data/monsters";
import { useHistory } from "react-router-dom";
import { PlayerAttributesStorage } from "./PlayerAttributesStorage";

function Game() {
  //Monster Attributes
  const [monsterLvl] = useState(localStorage.getItem("monsterLvl"));
  const [monsterLife, setMonsterLife] = useState(monsters[monsterLvl].life);
  const [monsterLifePercentage, setMonsterLifePercentage] = useState(100);
  const [monsterDodge, setMonsterDodge] = useState(monsters[monsterLvl].dodge);
  const [monsterSpeed, setMonsterSpeed] = useState(monsters[monsterLvl].speed);
  const [monsterName, setMonsterName] = useState(monsters[monsterLvl].name);
  const [monsteerDodgeChance, setMonsteerDodgeChance] = useState();
  const [monsterAttack, setMonsterAttack] = useState(
    monsters[monsterLvl].attack
  );
  const [monsterAttackAmount, setMonsterAttackAmount] = useState();
  const [monsterArmor, setMonsterArmor] = useState(monsters[monsterLvl].armor);
  const [monsterAccuracy, setMonsterAccuracy] = useState(
    monsters[monsterLvl].accuracy
  );

  //Player Attributes
  const [playerAttack, setPlayerAttack] = useState(
    localStorage.getItem("attack")
  );
  console.log(localStorage);
  const [playerSpeed] = useState(localStorage.getItem("rawSpeed"));
  const [playerLife, setPlayerLife] = useState(localStorage.getItem("life"));
  const [playerArmor] = useState(localStorage.getItem("armor"));
  const [playerDodge] = useState(localStorage.getItem("dodge"));
  const [playerAccuracy] = useState(localStorage.getItem("accuracy"));

  const [playerLifePercentage, setPlayerLifePercentage] = useState(100);
  const [playerAttackAmount, setPlayerAttackAmount] = useState();
  const [playerDodgeChance, setPlayerDodgeChance] = useState();

  //Start the Game
  const [start, setStart] = useState(false);

  //restore life to player
  localStorage.setItem("life", localStorage.getItem("vitality") * 10);

  let history = useHistory();

  //Calculate monster doodge
  const calculateMonsterDodgechance = () => {
    let checkDifference;
    if (playerAccuracy < monsterDodge) {
      checkDifference = Math.abs(playerAccuracy - monsterDodge);
    } else {
      checkDifference = 0;
    }
    let dodgeChance = Math.floor(Math.random() * checkDifference);
    console.log("doodge chance ", dodgeChance);
    setMonsteerDodgeChance(dodgeChance);
  };
  //Calculate player doodge
  const calculatePlayerDodgechance = () => {
    let checkDifferencePlayer;
    if (monsterAccuracy < playerDodge) {
      checkDifferencePlayer = Math.abs(monsterAccuracy - playerDodge);
    } else {
      checkDifferencePlayer = 0;
    }
    let dodgeChancePlayer = Math.floor(Math.random() * checkDifferencePlayer);
    setPlayerDodgeChance(dodgeChancePlayer);
  };

  /*console.log("player" + playerDodgeChance);
  console.log("monster attack " + monsterAttack);
  console.log("player doodge" + playerDodgeChance);
  console.log("player life" + playerLife);*/

  //Calculate damage to monster
  useEffect(() => {
    if (start) {
      const interval = setInterval(
        () => {
          calculateMonsterDodgechance();

          //monster doodge change calc
          if (monsteerDodgeChance === 0) {
            //monster armor calc
            let armorCalc = Math.abs(
              monsterArmor >= playerAttack ? 1 : monsterArmor - playerAttack
            );

            setMonsterLife((monsterLife) => monsterLife - armorCalc);
            //calc life percentage
            let calcPercPlayerAttack = (playerAttack / monsterLife) * 100;
            setMonsterLifePercentage(
              (monsterLifePercentage) =>
                monsterLifePercentage - calcPercPlayerAttack
            );
            setPlayerAttackAmount(armorCalc);
          }
        },
        monsterLife > 0 ? playerSpeed : null
      );
      return () => clearInterval(interval);
    } else {
    }
  }, [start, monsteerDodgeChance, monsterArmor]);

  //Calculate damage to player
  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        calculatePlayerDodgechance();
        //player doodge change calc
        if (playerDodgeChance === 0) {
          //player armor calc
          let playerArmorCalc = Math.abs(
            playerArmor >= monsterAttack ? 1 : playerArmor - monsterAttack
          );
          setPlayerLife((playerLife) => playerLife - playerArmorCalc);
          //calc life percentage
          let calcPerMonsterAttack = (monsterAttack / playerLife) * 100;
          setPlayerLifePercentage(
            (playerLifePercentage) =>
              playerLifePercentage - calcPerMonsterAttack
          );
          setMonsterAttackAmount(playerArmorCalc);
        }
      }, monsterSpeed);
      return () => clearInterval(interval);
    } else {
    }
  }, [start, playerDodgeChance, playerArmor]);

  //Stop Interval
  useEffect(() => {
    if (monsterLife < 0 || playerLife < 0) {
      setStart(false);
    }
  });

  console.log(monsterLifePercentage);

  function goToNextFloor() {
    history.push("/playerskills");
    localStorage.setItem("availableSkills", "3");
  }

  function startAgain() {
    history.push("/");
    localStorage.clear();
  }

  return (
    <div className="game">
      <div className="fractalMonster">
        <div className="monsterName">{monsterName}</div>
        <div className="monsterAvatar">
          <img
            src={monsters[monsterLvl].img}
            className={monsterLife < 0 ? "defeated" : ""}
            alt=""
          />
          <div
            className={`playerAttackAmount ${
              monsterLife < 0 || playerLife < 0 ? "opacityNone" : ""
            }${monsteerDodgeChance > 0 ? "backBlue" : "backRed"} ${
              start ? "addDamageAnimation" : ""
            }`}
            style={{ animationDuration: `${playerSpeed * 0.001}s` }}
          >
            {monsteerDodgeChance === 0
              ? playerAttackAmount
                ? "-" + playerAttackAmount
                : ""
              : monsteerDodgeChance > 0
              ? "miss"
              : ""}
          </div>
          <div
            className={`deadStateBannerMonster ${
              monsterLife > 0 ? "displayNone" : ""
            }`}
          >
            DEFEATED
          </div>
        </div>
        <div className="innerMonsterLifebar">
          <div
            className="monsterLifebar"
            style={{
              width: (monsterLife > 0 ? monsterLifePercentage : 0) + "%",
            }}
          ></div>
        </div>
        <p>{monsterLife > 0 ? monsterLife : 0}</p>
      </div>
      <div
        className={`startButton  ${
          start || monsterLife <= 0 || playerLife <= 0 ? "displayNone" : ""
        }`}
      >
        <button onClick={() => setStart(true)}>start</button>
      </div>
      <div
        className={`playerDefeated ${
          playerLife <= 0 ? "displayEndButton" : "displayNone"
        }`}
      >
        <p>You lost!</p>
        <button onClick={() => startAgain()}>End Game</button>
      </div>
      <div
        className={`playerDefeated ${
          monsterLife <= 0 ? "displayEndButton" : "displayNone"
        }`}
      >
        <p className="victory">Victory!</p>
        <button onClick={() => goToNextFloor()}>Next</button>
      </div>
      <div className="player">
        <div className="playerAvatar">
          <img
            src={monsters[monsterLvl].img}
            alt=""
            className={playerLife < 0 ? "defeated" : ""}
          />
          <div
            className={`monsterAttackAmount ${
              monsterLife < 0 || playerLife < 0 ? "opacityNone" : ""
            } ${playerDodgeChance > 0 ? "backBlue" : "backRed"}  ${
              start ? "addDamageAnimation" : ""
            }`}
            style={{ animationDuration: `${monsterSpeed * 0.001}s` }}
          >
            {playerDodgeChance === 0 && playerAttackAmount !== "undefined"
              ? monsterAttackAmount
                ? "-" + monsterAttackAmount
                : ""
              : playerDodgeChance > 0
              ? "miss"
              : ""}
          </div>
          <div
            className={`deadStateBannerPlayer ${
              playerLife > 0 ? "displayNone" : ""
            }`}
          >
            DEFEATED
          </div>
        </div>
        <div className="innerPlayerLifebar">
          <div
            className="playerLifebar"
            style={{
              width: (playerLife > 0 ? playerLifePercentage : 0) + "%",
            }}
          ></div>
        </div>
        <p>{playerLife > 0 ? playerLife : 0}</p>
      </div>
    </div>
  );
}

export default Game;
