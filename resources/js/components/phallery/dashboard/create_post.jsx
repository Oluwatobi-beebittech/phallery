import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Cookies from "universal-cookie";
import { DOMAIN_NAME } from "../env";

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

        axios.defaults.headers.common = {
            Authorization: "Bearer " + this.state.authToken
        };
        const cancelToken = axios.CancelToken;
        this.source = cancelToken.source();
        this.configAxios = { cancelToken: this.source.token };
    }

    componentWillUnmount() {
        this.source.cancel("Create post component unmounted");
    }
    /**
     * Sets the display state of the modal
     * @param {Boolean} value
     */
    displayModal(value) {
        this.setState({ modalShow: value });
        if (!value) {
            this.setState({ message: "" });
        }
    }

    /**
     * Sets the value of the post text from th epost text input field
     * @param {Event} e
     */
    postTextChanged(e) {
        this.setState({ postText: e.target.value });
    }

    /**
     * Sets the state of the file upload
     * @param {Event} e
     */
    onFileChanged(e) {
        this.setState({ file: e.target.files[0] });
    }

    /**
     * Gets the type of file uploaded
     */
    getFileType() {
        const [fileType] = this.state.file.type.split("/");
        return fileType;
    }

    /**
     * Creates the post
     * @param {Event} e
     */
    createPost(e) {
        e.preventDefault();
        this.setState({ loading: true });

        const formData = new FormData();
        formData.append("post_text", this.state.postText);
        formData.append("post_image", this.state.file);

        axios
            .post(
                `${DOMAIN_NAME}/api/post/create`,
                formData,
                this.configAxios
            )
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
            this.state.message !== "" ? (
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
        const isFilePresent = this.state.file !== "";
        const fileType = isFilePresent ? this.getFileType() : "";
        const imageValidity = isFilePresent ? fileType === "image" : false;
        const message = isFilePresent
            ? imageValidity
                ? imgSuccess
                : imgError
            : " ";

        const btnDisabled = !this.state.loading
            ? !(imageValidity && this.state.postText.trim() !== "")
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
                    aria-labelledby={"create-post-" + this.props.caller}
                    centered
                >
                    <Modal.Header closeButton className="bg-dark text-white">
                        <Modal.Title id={"create-post-" + this.props.caller}>
                            <span className="fa fa-edit"></span>&nbsp;Create a
                            post
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {bannerAlert}
                        <form onSubmit={this.createPost}>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label
                                        htmlFor={
                                            "card-post-" + this.props.caller
                                        }
                                    >
                                        Post
                                    </label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        rows="3"
                                        id={"card-post-" + this.props.caller}
                                        onChange={this.postTextChanged}
                                        value={this.state.postText}
                                        placeholder="Write the post"
                                        maxLength={300}
                                        aria-describedby={
                                            "cardPostHelpText-" +
                                            this.props.caller
                                        }
                                    />
                                    <small
                                        id={
                                            "cardPostHelpText-" +
                                            this.props.caller
                                        }
                                        className="form-text text-muted float-right"
                                    >
                                        {this.state.postText.length}/300
                                    </small>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label
                                        htmlFor={
                                            "card-upload-" + this.props.caller
                                        }
                                        className="btn btn-primary"
                                    >
                                        <span className="fa fa-upload"></span>
                                        &nbsp;Upload photo
                                    </label>
                                    {message}
                                    <input
                                        type="file"
                                        className="form-control"
                                        id={"card-upload-" + this.props.caller}
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
