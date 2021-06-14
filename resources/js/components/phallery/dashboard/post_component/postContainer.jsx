import React, { Component } from "react";
import Post from "./post";

class PostContainer extends Component {
    /* Container for posts
        @props 
            imgUrl: URL of the image in the post
            text: Writeup of the post
            likes,hearts, comments: number of likes, hearts, and comments the post has 
    */
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="col-md-4">
                <Post
                    imgUrl={this.props.imgUrl}
                    text={this.props.text}
                    likes={this.props.likes}
                    hearts={this.props.hearts}
                    comments={this.props.comments}
                    postId = {this.props.postId}
                />
            </div>
        );
    }
}

export default PostContainer;
