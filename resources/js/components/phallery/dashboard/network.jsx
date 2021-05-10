import React, { Component } from "react";
import Nav from "./nav";
import Banner from "./banner";

class Network extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav />
                <Banner text="My Network" />
            </React.Fragment>
        );
    }
}

export default Network;
