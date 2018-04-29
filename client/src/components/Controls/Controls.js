import React, { Component } from "react";
import API from "../../utils/API";
import Icon from "../../components/Icon";
import Fighter from "../../components/Fighter";
import FighterTop from "../../components/FighterTop";
import GameSelect from "../../components/GameSelect";
import "./controls.css";

const io = require('socket.io-client')  
const socket = io() 

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
                topInfo: {},
                started: false,
                pb: [],
                cs: [],
                gold: [],
                positions: [],
                display: [],
                fighters: [],
                botInfo:  { time: "0.00", sob: "-", pace: '-', prev: '-'},
                round: 0,
                done: false,
                options: {
                    gameInfo: false,
                    fightInfo: false,
                    individualInfo: false,
                    splitTimes: false,
                }        
            },
            
            newSplits: false, 
            splitsId: "",
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

    componentDidMount() { 
        this.getGames() 
        this.updateSplitter(this.state.splits)
    };

    componentWillUnmount(){
        this.updateSplitter({splits: []})
    }

   updateSplitter = () => {
       let splits = Object.assign({}, this.state.splits);
        splits.options.gameInfo = this.state.user.options.gameInfo
        splits.options.fightInfo = this.state.user.options.fightInfo
        splits.options.individualInfo = this.state.user.options.individualInfo
        splits.options.splitTimes = this.state.user.options.splitTimes

        socket.emit('updateSplitter', splits, this.state.user.userName)
        }


// ------------------------------------------- getGames ----------------------------------------------------
//grabs game data from server

    getGames = () => {
        API.getGames()
            .then(res => { this.setState({games: res.data.results,})}
        ).catch(err => console.log(err));
    };

// ------------------------------------------ gameSelect----------------------------------------------------
//Sets the state to what game was selected

    gameSelect = event => {
        const { value, title, id} = event.target;
        this.setState({gameTitle: [value, id, title], gameCategory: ''})

        let splits = Object.assign({}, this.state.splits);
        splits.topInfo.game = value
        splits.topInfo.gameImg = this.state.games[id].img
        splits.topInfo.category = ''

        this.setState({splits: splits})
        this.updateSplitter(splits)
    };

