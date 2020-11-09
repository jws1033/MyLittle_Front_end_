import React from "react";
import { Button } from "react-bootstrap";

import "../css/Navbar.css";

const FirstPage = ({ history }) => {
  return (
    <div className="App">
      <header className="App-header">
        <br />
        <Button variant="info" size="lg" onClick={() => {history.push('/Login')}}>Let's go!</Button>
        <br />
      </header>
    </div>
  );
};

export default FirstPage;
