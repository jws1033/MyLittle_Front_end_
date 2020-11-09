import React from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

import Navbar from "./Navbar";

import "../css/style.css";
import "../css/List.css"

export default function List() {
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
        alert("에러")
      });
  },[])

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
                        {survey[0]}문진<br></br>
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


