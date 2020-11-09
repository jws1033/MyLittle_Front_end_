import React from "react";
import { Route } from "react-router-dom";

import MainPage from "./component/MainPage";
import FirstPage from "./component/FirstPage";
import Login from "./component/Login";

import History from "./component/History";
import MyPage from "./component/MyPage";
import Register from "./component/Register";
import List from "./component/List";
import Reward from "./component/Reward";

import "./css/App.css";

const App = () => {
  return (
    <div>
      <Route exact path="/" component={FirstPage} />
      
      <Route path="/History/:id" component={History} />
      <Route path="/MyPage" component={MyPage} />
      <Route path="/MainPage" component={MainPage} />
      <Route path="/Login" component={Login} />
      <Route path="/Register" component={Register} />
      <Route path="/List" component={List} />
      <Route path="/Reward" component={Reward} />
    </div>
  );
};

export default App;
