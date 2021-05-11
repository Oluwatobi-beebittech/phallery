import React, { Component } from "react";
import Post from "./post";

class PostContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="col-md-4">
                <Post imgUrl={this.props.imgUrl} text={this.props.text} />
            </div>
        );
    }
}

export default PostContainer;
