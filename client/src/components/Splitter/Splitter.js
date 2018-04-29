import React, { Component } from "react";
import Icon from "../../components/Icon";
import TopInfo from "../../components/TopInfo";
import FighterInfo from "../../components/FighterInfo";
import SplitInfo from "../../components/SplitInfo";
import BotInfo from "../../components/BotInfo";
import "./splitter.css";

const io = require('socket.io-client')  
const socket = io() 

class Splitter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
        }
        socket.on(this.state.user.userName, (payload) => {   
            this.updateCodeFromSockets(payload)
        })
    }

    updateCodeFromSockets(payload) {
        this.setState({splits: payload})
      }
// ----------------------------------------- updatetUser ---------------------------------------------------
//grabs data from server based on user ID

    // updateUser = (id, info) => {
    //     API.updateUser(id, info)
    //         .then(res => { 
    //             //code to update socket.io
    //         }
    //     ).catch(err => console.log(err));
    // }

// -------------------------------------------- gameCheck ---------------------------------------------------
// Toggles information on by adding or removing height class

    gameCheck = () => {
       if(this.state.splits) return {opacity: 1}
       else return {opacity: 0}
    };

// ------------------------------------------ slideChange --------------------------------------------------
//controls the sliders in options with onChange then updates database with change

    // sliderChange = event => { 
    //     const {checked, name} = event.target; //get name and the checked value
    //     let user = Object.assign({}, this.state.user);  //copy state user obj
    
    //     user.options[name] = checked;  //add the new info
                            
    //     this.setState({user}) //set the state with the new obj  
    //     this.updateUser(this.state.user._id, this.state.user) //update the server with new info
    // };

// --------------------------------------------- logOut ----------------------------------------------------
//redirects to logout page....

    // logOut = () => {window.location = "/logout"};
    
// ------------------------------------------ Frontend Code ------------------------------------------------

    render() {
        return (
            <div className="card mb-3 splitterContainer" style={this.gameCheck()}>
            {   
                this.state.splits
                ? (
                <div> 
                    { 
                        this.state.user.options.gameInfo
                        ? <TopInfo data={this.state.splits.topInfo} /> 
                        : console.log()
                    }
                    {
                        this.state.user.options.fightInfo  
                        ?<FighterInfo data={this.state.splits} />
                        : console.log()
                    }
                    { 
                        this.state.user.options.individualInfo
                        ?(
                        console.log(this.state.splits.positions),
                        <SplitInfo 
                            data={this.state.splits.display} 
                            positions={this.state.splits.positions} 
                            round={this.state.splits.round}
                        />)
                        : console.log()
                    }
                    {
                        this.state.user.options.splitTimes
                        ?<BotInfo 
                            data={this.state.splits.botInfo} 
                            positions={this.state.splits.positions} 
                            round={this.state.splits.round}
                        />
                        : console.log()
                    }      
                </div>
            )
            :console.log()
        }
            </div>
        )
    }
}

export default Splitter;