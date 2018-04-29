import React from "react";
import "./splitInfo.css";

const shade = (number, current) => {
    if(number === current) return " current"
    else if(number % 2) return " dark"
    else return ""
}

const SplitInfo = props =>

<div className="splitInfo">
  {                                                 
      props.data.length // check there there is data
      ? (
        props.data.map(((split, i) => 
            split.visable // if it is marked for display display it
            ? (
                <div className={"row" + shade(i, props.round)} key={split.fighter._id + i}>
                    <div className="col-1 "> 
                        <  img className="fighterIconSplit" src={require("../../assets/" + split.fighter.icon)} alt="Card cap" /> 
                    </div>
                    <div className="col-5 "> 
                        {split.fighter.fighter}
                    </div>
                    <div className={"col-3 text-right " + (props.positions[i].gold ? (props.positions[i].gold) : (props.positions[i].delta) )}> 
                        {split.delta}
                    </div>
                    <div className="col-3 text-right"> 
                        {split.time}
                    </div> 
                </div>     
            ) : null
        ))
      ) : null
  }
</div>

export default SplitInfo;