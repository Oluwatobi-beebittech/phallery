import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

class NotificationModal extends Component {
    constructor(props) {
        super(props);
        this.state = { notificationBoxDisplay: true };
        this.displayNotificationBox = this.displayNotificationBox.bind(this);
    }

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
