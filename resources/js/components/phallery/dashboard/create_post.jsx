import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Cookies from "universal-cookie";

class CreatePost extends Component {
    constructor(props) {
        super(props);

        let sanctumTokenCookie = new Cookies();
        let sanctumToken = sanctumTokenCookie.get("sanctum_token");
        this.state = {
            modalShow: false,
            postText: "",
            file: "",
            authToken: sanctumToken,
            message: "",
            isSuccess: false,
            loading: false
        };

        this.displayModal = this.displayModal.bind(this);
        this.postTextChanged = this.postTextChanged.bind(this);
        this.onFileChanged = this.onFileChanged.bind(this);
        this.getFileType = this.getFileType.bind(this);
        this.createPost = this.createPost.bind(this);
    }

    displayModal(value) {
        this.setState({ modalShow: value });
        if (!value) {
            this.setState({ message: "" });
        }
    }

    postTextChanged(e) {
        this.setState({ postText: e.target.value });
    }

    onFileChanged(e) {
        this.setState({ file: e.target.files[0] });
    }

    getFileType() {
        const [fileType] = this.state.file.type.split("/");
        return fileType;
    }

    createPost(e) {
        e.preventDefault();
        this.setState({ loading: true });
        axios.defaults.headers.common = {
            Authorization: "Bearer " + this.state.authToken
        };

        const formData = new FormData();
        formData.append("post_text", this.state.postText);
        formData.append("post_image", this.state.file);

        axios
            .post("http://localhost:8000/api/post/create", formData)
            .then(res => {
                if (res.data.status === "success") {
                    this.setState({
                        file: "",
                        postText: "",
                        message: res.data.message,
                        isSuccess: true,
                        loading: false
                    });
                } else {
                    this.setState({
                        message: res.data.message,
                        isSuccess: false,
                        loading: false
                    });
                }
            })
            .catch(error => {
                this.setState({
                    message: error.message,
                    isSuccess: false,
                    loading: false
                });
            });
    }

    render() {
        const { icon, btnText, btnClass } = !this.state.loading
            ? {
                  icon: "fa fa-plus-square",
                  btnText: "Create",
                  btnClass: "btn btn-success"
              }
            : {
                  icon: "fa fa-spinner fa-pulse",
                  btnText: "Creating",
                  btnClass: "btn btn-dark"
              };

        const alertType = this.state.isSuccess
            ? "alert-success"
            : "alert-danger";

        const alertClass =
            "alert " + alertType + " alert-dismissible fade show";

        const bannerAlert =
            this.state.message != "" ? (
                <div className={alertClass} role="alert">
                    <strong>{this.state.message}</strong>
                </div>
            ) : (
                ""
            );

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
        const isFilePresent = this.state.file != "";
        const fileType = isFilePresent ? this.getFileType() : "";
        const imageValidity = isFilePresent ? fileType === "image" : false;
        const message = isFilePresent
            ? imageValidity
                ? imgSuccess
                : imgError
            : " ";

        const btnDisabled = !this.state.loading
            ? !(imageValidity && this.state.postText.trim() != "")
            : this.state.loading;

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
                        {bannerAlert}
                        <form onSubmit={this.createPost}>
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
                                    {message}
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
                                    className={btnClass}
                                    disabled={btnDisabled}
                                >
                                    <span className={icon}></span>
                                    &nbsp; {btnText}
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
