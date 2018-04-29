import React from "react";
import "./fighter.css";

const bg = (number, current) => {
    if(number === current) return "row fighterRow current"

    if(number % 2) return "row fighterRow dark"
    else return "row fighterRow"
}

const disableCheck = (round, currentRound) => {
    if(round <= currentRound) return false
    else return true
}

const Fighter = props => 
   
<div className={bg(props.i, props.currentRound)}>
    <div className="col-1 iconHolder">
        <img className="fighterIcon" src={require("../../assets/" + props.fighter.icon)} alt="Card cap" /> 
    </div>
    <div className="col-5 text-left fighterName" >
        {props.fighter.fighter}
    </div>
    <div className="col-2 newTime" id="">
        <div className="form-group blah">
            <input 
                type="text" 
                className="form-control newTimeInput"
                name="KD1"
                id={props.i}
                value={props.splits.KD1} 
                onChange={props.inputChange}
                disabled={disableCheck(props.i, props.currentRound)}
                maxLength="4"
            />
        </div>
    </div>
    <div className="col-2 newTime" id="">
        <div className="form-group blah">
            <input 
                type="text" 
                className="form-control newTimeInput" 
                name="KD2"
                id={props.i}
                value={props.splits.KD2}
                onChange={props.inputChange}
                disabled={disableCheck(props.i, props.currentRound)} 
                maxLength="4"
            />
        </div>
    </div>
    <div className="col-2 newTime" id="">
        <div className="form-group blah">
            <input 
                type="text" 
                className="form-control newTimeInput" 
                name={"time"}
                id={props.i} 
                value={props.splits.time}
                onChange={props.inputChange}
                disabled={disableCheck(props.i, props.currentRound)}
                onKeyPress={props.submitTime}
                maxLength="7"
            />
        </div>
    </div>
</div>

export default Fighter;