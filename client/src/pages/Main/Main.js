import React, { Component } from "react";
import API from "../../utils/API";
// import { Fade } from "../../components/Animation";
import "./Main.css";
import User from "../../components/User";

const io = require('socket.io-client')  
const socket = io() 

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: [],
            games: [],
        }
        
        // socket.on('get races', (payload) => {   
        //     this.updateCodeFromSockets(payload)
        // })
    
    }

    // updateCodeFromSockets(payload) {
    //     this.setState({races: payload})
    //   }

    // when component mounts get created races
    componentDidMount() {
        this.loadGames(); 
    }

    loadGames = () => {
        API.getGames()
            .then(res => { 
                // eslint-disable-next-line         
                res.data.sess.passport && res.data.sess.passport.user
                ? (this.setState({games: res.data.results}), this.getUser(res.data.sess.passport.user._id) )
                : (console.log("not logged in"), this.props.history.push("/"))
            }
        ).catch(err => console.log(err));
    };

    getUser = (id) => {
        API.getUser(id)
            .then(res => { 
                this.setState({currentUser: res.data.results})    
            }
        ).catch(err => console.log(err));
    };

    render() {
    return (
        <div className="container">
            <div className="row" id="outer">
                <div className="col-lg-6 ">
                  <User user={this.state.currentUser} games={this.state.games} />
                </div>
                <div className="col-lg-6 ">
                  
                </div>
                <div className="col-12">
                  
                </div>
            </div>     
      </div>          
    );
  }
}

export default Main;
