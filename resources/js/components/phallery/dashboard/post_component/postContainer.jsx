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
                    poster_first_name={this.props.poster_first_name}
                    poster_last_name={this.props.poster_last_name}
                    poster_email={this.props.poster_email}
                    poster_profile_image={this.props.poster_profile_image}
                    imgUrl={this.props.imgUrl}
                    text={this.props.text}
                    likes={this.props.likes}
                    hearts={this.props.hearts}
                    comments={this.props.comments}
                    postId={this.props.postId}
                    self_like={this.props.self_like}
                    self_heart={this.props.self_heart}
                    self_comment={this.props.self_comment}
                />
            </div>
        );
    }
}

export default PostContainer;
