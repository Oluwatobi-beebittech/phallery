import React, { Component } from "react";
import NotificationModal from "./notificationModal";

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
        this.state = { showModal: false };
        this.displayNotificationModal = this.displayNotificationModal.bind(
            this
        );
        this.displayNotificationCallback = this.displayNotificationCallback.bind(
            this
        );
    }

    /**
     * Sets the modal display to true
     * @param {Event} e 
     */
    displayNotificationModal(e) {
        e.preventDefault();
        this.displayNotificationCallback(true);
    }


    /**
     * Sets the state showModal to value
     * @param {Boolean} value 
     */
    displayNotificationCallback(value) {
        this.setState({ showModal: value });
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

        const readClass = this.props.read
            ? "fa fa-check text-success"
            : "fa fa-check";

        return (
            <React.Fragment>
                <a
                    href=""
                    className="list-group-item list-group-item-action flex-column align-items-start"
                    onClick={this.displayNotificationModal}
                >
                    <small className="float-right">{this.props.time_elapsed}</small>

                    <p className="mb-1">
                        <span className={readClass}></span>&nbsp; {this.props.message}
                    </p>
                </a>

                {notificationModal}
            </React.Fragment>
        );
    }
}

export default Notification;
