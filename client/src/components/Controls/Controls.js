import React, { Component } from "react";
import API from "../../utils/API";
import Icon from "../../components/Icon";
import Fighter from "../../components/Fighter";
import FighterTop from "../../components/FighterTop";
import GameSelect from "../../components/GameSelect";
import "./controls.css";

class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            defSplits: {
                mtpo:   [{ category: "Any%", id: "5ad93dbaa79643ce5b21062b"},{category: "Highscore", id: "5ad93dbaa79643ce5b21062c"}],
                spo:    [{ category: "Any%", id: "5ad93dbaa79643ce5b21062a"}],
                powii:  [{ category: "Any%", id: "5acf8eb59872806d554c3ed3"},{category: "Contender%", id: "5acfbd3fd3d18c7049a9a7b7"}],
            }, 
            splits: {
                topInfo: { game: '', category: '', gameImg: '' },
                started: false,
                pb: [],
                cs: [],
                gold: [],
                fighter: [],
                botInfo:  { time: '', sob: '', pace: '', prev: ''},
                round: 0,
                done: false         
            },
            
            newSplits: false, 
            runSplits: false,
            pbSplits: false, 
            games: [], 
            gameTitle: "",
            gameCategory: "",
            
           
            runComplete: false,
            expand: {height: 0},
            topVis: {opacity: 1},
            expandState: false,
            
        }
    }

    componentDidMount() { this.getGames() };

// ------------------------------------------- getGames ----------------------------------------------------
//grabs game data from server

    getGames = () => {
        API.getGames()
            .then(res => { this.setState({games: res.data.results,})}
        ).catch(err => console.log(err));
    };

// ----------------------------------------- updatetUser ---------------------------------------------------
//grabs data from server based on user ID

    // updateUser = (id, info) => {
    //     API.updateUser(id, info)
    //         .then(res => { 
    //             //code to update socket.io
    //         }
    //     ).catch(err => console.log(err));
    // }

// ------------------------------------------ gameSelect----------------------------------------------------
//Sets the state to what game was selected

    gameSelect = event => {
        const { value, title, id} = event.target;
        this.setState({gameTitle: [value, id, title] })
    };

// ------------------------------------------- catSelect ---------------------------------------------------
//Sets teh state to what Category was selected

    catSelect = event => {
        const {value} = event.target;
        this.setState({gameCategory: value })
    };

// ------------------------------------------- readyCheck --------------------------------------------------
//

    readyCheck = (btn) => { 
        switch (btn) {
            case "play":
                if(this.state.gameTitle && this.state.gameCategory && !this.state.splits.started) 
                return false; else return true;
           
            case "prev":
                if(this.state.splits.started && this.state.splits.round > 0) 
                return false; else return true;
              
            case "next":
                if(this.state.splits.started && this.state.splits.round <= this.state.splits.cs.length -1 && this.state.splits.cs[this.state.splits.round].time) 
                return false; else return true;
              
            case "expand":
                if(this.state.splits.started) 
                return false; else return true;
                
            case "save":
                if(this.state.splits.started && this.state.runCompleted) 
                return false; else return true;
                
            case "reset":
                if(this.state.splits.started) 
                return false; else return true;
               
            default: return false
        }
    };


// -------------------------------------------- startRun ---------------------------------------------------
//starts the run
    startRun = () => {

        const game = this.state.games[this.state.gameTitle[1]].abv // game title abv....
        let split = this.state.user.splits[game].filter(param => param.category === this.state.gameCategory)
        let splitId
        
        this.setState({topVis: { opacity: 0}})

        setTimeout(function(){
            if(split.length) splitId = split[0]._id // if the splits are there use its Id
            else {
                split = this.state.defSplits[this.state.gameTitle[2]].filter(param => param.category === this.state.gameCategory)
                splitId = split[0].id
                this.setState({newSplits: true})
            }

            API.getSplit(splitId)
                .then(res => { 
                    let splits = Object.assign([], this.state.splits); 
                    res.data.results.splits.map(i => (
                        splits.cs.push({KD1: '', KD2: '', time: ''}),
                        splits.pb.push(i.pb),
                        splits.fighter.push(i.fighter)      
                    ))
                    splits.game = this.state.gameTitle[0]
                    splits.category = this.state.gameCategory
                    splits.started = true
                    this.setState({splits: splits, topVis: { opacity: 1}})
                }
            ).catch(err => console.log(err));
    }.bind(this), 2000)
    };

// --------------------------------------------- expand ----------------------------------------------------
    expand = () => {
        let size = (30 * (this.state.splits.cs.length + 1) )+ "px" // size it will expand to
        
        if(this.state.expandState) this.setState({expand: {height: 0}, expandState: false})
        else this.setState({expandState: true, expand: {height: size}})
    }

// ------------------------------------------- inputChange -------------------------------------------------
   
    inputChange = event => {
        const {value, name, id} = event.target;
        let splits = Object.assign([], this.state.splits.cs); 
        splits[id][name] = value.replace(/[^0-9, :, .]/g, '');
        this.setState({runSplits: splits});  
    };

