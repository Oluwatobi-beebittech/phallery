import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Cookies from "universal-cookie";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCommented: this.props.self_comment,
            count: this.props.count,
            commentBoxDisplay: false,
            commentText: "",
            comments: []
        };

        const sanctumTokenCookie = new Cookies();
        const sanctumToken = sanctumTokenCookie.get("sanctum_token");
        axios.defaults.headers.common = {
            Authorization: "Bearer " + sanctumToken
        };

        const cancelToken = axios.CancelToken;
        this.source = cancelToken.source();
        this.configAxios = { cancelToken: this.source.token };

        this.onCommentClicked = this.onCommentClicked.bind(this);
        this.commentTextChanged = this.commentTextChanged.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.loadComments = this.loadComments.bind(this);
    }

    onCommentClicked(e) {
        e.preventDefault();
        this.displayCommentBox(true);
        const previouslyCommented = this.state.hasCommented;

        this.setState({ hasCommented: !previouslyCommented });
    }

    displayCommentBox(value) {
        this.setState({ commentBoxDisplay: value });
    }

    commentTextChanged(e) {
        this.setState({ commentText: e.target.value });
    }

    handleCommentSubmit(e) {
        e.preventDefault();
        const data = {
            post_id: this.props.postId,
            comment: this.state.commentText
        };
        axios
            .post(
                "http://localhost:8000/api/post/comment",
                data,
                this.configAxios
            )
            .then(result => {
                let currentCount = this.state.count;
                this.setState({ count: currentCount + 1, hasCommented: true });
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("Coomment component unmounted");
                } else {
                    console.log(error);
                }
            });
    }

    loadComments() {
        axios
            .get(
                "http://localhost:8000/api/post/comment/" + this.props.postId,
                this.configAxios
            )
            .then(result => {
                console.log(result);
                this.setState({ comment: result.data });
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("Comment unmounted");
                } else {
                    console.log(error);
                }
            });
    }

    componentDidMount() {
        this.loadComments();
    }

    componentDidUpdate() {
        this.loadComments();
    }

    componentWillUnmount() {
        this.source.cancel();
    }

    render() {
        const color = this.state.hasCommented
            ? "fa fa-comment-dots text-success"
            : "far fa-comment-dots";
        const classText = color + " fa-2x text-decoration-none";
        const isDisabled = this.state.commentText.trim() != "" ? false : true;
        return (
            <React.Fragment>
                <p className="h5 font-weight-bold">{this.state.count}</p>
                <a
                    href=""
                    className={classText}
                    onClick={this.onCommentClicked}
                ></a>

                <Modal
                    size="md"
                    show={this.state.commentBoxDisplay}
                    onHide={() => this.displayCommentBox(false)}
                    aria-labelledby={"create-comment-" + this.props.caller}
                    centered
                >
                    <Modal.Header closeButton className="bg-dark text-white">
                        <Modal.Title id={"create-comment-" + this.props.caller}>
                            <span className="fa fa-comment-dots"></span>
                            &nbsp;Comments
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="comment-box p-2 rounded-15 mb-1">
                            <p>
                                This is a wider card with supporting text below
                            </p>
                            <div className="d-flex flex-column">
                                <div className="col-md-6 p-2 rounded-15 chat-box my-1">
                                    <a
                                        className="font-weight-bold text-decoration-none text-primary"
                                        href=""
                                    >
                                        Oluwatobi Akanji
                                    </a>
                                    <p>gffj</p>
                                    <small className="float-right font-weight-light">
                                        24 June 2021
                                    </small>
                                </div>
                                <div className="col-md-6 p-2 rounded-15 chat-box my-1">
                                    <p className="font-weight-bold">
                                        Oluwatobi Akanji
                                    </p>
                                    <p>gffj</p>
                                    <small className="float-right font-weight-light">
                                        24 June 2021
                                    </small>
                                </div>
                                <div className="col-md-6 p-2 rounded-15 chat-box my-1">
                                    <p className="font-weight-bold">
                                        Oluwatobi Akanji
                                    </p>
                                    <p>gffj</p>
                                    <small className="float-right font-weight-light">
                                        24 June 2021
                                    </small>
                                </div>
                                <div>
                                    <div className="col-md-6 p-2 rounded-15 chat-box float-right my-1">
                                        <p className="font-weight-bold">You</p>
                                        <p>gffj</p>
                                        <small className="float-right font-weight-light">
                                            24 June 2021
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form>
                            <div className="form-row">
                                <div className="col-md-9">
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        rows="3"
                                        id={"card-comment-" + this.props.caller}
                                        onChange={this.commentTextChanged}
                                        value={this.state.commentText}
                                        placeholder="Your comment"
                                        maxLength={100}
                                        aria-describedby={
                                            "cardCommentHelpText-" +
                                            this.props.caller
                                        }
                                    />
                                    <small
                                        id={
                                            "cardCommentHelpText-" +
                                            this.props.caller
                                        }
                                        className="form-text text-muted float-right"
                                    >
                                        {this.state.commentText.length}/100
                                    </small>
                                </div>
                                <div className=" d-flex flex-column justify-content-around text-center text-primary col-md-3">
                                    <button
                                        className="btn btn-primary"
                                        disabled={isDisabled}
                                        onClick={this.handleCommentSubmit}
                                    >
                                        Send{" "}
                                        <span className="fa fa-chevron-right"></span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Comment;
