import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Intro from "./components/Intro";
import Game from "./components/Game";
import Rules from "./components/Rules";
import EndGame from "./components/EndGame";
import PlayerSkills from "./components/PlayerSkills";
import NextStage from "./components/NextStage";

//test

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/rules">
            <Rules />
          </Route>
          <Route exact path="/game">
            <Game />
          </Route>
          <Route exact path="/endgame">
            <EndGame />
          </Route>
          <Route exact path="/">
            <Intro />
          </Route>
          <Route exact path="/nextstage">
            <NextStage />
          </Route>
          <Route exact path="/playerskills">
            <PlayerSkills />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
