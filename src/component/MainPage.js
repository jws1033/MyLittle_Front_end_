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
      questions:  [{
        id:0,
        "question": '오늘 하루 마신 물의 양이 2L 이상이다!',
        "answer": null
      }, {
        id:1,

        "question": '오늘 하루 운동다운 운동을 20분 이상 했다!',
        "answer": null
      },{
        id:2,

        "question": '오늘 하루 소주 1병 이상을 마셨다!',
        "answer": null
      }]
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
            {this.state.questions.map(question=>{
              let activeClass ='';
              if (question.answer==='o'){
                activeClass='o-answer'
              }else if (question.answer==='x'){
                activeClass='x-answer'
              }
              return(
                <>
                  <div style={{ fontFamily: "NanumSquareRound" }}>
                  <div className={`mainQuestion ${activeClass}`}>
                    {question.question}
                    <Button variant="" className={"mainQuestion-O-Answer"} onClick={
                      (e)=>{
                        const newQuestions = this.state.questions.map(elem=>{
                          if(elem.id===question.id){
                            elem.answer = 'o'
                          }
                          return elem
                        })
                        console.log(newQuestions)
                      
                        this.setState(newQuestions)
                      }
                    }>
                      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuMjUsMCwwLDAuMjUsMTkyLjAwMDAxMTQ0NDA5MTc3LDE5MS45OTk5ODg1NTU5MDgzNSkiPjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaWQ9Ik9fMl8iPjxwYXRoIGQ9Im0xNDIuNTE5IDI1NS42NzhjMC05My4yMjMgNDAuNDE1LTE0NC41NjUgMTEzLjgwNC0xNDQuNTY1IDcyLjc1OSAwIDExMi44MzcgNTAuODg5IDExMi44MzcgMTQzLjMwNiAwIDkzLjA5MS00MS4xMzMgMTQ2LjQ3LTExMi44MzcgMTQ2LjQ3LTcxLjI2NS0uMDAxLTExMy44MDQtNTQuMjg4LTExMy44MDQtMTQ1LjIxMXptMzUxLjgxMS0zNC45MjhjLTEzLjA4LTEzNi4zMS0xMDEuODctMjIwLjQ5LTIzOC4zMy0yMjAuNzVoLS42M2MtMTQ5Ljg4IDAtMjM5LjM3IDk3LjQtMjM5LjM3IDI1OC44NiAwIDE1NS4zIDkxLjk0IDI1Mi44NyAyNDAgMjUzLjE0aC42M2MxNDcuNjQgMCAyMzkuMzctOTguNDcgMjM5LjM3LTI1NS4zNyAwLTEyLjMtLjU2LTI0LjI3LTEuNjctMzUuODh6IiBmaWxsPSIjZTMyNjI2IiBkYXRhLW9yaWdpbmFsPSIjYzY4Y2ZmIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggZD0ibTQ5NiAyNTYuNjNjMCAxNTYuOS05MS43MyAyNTUuMzctMjM5LjM3IDI1NS4zN2gtLjYzdi0xMTEuMTRjLjExIDAgLjIxLjAzLjMyLjAzIDcxLjcxIDAgMTEyLjg0LTUzLjM4IDExMi44NC0xNDYuNDcgMC05Mi40Mi00MC4wOC0xNDMuMzEtMTEyLjg0LTE0My4zMS0uMTEgMC0uMjEuMDMtLjMyLjAzdi0xMTEuMTRjMTM2LjQ2LjI2IDIyNS4yNSA4NC40NCAyMzguMzMgMjIwLjc1IDEuMTEgMTEuNjEgMS42NyAyMy41OCAxLjY3IDM1Ljg4eiIgZmlsbD0iI2UzMjYyNiIgZGF0YS1vcmlnaW5hbD0iI2FhODBmZiIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
                      width="80px"
                    /></Button>
                    <Button variant="" className="mainQuestion-X-Answer" onClick={
                        (e)=>{
                          const newQuestions = this.state.questions.map(elem=>{
                            if(elem.id===question.id){
                              elem.answer = 'x'
                            }
                            return elem
                          })
                          console.log(newQuestions)
                        
                          this.setState(newQuestions)
                        }
                    }>
                      X
                    </Button>
                    <div className="xAnswer"></div>
                  </div>
                </div>
                <br></br>
              </>
             )
            })}
            <h4 style={{ fontFamily: "NanumSquareRound" }}>
              <div>

              </div>

              
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
