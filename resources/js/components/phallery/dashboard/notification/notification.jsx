import React, { Component } from "react";
import NotificationModal from "./notificationModal";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false };
        this.displayNotificationModal = this.displayNotificationModal.bind(
            this
        );
    }

    displayNotificationModal(e) {
        e.preventDefault();
        this.setState({ showModal: true });
    }

    render() {
        const notificationModal = this.state.showModal ? (
            <NotificationModal show={true} />
        ) : (
            ""
        );
        return (
            <React.Fragment>
                <a
                    href=""
                    className="list-group-item list-group-item-action flex-column align-items-start"
                    onClick={this.displayNotificationModal}
                >
                    <small className="float-right">3 days ago</small>

                    <p className="mb-1">
                        <span className="fa fa-check"></span>&nbsp; Test Donec
                        id elit non mi porta gravida at eget metus. Maecenas sed
                        diam eget risus varius blandit.
                    </p>
                </a>

                {notificationModal}
            </React.Fragment>
        );
    }
}

export default Notification;
