import React, { Component } from "react";
import API from "../../utils/API";
import Profile from "../../components/Profile";
import Controls from "../../components/Controls";
import Splitter from "../../components/Splitter";
import "./Main.css";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    // when component mounts get user by params in URL
    componentDidMount() {this.getUser(this.props.match.params.id)}

// -------------------------------------------- getUser ----------------------------------------------------
//Get user by ID and check to make sure signed in and only on there personal page

    getUser = (id) => {
        API.getUser(id)
            .then(res => { 
            if(!res.data.results || id !== res.data.results._id) this.props.history.push("/")
            else this.setState({user: res.data.results})  
            }
        ).catch(err => console.log(err));
    };

// -------------------------------------------- getUser ----------------------------------------------------
//Get user by ID and check to make sure signed in and only on there personal page

    refreshUser = (data) => {
    this.setState({user: data})
    };
    
    

// ------------------------------------------ Frontend Code ------------------------------------------------

    render() {
        return (
            <div className="container">
                <div className="row" id="outer">
                    <div className="col-lg-7">
                        <div className="col-12">
                            { this.state.user
                                ? <Profile user={this.state.user} refresh={this.refreshUser}/>
                                : console.log()
                            }
                        </div>
                        <div className="col-12">
                            {this.state.user
                                ?<Controls user={this.state.user} refresh={this.refreshUser}/>
                                :console.log()
                            }
                        </div>
                    </div>
                    <div className="col-lg-5">
                    {this.state.user
                                ?<Splitter user={this.state.user} />
                                :console.log()
                            }     
                    </div>
                </div>     
            </div>          
        );
    }
}

export default Main;
