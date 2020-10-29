import React, { Component } from "react";
import "../css/style.css";
import { Button, Form } from "react-bootstrap";
import web3 from "../web3";
import ipfs from "../ipfs";
import storehash from "../storehash";

class MyOwnPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      residence: "",
      subject: "",
      gender: "",
      ipfsHash: "waiting...",
      buffer: "waiting...",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };

  convertToBuffer = async (reader) => {
    //file is converted to a buffer to prepare for uploading to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    this.setState({ buffer });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const account = sessionStorage.getItem("account");

    if (account != null) {
      const ipfsHash = await ipfs.add(this.state.buffer);
      this.setState({ ipfsHash: ipfsHash[0].hash });

      const transactionHash = await storehash.methods
        .registerPatient(
          this.state.city,
          this.state.gender,
          this.state.age,
          this.state.hight,
          this.state.weight,
          this.state.ipfsHash
        )
        .send({
          from: account,
        });
      alert("등록되었습니다!");
      window.location.href = "/RegisterPatient";
    } else {
      alert("로그인 먼저 해 주세요!");
      window.location.href = "/PatientLogin";
    }
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
        <div className="section" style={{ marginTop : " 80px", backgroundColor:"rgba(150, 150, 150, 0.2)" }}>
          <div className="header">
            <h2 style={{ color: "white" }}>My Info</h2>
          </div>
          <form onSubmit={this.handleSubmit} margin="auto" padding="auto">
            <div style={{ color: " white " , fontSize: " 20px "}}>
                성별 :<input type="value" value={this.state.gender}/ >
            </div>
            <br></br>
            <div style={{ color: " white " , fontSize: " 20px "}}>
                나이 :<input type="value" value={this.state.age} />
            </div>
            <br></br>
            <div style={{ color: " white " , fontSize: " 20px "}}>
                거주지 :<input type="value" value={this.state.city} />
            </div>
            {/* <input
              type="text"
              className="newitem-form"
              name="age"
              placeholder="나이를 입력해 주세요"
              onChange={this.handleChange}
            />{" "} */}
            <br></br>
            <div style={{ color: " white " , fontSize: " 20px "}}>
                키 :<input type="value" value={this.state.height} />
            </div>
            {/* <input
              type="text"
              className="newitem-form"
              name="residence"
              placeholder="거주지를 입력해 주세요"
              onChange={this.handleChange}
            />{" "} */}
            <br></br>
            <div style={{ color: " white " , fontSize: " 20px "}}>
                몸무게:<input type="value" value={this.state.weight} />
            </div>
            {/* <input
              type="text"
              className="newitem-form"
              placeholder="키를 입력해 주세요"
            ></input>
            <br></br>
            <input
              type="text"
              className="newitem-form"
              placeholder="몸무게를 입력해 주세요"
            ></input> */}
            <br></br>
            <input
              className="btn btn-warning newitem-btn"
              type="submit"
              id="register"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default MyOwnPage;
