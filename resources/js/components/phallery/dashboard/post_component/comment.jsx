import React, { Component } from "react";
class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = { isClicked: false, count: this.props.count };
        this.onCommentClicked = this.onCommentClicked.bind(this);
    }
    onCommentClicked(e) {
        e.preventDefault();
        const previousClick = this.state.isClicked;
        const countAdjust = previousClick
            ? this.state.count - 1
            : this.state.count + 1;
        this.setState({ isClicked: !previousClick, count: countAdjust });
    }

    render() {
        const color = this.state.isClicked
            ? "fa fa-comment-dots text-success"
            : "far fa-comment-dots";
        const classText = color + " fa-2x text-decoration-none";
        return (
            <React.Fragment>
                <p className="h5 font-weight-bold">{this.state.count}</p>
                <a
                    href=""
                    className={classText}
                    onClick={this.onCommentClicked}
                ></a>
            </React.Fragment>
        );
    }
}

export default Comment;
