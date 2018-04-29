import React from "react";
import "./gameSelect.css";
import Game from "../../components/Game";
import Category from "../../components/Category";

const GameSelect = props =>
<div className="row" id="gameSelect">
    <div className="col-12">      
        <div className="form-group" name="gameOptions" htmlFor="gameOptions" value="gameOptions" onChange={props.gameSelect} >
            <label id="gameSelcet">Game Selected: {props.gameTitle[0]}</label><br />
            { props.games.map((item, i) => ( 
                <Game key={item._id} id={i} abv={item.abv} title={item.title} img ={item.img} />
            )) }
        </div>
    </div>
    <div className="col-12">
        <div className="form-group" name="categoryRadios" onChange={props.catSelect}>
            <label>Select Category:</label>
            { props.gameTitle
                ? props.games[props.gameTitle[1]].categories.map((item, i) => (          
                        <Category key={item + i} title={item} />
                    )) 
                :null
            }
        </div>
        <hr/>
    </div> 
</div> 
 
export default GameSelect;