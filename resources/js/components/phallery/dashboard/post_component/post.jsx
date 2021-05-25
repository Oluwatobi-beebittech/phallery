import React, { Component } from "react";
import Comment from "./comment";
import Like from "./like";
import Heart from "./heart";

class Post extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="card my-3 border-0 bg-none">
                <img
                    className="card-img-top mx-auto rounded shadow"
                    src={this.props.imgUrl}
                    alt="Card image cap"
                />
                <div className="card-body mx-auto bg-white rounded-bottom shadow w-100">
                    <p className="card-text">{this.props.text}</p>
                    <div className="card-text d-flex justify-content-around">
                        <Heart count={this.props.hearts} />
                        <Like count={this.props.likes} />
                        <Comment count={this.props.comments} caller={this.props.imgUrl} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;
