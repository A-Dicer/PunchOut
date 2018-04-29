import React from "react";
import "./fighterInfo.css";

const image = (data) => {
    if(data === "Punch-Out!! (Wii)") return "powii";
    if(data === "Super Punch-Out!!") return "spo";
    if(data === "Mike Tyson's Punch-Out!!") return "mtpo";
}

const fightInfo = (data) => {
    if(data.KD1 && data.KD2) return data.KD1 + " / " + data.KD2 + " / " + data.time;
    else if(data.KD1) return data.KD1 + " / " + data.time;
    else return data.time   
}

const FighterInfo = props =>
<div className="fighterInfo">
    <div className="row">
        {
            props.data.topInfo.game
            ? 
                <img 
                    className="bgRing" 
                    src={require("../../assets/img/games/" + image(props.data.topInfo.game) + "/bgRing.png")}
                    alt="Card cap" 
                />
            :null
        }
    
        <div className="col-4">
            {  
                props.data.started
                ?<img className="fighterInfoImg" src={require("../../assets/" + props.data.fighters[props.data.round].img)} alt="Card cap" />
                :null
            }
        </div>
        <div className="col-8 splitData">
            {
                props.data.started
                ? (
                    <div className="row">

                        <div className="col-12">
                            <h3> {props.data.fighters[props.data.round].fighter} </h3>
                            {
                                props.data.pb[props.data.round].time
                                ?<p> PB: {fightInfo(props.data.pb[props.data.round])}</p>
                                :null
                            }
                            {
                                props.data.gold[props.data.round].time
                                ?<p> Gold: {fightInfo(props.data.gold[props.data.round])}</p>
                                :null
                            }                       
                        </div>
                    </div>
                )
                :null
            }
        </div>
    </div>

</div>

    

export default FighterInfo;