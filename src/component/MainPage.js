import { useHistory } from "react-router-dom";
import "../css/style.css";
import { Button, Form, NavDropdown } from "react-bootstrap";
import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";

export default function MainPage() {
  const history = useHistory()
  const [survey, setSurvey] = React.useState( {
    no:"",
    questions:[{
      id:0,
      "question": '',
      "answer": null
    }, {
      id:1,

      "question": '',
      "answer": null
    },{
      id:2,

      "question": '',
      "answer": null
    },{
      id:3,

      "question": '',
      "answer": null
    }]
  })

  useEffect(() => {
    fetch(`http://localhost:3001/api/user/userfind?sender=${sessionStorage.getItem('account')}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401){
          alert("로그인해주세요")
          history.push('/')
        }
      })
  },[history]);

  const handleSubmit = React.useCallback(async function(e){
    e.preventDefault()
    let data = await {
      sender: sessionStorage.getItem('account'),
      createAt: "",
      surveyNum: survey.no,
      surveyQuestion: survey.questions.map((questionObj)=>{
        return questionObj.question
      }),
      surveyResult: survey.questions.map(questionObj=>{
        return questionObj.answer
      })
    }
    

    await fetch("http://localhost:3001/api/survey/submit", {
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.status === 200) {
        alert("제출 성공");
        history.push("/list");
      } else {
        const error = new Error(res.error);

        throw error;
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Error please try again");
    });

  }, [history, survey.no, survey.questions])



  React.useEffect(()=>{
    fetch("http://localhost:3001/api/survey/load", {

      method: "GET",

      headers: {

        "Content-Type": "application/json"

      },

    })

      .then((res) => {

        if (res.status === 200) {
          return res.json();

        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .then((respSurvey) => {
        console.log(respSurvey)
        setSurvey({
          no: respSurvey.no,
          questions: respSurvey.question.map((elem, idx)=>{
            return ({
              id: idx,
              answer: null,
              question: elem
            })
          })
        })
      })

      .catch((err) => {

        console.log(err);

        alert("에러")

      });
  },[])

  return (
    <div>
      <Navbar/>

      <div className="section" style={{ marginTop: "100px" }}>
        <div className="header">
          <div style={{ fontStyle:"bold" ,fontSize: " 20px ", color: "rgb(142 142 142)" ,  textAlign:"left" , marginLeft: "50px"}}>
          Caregory || {survey.no}
          </div>
          <br></br>
          {survey.questions.map(questionObj=>{
            let activeClass ='';
            if (questionObj.answer==='o'){
              activeClass='o-answer'
            }else if (questionObj.answer==='x'){
              activeClass='x-answer'
            }
            return(
              <>
                <div style={{ fontFamily: "NanumSquareRound" }}>
                <div className={`mainQuestion ${activeClass}`}>
                  {questionObj.question}
                  <Button variant="" className={"mainQuestion-O-Answer"} onClick={
                    (e)=>{
                      const newQuestions = survey.questions.map(elem=>{
                        if(elem.id===questionObj.id){
                          elem.answer = 'o'
                        }
                        return elem
                      })
                      console.log(newQuestions)
                    
                      setSurvey({
                        no: survey.no,
                        questions: newQuestions
                      })
                    }
                  }>
                    O</Button>
                  <Button variant="" className="mainQuestion-X-Answer" onClick={
                      (e)=>{
                        const newQuestions = survey.questions.map(elem=>{
                          if(elem.id===questionObj.id){
                            elem.answer = 'x'
                          }
                          return elem
                        })
                        console.log(newQuestions)
                      
                         
                        setSurvey({
                        no: survey.no,
                        questions: newQuestions
                      })
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
                    <form onSubmit={handleSubmit}>
          <h4 style={{ fontFamily: "NanumSquareRound" }}>
          <Button variant="primary" type="submit" className="answer-button" style={{ padding:"15px", width:"300px"}} >
            답변 완료
          </Button>

            
          </h4>
          </form>
        </div>
        
      </div>
    </div>
  );
}