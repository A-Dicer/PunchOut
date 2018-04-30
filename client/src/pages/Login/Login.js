import React, { Component } from "react";
import API from "../../utils/API";
import "./Login.css";
import poLogo from "./poLogo.jpg";
import Icon from "../../components/Icon";

class Login extends Component {

  componentWillMount() { API.logout().catch(err => console.log(err))}

// ---------------------------------------- handleFormSubmit -----------------------------------------------
//Action for signing people in when button is pressed.

  handleFormSubmit = event => {
    event.preventDefault();
    window.location = "https://punch-out.herokuapp.com/api/auth/twitch/callback"; 
  };

// ----------------------------------------- Frontend Code -------------------------------------------------
  render() {
    return (
      <div className="container">
        <div className="row" id="outer">
          <div className="col-sm-12 align-self-center">
            <div className="row justify-content-center rounded" id="inner">         
              <div className="col-12 text-center">
                <h3>Punch-Out!! Splitter</h3>
                <img src={poLogo} className="img-thumbnail" alt="punch-out"/> 
                <button 
                  type="button" 
                  className="btn btn-danger btn-sm loginBtn" 
                  onClick={this.handleFormSubmit}
                >    
                   Log in with Twitch    <Icon id="fab fa-twitch" />
                </button> 
              </div>
            </div>
          </div>
        </div>     
      </div>
    );
  }
}

export default Login;
