import React from "react";
import "./PB.css";

const PB = props => 
   
    <div className="row pb">
        <div className="col-4">
            <img className="gameCover" src={ require("../../assets/img/games" + props.img)} alt="Card cap" /> 
        </div>
        <div className="col-8 text-left ">
            <h5 className="pbTitle">{props.title}</h5>
            {props.info.map((item, i) => ( 
                <p key={item._id + i} className="card-text pbInfo"> 
                    {item.category} : {item.time}
                </p>
            ))}      
        </div>      
    </div> 

export default PB;