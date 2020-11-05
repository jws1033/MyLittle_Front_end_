import React, { useState, useEffect } from "react";
import "../css/style.css";
import { Button, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";

const MyOwnPage = () => {
  const [action, setAction] = useState('register');
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({
    sender : sessionStorage.getItem('account'),
  });
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
        } else if (res.status === 401){
          alert("로그인해주세요")
          history.push('/')
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

  const fetchUser = () => {
    fetch(`http://localhost:3001/api/user/userfind?sender=${sessionStorage.getItem('account')}`,{
      method:'GET'
    })
    .then((resp) => {
      setLoaded(true)
      if (resp.status === 200){
        setAction('edit')
        return resp.json()
      } 
      else{
        return false
      }
    })
    .then((data) => {
       if (data){
        setUser(data)
       }       
     }
    )
  }

  const onDelete = () => {


    fetch("http://localhost:3001/api/user/withdrawal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        history.push("/");
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
  }, []);

  return (
    <div>
      <div>
        <Navbar />                
      </div>
      <div className="section" style={{ marginTop : " 10px" }}>
        <div className="header">
          <div>
            <img src="https://www.flaticon.com/svg/static/icons/svg/2904/2904566.svg" width="150px" />
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

          <br></br>
          <div style={{ fontSize: " 20px "}}>
              키 :{user.height}
          </div>
          <br></br>
          <div style={{ fontSize: " 20px "}}>
              몸무게: {user.weight}
          </div>
        </form>
      </div>
      <div>
          <div style={{  display: "flex", justifyContent: "center" }}>
            <Button className="delete-info" style={{ margin: "10px" }} onClick={() => {
              const result = window.confirm("정말 삭제?")
              if(result) {
                onDelete()
              } 
            }}>
              <h2 style={{ fontSize: "15px"}}>내 정보 삭제</h2>
            </Button>
            {loaded? (
            <Button className="modify-info" style={{ margin: "10px" }} onClick={()=> history.push("/MyPage")}>
              <h2 style={{ fontSize: "15px"}}>{action==='edit'? '수정' : '등록'}</h2>
            </Button>): <Spinner animation="grow" />}
          </div>
        </div>
    </div>
  );
  
};

export default MyOwnPage;