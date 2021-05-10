import React, { Component } from "react";
import Banner from "./banner";
import Nav from "./nav";
class Notifications extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav />
                <Banner text="Notifications" />
            </React.Fragment>
        );
    }
}

export default Notifications;