// ------------------------------------------- submitTime -------------------------------------------------
   
    submitTime = event => {
        const {value, id} = event.target;
        if (value && parseInt(id, 10) === this.state.splits.round && event.key === "Enter") this.next()   
    };

// ----------------------------------------------- next ----------------------------------------------------
   
    next = event => { 
        let splits = Object.assign({}, this.state.splits); 
        if(splits.round +1 >= splits.cs.length) this.end()
        else {
        splits.round = splits.round +1;
        this.setState({splits: splits });
        }
    };

// ----------------------------------------------- prev ----------------------------------------------------
   
    prev = event => { 
        let splits = Object.assign({}, this.state.splits); 
        splits.round = splits.round -1;
        this.setState({splits: splits });
    };

// ---------------------------------------------- reset ----------------------------------------------------
   
    reset = event => { 

        if (this.state.expandState) this.expand();

        let splits = Object.assign({}, this.state.splits); 
        splits.round = 0
        splits.pb = []
        splits.cs = []
        splits.started = false
        splits.game = ""
        splits.category = ""
        splits.prev = ""
        splits.time = ""
        splits.sob = ""
        splits.pace = ""

        this.setState({splits: splits});
    };

// ----------------------------------------------- prev ----------------------------------------------------
    end = () => {
        console.log("end")
    }
    
// ------------------------------------------ Frontend Code ------------------------------------------------

    render() {
        return (
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <h4> <Icon id="fas fa-gamepad" /> Controller </h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            <hr />
                            <div className="row">
                                <div className="col-12">      
                                    <div className="col-12 controlContainer">
                                        <div className="col=12" id="controlTop" >
                                            <div id="topInfo" style={this.state.topVis}>
                                             { this.state.splits.started
                                               ? <FighterTop 
                                                    splits={this.state.splits.cs[this.state.splits.round]}
                                                    inputChange={this.inputChange}
                                                    i={this.state.splits.round}
                                                    fighter={this.state.splits.fighter[this.state.splits.round]}
                                                    submitTime={this.submitTime}
                                               />
                                               : <GameSelect 
                                                    games={this.state.games} 
                                                    gameSelect={this.gameSelect}
                                                    catSelect={this.catSelect}
                                                    gameTitle={this.state.gameTitle}
                                                />
                                             }
                                            </div>
                                        </div>
                                        <div className="col-12 text-center" id="btnContainer">
                                            <button type="button" className="btn btn-sm btn-secondary controlBtn" disabled={this.readyCheck("reset")}  onClick={this.reset}    name="bestInfo"><Icon id="fas fa-undo-alt" /> Reset </button>
                                            <button type="button" className="btn btn-sm btn-secondary controlBtn" disabled={this.readyCheck("expand")} onClick={this.expand}    name="bestInfo"><Icon id="fas fa-expand" /> </button>
                                            <button type="button" className="btn btn-sm btn-secondary controlBtn" disabled={this.readyCheck("prev")}   onClick={this.prev}      name="bestInfo"><Icon id="fas fa-step-backward" /> </button>
                                            <button type="button" className="btn btn-sm btn-secondary controlBtn" disabled={this.readyCheck("play")}   onClick={this.startRun}  name="bestInfo"><Icon id="fas fa-play" /> Start </button>
                                            <button type="button" className="btn btn-sm btn-secondary controlBtn" disabled={this.readyCheck("next")}   onClick={this.next}      name="bestInfo"><Icon id="fas fa-step-forward" />  </button>
                                            <button type="button" className="btn btn-sm btn-secondary controlBtn" disabled={this.readyCheck("save")}    name="bestInfo"><Icon id="fas fa-save" /> Save </button>
                                        </div>
                                        
                                        
                                        <div className="col-12" id="expanded" style={this.state.expand}>
                                            <div className="row fighterRow key">
                                                <div className="col-1" id="">  
                                                </div>
                                                <div className="col-5 blah text-left fighterName" id="">
                                                    Fighter Name
                                                </div>
                                                <div className="col-2 blah text-left fighterName" id="">
                                                    KD1
                                                </div>
                                                <div className="col-2 blah text-left fighterName" id="">
                                                    KD2
                                                </div>
                                                <div className="col-2 newTime" id="">
                                                    <div className="form-group blah text-left">
                                                        Time
                                                    </div>
                                                </div>
                                            </div>

                                            { this.state.splits.cs
                                                ?   this.state.splits.cs.map((item, i) => (       
                                                        <Fighter 
                                                            key={i}
                                                            fighter={this.state.splits.fighter[i]}
                                                            splits={this.state.splits.cs[i]}
                                                            i={i} 
                                                            inputChange={this.inputChange}
                                                            submitTime={this.submitTime}
                                                            currentRound={this.state.splits.round} 
                                                        />
                                                    ))
                                                :    console.log()
                                            }
                                        </div>
                                    </div>
                                </div>  
                            </div>
                            <hr />
                        </div>     
                    </div>
                </div>
            </div>
        )
    }
}

export default Controls;