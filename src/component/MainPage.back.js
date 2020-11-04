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
    
  }

  

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
                      O</Button>
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
                      X</Button>
                    <div className="xAnswer"></div>
                  </div>
                </div>
                <br></br>
              </>
             )
            })}
            <h4 style={{ fontFamily: "NanumSquareRound" }}>
            <Button variant="primary" type="submit" className="answer-button" style={{ padding:"15px", width:"300px"}} >
              제출
            </Button>

              
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
