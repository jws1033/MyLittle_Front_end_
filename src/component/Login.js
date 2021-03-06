import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import web3 from "../web3";

import "../css/style.css";
import "../css/LoginForm.css";

const Login = ({ history }) => {
  const [account, setAccount] = useState("")

  if (sessionStorage.getItem('account')){
    history.push('/MainPage')  
  }

  const handleChange = (e) => {
    e.preventDefault();

    setAccount(e.target.value)
  };

  const onSubmit = async(e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    if (account === accounts.toString()) {
        sessionStorage.setItem("account", accounts.toString());

        const res = await fetch("http://localhost:3001/api/user/login", {
          mode : 'cors',
          method: 'POST',
          headers : {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify({txAddress: accounts.toString()})
        }) 

        const status = await res.status;

        if (status === 200) {
          history.push('/MainPage')
        }
        else if (status === 401){
          history.push('/Register')
        }
      
    } else {
      alert("유효하지 않은 계정입니다. 현재 블록체인 네트워크에 연결된 계정을 입력하세요!");
    }
  };

  return (    
    <div className="section" style={{ marginTop: " 150px "}} >
      <div className="header">
        <img
        src={ " http://wiki.hash.kr/images/8/88/%EB%A9%94%ED%83%80%EB%A7%88%EC%8A%A4%ED%81%AC_%EB%A1%9C%EA%B3%A0.png"} 
        width="150px"
        height="150px"
        />
      </div>
      <div style={{ maxWidth: 680, margin: " auto "}}>
        <Form className="login-form" onSubmit={onSubmit}>
          <Form.Group>
              <Form.Control 
                className="field"
                type="text"
                placeholder=" 현재 이더리움 네트워크에 연결된 계좌를 입력하세요"
                value={account.account}
                onChange={handleChange}
              />
          </Form.Group>

          <Button variant="primary" type="submit" className="my-button" style={{ margin: " 55px "}}>
            로그인
          </Button>
        </Form>
      </div>
    </div>
  );
}


export default Login;