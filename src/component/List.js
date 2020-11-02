import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../css/style.css";
import { Button, Form } from "react-bootstrap";
import web3 from "../web3";
import ipfs from "../ipfs";
import storehash from "../storehash";
import Navbar from "./Navbar";


class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise: "",
      drink: "",
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
        <div class="section">
          <div className="">
            <div>
              <img src="https://www.flaticon.com/svg/static/icons/svg/3616/3616575.svg"
                width="90px"
              ></img>
            </div>
            <br></br>
              <h3>이번 주에 마신 술의 양은 {this.state.drink} 병입니다!</h3>
              <h3>이번 주는 운동을 {this.state.exercise} 분 이상 하셨습니다!</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
