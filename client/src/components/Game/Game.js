import React from "react";
import "./game.css";

const Game = props =>
<div className="form-check-inline inputContainer">
    <label className="form-check-label" htmlFor={props.id}>
        <input className="form-check-input" type="radio" name="gameOptions" title={props.abv} id={props.id} value={props.title}/>
        <img className="checkmark" src={ require("../../assets/img/games/" + props.img)} alt="Card cap" />
    </label>  
</div>

    

export default Game;