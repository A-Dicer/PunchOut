import React from "react";
import "./fighterTop.css";

const FighterTop = props =>

<div className="row text-center" id="fighterTop">
    <div className="col-12 fighterTitle">
        <h4 className="">{props.fighter.fighter}</h4>  
    </div>
    <div className="col-6">
        <img className="controlFighter" src={require("../../assets/" + props.fighter.img)} alt="Card cap" /> 
    </div>
    <div className="col-6">
        <div className="row">
            <div className="col-6 fightInput">                      
                <div className="form-group top"> 
                    <input 
                        type="text" 
                        className="form-control " 
                        name="KD1"
                        id={props.i}
                        placeholder="KD1" 
                        value={props.splits.KD1}
                        onChange={props.inputChange}
                        maxLength="4"
                    />
                </div>
            </div>

            <div className="col-6 fightInput">
                <div className="form-group top">
                    <input 
                        type="text" 
                        className="form-control" 
                        name="KD2"
                        id={props.i} 
                        placeholder="KD2" 
                        value={props.splits.KD2} 
                        onChange={props.inputChange}
                        maxLength="4"
                    />
                </div>
            </div>
            <div className="col-12 fightInput">
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    name="time" 
                    id={props.i}
                    placeholder="Split Time" 
                    value={props.splits.time}
                    onChange={props.inputChange}
                    onKeyPress={props.submitTime}
                    maxLength="7"
                />
                </div>
            </div>
        </div>
    </div>
   
</div>  
 
export default FighterTop;