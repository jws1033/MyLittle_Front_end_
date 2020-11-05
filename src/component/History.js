import React from "react";
import Navbar from "./Navbar";

import "../css/style.css";

// 1. HTML/CSS
// media query, width: px, em, rem, % ... 
// bootstrap(grid)
// flex 

// 1주일 끝내요.
// 2. JS (ECMA 2015 (ES6)) 기준으로 공부
// (변수, 함수, 데이터타입, 배열, 배열관련함수, ...)
// 알고리즘 사이트. (여기서 초중급 각각 50문제씩)

// 3. React
// ==> Hook, Component(Class based, Functional), State vs Props, 
// (리액트 튜토리얼 - TodoAPP만들기)
// Redux
// ==> 포트폴리오사이트 React로 바꾸기

// 4. Server(Express. js)
// ==> DataBase(MySQL - RDB) vs (MongoDB - NOSQL) 차이 공부하세요
// ==> ORM 공부 (mysql - Sequelize) vs (* MongoDB - Mongoose )
// ==> API서버 만드세요. (포트폴리오 서버)

// 5. REact하고 연결
// ==> SSR (ServerSide Rendering) - option
// ==> Redux 와 통신(feat. redux-thunk)
// ==> API


// 개인프로젝트 하나 하세요.(알아서, 아이템 생각하고.)

export default function History({match}) {
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
    }).then((survey) => {
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
      <div>
        <Navbar />
      
      </div>
      <div className="section">
          <div>
            <img src="https://www.flaticon.com/svg/static/icons/svg/2521/2521614.svg" width="90px"></img>
          </div>
          <br></br>
            <h3>History</h3>
            <br></br>
            <div className="history-section">
              <div className="history-form" >                     
                  <div style={{ fontSize: "20px"}}>
                  문진 날짜: {survey.createAt}<br /><br />
                  문진 코드: {survey.surveyNum}<br /><br />
                  문진 내용<br/><br />
                  {survey.answer.map((answer, index) => {return <div>{index+1}. {answer.question} {answer.result}</div> })}
                  </div>
              </div>
            </div>
      </div>
    </div>
    );
  
}