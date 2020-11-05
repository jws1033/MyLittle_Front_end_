import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";

import "../css/style.css";

import Navbar from "./Navbar";

const MyPage = () => {
  const [action, setAction] = useState('register');
  const [loaded, setLoaded] = useState(false);
  const history = useHistory()
  const [user, setUser] = useState({
    sender : sessionStorage.getItem('account'),
    name : "",
    gender : "",
    age : "",
    residence : "",
    height : "",
    weight : "",

  });


  const handleChange = (e) => {
    e.preventDefault();

    const { value, name } = e.target;

    console.log(value, name);

    setUser({
      ...user,
      [name]: value,
    });
  };

  const fetchUser = ()=>{
    fetch(`http://localhost:3001/api/user/userfind?sender=${sessionStorage.getItem('account')}`,{
      method:'GET'
    })
    .then((resp)=>{
      setLoaded(true)
      if (resp.status === 200){
        setAction('edit')
        return resp.json()
      } 
      else{
        return false
      }
    })
    .then(
     (data)=>{
       if (data){
        setUser(data)
       }       
     }
    )
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/api/user/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        history.push("/mainpage");
      } else {
        const error = new Error(res.error);

        throw error;
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Error loggin in please try again");
    });
  }

  React.useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="section" style={{ marginTop : " 10px" }}>
      {loaded? ( <form onSubmit={handleSubmit}>
        <div className="header">
          <div>
            <img src="https://www.flaticon.com/svg/static/icons/svg/2904/2904566.svg" width="100px">
            </img>
          </div>
          <h2>신체 정보를 {action==='edit'? '수정' : '등록'} 합니다</h2>
        </div>
        
          <input
              type="text"
              className="newitem-form"
              value={user.name}
              name="name"
              placeholder="닉네임을 입력해 주세요"
              onChange={handleChange}
            />{" "}
            <select
              className="newitem-form"
              value={user.gender}
              name="gender"
              onChange={handleChange}
            >
              <option value="">성별</option>
              <option value="남">남</option>
              <option value="여">여</option>
            </select>
            <br></br>
            <input
              type="text"
              className="newitem-form"
              value={user.age}
              name="age"
              placeholder="나이를 입력해 주세요"
              onChange={handleChange}
            />{" "}
            <br></br>
            <input
              type="text"
              className="newitem-form"
              value={user.residence}
              name="residence"
              placeholder="거주지를 입력해 주세요"
              onChange={handleChange}
            />{" "}
            <br></br>
            <input
              type="text"
              className="newitem-form"
              value={user.height}
              name="height"
              placeholder="키를 입력해 주세요"
              onChange={handleChange}
            ></input>
            <br></br>
            <input
              type="text"
              className="newitem-form"
              value={user.weight}
              name="weight"
              placeholder="몸무게를 입력해 주세요"
              onChange={handleChange}
            ></input>
            <br></br>
            <Button variant="primary" type="submit" className="submit-button" >
              {action==='edit'? '수정' : '등록'}
            </Button>
        </form>): <Spinner animation="grow" />}
       
      </div>
    </div>
  );
}

export default MyPage;