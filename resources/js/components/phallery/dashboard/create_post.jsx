import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = { modalShow: false, postText: "", file: "" };
        this.displayModal = this.displayModal.bind(this);
        this.postTextChanged = this.postTextChanged.bind(this);
        this.onFileChanged = this.onFileChanged.bind(this);
    }

    displayModal(value) {
        this.setState({ modalShow: value });
    }

    postTextChanged(e) {
        this.setState({ postText: e.target.value });
    }

    onFileChanged(e) {
        this.setState({ file: e.target.files[0] });
    }

    checkImageValidity() {
        if (this.state.file.type.substring(0, 5) != "image") {
            return false;
        }
        return true;
    }

    render() {
        const imgError = (
            <p className="text-danger font-weight-bold">
                You have to upload an image &nbsp;
                <span className="text-danger fa fa-times"></span>
            </p>
        );
        const imgSuccess = (
            <p className="font-weight-bold">
                <span className="fa fa-file-image"></span>
                &nbsp;{this.state.file.name}&nbsp;
                <span className="text-success fa fa-check"></span>
            </p>
        );
        const fileStatus =
            this.state.file != ""
                ? this.checkImageValidity
                    ? imgSuccess
                    : imgError
                : "";

        const btnDisabled =
            this.state.file != ""
                ? this.state.postText != "" && this.checkImageValidity
                    ? false
                    : true
                : true;
        return (
            <React.Fragment>
                <button
                    className="btn btn-outline-success my-3"
                    onClick={() => this.displayModal(true)}
                >
                    <span className="fa fa-plus-square"></span>
                    &nbsp;Create a post
                </button>

                <Modal
                    size="lg"
                    show={this.state.modalShow}
                    onHide={() => this.displayModal(false)}
                    aria-labelledby="create-post"
                    centered
                >
                    <Modal.Header closeButton className="bg-dark text-white">
                        <Modal.Title id="create-post">
                            <span className="fa fa-edit"></span>&nbsp;Create a
                            post
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="card-post">Post</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        rows="3"
                                        id="card-post"
                                        onChange={this.postTextChanged}
                                        value={this.state.postText}
                                        placeholder="Write the post"
                                        maxLength={300}
                                        aria-describedby="cardPostHelpText"
                                    />
                                    <small
                                        id="cardPostHelpText"
                                        className="form-text text-muted float-right"
                                    >
                                        {this.state.postText.length}/300
                                    </small>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label
                                        htmlFor="card-upload"
                                        className="btn btn-primary"
                                    >
                                        <span className="fa fa-upload"></span>
                                        &nbsp;Upload photo
                                    </label>
                                    {fileStatus}
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="card-upload"
                                        onChange={this.onFileChanged}
                                        hidden
                                    />
                                </div>
                            </div>

                            <div className="col-md-12 mx-auto text-center">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={btnDisabled}
                                >
                                    <span className="fa fa-plus-square"></span>
                                    &nbsp; Create
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        );
    }
}

export default CreatePost;
