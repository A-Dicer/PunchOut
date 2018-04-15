import React, { Component } from "react";
import API from "../../utils/API";
import "./Login.css";
import poLogo from "./poLogo.jpg";
import Icon from "../../components/Icon";

class Login extends Component {

  componentWillMount() {
    API.logout()
      .catch(err => console.log(err))
  }


  handleFormSubmit = event => {
    event.preventDefault();
      console.log("twitchAuth started")
      window.location = "http://localhost:3002/api/auth/twitch"; 
  };

  // handleTest = event => {
  //   event.preventDefault();
  //   const splitData = {
  //     user: "5ab9c098aed6440669046e4a",
  //     game: "5ab975e0af67235b3dfef53a", 
  //     category: "Any%",
  //     splits: [
  //       { fighter: "5ab975e0af67235b3dfef53b", pb: { KD1: null, KD2: null, time: null}, gold: { KD1: null, KD2: null, time: null}},
  //       { fighter: "5ab975e0af67235b3dfef53c", pb: { KD1: null, KD2: null, time: null}, gold: { KD1: null, KD2: null, time: null}},
  //     ],
  //   }
  //     console.log("twitchAuth started")
  //     API.saveNewSplits(splitData)
  //     .then(console.log("worked?")) 
  //     .catch(err => console.log(err));
  // };

  render() {
    return (
      <div className="container">
        <div className="row" id="outer">
          <div className="col-sm-12 align-self-center">
            <div className="row justify-content-center rounded" id="inner">         
              <div className="col-12 text-center">
                <h3>Punch-Out!! Splitter</h3>
                <img src={poLogo} className="img-thumbnail" alt="kalimba"/> 
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
