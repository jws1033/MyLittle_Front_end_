import React from "react";
import "./Navbar.css"

export default function Navbar({ title }) {
    
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light bg-dark">
        <a className="navbar-brand" href="#">
          {title}
        </a>
  
        <div>
          <div>
          <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                  >
                    <span className="sr-only">Toggle</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="/MainPage" style={{ color:"white"}}>
                    <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkGWdb%2FbtqMmplHxFl%2FcuziavVyjQQORNQLe7DkXk%2Fimg.png"
                    width="120px"
                    
                    >
                    </img>
                  </a>
                </div>
  
                <div
                  className="collapse navbar-collapse"
                  id="bs-example-navbar-collapse-1"
                >
                  <ul className="nav navbar-nav" >
                    <li>
                      <a href="/Reward" style={{ color:"white"}}>리워드</a>
                    </li>
                  </ul>
  
                  <ul className="nav navbar-nav">
                    <li>
                      <a href="/List">문진기록표</a>
                    </li>
                  </ul>
  
                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <a href="/MyPage">마이페이지</a>
                    </li>
                    <li>
                      <a>
                        <strong>{sessionStorage.getItem("account")}</strong>님
                        반갑습니다!
                      </a>
                    </li>
                    <li>
                      <a href="/Logout">로그아웃</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          </div>
          </nav>
      );
    }

