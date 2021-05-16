import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            count: this.props.count,
            commentBoxDisplay: false,
            commentText: ""
        };
        this.onCommentClicked = this.onCommentClicked.bind(this);
        this.commentTextChanged = this.commentTextChanged.bind(this);
    }
    onCommentClicked(e) {
        e.preventDefault();
        this.displayCommentBox(true);
        // const previousClick = this.state.isClicked;
        // const countAdjust = previousClick
        //     ? this.state.count - 1
        //     : this.state.count + 1;
        // this.setState({ isClicked: !previousClick, count: countAdjust });
    }

    displayCommentBox(value) {
        this.setState({ commentBoxDisplay: value });
    }

    commentTextChanged(e) {
        this.setState({ commentText: e.target.value });
    }

    render() {
        const color = this.state.isClicked
            ? "fa fa-comment-dots text-success"
            : "far fa-comment-dots";
        const classText = color + " fa-2x text-decoration-none";
        const isDisabled = this.state.commentText.trim() !="" ? false : true;
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
                    aria-labelledby="create-comment"
                    centered
                >
                    <Modal.Header closeButton className="bg-dark text-white">
                        <Modal.Title id="create-comment">
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
                                        id="card-post"
                                        onChange={this.commentTextChanged}
                                        value={this.state.commentText}
                                        placeholder="Your comment"
                                        maxLength={100}
                                        aria-describedby="cardCommentHelpText"
                                    />
                                    <small
                                        id="cardCommentHelpText"
                                        className="form-text text-muted float-right"
                                    >
                                        {this.state.commentText.length}/100
                                    </small>
                                </div>
                                <div className=" d-flex flex-column justify-content-around text-center text-primary col-md-3">
                                    <button className="btn btn-primary" disabled={isDisabled}>
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
