import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../css/style.css";
import { Button, Form } from "react-bootstrap";
import web3 from "../web3";
import ipfs from "../ipfs";
import storehash from "../storehash";

class List extends Component {
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
        <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1"
                >
                  <span className="sr-only">Toggle</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/MainPage">
                  My Little Doctor
                </a>
              </div>

              <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
                <ul className="nav navbar-nav">
                  <li>
                    <a href="/Reward">리워드</a>
                  </li>
                </ul>

                <ul className="nav navbar-nav">
                  <li>
                    <a href="/List">문진기록표</a>
                  </li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a href="/MyPage">마이페이지</a>
                  </li>
                  <li>
                    <a>
                      <strong>{sessionStorage.getItem("account")}</strong>님
                      반갑습니다!
                    </a>
                  </li>
                  <li>
                    <a href="/Logout">로그아웃</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div class="">
          <div className="">
              
              
          </div>
        </div>
      </div>
    );
  }
}

export default List;
