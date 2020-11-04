import React, { Component } from "react";
import "../css/style.css";
import { Button, Form } from "react-bootstrap";
import web3 from "../web3";
import ipfs from "../ipfs";
import storehash from "../storehash";

import Navbar from "./Navbar";

class MyPage extends Component {
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
          this.state.nickname,
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
          <Navbar />
        </div>
        <div className="section" style={{ marginTop : " 10px" }}>
          <div className="header">
            <div>
              <img src="https://www.flaticon.com/svg/static/icons/svg/2904/2904566.svg"
                width="100px"
              >
              </img>
            </div>
            <h2>신체 정보를 등록합니다</h2>
          </div>
          <form onSubmit={this.handleSubmit}>
          <input
              type="text"
              className="newitem-form"
              name="nickname"
              placeholder="닉네임을 입력해 주세요"
              onChange={this.handleChange}
            />{" "}
            <select
              className="newitem-form"
              name="gender"
              onChange={this.handleChange}
            >
              <option value="">성별</option>
              <option value="male">여</option>
              <option value="female">남</option>
            </select>
            <br></br>
            <input
              type="text"
              className="newitem-form"
              name="age"
              placeholder="나이를 입력해 주세요"
              onChange={this.handleChange}
            />{" "}
            <br></br>
            <input
              type="text"
              className="newitem-form"
              name="residence"
              placeholder="거주지를 입력해 주세요"
              onChange={this.handleChange}
            />{" "}
            <br></br>
            <input
              type="text"
              className="newitem-form"
              placeholder="키를 입력해 주세요"
            ></input>
            <br></br>
            <input
              type="text"
              className="newitem-form"
              placeholder="몸무게를 입력해 주세요"
            ></input>
            <br></br>
            <Button variant="primary" type="submit" className="submit-button" >
              등록
            </Button>
          </form>
          {/* 등록 클릭 시 MyOwnPage로 이동 (정보 입력된 창)*/}
        </div>
      </div>
    );
  }
}

export default MyPage;
