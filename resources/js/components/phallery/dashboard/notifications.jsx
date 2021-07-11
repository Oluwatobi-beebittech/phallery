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
        this.markAllAsRead = this.markAllAsRead.bind(this);
    }

    componentDidMount() {
        this.getUnReadNotifications();
    }

    componentWillUnmount() {
        this.source.cancel("Notification component unmounted");
    }

    getUnReadNotifications() {
        axios
            .get(`${DOMAIN_NAME}/api/notification`, this.configAxios)
            .then(res => {
                console.log(res);
                this.setState({
                    notifications: res.data,
                    isNotificationChecked: true
                });
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("Notification component Unmounted");
                } else {
                    console.log(error);
                    this.setState({ isNotificationChecked: true });
                }
            });
    }

    markAllAsRead(e) {
        e.preventDefault();
        axios
            .get(`${DOMAIN_NAME}/api/notification/read/all`)
            .then(res => {
                console.log(res);
                if (res.data.status === "success") {
                    const allReadNotify = [...this.state.notifications];
                    allReadNotify.map(item => {
                        item.was_read = true;
                    });
                    this.setState({ notifications: allReadNotify });
                }
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("Notification unmounted");
                } else {
                    console.log(error);
                }
            });
    }

    render() {

        const markBtnDisabled = _.isEmpty(this.state.notifications);
        return (
            <React.Fragment>
                <Nav />
                <Banner text="Notifications" />

                <div className="container my-3">
                    <div className="text-center bg-white py-2">
                        <button
                            className="btn btn-outline-success"
                            onClick={this.markAllAsRead}
                            disabled = {markBtnDisabled}
                        >
                            <span className="fa fa-tasks fa-1x"> </span>
                            <span className="h5"> Mark all as read</span>
                        </button>
                    </div>
                    <div className="list-group">
                        {this.state.isNotificationChecked ? (
                            !_.isEmpty(this.state.notifications) ? (
                                this.state.notifications.map(item => (
                                    <Notification
                                        key={item.notification_id}
                                        message={item.message}
                                        read={item.wasRead}
                                        time_elapsed={item.timeElapsed}
                                        notification_id={item.notification_id}
                                    />
                                ))
                            ) : (
                                <p className="text-muted font-weight-bold text-center">
                                    You have no notifications to show
                                </p>
                            )
                        ) : (
                            <div className="font-weight-bold text-center">
                                <span className="fa fa-spinner fa-pulse fa-3x"></span>
                                <p className="">Loading</p>
                            </div>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Notifications;
