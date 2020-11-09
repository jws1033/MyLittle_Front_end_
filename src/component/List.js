import React from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';

import Navbar from "./Navbar";

import "../css/style.css";
import "../css/List.css"

export default function List() {
  const history = useHistory()
  const [user, setUser] = React.useState({
    sender : sessionStorage.getItem('account'),
  });
  const [historyList, setHistoryList] = React.useState([])

  React.useEffect(() => {
    fetch(`http://localhost:3001/api/survey/surveylist?sender=${sessionStorage.getItem('account')}`, {
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
      .then(data=>{
        setHistoryList(data.result)
      })
      .catch((err) => {
        console.log(err);

      });
  },[])

  React.useEffect(() => {
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

  return (
    <div>
      <Navbar />
      <div className="section custom-section">
        <div>
          <img src="https://www.flaticon.com/svg/static/icons/svg/2521/2521614.svg" width="90px"></img>
        </div>
        <br /><h2>History</h2><br />
          <div style={{justifyContent:'flex-start', display:'flex',  flexWrap:'wrap'}}>
            {historyList.map((survey)=>{
              return (
                <div className="list-section list-question-section">
                  <Link to={`/History/${survey[0]}`}>
                    <Button className="list-form  list-question-date">
                      <div>
                        {survey[0]} 문진<br></br>
                      </div>
                    </Button>
                  </Link>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  );
}


