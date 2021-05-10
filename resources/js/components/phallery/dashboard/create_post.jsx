import React, { Component } from "react";
class CreatePost extends Component {
    render() {
        return (
            <button className="btn btn-outline-success my-3">
                <span className="fa fa-plus-square"></span>
                &nbsp;Create a post
            </button>
        );
    }
}

export default CreatePost;
