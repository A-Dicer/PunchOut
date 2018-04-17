import React from "react";
import "./options.css";

const Options = props =>

<div className="col-12">
    <div className="row">
        <div className="col-12"> 
            <div className="row rowOpt">
                <div className="col-8 titleOpt text-left">
                    {props.title}
                </div>
                <div className="col-4 text-right">
                    <label className="switch">
                        <input 
                            type="checkbox" 
                            name={props.name} 
                            checked={props.info} 
                            onChange={props.action}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</div>  
 
export default Options;