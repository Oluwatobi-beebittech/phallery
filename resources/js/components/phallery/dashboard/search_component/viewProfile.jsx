import React, { Component } from "react";
import Nav from "../nav";
import Banner from "../banner";
import { withRouter } from "react-router";

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        if (typeof this.props.location.state === "undefined") {
            this.props.history.goBack();
        }
    }
    render() {
        return (
            <React.Fragment>
                <Nav hasNotification={true} count={9} />
                <Banner text="View Profile" />
                <div className="container pt-5">
                    <div className=" d-flex justify-content-center">
                        <div className="img-circle-wrapper-profile">
                            <img
                                src={
                                    "http://localhost:8000/" +
                                    this.props.location.state.profile_image
                                }
                                className="img-circle"
                                alt="profile image"
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="mx-auto btn btn-success my-3 font-weight-bold">
                            <span className="fa fa-plus"></span>&nbsp;Follow
                        </button>
                    </div>

                    <p></p>
                </div>
            </React.Fragment>
        );
    }
}
export default withRouter(ViewProfile);
