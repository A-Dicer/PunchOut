import React, { Component } from "react";
import API from "../../utils/API";
import "./user.css";
import Icon from "../../components/Icon";
import PB from "../../components/PB";
import Options from "../../components/Options";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                splits: {
                    mtpo: [],
                    spo: [],
                    powii: []
                }
            },   
        }
    }

    // when component mounts get user by id
    componentDidMount() {this.getUser(this.props.user)}

// -------------------------------------------- getUser ----------------------------------------------------
//grabs data from server based on user ID

    getUser = (id) => {
        API.getUser(id)
            .then(res => { this.setState({user: res.data.results,})}
        ).catch(err => console.log(err));
    };

// ----------------------------------------- updatetUser ---------------------------------------------------
//grabs data from server based on user ID

    updateUser = (id, info) => {
        API.updateUser(id, info)
            .then(res => { 
                //code to update socket.io
            }
        ).catch(err => console.log(err));
    }

// -------------------------------------------- dropDown ---------------------------------------------------
//Toggles information on by adding or removing height class

    dropDown = event => {
        event.preventDefault()
        const {name} = event.target;
        const div = document.getElementById(name);
       div.classList.toggle('height');
    };

// ------------------------------------------ slideChange --------------------------------------------------
//controls the sliders in options with onChange then updates database with change

    sliderChange = event => { 
        const {checked, name} = event.target; //get name and the checked value
        let user = Object.assign({}, this.state.user);  //copy state user obj
    
        user.options[name] = checked;  //add the new info
                            
        this.setState({user}) //set the state with the new obj  
        this.updateUser(this.state.user._id, this.state.user) //update the server with new info
    };

// --------------------------------------------- logOut ----------------------------------------------------
//redirects to logout page....

    logOut = () => {window.location = "/logout"};
    
// ------------------------------------------ Frontend Code ------------------------------------------------

    render() {
        return (
            <div className="card mb-3">
                <div className="col-12" id="userImg"> 
                    <h4 className="card-title text-center userName">{this.state.user.userName}</h4>
                    <img className="userBgImg" src={this.state.user.imgLink} alt="Card cap" />   
                    <div className="icon"  onClick={this.logOut}>
                        <Icon  id="fas fa-sign-out-alt signOut" />
                    </div>
                </div>
                <div className="card-body text-center">
                    <img className="userImg" src={this.state.user.imgLink} alt="Card cap" />
                    <p className="card-text"> Welcome to the Splitter.  If you have any questions about how the site works just ask in the Punch-Out!! Discord. </p>
                    <div className="col-12 head">
                        <button type="button" className="btn btn-sm btn-secondary bioBtn" onClick={this.dropDown} name="bestInfo"><Icon id="fas fa-stopwatch" /> Best Times </button>
                        <button type="button" className="btn btn-sm btn-secondary bioBtn" onClick={this.dropDown} name="options"><Icon id="fas fa-sliders-h" /> Split Options </button>
                        <hr />
                    </div>
                        <div className="row bestInfo height" id="bestInfo">
                            <div className="col-12">   
                            
                            { !this.state.user.splits.mtpo && this.state.user.splits.spo && this.state.user.splits.powii
                                ?<div> 
                                    {
                                        this.state.user.splits.mtpo.length
                                        ? <PB info={this.state.user.splits.mtpo} title="Mike Tyson's Punch-Out!!" img="mtpoBoxArt.jpg"/>
                                        : console.log()
                                    } {
                                        this.state.user.splits.spo.length
                                        ? <PB info={this.state.user.splits.spo} title="Super Punch-Out!!" img="spoBoxArt.jpg"/>
                                        : console.log()
                                    } {
                                        this.state.user.splits.powii.length
                                        ? <PB info={this.state.user.splits.powii} title="Punch-Out!! (Wii)" img="powiiBoxArt.jpg"/>
                                        : console.log()
                                    }
                                </div>
                                :  <p className="card-text"><small className="text-muted"> You do not have any Saved Splits</small></p> 
                            }
                            </div>    
                        </div>
                        <div className="col-12 head">
                        </div>

                        { this.state.user.options
                        ? <div className="row options" id="options">
                            <Options  info={this.state.user.options.gameInfo} name="gameInfo" title="Game Info" action={this.sliderChange} />
                            <Options  info={this.state.user.options.fightInfo} name="fightInfo" title="Fight Info" action={this.sliderChange}/>
                            <Options  info={this.state.user.options.individualInfo} name="individualInfo" title="Individual Info" action={this.sliderChange}/>
                            <Options  info={this.state.user.options.splitTimes} name="splitTimes" title="Split Times" action={this.sliderChange}/>    
                        </div>
                        : console.log()
                        }
                    <br/>
                    <p className="card-text"><small className="text-muted"> <Icon  id="fas fa-link" /> Your Splitter Link:<br/> <a href="...">https://websiteName.com/splits/{this.state.user.userName}</a></small></p>
                </div>
            </div>
        )
    }
}

export default User;