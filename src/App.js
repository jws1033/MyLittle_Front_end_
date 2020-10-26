import React from "react";
import { Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import MainPage from "./component/MainPage";
import Logout from "./component/Logout";
import FirstPage from "./component/FirstPage";
import PatientLogin from "./component/PatientLogin";
import MyPage from "./component/MyPage";
import List from "./component/List";
import Reward from "./component/Reward";
import ShowPatient from "./component/ShowPatient";

const App = () => {
  return (
    <div>
      <Route exact path="/" component={FirstPage} />
      <Route path="/Logout" component={Logout} />
      <Route path="/MainPage" component={MainPage} />
      <Route path="/PatientLogin" component={PatientLogin} />
      <Route path="/MyPage" component={MyPage} />
      <Route path="/List" component={List} />
      <Route path="/Reward" component={Reward} />
      <Route path="/ShowPatient" component={ShowPatient} />
    </div>
  );
};

export default App;
