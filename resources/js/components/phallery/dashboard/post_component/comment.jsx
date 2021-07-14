import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Cookies from "universal-cookie";
import { withRouter } from "react-router";
import { DOMAIN_NAME } from "../../env";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCommented: this.props.self_comment,
            count: this.props.count,
            commentBoxDisplay: false,
            commentText: "",
            comments: [],
            isSendClicked: false
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
        this.viewUserProfile = this.viewUserProfile.bind(this);
    }

    onCommentClicked(e) {
        e.preventDefault();
        this.displayCommentBox(true);
    }

    displayCommentBox(value) {
        this.setState({ commentBoxDisplay: value });
    }

    commentTextChanged(e) {
        this.setState({ commentText: e.target.value });
    }

    handleCommentSubmit(e) {
        e.preventDefault();
        this.setState({ isSendClicked: true });
        const data = {
            post_id: this.props.postId,
            comment: this.state.commentText
        };
        axios
            .post(`${DOMAIN_NAME}/api/post/comment`, data, this.configAxios)
            .then(result => {
                let currentCount = this.state.count;
                this.setState({
                    count: currentCount + 1,
                    hasCommented: true,
                    commentText: "",
                    isSendClicked: false
                });
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("Coomment component unmounted");
                } else {
                    console.log(error);
                    this.setState({ isSendClicked: false });
                }
            });
    }

    loadComments() {
        axios
            .get(
                `${DOMAIN_NAME}/api/post/comment/${this.props.postId}`,
                this.configAxios
            )
            .then(result => {
                console.log(result);
                this.setState({ comments: result.data });
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("Comment unmounted");
                } else {
                    console.log(error);
                }
            });
    }

    viewUserProfile(userObject) {
        userObject.email === "unknown@xyz.com"
            ? ""
            : this.props.history.push("/dashboard/search", userObject);
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
        const { btnClassText, btnIcon } = this.state.isSendClicked
            ? { btnClassText: "btn-dark", btnIcon: "fa-spinner fa-pulse" }
            : { btnClassText: "btn-primary", btnIcon: "fa-chevron-right" };
        const color = this.state.hasCommented
            ? "fa fa-comment-dots text-success"
            : "far fa-comment-dots";
        const classText = color + " fa-2x text-decoration-none";
        const isDisabled =
            this.state.commentText.trim() !== "" && !this.state.isSendClicked
                ? false
                : true;
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
                            <p>{this.props.postText}</p>
                            <div className="d-flex flex-column">
                                {this.state.comments.map(item =>
                                    !item.isOwnComment ? (
                                        <div
                                            className="col-md-6 p-2 rounded-15 chat-box my-1"
                                            key={item.comment_id}
                                        >
                                            <a
                                                className="font-weight-bold text-decoration-none text-primary"
                                                href=""
                                                onClick={e => {
                                                    e.preventDefault();
                                                    this.viewUserProfile({
                                                        email: item.email,
                                                        first_name:
                                                            item.first_name,
                                                        last_name:
                                                            item.last_name,
                                                        profile_image:
                                                            item.profile_image,
                                                        posts: [],
                                                        isPostAvailabilityChecked: false,
                                                        isFollowingChecked: false,
                                                        isFollowing: false
                                                    });
                                                }}
                                            >
                                                {item.first_name +
                                                    " " +
                                                    item.last_name}
                                            </a>
                                            <p>{item.comment}</p>
                                            <small className="float-right font-weight-light">
                                                {item.time_elapsed}
                                            </small>
                                        </div>
                                    ) : (
                                        <div key={item.comment_id}>
                                            <div className="col-md-6 p-2 rounded-15 chat-box float-right my-1">
                                                <a
                                                    className="font-weight-bold text-decoration-none text-primary"
                                                    href=""
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        this.props.history.push(
                                                            "/dashboard/profile"
                                                        );
                                                    }}
                                                >
                                                    {item.first_name +
                                                        " " +
                                                        item.last_name +
                                                        " (You)"}
                                                </a>
                                                <p>{item.comment}</p>
                                                <small className="float-right font-weight-light">
                                                    {item.time_elapsed}
                                                </small>
                                            </div>
                                        </div>
                                    )
                                )}
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
                                        className={"btn " + btnClassText}
                                        disabled={isDisabled}
                                        onClick={this.handleCommentSubmit}
                                    >
                                        Send{" "}
                                        <span
                                            className={"fa " + btnIcon}
                                        ></span>
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

export default withRouter(Comment);
