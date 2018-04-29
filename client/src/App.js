import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Splitter from "./pages/Splitter";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/logout" component={Login} />
        <Route exact path="/main/:id" component={Main} />
        <Route exact path="/splits/:id" component={Splitter} />

        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
