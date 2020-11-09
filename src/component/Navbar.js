import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import "../css/Navbar.css"

export default function Navbar({ title }) {
  const [user, setUser] = useState({
    sender : sessionStorage.getItem('account'),
  });

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
        }
      })
      .then((user) => {
        setUser(user)
      })
      .catch((err) => {
        console.log(err);
        alert("등록을 누르세요")
      });
  },[]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light bg-dark">
      <Link className="navbar-brand" to="/">{title}</Link>
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
              </button>
              <a className="navbar-brand" href="/MainPage" style={{ color:"white"}}>
                <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcTAt4P%2FbtqMegYn9hX%2FVgBJMewaP5MeftK7hC0KWk%2Fimg.png" width="250px" />
              </a>
            </div>

            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/List">History</Link></li>
                <li><Link to="/Reward">리워드</Link></li>
                <li><Link to="/MyPage">마이페이지</Link></li>
                <li>
                  <a>
                    <strong>{user.name}</strong>님
                    반갑습니다!
                  </a>
                </li>
                <li><Link to="/" onClick={() => {{sessionStorage.removeItem("account")}}}>로그아웃</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </nav>
  )
}

