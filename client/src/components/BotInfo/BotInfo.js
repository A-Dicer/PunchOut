import React from "react";
import "./botInfo.css";

const BotInfo = props =>

<div className="botInfo">
    {
   
        <div className="row">
            <div className="col-6 text-left">
            <p className="col-12 "> prev: <div className={props.round >= 1 ?props.positions[props.round - 1].prev : ''}>{props.data.prev}</div></p>
            <p> pace: {props.data.pace}</p>
            <p> sob: {props.data.sob}</p>        
            </div>
            <div className="col-6 text-center">
            <h1 className={ props.round >= 1 ?props.positions[props.round - 1].delta : ''}> {props.data.time} </h1>
            </div>
        </div>
       
    }  
</div>

export default BotInfo;