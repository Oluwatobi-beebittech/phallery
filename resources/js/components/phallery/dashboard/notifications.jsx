import React, { Component } from "react";
import Banner from "./banner";
import Nav from "./nav";
import Notification from "./notification/notification";

class Notifications extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav hasNotification={true} count={9} />
                <Banner text="Notifications" />

                <div className="container my-3">
                    <div className="text-center bg-white py-2">
                        <button className="btn btn-outline-success">
                            <span className="fa fa-tasks fa-1x"> </span>
                            <span className="h5"> Mark all as read</span>
                        </button>
                    </div>
                    <div className="list-group">
                        <Notification />
                        <a
                            href="#"
                            className="list-group-item list-group-item-action flex-column align-items-start"
                        >
                            <small className="float-right">3 days ago</small>

                            <p className="mb-1">
                                <span className="fa fa-check"></span>&nbsp;
                                Donec id elit non mi porta gravida at eget
                                metus. Maecenas sed diam eget risus varius
                                blandit.
                            </p>
                        </a>
                        <a
                            href="#"
                            className="list-group-item list-group-item-action flex-column align-items-start"
                        >
                            <small className="float-right">3 days ago</small>
                            <p className="mb-1">
                                <span className="fa fa-check"></span>&nbsp;
                                Donec id elit non mi porta gravida at eget
                                metus. Maecenas sed diam eget risus varius
                                blandit.
                            </p>
                        </a>
                        <a
                            href="#"
                            className="list-group-item list-group-item-action flex-column align-items-start"
                        >
                            <small className="float-right">3 days ago</small>
                            <p className="mb-1">
                                <span className="text-success fa fa-check"></span>
                                &nbsp; Donec id elit non mi porta gravida at
                                eget metus. Maecenas sed diam eget risus varius
                                blandit.
                            </p>
                        </a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Notifications;
