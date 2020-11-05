import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../css/style.css";
import { Button, Container, Form } from "react-bootstrap";
import web3 from "../web3";
import ipfs from "../ipfs";
import storehash from "../storehash";
import Navbar from "./Navbar";

import {Link} from 'react-router-dom';

import "../css/List.css"


export default function List() {

    return (
      <div>
        <div>
          <Navbar />
        
        </div>
        <div className="section custom-section">
            <div>
              <img src="https://www.flaticon.com/svg/static/icons/svg/2521/2521614.svg"
                width="90px"
              ></img>
            </div>
            <br></br>
              <h3>History</h3>
              <br></br>
              <div style={{justifyContent:'flex-start', display:'flex',  flexWrap:'wrap'}}>

           
                <div className="list-section list-question-section">
                 <Link to={`/History/${123}`}>
                    <Button className="list-form  list-question-date" >
                      <div>
                      {/* 날짜 데이터 */} 문진<br></br>
                      </div>
                    </Button>
                  </Link>
                </div>
          
            <div className="list-section list-question-section">
                <Button className="list-form list-question-date" >
                  <div>
                  {/* 날짜 데이터 */} 문진<br></br>
                  </div>
                </Button>
            </div>
            <div className="list-section list-question-section">
                <Button className="list-form list-question-date" >
                  <div>
                  {/* 날짜 데이터 */} 문진<br></br>
                  </div>
                </Button>
            </div>
            <div className="list-section list-question-section">
                <Button className="list-form list-question-date" >
                  <div>
                  {/* 날짜 데이터 */} 문진<br></br>
                  </div>
                </Button>
            </div>
            <div className="list-section list-question-section">
                <Button className="list-form list-question-date" >
                  <div>
                  {/* 날짜 데이터 */} 문진<br></br>
                  </div>
                </Button>
            </div>
            
            <div className="list-section list-question-section">
                <Button className="list-form list-question-date" >
                  <div>
                  {/* 날짜 데이터 */} 문진<br></br>
                  </div>
                </Button>
            </div>
            
            <div className="list-section list-question-section">
              <a>
                <Button href="./History" className="list-form list-question-date">
                  <div>
                  {/* 날짜 데이터 */} 문진<br></br>
                  </div>
                </Button>
                </a>
            </div>
            </div>
        </div>
      </div>
    );
  
}


