import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

class NotificationModal extends Component {
    constructor(props) {
        super(props);
        this.state = { notificationBoxDisplay: this.props.show };
        this.displayNotificationBox = this.displayNotificationBox.bind(this);
    }

    displayNotificationBox(value) {
        this.setState({ notificationBoxDisplay: value });
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
                            <span className="fa fa-bell"></span>
                            &nbsp;Notification
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.props.message}</p>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        );
    }
}

export default NotificationModal;
