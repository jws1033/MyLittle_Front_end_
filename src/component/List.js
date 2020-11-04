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
              <img src="https://www.flaticon.com/svg/static/icons/svg/2521/2521614.svg"
                width="90px"
              ></img>
            </div>
            <br></br>
              <h3>History</h3>
              <br></br>
              <div className="history-list-form">
                
                문진 날짜: {/* 날짜 데이터 */}<br></br>
                문진 코드: {/* 문진 카테고리(ex.두통) */}<br></br>
                문진 내용: {/* 문진 내용 */} {/*문진 내용에 대한 결과 (ex.o)*/}
                
              </div>
              <div className="history-list-form">
                
                문진 날짜: {/* 날짜 데이터 */}<br></br>
                문진 코드: {/* 문진 카테고리(ex.두통) */}<br></br>
                문진 내용: {/* 문진 내용 */} {/*문진 내용에 대한 결과 (ex.o)*/}
                
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
