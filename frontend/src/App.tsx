import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact to="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
