import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Rules() {
  let history = useHistory();

  const initialPlayerSkills = () => {
    localStorage.setItem("monsterLvl", "0");
    localStorage.setItem("attack", "2");
    localStorage.setItem("rawSpeed", "1000");
    localStorage.setItem("speed", "0");
    localStorage.setItem("life", "100");
    localStorage.setItem("armor", "0");
    localStorage.setItem("dodge", "0");
    localStorage.setItem("accuracy", "0");
    localStorage.setItem("vitality", "10");
    localStorage.setItem("agility", "0");
  };

  const [openGameplay, setOpenGameplay] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);

  const goToGame = () => {
    history.push("/game");
    initialPlayerSkills();
  };

  const openRules = (event) => {
    switch (event.target.className) {
      case "btn-rules":
        setOpenGameplay(!openGameplay);
        break;
      case "btn-skills":
        setOpenSkills(!openSkills);
        break;
      case "btn-about":
        setOpenAbout(!openAbout);
        break;
      default:
    }
  };
  return (
    <div
      className="rules"
      style={{ height: openGameplay || openSkills || openAbout ? "100%" : "" }}
    >
      <div className="rules-box">
        <h1>Introduction</h1>
        <p>
          Endless Tower Of Fracta is a simple idle rpg. Please read the rules
          below.
        </p>
        <div className="rules-accordeon">
          <div>
            <div
              className="btn-rules"
              onClick={openRules}
              style={{ backgroundColor: openGameplay ? "#262626" : "" }}
            >
              Gameplay <span>{openGameplay ? "-" : "+"}</span>
            </div>
            <p className={`rules-text ${openGameplay ? "" : "display-none"}`}>
              Press the start button to start the game. To start the fight press
              the "Fight" button. Each second the game will compare your stats
              with the stats of the enemy and show the result. If your health
              goes to 0 - you will lose. If the health of the enemy goes to 0 -
              you will win and move to the next screen. On the next screen, you
              will be asked to Lvl up your skills. The idea is to create a
              well-balanced character, who can fight against any enemy.
              Aftherwards you will be moved to the next stage, and the process
              repeats. 
            </p>
          </div>
          <div>
            <div
              className="btn-skills"
              onClick={openRules}
              style={{ backgroundColor: openSkills ? "#262626" : "" }}
            >
              Skills <span>{openSkills ? "-" : "+"}</span>
            </div>
            <p className={`rules-text ${openSkills ? "" : "display-none"}`}>
              <strong>Strength</strong> <br />
              Affects your damage to the enemy. Each skill point will give you 1
              strength. <br />
              <strong>Vitality</strong>
              <br /> The amount of life you have. Each skill point will give you
              10 lifes. 
              <br />
              <strong>Agility</strong>
              <br /> The dodge chance. Each skill point will give 1 dodge
              chance.
              <br />
              <strong>Speed</strong>
              <br /> The frequency with which you attack. You will start with
              the frequency of 1000 milliseconds ( 1 second ). Each point will
              reduce it by 20 milliseconds. You can only invest 45 points in
              this skill.
              <br />
              <strong>Accuracy</strong>
              <br />
              Counter the Agility skill. It will reduce the amount of dodge of
              the opponent. If the opponent doesn't have any dodge this skill
              will be ignored.
              <br />
              <strong>Armor</strong>
              <br />
              Counter the Strength skill. It will compare the strength of the
              enemy with your armor and reduce the amount of damage you receive.
              You can't receive 0 damage, even if you have more armor. The
              minimum damage received is always 1. 
            </p>
          </div>
          <div>
            <div
              className="btn-about"
              onClick={openRules}
              style={{ backgroundColor: openAbout ? "#262626" : "" }}
            >
              About <span>{openAbout ? "-" : "+"}</span>
            </div>
            <p className={`rules-text ${openAbout ? "" : "display-none"}`}>
              Hi! My name is Daniel, I am front end developer, musician and
              abstract artist. The Tower Of Fracta is a simple IDLE RPG where
              you watch numbers go down and try to climb to the highest floor.
              <p>
                If you are interested in fractals you can check my website{" "}
                <a href="https://fractaart.com" target="_blank">
                  here
                </a>
                .
              </p>
              <p>
                You can also contact me if you need more info:{" "}
                <a href="mailto:daniel@fractaart.com" target="_blank">
                  daniel@fractaart.com
                </a>
              </p>
            </p>
          </div>
        </div>
        <button type="button" onClick={goToGame}>
          Start
        </button>
      </div>
    </div>
  );
}

export default Rules;
