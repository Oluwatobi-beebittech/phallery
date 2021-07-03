import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

/**
 * @props Function notificationCallBack 
 * 
 * @state Boolean notificationBoxDisplay
 * 
 * @method displayNotificationBox
 */

class NotificationModal extends Component {
    constructor(props) {
        super(props);
        this.state = { notificationBoxDisplay: true };
        this.displayNotificationBox = this.displayNotificationBox.bind(this);
    }

    /**
     * Sets the current display choice for the notification box
     * and calls the callback function with same value.
     * This enables the to modal display on click of notification and
     * on hide of modal
     * @param {Boolean} value 
     */
    displayNotificationBox(value) {
        this.setState({ notificationBoxDisplay: value });
        this.props.notificationCallback(value);
    }
    render() {
        return (
            <React.Fragment>
                <Modal
                    size="md"
                    show={this.state.notificationBoxDisplay}
                    onHide={() => this.displayNotificationBox(false)}
                    aria-labelledby="create-notification"
                    centered
                >
                    <Modal.Header closeButton className="bg-dark text-white">
                        <Modal.Title id="create-notification">
                            <span className="far fa-bell"></span>
                            &nbsp;Notification
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.props.message}</p>
                        <div className="text-center">
                            <button
                                className="bt btn-sm btn-warning"
                                onClick={() =>
                                    this.displayNotificationBox(false)
                                }
                            >
                                I understand
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        );
    }
}

export default NotificationModal;
