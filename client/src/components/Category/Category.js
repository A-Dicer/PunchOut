import React from "react";
import "./category.css";

const Category = props => 
   
<div className="form-check-inline">
    <input className="form-check-input" type="radio" name="categoryRadios" id={props.title} value={props.title} />
    <label className="form-check-label" htmlFor={props.title}> {props.title} </label>
</div>
               
export default Category;