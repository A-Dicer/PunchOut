import React from "react";
import "./topInfo.css";

const TopInfo = props =>
<div className="topInfo">
    <div className="row topInfoRow">
        <div className="col-3">
            {
                props.data.gameImg
                ? <img className="topImg" src={require("../../assets/img/games/" + props.data.gameImg)} alt="Card cap" />
                : console.log()
            }    
        </div>
        <div className="col-9">
            { 
                props.data.game
                ? <h5>{props.data.game}</h5>
                : console.log()
            }
            {
                props.data.category
                ?<h6>{props.data.category}</h6>
                : console.log()
            }
        </div>
    </div>
</div>

export default TopInfo;