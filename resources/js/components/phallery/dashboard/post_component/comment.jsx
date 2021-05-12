import React, { Component } from "react";
class Comment extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <a
                    href="#"
                    className="far fa-comment-dots fa-2x text-decoration-none"
                ></a>
                <span class="badge badge-pill badge-warning">
                    {this.props.count}
                </span>
            </React.Fragment>
        );
    }
}

export default Comment;
