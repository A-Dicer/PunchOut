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
                delta: [],
                fighters: [],
                botInfo:  { time: null, sob: null, pace: null, prev: null},
                round: 0,
                done: false         
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
                        console.log(res.data.results)
                        let newSplits = Object.assign({}, res.data.results); 
                        newSplits.user = this.state.user.userName
                        delete newSplits._id


                        API.saveNewSplits(newSplits)
                            .then(res => { 
                                console.log(res)
                                let user = Object.assign({}, this.state.user);
                                user.splits[game].push(res.data._id)
                                this.setState({user})
                                this.setState({splitsId: res.data._id})
                                API.updateUser(this.state.user._id, this.state.user)
                            }).catch(err => console.log(err));
                    }

                    let splits = Object.assign([], this.state.splits); //grab split info from state
                   
                     
                    splits.topInfo.game = this.state.gameTitle[0]
                    splits.topInfo.category = this.state.gameCategory
                    splits.topInfo.gameImg = this.state.games[this.state.gameTitle[1]].img

                    splits.pb = res.data.results.pb
                    splits.fighters = res.data.results.fighters
                    splits.gold = res.data.results.gold

                    splits.botInfo.time = "0.00"
                    splits.botInfo.prev = "-"
                    splits.botInfo.pace = res.data.results.time
                    res.data.results.pb.map((i => splits.cs.push({KD1: '', KD2: '', time: ''}))) //create blank splits to fill
                    
              
                    setTimeout(this.botInfo, 500)
                   

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
        this.timeInvert(value)
    };

// ----------------------------------------------- save -----------------------------------------------------
   
    save = () => {
        let splits = Object.assign({}, this.state.splits); 
        let info = []
        
        for(let i = 0; i < splits.pb.length; i++){
            info.push(
                {
                    KD1: this.timeInvert(splits.cs[i].KD1), 
                    KD2: this.timeInvert(splits.cs[i].KD2), 
                    time: this.timeInvert(splits.cs[i].time)
                }
            )
        }
        splits.pb = info
        
       
            this.savePb(splits)

        
        
        
    };
//------------------------------------------
 savePb = (data) => {

    console.log("save pb")
        console.log(data)
        console.log("--------")
        
        let test =  {
            time: data.botInfo.time,
            pb: data.pb
        }

        console.log(test)
    API.updateSplit(this.state.splitsId, test)
    .then(res => { 

    }
).catch(err => console.log(err));
 }

// ------------------------------------------- submitTime -------------------------------------------------
   
    submitTime = event => {
        const {value, id} = event.target;
        if (value && parseInt(id, 10) === this.state.splits.round && event.key === "Enter") this.next()   
    };

// ----------------------------------------------- next ----------------------------------------------------
   
    next = event => { 
        let splits = Object.assign({}, this.state.splits);
        
        this.goldCheck()
        this.time()

        splits.pb[splits.round].time === null
        ? splits.delta[splits.round] = "-"
        : ( this.botInfo(), this.delta())

        setTimeout(function(){
            splits.round +1 >= splits.cs.length
            ? this.end()
            : (splits.round = splits.round +1, this.setState({splits: splits}))
        }.bind(this), 100)
        
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
        splits.delta = []
        splits.fighters = []
        
        splits.started = false
        splits.done = false

        splits.game = ""
        splits.category = ""
        splits.gameImg = ""

        splits.botInfo.prev = ""
        splits.botInfo.time = ""
        splits.botInfo.sob = ""
        splits.botInfo.pace = ""
        
        this.setState({splits: splits});
    };

// ----------------------------------------------- time -----------------------------------------------------
   
    time = () => {
        let splits = Object.assign({}, this.state.splits); 
        let time = 0;

            splits.cs.map(split => (
                split.time
                ? time += this.timeInvert(split.time)
                : console.log()  
            ))
            
            splits.botInfo.time = this.timeConvert(time)

            this.setState({splits: splits}); 
            console.log(this.state.splits)  
        }

// ----------------------------------------------- botInfo --------------------------------------------------
   
    botInfo = () => {
        let splits = Object.assign({}, this.state.splits); 
        let sob = 0; let pace = 0; let prev = [];
        
        if(splits.pb[splits.round].time !== null){
            
            splits.gold.map(split => (sob += split.time))
            
            if(splits.cs[splits.round].time){
                console.log(splits.cs[splits.round])

            this.timeInvert(splits.cs[splits.round].time) <= splits.pb[splits.round].time
            ? ( 
                prev = [splits.pb[splits.round].time - this.timeInvert(splits.cs[splits.round].time), "-"],
                pace = this.timeInvert(splits.botInfo.pace) - prev[0]
            )
            : ( 
                prev = [this.timeInvert(splits.cs[splits.round].time) - splits.pb[splits.round].time, "+"],
                pace = this.timeInvert(splits.botInfo.pace) + prev[0] 
            )
           

            splits.botInfo.pace = this.timeConvert(pace)
            splits.botInfo.prev = prev[1] + this.timeConvert(prev[0])
            splits.botInfo.sob = this.timeConvert(sob)
            
            // this.setState({splits: splits});
            }
        } else {
            splits.botInfo.pace = "-"
            splits.botInfo.sob = "-"
        }
    }

// ------------------------------------------------ delta ---------------------------------------------------
   
    delta = () => {
        let splits = Object.assign({}, this.state.splits); 
        let csTime = 0; let pbTime = 0; let delta = 0;

        for(var i = 0; i <= splits.round; i++){
            csTime += this.timeInvert(splits.cs[i].time);
            pbTime += splits.pb[i].time
        }
         
         csTime <= pbTime
         ? delta = [pbTime - csTime, "-"]
         : delta = [csTime - pbTime, "+"]

         console.log(csTime)
         console.log(pbTime)

         console.log(delta)
         splits.delta[splits.round] = delta[1] + this.timeConvert(delta[0])
         this.setState({splits: splits});
    }


// --------------------------------------------- goldCheck ---------------------------------------------------
   
    goldCheck = () => {
        let splits = Object.assign({}, this.state.splits); 
        
       if(splits.gold[splits.round].time === null) {
           splits.gold[splits.round] = { KD1: this.timeInvert(splits.cs[splits.round].KD1), KD2: this.timeInvert(splits.cs[splits.round].KD2), time: this.timeInvert(splits.cs[splits.round].time)}
        
           this.saveGold(splits.gold);
       }
       else {
           if( this.timeInvert(splits.cs[splits.round].time) < splits.gold[splits.round].time) {
            splits.gold[splits.round] = { KD1: this.timeInvert(splits.cs[splits.round].KD1), KD2: this.timeInvert(splits.cs[splits.round].KD2), time: this.timeInvert(splits.cs[splits.round].time)}
               this.saveGold(splits.gold);
           }
       }      
        this.setState({splits: splits});
    }

// --------------------------------------------- saveGold ---------------------------------------------------
   
    saveGold = (data) => {
        console.log("save Gold")
        let info =  {$set: { gold: data}}
        
        API.updateSplit(this.state.splitsId, info)
            .then(res => { 
                console.log(res)
            }
        ).catch(err => console.log(err));
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