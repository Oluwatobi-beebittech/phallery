import React, { Component } from "react";

class NotificationModal extends Component {
    constructor(props) {
        super(props);
        this.state = { notificationBoxDisplay: false };
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
                    aria-labelledby="create-comment"
                    centered
                >
                    <Modal.Header closeButton className="bg-dark text-white">
                        <Modal.Title id="create-comment">
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
