import React, { useState, useEffect } from "react";
import Neptune from "../assets/img/monstersAvatars/Neptune.png";
import monsters from "../data/monsters";
import { useHistory } from "react-router-dom";
import { PlayerAttributesStorage } from "./PlayerAttributesStorage";

function Game() {
  /*const playerInitialData = [
    {
      id: 1,
      life: 100,
      attack: 3,
      speed: 1000,
      dodge: 0,
      accuracy: 0,
      armor: 0,
      vitality: 100,
    },
  ];*/

  //Monster Attributes
  const [monsterLvl] = useState(localStorage.getItem("monsterLvl"));
  const [monsterLife, setMonsterLife] = useState(monsters[monsterLvl].life);
  const [monsterLifePercentage, setMonsterLifePercentage] = useState(100);
  const [monsterDodge, setMonsterDodge] = useState(monsters[monsterLvl].dodge);
  const [monsterSpeed, setMonsterSpeed] = useState(monsters[monsterLvl].speed);
  const [monsteerDodgeChance, setMonsteerDodgeChance] = useState();
  const [monsterAttack, setMonsterAttack] = useState(
    monsters[monsterLvl].attack
  );
  const [monsterAttackAmount, setMonsterAttackAmount] = useState();
  const [monsterArmor, setMonsterArmor] = useState(monsters[monsterLvl].armor);
  const [monsterAccuracity, setMonsterAccuracity] = useState(
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
  const [playerAccuracity] = useState(localStorage.getItem("accuracity"));

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
    if (playerAccuracity < monsterDodge) {
      checkDifference = Math.abs(playerAccuracity - monsterDodge);
    } else {
      checkDifference = 1;
    }
    let dodgeChance = Math.floor(Math.random() * checkDifference);
    setMonsteerDodgeChance(dodgeChance);
  };
  //Calculate player doodge
  const calculatePlayerDodgechance = () => {
    let checkDifferencePlayer;
    if (monsterAccuracity < playerDodge) {
      checkDifferencePlayer = Math.abs(monsterAccuracity - playerDodge);
    } else {
      checkDifferencePlayer = 1;
    }
    let dodgeChancePlayer = Math.floor(Math.random() * checkDifferencePlayer);
    setPlayerDodgeChance(dodgeChancePlayer);
  };

  console.log("player" + playerDodgeChance);
  console.log("monster attack " + monsterAttack);
  console.log("player doodge" + playerDodgeChance);
  console.log("player life" + playerLife);

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

  return (
    <div className="game">
      <div className="fractalMonster">
        <div className="monsterAvatar">
          <img
            src={Neptune}
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
        <button onClick={() => setStart(true)}>End Game</button>
      </div>
      <div
        className={`playerDefeated ${
          monsterLife <= 0 ? "displayEndButton" : "displayNone"
        }`}
      >
        <p>Victory!</p>
        <button onClick={() => goToNextFloor()}>Next</button>
      </div>
      <div className="player">
        <div className="playerAvatar">
          <img
            src={Neptune}
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
