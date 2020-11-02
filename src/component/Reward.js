import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../css/style.css";
import { Button, Form } from "react-bootstrap";
import web3 from "../web3";
import ipfs from "../ipfs";
import storehash from "../storehash";

import Navbar from "./Navbar";

class Reward extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      gender: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    window.location.href = `/FindStudent/${this.state.subject}/${this.state.gender}`;
  }; //onClick

  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div class="section" style={{ marginTop: "80px" }}>
          <div class="header">
            <h1>Total Reword</h1>
            <h2>888</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Reward;
