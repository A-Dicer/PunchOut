import React from "react";
import "./options.css";
import Icon from "../../components/Icon";
import PB from "../../components/PB";


const Options = props =>

<div className="col-12 border">
    <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
    </label>
</div>  
 
export default Options;