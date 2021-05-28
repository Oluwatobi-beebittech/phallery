import React, { Component } from "react";
import Nav from "../nav";
import Banner from "../banner";

class ViewProfile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <Nav hasNotification={true} count={9} />
                <Banner text="View Profile" />
                <div className="container">
                    <div className="img-circle-wrapper-profile">
                        <img
                            src="http://localhost:8000/profile/SJGKVE5UNVESVCW7BBOHKQCZVE.png"
                            className="img-circle"
                        />
                    </div>

                    <p></p>
                </div>
            </React.Fragment>
        );
    }
}
export default ViewProfile;
