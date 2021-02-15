import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import RegisterMember from "./pages/registerMember/RegisterMember";
import MemberList from "./pages/memberList/MemberList";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/register-member">
          <RegisterMember />
        </Route>
        <Route exact path="/member-list">
          <MemberList />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
