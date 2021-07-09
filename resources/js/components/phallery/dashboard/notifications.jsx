import React, { Component } from "react";
import Banner from "./banner";
import Nav from "./nav";
import Notification from "./notification/notification";
import axios from "axios";
import Cookies from "universal-cookie";
import { DOMAIN_NAME } from "../env";

/**
 * Notifications
 *
 * @props default
 *
 * Page for notifications
 */

class Notifications extends Component {
    constructor(props) {
        super(props);

        const sanctumCookie = new Cookies();
        const sanctumToken = sanctumCookie.get("sanctum_token");
        axios.defaults.headers.common = {
            Authorization: "Bearer " + sanctumToken
        };

        const cancelToken = axios.CancelToken;
        this.source = cancelToken.source();
        this.configAxios = { cancelToken: this.source.token };

        this.state = { notifications: [], isNotificationChecked: false };

        this.getUnReadNotifications = this.getUnReadNotifications.bind(this);
    }

    componentDidMount() {
        this.getUnReadNotifications();
    }

    getUnReadNotifications() {
        axios
            .get(`${DOMAIN_NAME}/api/notification`)
            .then(res => {
                console.log(res);
                this.setState({ notfications: res.data });
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("Notification component Unmounted");
                } else {
                    console.log(error);
                }
            });
    }

    render() {
        return (
            <React.Fragment>
                <Nav />
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
                        <Notification />
                        <Notification read={true} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Notifications;
