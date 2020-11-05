import React, { useState, useEffect } from "react";
import "../css/style.css";
import { Button, Form, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";

const MyOwnPage = () => {
  const [action, setAction] = useState('register');
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({});

  const history = useHistory()

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

        } else {

          const error = new Error(res.error);

          throw error;

        }


      })
      .then((user) => {
        console.log(user)
        setUser(user)
      })

      .catch((err) => {

        console.log(err);

        alert("등록을 누르세요")

      });

  },[]);


  const fetchUser = ()=>{
    fetch(`http://localhost:3001/api/user/userfind?sender=${sessionStorage.getItem('account')}`,{
      method:'GET'
    })
    .then((resp)=>{
      if (resp.status === 200){
        setAction('edit')
      } 
      setLoaded(true)
      return resp.json()
    })
    .then(
     (data)=>{
       console.log(data)
       setUser(data)
     }
    )
    
  }

  React.useEffect(() => {
    fetchUser()
  }, [])


  return (
    <div>
      <div>
        <Navbar />
        {/* <nav className="navbar navbar-default">
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
              <a className="navbar-brand" href="/MainPage">
                My Little Doctor
              </a>
            </div>

            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav">
                <li>
                  <a href="/Reward">리워드</a>
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
                  {/* <a>
                    <strong>{sessionStorage.getItem("account")}</strong>님
                    반갑습니다!
                  // </a> */}
                
      </div>
      <div className="section" style={{ marginTop : " 10px" }}>
        <div className="header">
          <div>
            <img src="https://www.flaticon.com/svg/static/icons/svg/2904/2904566.svg"
              width="150px"
            >
            </img>
          </div>
          <h2>My Info</h2>
        </div>
        <form margin="auto" padding="auto">
        <div style={{ fontSize: " 20px "}}>
              닉네임 : {user.name}
          </div>
          <br></br>
          <div style={{ fontSize: " 20px "}}>
              성별 : {user.gender}
          </div>
          <br></br>
          <div style={{ fontSize: " 20px "}}>
              나이 :{user.age}
          </div>
          <br></br>
          <div style={{ fontSize: " 20px "}}>
              거주지 :{user.residence}
          </div>
          {/* <input
            type="text"
            className="newitem-form"
            name="age"
            placeholder="나이를 입력해 주세요"
            onChange={this.handleChange}
          />{" "} */}
          <br></br>
          <div style={{ fontSize: " 20px "}}>
              키 :{user.height}
          </div>
          {/* <input
            type="text"
            className="newitem-form"
            name="residence"
            placeholder="거주지를 입력해 주세요"
            onChange={this.handleChange}
          />{" "} */}
          <br></br>
          <div style={{ fontSize: " 20px "}}>
              몸무게: {user.weight}
          </div>
          {/* <input
            type="text"
            className="newitem-form"
            placeholder="키를 입력해 주세요"
          ></input>
          <br></br>
          <input
            type="text"
            className="newitem-form"
            placeholder="몸무게를 입력해 주세요"
          ></input> */}
          <br></br>
          {/* <input
            className="btn btn-warning newitem-btn"
            type="submit"
            id="register"
          /> */}
        </form>
      </div>
      <div>
      {/* {sessionStorage.removeItem("account")} */}
          <div style={{  display: "flex", justifyContent: "center" }}>

          <Button className="delete-info" style={{ margin: "10px" }} onClick={ () => {
            const result = window.confirm("정말 삭제?")
            // result가 true면 삭제 fetch 요청
            // result가 false면 do nothing
          }}>
            <h2 style={{ fontSize: "15px"}}>내 정보 삭제</h2>
          </Button>
          {loaded? (          <Button className="modify-info" style={{ margin: "10px" }} onClick={()=> history.push("/MyPage")}>
            <h2 style={{ fontSize: "15px"}}>{action==='edit'? '수정' : '등록'}</h2>
            {/* 수정 눌렀을 때 기존 정보 입력돼 있는 MyPage로 */}
          </Button>): <Spinner animation="grow" />}

          
        </div>
        
        </div>
    </div>
  );
  
}

export default MyOwnPage;