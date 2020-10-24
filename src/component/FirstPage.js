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
        <h4>
          스스로 문진하는 형식의 의료 스몰 데이터 수집 사이트{" "}
          <h1>마이 리틀 닥터</h1>
        </h4>
        <br></br>
        <img src="LogoMLD.png" className="App-logo" alt="logo" />
        <br></br>

        <Button variant="primary" type="submit" className="my-button">
          로그인
        </Button>
      </header>
    </div>
  );
};

export default FirstPage;
