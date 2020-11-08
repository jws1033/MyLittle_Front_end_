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
      reward: "",
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
        <div class="section" style={{ marginTop: "10px" }}>
          <div class="header">
            <div>
              <img src="https://www.flaticon.com/svg/static/icons/svg/845/845665.svg"
                width="100px"
              ></img>
            </div>
            <h2>Reward</h2>
            <h2>{this.state.reward}</h2><br />
            <div className="reward-accumulate-section">
              <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbXbnCX%2FbtqMTfXjoin%2FJLkEOFaj3QoRDFziPT2Xm1%2Fimg.png"
              width="25px"></img>
              &nbsp;적립 내역<br /><br />
              <div style={{ fontSize: "20px" , textAlign: "left"}}>
                350 MLD <div style={{ textAlign: "right" , fontSize: "15px"}}> 2020-11-04 </div>
              </div>
              <div style={{ fontSize: "20px" , textAlign: "left"}}>
                350 MLD <div style={{ textAlign: "right" , fontSize: "15px"}}> 2020-11-05 </div>
              </div>
              <div style={{ fontSize: "20px" , textAlign: "left"}}>
                350 MLD <div style={{ textAlign: "right" , fontSize: "15px"}}> 2020-11-06 </div>
              </div>
              <div style={{ fontSize: "20px" , textAlign: "left"}}>
                350 MLD <div style={{ textAlign: "right" , fontSize: "15px"}}> 2020-11-07 </div>
              </div>
              <div style={{ fontSize: "20px" , textAlign: "left"}}>
                350 MLD <div style={{ textAlign: "right" , fontSize: "15px"}}> 2020-11-07 </div>
              </div>
              <div style={{ fontSize: "20px" , textAlign: "left"}}>
                350 MLD <div style={{ textAlign: "right" , fontSize: "15px"}}> 2020-11-07 </div>
              </div>
              <div style={{ fontSize: "20px" , textAlign: "left"}}>
                350 MLD <div style={{ textAlign: "right" , fontSize: "15px"}}> 2020-11-07 </div>
              </div>
              <div style={{ fontSize: "20px" , textAlign: "left"}}>
                350 MLD <div style={{ textAlign: "right" , fontSize: "15px"}}> 2020-11-07 </div>
              </div>
            </div>
            <div className="reward-used-section">
              <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FUwCJf%2FbtqMPi76qRt%2FfCs1iyhkd4Fl1wh0sQ1fFk%2Fimg.png"
              width="25px"></img>
              &nbsp;사용 내역<br /><br />
              <div style={{ fontSize: "20px" , textAlign: "left"}}>
                10000 MLD <div style={{ textAlign: "right" , fontSize: "15px"}}> 2020-07-01 </div>
              </div>
              <div style={{ fontSize: "20px" , textAlign: "left"}}>
                10000 MLD <div style={{ textAlign: "right" , fontSize: "15px"}}> 2020-08-01 </div>
              </div>
              <div style={{ fontSize: "20px" , textAlign: "left"}}>
                10000 MLD <div style={{ textAlign: "right" , fontSize: "15px"}}> 2020-09-01 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reward;
