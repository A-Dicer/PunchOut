import React from "react";
import poLogo from "./error.jpg";

const NoMatch = () =>

    <div className="container">
      <div className="row">
        <div className="col-sm-12 align-self-center">
          <div className="row justify-content-center rounded" id="">         
            <div className="col-12 text-center">
              <hr/>
              <h3> 404 / Page Not Found</h3>
              <img src={poLogo} className="img-thumbnail" alt="404"/> 
                
              <hr/>
            </div>
          </div>
        </div>
      </div>     
    </div>

    
export default NoMatch;
