import React, { Component } from "react";
import NotificationModal from "./notificationModal";
import axios from "axios";
import Cookies from "universal-cookie";
import { DOMAIN_NAME } from "../../env";

/**
 * Notification
 *
 * @state boolean showModal - Receives the prompt to display notification modal
 *
 * @props boolean read
 *
 * @method displayNotificationCallback
 *         displayNotificationModal
 */

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, was_read: this.props.read };

        const sanctumTokenCookie = new Cookies();
        const sanctumToken = sanctumTokenCookie.get("sanctum_token");

        axios.defaults.headers.common = {
            Authorization: "Bearer " + sanctumToken
        };

        const cancelToken = axios.CancelToken;
        this.source = cancelToken.source();
        this.configAxios = { cancelToken: this.source.token };

        this.displayNotificationModal = this.displayNotificationModal.bind(
            this
        );
        this.displayNotificationCallback = this.displayNotificationCallback.bind(
            this
        );
        this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    }

    /**
     * Sets the modal display to true
     * @param {Event} e
     */
    displayNotificationModal(e) {
        e.preventDefault();
        this.displayNotificationCallback(true);
        this.markNotificationAsRead();
    }

    /**
     * Sets the state showModal to value
     * @param {Boolean} value
     */
    displayNotificationCallback(value) {
        this.setState({ showModal: value });
    }

    markNotificationAsRead() {
        axios
            .get(
                `${DOMAIN_NAME}/api/notification/read/${this.props.notification_id}`,
                this.configAxios
            )
            .then(res => {
                console.log(res);
                if (res.data.status === "success") {
                    this.setState({ was_read: true });
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

    componentWillUnmount() {
        this.source.cancel("Notification component unmounted");
    }

    render() {
        const notificationModal = this.state.showModal ? (
            <NotificationModal
                notificationCallback={this.displayNotificationCallback}
                message={this.props.message}
            />
        ) : (
            ""
        );

        const readClass = this.state.was_read
            ? "fa fa-check text-success"
            : "fa fa-check";

        return (
            <React.Fragment>
                <a
                    href=""
                    className="list-group-item list-group-item-action flex-column align-items-start"
                    onClick={this.displayNotificationModal}
                >
                    <small className="float-right">
                        {this.props.time_elapsed}
                    </small>

                    <p className="mb-1">
                        <span className={readClass}></span>&nbsp;{" "}
                        {this.props.message}
                    </p>
                </a>

                {notificationModal}
            </React.Fragment>
        );
    }
}

export default Notification;
