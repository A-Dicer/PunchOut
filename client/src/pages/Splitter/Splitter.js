import React, { Component } from "react";
import API from "../../utils/API";
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
            
        }
        socket.on(this.props.match.params.id, (payload) => {   
            this.updateCodeFromSockets(payload)
        })
    }

    updateCodeFromSockets(payload) {
        this.setState({splits: payload})
      }

    // when component mounts get user by params in URL
    componentWillMount() {document.body.style.background = "none"}

// -------------------------------------------- gameCheck ---------------------------------------------------
// Toggles information on by adding or removing height class

    gameCheck = () => {
       if(this.state.splits) return {opacity: 1}
       else return {opacity: 0}
    };
    
// ------------------------------------------ Frontend Code ------------------------------------------------

    render() {
        return (
            <div className="card mb-3 splitterContainer" style={this.gameCheck()}>
            {   
                this.state.splits
                ? (
                <div> 
                   { 
                        this.state.splits.options.gameInfo
                        ? <TopInfo data={this.state.splits.topInfo} />  : null
                    }
                    {
                        this.state.splits.options.fightInfo  
                        ? <FighterInfo data={this.state.splits} /> : null
                    }
                    { 
                        this.state.splits.options.individualInfo
                        ?
                        <SplitInfo 
                            data={this.state.splits.display} 
                            positions={this.state.splits.positions} 
                            round={this.state.splits.round}
                        />
                        : null
                    }
                    {
                        this.state.splits.options.splitTimes
                        ?<BotInfo 
                            data={this.state.splits.botInfo} 
                            positions={this.state.splits.positions} 
                            round={this.state.splits.round}
                        />
                        : null
                    }     
                </div>
            )
            :null
        }
            </div>
        )
    }
}

export default Splitter;
 
 
 
 

