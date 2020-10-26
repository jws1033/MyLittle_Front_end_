import React from "react";
import "../App.css";
import logo from "../logo.svg";
// import logo from './logo.svg';
// import TutorLogin from "./components/TutorLogin";

import { Button } from "react-bootstrap";

const FirstPage = ({ history }) => {
  return (
    <div className="App">
      <header className="App-header">
        <h3>
          스스로 문진하는 형식의 의료 스몰 데이터 수집 사이트{" "}<br></br>
          <h4>Medical small data collection site in the form of self-inquiry</h4>
        </h3>
        <br></br>
        <a href="/PatientLogin"><img src="LogoMLD.png" className="App-logo" alt="logo" /></a>
        <br></br>
      </header>
    </div>
  );
};

export default FirstPage;
