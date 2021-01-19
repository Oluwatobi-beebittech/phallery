import React, { Component } from "react";
import Nav from "./nav";
class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav />
                <a className="btn btn-dark">Get Started</a>
            </React.Fragment>
        );
    }
}

export default Home;
