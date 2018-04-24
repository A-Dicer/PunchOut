import React, { Component } from "react";
import API from "../../utils/API";
import Profile from "../../components/Profile";
import Controls from "../../components/Controls";
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

// ------------------------------------------ Frontend Code ------------------------------------------------

    render() {
        return (
            <div className="container">
                <div className="row" id="outer">
                    <div className="col-lg-6 ">
                        <div className="col-12">
                            { this.state.user
                                ? <Profile user={this.state.user}/>
                                : <h4 className="text-center"> You have used an incorrect ID </h4>
                            }
                        </div>
                        <div className="col-12">
                            {this.state.user
                                ?<Controls user={this.state.user} />
                                :console.log()
                            }
                        </div>
                    </div>
                    <div className="col-lg-6 ">
                    {/*The splitter goes here */}
                    </div>
                </div>     
            </div>          
        );
    }
}

export default Main;
