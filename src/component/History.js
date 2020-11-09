import React from "react";
import Navbar from "./Navbar";

import "../css/style.css";

export default function History({ match }) {
  const [survey, setSurvey] = React.useState({
    createAt : "",
    surveyNum : "",
    answer : new Array()
  })

  React.useEffect(() => {
    fetch(`http://localhost:3001/api/survey/surveyfind?sender=${sessionStorage.getItem('account')}&createAt=${match.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((survey) => {
        return survey.json()
      })
      .then((data)=>{
        const surveyQuestion = data.result.surveyQuestion
        const surveyResult = data.result.surveyResult

        let answers = new Array()

        for(let i = 0; i < surveyQuestion.length; i++){
          answers.push({
            question : surveyQuestion[i],
            result :  surveyResult[i]
          })
        }

        setSurvey({
          createAt : data.result.createAt,
          surveyNum : data.result.surveyNum,
          answer : answers 
        })
      })
      .catch((err) => {
        console.log(err);
        alert("에러")
      });
},[match.params.id])

  return (
    <div>
      <Navbar />

      <div className="section">
        <div>
          <img src="https://www.flaticon.com/svg/static/icons/svg/2521/2521614.svg" width="90px"></img>
        </div>
          <br /><h2>History</h2><br /><br />
            <div className="history-form" >                     
                <div style={{ fontSize: "20px"}}>
                  <div className="history-section-title">
                    {survey.createAt}
                  </div><br /><br />
                  <div style={{ textAlign: " right " , fontSize: " 15px "}}>Category{survey.surveyNum}</div>
                  <div style={{ fontSize: "18px"}}>Content</div>
                  <br/>
                  {survey.answer.map((answer, index) => {return <div>{index+1}. {answer.question} {answer.result}</div> })}
                </div>
            </div>
        </div>
    </div>
  );
}