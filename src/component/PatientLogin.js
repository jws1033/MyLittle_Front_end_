import React, { Component } from "react";
import "../css/style.css";
import { Button, Form } from "react-bootstrap";
import web3 from "../web3";
import ipfs from "../ipfs";
import storehash from "../storehash";
import "../css/LoginForm.css";

class PatientLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eth_account: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      eth_account: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    if (this.state.eth_account == accounts) {
      try {
        // console.log(account);
        sessionStorage.setItem("account", accounts[0]);
      } catch (e) {
        console.log("error" + e);
      }
      window.location.href = "/MainPage";
    } else {
      alert(
        "유효하지 않은 계정입니다. 현재 블록체인 네트워크에 연결된 계정을 입력하세요!"
      );
      window.location.href = "/PatientLogin";
    }
  }; //onClick

  render() {
    return (
      <div className="section">
        <div className="header">
          <h1>Login</h1>
          {/* <h2>로그인하세요!</h2> */}
          <hr></hr>
        </div>
        <div style={{ maxWidth: 680, margin: "auto"}}>
          <Form className="login-form" onSubmit={this.onSubmit}>
            <Form.Group className="formBasicEmail">
              <div>
                <Form.Control
                  type="text"
                  placeholder=" 현재 이더리움 네트워크에 연결된 계좌를 입력하세요"
                  value={this.state.eth_account}
                  onChange={this.handleChange}
                />
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="my-button">
              로그인
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default PatientLogin;
