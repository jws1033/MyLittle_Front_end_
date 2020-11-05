import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../css/style.css";
import { Button, Form } from "react-bootstrap";
import web3 from "../web3";
import ipfs from "../ipfs";
import storehash from "../storehash";
import Navbar from "./Navbar";

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
  console.log(match.params.id)

    return (
      <div>
        <div>
          <Navbar />
        
        </div>
        <div className="section">
            <div>
              <img src="https://www.flaticon.com/svg/static/icons/svg/2521/2521614.svg"
                width="90px"
              ></img>
            </div>
            <br></br>
              <h3>History</h3>
              <br></br>
              <div className="history-section">
                <div className="history-form" >
                  <div style={{ fontSize: "20px"}}>
                  문진 날짜: {/* 날짜 데이터 */}<br></br>
                  문진 코드: {/* 문진 카테고리(ex.두통) */}<br></br>
                  문진 내용:{/* 문진 내용 o =>  초록색 , x => 빨간색 */}
                  </div>
                </div>
            </div>
        </div>
      </div>
    );
  
}