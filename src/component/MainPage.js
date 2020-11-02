import React, { Component } from "react";
import "../css/style.css";
import { Button, Form } from "react-bootstrap";
import web3 from "../web3";
import ipfs from "../ipfs";
import storehash from "../storehash";
import Navbar from "./Navbar";

class MainPage extends Component {
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
        .RegisterPatient(
          this.state.name,
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
        <Navbar/>

        <div className="section" style={{ marginTop: "100px" }}>
          <div className="header">
            <h2 style={{ fontFamily: "NanumSquareRound" }}>
              반갑습니다
            </h2>
            <h4 style={{ fontFamily: "NanumSquareRound" }}>
              마이 리틀 닥터는 여러분의 건강을 매일 체크해 주고, 스스로 문진하는
              형식의 의료 스몰 데이터 수집 어플리케이션으로써 <br></br>
              여러분의 소중한 데이터를 제공해 주시면 토큰 리워드를 지급해 주는
              블록체인 의료 문진 사이트입니다.
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
