import React from "react";
import "./user.css";
import Icon from "../../components/Icon";
import PB from "../../components/PB";
import Options from "../../components/Options";

    const test = (id, action) => (
        document.getElementById("bestInfo").style.height = "420px"
    );

    const test2 = (id, action) => (
        document.getElementById("nextInfo").style.height = "420px"
    );

const User = props =>
    <div className="card mb-3">
        <div className="col-12" id="userImg">
            <h4 className="card-title text-center userName">{props.user.userName}</h4>
            <img className="userBgImg" src={props.user.imgLink} alt="Card cap" />   
            <div className="icon"  onClick={test}>
                <Icon  id="fas fa-sign-out-alt signOut" />
            </div>
        </div>
        
        <div className="card-body text-center">
            <img className="userImg" src={props.user.imgLink} alt="Card cap" />
            <p className="card-text"> Welcome to the Splitter.  If you have any questions about how the site works just ask in the Punch-Out!! Discord. </p>
            <div className="col-12 head">
                <button type="button" className="btn btn-sm btn-secondary bioBtn" onClick={test}><Icon id="fas fa-stopwatch" /> Best Times </button>
                <button type="button" className="btn btn-sm btn-secondary bioBtn" onClick={test2}><Icon id="fas fa-cogs" /> Split Options </button>
                <hr />
            </div>
                <div className="row bestInfo" id="bestInfo">
                    <div className="col-12">   
                    { props.user.splits
                        ?<div> 
                                {
                                    props.user.splits.mtpo.length
                                    ? <PB info={props.user.splits.mtpo} title="Mike Tyson's Punch-Out!!" img="mtpoBoxArt.jpg"/>
                                    : console.log()
                                } {
                                    props.user.splits.spo.length
                                    ? <PB info={props.user.splits.spo} title="Super Punch-Out!!" img="spoBoxArt.jpg"/>
                                    : console.log()
                                } {
                                    props.user.splits.powii.length
                                    ? <PB info={props.user.splits.powii} title="Punch-Out!! (Wii)" img="powiiBoxArt.jpg"/>
                                    : console.log()
                                }
                        </div>
                        :  <p className="card-text"><small className="text-muted"> You do not have any Saved Splits</small></p> 
                    }
            
                    </div>    
                </div>

                <div className="col-12 head">
                </div>
                <div className="row options" id="nextInfo">
                    <Options />
                </div>
            <hr />
            <p className="card-text"><small className="text-muted"> <Icon  id="fas fa-link" /> Your Splitter Link: <a href="...">user/{props.user._id}</a></small></p>
        </div>
    </div>
 
export default User;