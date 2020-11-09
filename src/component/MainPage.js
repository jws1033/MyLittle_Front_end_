import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import Navbar from "./Navbar";

import "../css/style.css";

export default function MainPage() {
  const history = useHistory()
  const [historyList, setHistoryList] = React.useState([])
  const [user, setUser] = useState({
    sender : sessionStorage.getItem('account'),
  });
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

  const handleSubmit = React.useCallback(async function(e){
    e.preventDefault()

    let data = await {
      sender: sessionStorage.getItem('account'),
      createAt: "",
      surveyNum: survey.no,
      surveyQuestion: survey.questions.map((questionObj) => {
        return questionObj.question
      }),
      surveyResult: survey.questions.map((questionObj) => {
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
          alert("등록해주세요")
          history.push('/Register')
        }
      })
      .then((user) => {
        setUser(user)
      })
      .catch((err) => {
        console.log(err);
        alert("등록을 누르세요")
      });
  },[history]);

  React.useEffect(() => {
    fetch(`http://localhost:3001/api/survey/surveyfind?sender=${sessionStorage.getItem('account')}&createAt=${new Date().toISOString().substring(0, 10)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => {
        if (res.status === 200) {
          history.push(`/History/${new Date().toISOString().substring(0, 10)}`)
        } else if (res.status === 401){
          return res.json();
        }
      })
      .then((user) => {
        setUser(user)
      })
      .catch((err) => {
        console.log(err);
      });
  },[history]);

  return (
    <div>
      <Navbar/>
    
    <div className="section" style={{ marginTop: "100px" }}>
      <div className="header">
        <div style={{ fontStyle:"bold" ,fontSize: " 20px ", color: "rgb(142 142 142)" ,  textAlign:"left" , marginLeft: "50px"}}>
          Category || {survey.no}
        </div>
        <br />
        {survey.questions.map((questionObj) => {
          let activeClass =''

          if (questionObj.answer === 'o'){
            activeClass='o-answer'
          } else if (questionObj.answer === 'x'){
            activeClass='x-answer'
          }

          return(
            <div>
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

                    setSurvey({
                      no: survey.no,
                      questions: newQuestions
                    })
                  }
                }> O </Button>
                <Button variant="" className="mainQuestion-X-Answer" onClick={
                    (e)=>{
                      const newQuestions = survey.questions.map(elem=>{
                        if(elem.id===questionObj.id){
                          elem.answer = 'x'
                        }
                        return elem
                      })

                      setSurvey({
                      no: survey.no,
                      questions: newQuestions
                    })
                    }
                }> X </Button>
                <div className="xAnswer"></div>
              </div>
            </div>
            <br />
          </div>
          )
        })}

        <form onSubmit={handleSubmit}>
          <h4 style={{ fontFamily: "NanumSquareRound" }}>
            <Button variant="primary" type="submit" className="answer-button" style={{ padding:"15px", width:"300px"}}>
              답변 완료
            </Button>
          </h4>
        </form>
      </div>
    </div>
  </div>
  );
}