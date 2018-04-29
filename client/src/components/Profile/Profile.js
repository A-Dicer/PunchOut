import React, { Component } from "react";
import API from "../../utils/API";
import Icon from "../../components/Icon";
import PB from "../../components/PB";
import Options from "../../components/Options";
import "./profile.css";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            options: {value: false, style: {height: 0}},
            bestInfo: {value: false, style: {height: 0}}
        }
    }

// ----------------------------------------- updatetUser ---------------------------------------------------
//grabs data from server based on user ID

    updateUser = (id, info) => {
        API.updateUser(id, info,).catch(err => console.log(err));
    }

// -------------------------------------------- dropDown ---------------------------------------------------
//Toggles information on by adding or removing height class

    dropDown = event => {
        event.preventDefault()
        
        const {name, value} = event.target;
        let btn = Object.assign({}, this.state[name]);

        
        if(value === 'true') btn.value = 'false'
        else btn.value = 'true'



        let size = 20;
        if(name === "bestInfo"){

            if(this.state.user.splits.powii.length) size += 130
            if(this.state.user.splits.spo.length)   size += 130
            if(this.state.user.splits.mtpo.length)  size += 130
            
            btn.value === 'true'
            ? btn.style = {height: size + 'px'}
            : btn.style = {height: 0}
        }
        
        if(name === "options"){      
            btn.value === 'true'
            ? btn.style = {height: 170 + 'px'}
            : btn.style = {height: 0}
        }
      
        this.setState({[name]: btn})
        
    };

// ------------------------------------------ slideChange --------------------------------------------------
//controls the sliders in options with onChange then updates database with change

    sliderChange = event => { 
        const {checked, name} = event.target; //get name and the checked value
        let user = Object.assign({}, this.state.user);  //copy state user obj
    
        user.options[name] = checked;  //add the new info
                            
        this.setState({user}) //set the state with the new obj  
        this.updateUser(this.state.user._id, this.state.user) //update the server with new info
        this.props.refresh(user)
    };

// --------------------------------------------- logOut ----------------------------------------------------
//redirects to logout page....

    logOut = () => {window.location = "/logout"};
    
// ------------------------------------------ Frontend Code ------------------------------------------------

    render() {
        return (
            <div className="card mb-3">
                <div className="col-12" id="userImg"> 
                    <h4 className="card-title text-center userName">{this.state.user.username}</h4>
                    <img className="userBgImg" src={this.state.user.imgLink} alt="Card cap" />   
                    <div className="icon"  onClick={this.logOut}>
                        <Icon  id="fas fa-sign-out-alt signOut" />
                    </div>
                </div>
                <div className="card-body text-center">
                    <img className="userImg" src={this.state.user.imgLink} alt="Card cap" />
                    <p className="card-text"> Welcome to the Splitter.  If you have any questions about how the site works just ask in the Punch-Out!! Discord. </p>
                    <div className="col-12 head">
                        <button type="button" className="btn btn-sm btn-secondary bioBtn" onClick={this.dropDown} name="bestInfo" value={this.state.bestInfo.value} ><Icon id="fas fa-stopwatch" /> Best Times </button>
                        <button type="button" className="btn btn-sm btn-secondary bioBtn" onClick={this.dropDown} name="options" value={this.state.options.value} ><Icon id="fas fa-sliders-h" /> Split Options </button>
                        <hr />
                    </div>
                        <div className="row bestInfo" id="bestInfo" style={this.state.bestInfo.style}>
                            <div className="col-12">   
                                {
                                !this.state.user.splits.mtpo.length && !this.state.user.splits.spo.length && !this.state.user.splits.powii.length
                                ? (
                                     <p className="card-text">
                                    <small className="text-muted"> 
                                        You don't have any Splits yet
                                    </small>
                                    </p>
                                ):(   
                                    <div> 
                                        {   this.state.user.splits.mtpo.length
                                            ? <PB info={this.state.user.splits.mtpo} title="Mike Tyson's Punch-Out!!" img="/mtpo/mtpoBoxArt.jpg"/>
                                            : null
                                        } {
                                            this.state.user.splits.spo.length
                                            ? <PB info={this.state.user.splits.spo} title="Super Punch-Out!!" img="/spo/spoBoxArt.jpg"/>
                                            : null
                                        } {
                                            this.state.user.splits.powii.length
                                            ? <PB info={this.state.user.splits.powii} title="Punch-Out!! (Wii)" img="/powii/powiiBoxArt.jpg"/>
                                            : null
                                        }
                                    </div>
                                )
                                }
                            </div>    
                        </div>
                        <div className="col-12 head">
                        </div>

                        { this.state.user.options
                        ? <div className="row options" id="options" style={this.state.options.style}>
                            <Options  info={this.state.user.options.gameInfo} name="gameInfo" title="Game Info" action={this.sliderChange} />
                            <Options  info={this.state.user.options.fightInfo} name="fightInfo" title="Fight Info" action={this.sliderChange}/>
                            <Options  info={this.state.user.options.individualInfo} name="individualInfo" title="Individual Info" action={this.sliderChange}/>
                            <Options  info={this.state.user.options.splitTimes} name="splitTimes" title="Split Times" action={this.sliderChange}/>    
                        </div>
                        : null
                        }
                    <br/>
                    <p className="card-text"><small className="text-muted"> <Icon  id="fas fa-link" /> Your Splitter Link:<br/> <a href={window.location.origin + "/splits/" + this.state.user.username} target="new">{window.location.origin}/splits/{this.state.user.username}</a></small></p>
                </div>
            </div>
        )
    }
}

export default User;