// ------------------------------------------- catSelect ---------------------------------------------------
//Sets teh state to what Category was selected

    catSelect = event => {
        const {value} = event.target;
        this.setState({gameCategory: value })

        let splits = Object.assign({}, this.state.splits);
        splits.topInfo.category = value
       
        this.setState({splits: splits})
        this.updateSplitter(splits)
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
                if(this.state.splits.started && !this.state.splits.done && this.state.splits.cs[this.state.splits.round].time) 
                return false; else return true;
              
            case "expand":
                if(this.state.splits.started) 
                return false; else return true;
                
            case "save":
                if(this.state.splits.started && this.state.splits.done) 
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
        let splitId
      
        const game = this.state.games[this.state.gameTitle[1]].abv // game title abv....
        let split = this.state.user.splits[game].filter(param => param.category === this.state.gameCategory)
     
        this.setState({topVis: { opacity: 0}})
        
        setTimeout(function(){
            if(split.length) { 
                splitId = split[0]._id 
                this.state.splitsId = splitId// if the splits are there use its Id
            }
            else {
                split = this.state.defSplits[this.state.gameTitle[2]].filter(param => param.category === this.state.gameCategory)
                splitId = split[0].id
                this.setState({newSplits: true})      
            }

            API.getSplit(splitId)
                .then(res => { 
                    
                    if(this.state.newSplits) {
                        let newSplits = Object.assign({}, res.data.results); 
                        newSplits.user = this.state.user.userName
                        delete newSplits._id

                        API.saveNewSplits(newSplits)
                            .then(res => { 
                                let user = Object.assign({}, this.state.user);
                                user.splits[game].push(res.data._id)
                                
                                this.setState({splitsId: res.data._id, newSplits: false})
                                API.updateUser(this.state.user._id, user)
                                    .then(res => { 
                                        API.getUser(this.state.user._id)
                                            .then(res => { 
                                                    this.setState({user: res.data.results})  
                                            }).catch(err => console.log(err));
                                        
                                }).catch(err => console.log(err));
                                    
                            }).catch(err => console.log(err));
                    }

                    let splits = Object.assign([], this.state.splits); //grab split info from state
                    // input all info into the display splits
                    splits.topInfo.game = this.state.gameTitle[0] // add game title
                    splits.topInfo.category = this.state.gameCategory // add category

                    
                    splits.fighters = res.data.results.fighters // add fighters
                    splits.pb = res.data.results.pb // add personal best
                    splits.gold = res.data.results.gold // add gold times
   
                    res.data.results.pb.map(((split, i) => (
                        splits.cs.push({KD1: '', KD2: '', time: ''}),
                        splits.display.push({
                            visable: true,
                            fighter: res.data.results.fighters[i],
                            delta: '',
                            time: ''
                        }),
                        splits.positions.push({ gold:'', prev: '', delta: ''})
                    ))) //create blank splits and blank data for the splitter display
                    
                    res.data.results.time === "00:00.00"
                    ? splits.botInfo.pace = "-"
                    : splits.botInfo.pace = res.data.results.time // set pace i guess
                    
                    let sob = 0;
                    res.data.results.pb[0].time === null
                    ? splits.botInfo.sob = "-"
                    : (
                        splits.gold.map(split => (sob += this.timeInvert(split.time))), // get some of best
                        splits.botInfo.sob = this.timeConvert(sob)
                    )
                    
                    splits.started = true // change started to true
                    this.setState({splits: splits, topVis: { opacity: 1}}) // update splits in state and fade in
    
                    // setTimeout(this.botInfo, 100) // find out sob
                    setTimeout(this.updateSplitter, 200)
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
        this.timeInvert(value)
    };

// ----------------------------------------------- save -----------------------------------------------------
   
    save = () => {
        let splits = Object.assign({}, this.state.splits); 
        let info =  {time: splits.botInfo.time, pb: splits.cs} // set info to be updated
        
        API.updateSplit(this.state.splitsId, info).catch(err => console.log(err)) //update database on server
        this.setState({dataSaved: true}) // let user know it was saved
    }

// ------------------------------------------- submitTime -------------------------------------------------
   
    submitTime = event => {
        const {value, id} = event.target;
        if (value && parseInt(id, 10) === this.state.splits.round && event.key === "Enter") this.next()   
    };

// ----------------------------------------------- next ----------------------------------------------------
   
    next = event => { 
        let splits = Object.assign({}, this.state.splits);
        
        this.goldCheck() // check to see if its the fastest time ever done

        this.time() // get the completed time for the current run

        // remove rounds as needed from display
        if(splits.round > 6 && splits.round < (splits.cs.length - 6)) splits.display[splits.round - 7].visable = false 
        
        let newTime = this.timeInvert(splits.cs[splits.round].time)
        splits.display[splits.round].time = this.timeConvert(newTime) // add time to display


        splits.pb[splits.round].time === null // make sure there are splits to actually check
        ? splits.display[splits.round].delta = "-" // if there aren't... place "-" in the delta
        : ( this.botInfo(), this.delta()) // else get all the info for the page

        this.goldCheck() // check to see if its the fastest time ever done

        setTimeout(function(){
            splits.round +1 >= splits.cs.length // check to see if its done
            ? this.end()
            : (splits.round = splits.round +1, this.setState({splits: splits})) // if not ++round 
        }.bind(this), 100)

        setTimeout(this.updateSplitter, 200)
        
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
        splits.gold = []
        splits.display = []
        splits.fighters = []
        splits.positions = []
        
        splits.started = false
        splits.done = false
        splits.dataSaved = false

        splits.botInfo.prev = "-"
        splits.botInfo.time = "0.00"
        splits.botInfo.sob = "-"
        splits.botInfo.pace = "-"
        
        this.setState({splits: splits, topVis: { opacity: 1}})
        setTimeout(this.resetUpdate, 50)
        
    };

    // set a timeout to insure that the data sent clears out on splitter 
    resetUpdate = () => {
        this.updateSplitter(this.state.splits);
    }

// ----------------------------------------------- time -----------------------------------------------------
   
    time = () => {
        let splits = Object.assign({}, this.state.splits); 
        let time = 0;
            splits.cs.map(split => (
                split.time
                ? time += this.timeInvert(split.time) : null
            ))
            
            splits.botInfo.time = this.timeConvert(time)
            this.setState({splits: splits});  
        }

// ----------------------------------------------- botInfo --------------------------------------------------
   
    botInfo = () => {
        let splits = Object.assign({}, this.state.splits); 
        let sob = 0; let pace = 0; let prev = [];
        
        //make sure there are pb splits to check 
        if(splits.pb[splits.round].time !== null){ 
            
            splits.gold.map(split => (sob += this.timeInvert(split.time))) // get some of best

            if(splits.cs[splits.round].time){
                let cs = this.timeInvert(splits.cs[splits.round].time)
                let pb = this.timeInvert(splits.pb[splits.round].time)

                cs <= pb
                ? ( 
                    prev = [pb - cs, "-"],
                    pace = this.timeInvert(splits.botInfo.pace) - prev[0]
                )
                : ( 
                    prev = [cs - pb, "+"],
                    pace = this.timeInvert(splits.botInfo.pace) + prev[0] 
                )
                
                prev[1] === "+"
                ? splits.positions[splits.round].prev = "behind"
                : splits.positions[splits.round].prev = "ahead"

                splits.botInfo.pace = this.timeConvert(pace)
                splits.botInfo.prev = prev[1] + this.timeConvert(prev[0])
                splits.botInfo.sob = this.timeConvert(sob)
                
                this.setState({splits: splits});
            }
        }    
    }

// ------------------------------------------------ delta ---------------------------------------------------
   
    delta = () => {
        let splits = Object.assign({}, this.state.splits); 
        let csTime = 0; let pbTime = 0; let delta = 0; 

        for(var i = 0; i <= splits.round; i++){
            csTime += this.timeInvert(splits.cs[i].time); // add cs to this point
            pbTime += this.timeInvert(splits.pb[i].time); // add pb to this point
        }
         
         csTime <= pbTime // if current splits are less than presonal best
         ? delta = [pbTime - csTime, "-"] // <----------------------------
         : delta = [csTime - pbTime, "+"]

         delta[1] === "+"
         ? splits.positions[splits.round].delta = "behind"
         : splits.positions[splits.round].delta = "ahead"

         splits.display[splits.round].delta = delta[1] + this.timeConvert(delta[0])
         
         this.setState({splits: splits});
    }


// --------------------------------------------- goldCheck ---------------------------------------------------
   
    goldCheck = () => {
        let splits = Object.assign({}, this.state.splits); 
        
        if(splits.gold[splits.round].time === null) {
           splits.gold[splits.round] = { 
                KD1: splits.cs[splits.round].KD1, 
                KD2: splits.cs[splits.round].KD2, 
                time: splits.cs[splits.round].time
            }
            API.updateSplit(this.state.splitsId, {gold: splits.gold}).catch(err => console.log(err));
        } else {
           if( this.timeInvert(splits.cs[splits.round].time) < this.timeInvert(splits.gold[splits.round].time)) {
            splits.gold[splits.round] = { 
                KD1: splits.cs[splits.round].KD1,
                KD2: splits.cs[splits.round].KD2, 
                time:splits.cs[splits.round].time
            }
            API.updateSplit(this.state.splitsId, {gold: splits.gold}).catch(err => console.log(err));
            splits.positions[splits.round].gold = "gold"
           }           
        }      
        this.setState({splits: splits});
    }

//-------------------------------------------- TimeConvert -------------------------------------------------
// function for converting the way the time looks

     timeConvert = (time) =>{
        let minutes = Math.floor(time/ 60);
        let seconds = time - minutes * 60;
            seconds = seconds.toFixed(2);
        if (seconds < 10) seconds = "0" + seconds;
    
        if(minutes === 0) return seconds;
        else return minutes + ":" + seconds;
    }


//--------------------------------------------- TimeInvert -------------------------------------------------
// function for converting the way the time looks

    timeInvert = (time) =>{
        let newTime = time.split(":")
         
        if(newTime.length === 1) return parseFloat(newTime[0])
        if(newTime.length === 2) return parseInt(newTime[0] * 60, 10) + parseFloat(newTime[1])      
    }
// ----------------------------------------------- end -----------------------------------------------------
    
    end = () => {
        let splits = Object.assign({}, this.state.splits); 
        splits.done = true
        this.setState({topVis: { opacity: 0}, splits: splits} )
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
                                                    fighter={this.state.splits.fighters[this.state.splits.round]}
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
                                            <button type="button" className="btn btn-sm btn-secondary controlBtn" disabled={this.readyCheck("reset")}  onClick={this.reset}     name="bestInfo"><Icon id="fas fa-undo-alt" /> Reset </button>
                                            <button type="button" className="btn btn-sm btn-secondary controlBtn" disabled={this.readyCheck("expand")} onClick={this.expand}    name="bestInfo"><Icon id="fas fa-expand" /> </button>
                                            <button type="button" className="btn btn-sm btn-secondary controlBtn" disabled={this.readyCheck("prev")}   onClick={this.prev}      name="bestInfo"><Icon id="fas fa-step-backward" /> </button>
                                            <button type="button" className="btn btn-sm btn-secondary controlBtn" disabled={this.readyCheck("play")}   onClick={this.startRun}  name="bestInfo"><Icon id="fas fa-play" /> Start </button>
                                            <button type="button" className="btn btn-sm btn-secondary controlBtn" disabled={this.readyCheck("next")}   onClick={this.next}      name="bestInfo"><Icon id="fas fa-step-forward" />  </button>
                                            <button type="button" className="btn btn-sm btn-secondary controlBtn" disabled={this.readyCheck("save")}   onClick={this.save}      name="bestInfo"><Icon id="fas fa-save" /> Save </button>
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
                                                            fighter={this.state.splits.fighters[i]}
                                                            splits={this.state.splits.cs[i]}
                                                            i={i} 
                                                            inputChange={this.inputChange}
                                                            submitTime={this.submitTime}
                                                            currentRound={this.state.splits.round} 
                                                        />
                                                    ))
                                                : null
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