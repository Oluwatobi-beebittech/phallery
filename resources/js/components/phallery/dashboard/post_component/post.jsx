import React, { Component } from "react";
import Comment from "./comment";
import Like from "./like";
import Heart from "./heart";
import { withRouter } from "react-router-dom";

class Post extends Component {
    constructor(props) {
        super(props);
        this.viewProfile = this.viewProfile.bind(this);
    }

    /**
     * View the profile of a user on click
     * @param {Object} userObject
     */
    viewProfile(userObject) {
        userObject.email === "self"
            ? this.props.history.push("/dashboard/profile")
            : this.props.history.push("/dashboard/search", userObject);
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
                    <a
                        href=""
                        className="font-weight-bold text-decoration-none"
                        onClick={e => {
                            e.preventDefault();
                            this.viewProfile({
                                email: this.props.poster_email,
                                first_name: this.props.poster_first_name,
                                last_name: this.props.poster_last_name,
                                profile_image: this.props.poster_profile_image,
                                posts: [],
                                isPostAvailabilityChecked: false,
                                isFollowingChecked: false,
                                isFollowing: false
                            });
                        }}
                    >
                        {this.props.poster_first_name +
                            " " +
                            this.props.poster_last_name}
                    </a>
                    <p className="card-text">{this.props.text}</p>
                    <div className="card-text d-flex justify-content-around">
                        <Heart
                            count={this.props.hearts}
                            postId={this.props.postId}
                            self_heart={this.props.self_heart}
                        />
                        <Like
                            count={this.props.likes}
                            postId={this.props.postId}
                            self_like={this.props.self_like}
                        />
                        <Comment
                            count={this.props.comments}
                            caller={this.props.imgUrl}
                            postId={this.props.postId}
                            self_comment={this.props.self_comment}
                            postText={this.props.text}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Post);
