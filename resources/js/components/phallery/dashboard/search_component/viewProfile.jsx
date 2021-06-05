import React, { Component } from "react";
import Nav from "../nav";
import Banner from "../banner";
import PostContainer from "../post_component/postContainer";
import { withRouter } from "react-router";
import axios from "axios";
import Cookies from "universal-cookie";

/**
 * View Profile Component displays profile of searched user
 * @state
 *      @String email
 *      @String first_name
 *      @String last_name
 *      @String profile_image
 *      @array post
 *      @bool isPostAvailabilityChecked
 *
 * @props
 *      @Object location
 * @methods
 *      @lifecycle
 *      componentDidMount
 *      componentDidUpdate
 *      componentWillUnmount
 */

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        if (typeof this.props.location.state === "undefined") {
            this.props.history.goBack();
        } else {
            this.state = { ...this.props.location.state };
            this.name = this.state.first_name + " " + this.state.last_name;

            const sanctumTokenCookie = new Cookies();
            const sanctumToken = sanctumTokenCookie.get("sanctum_token");
            axios.defaults.headers.common = {
                Authorization: "Bearer " + sanctumToken
            };

            const cancelToken = axios.CancelToken;
            this.source = cancelToken.source();
            this.configAxios = { cancelToken: this.source.token };
            this.loadPosts = this.loadPosts.bind(this);
            this.checkIfFollowed = this.checkIfFollowed.bind(this);
            this.follow = this.follow.bind(this);
            this.unfollow = this.unfollow.bind(this);
        }
    }

    componentDidMount() {
        this.loadPosts();
        this.checkIfFollowed();
    }

    componentDidUpdate() {
        this.loadPosts();
    }

    componentWillUnmount() {
        this.source.cancel("View Profile Component Unmounted");
    }

    /**
     * Load the posts of the viewed user
     */
    loadPosts() {
        axios
            .get(
                "http://localhost:8000/api/post/" + this.state.email,
                this.configAxios
            )
            .then(res => {
                this.setState({
                    posts: res.data,
                    isPostAvailabilityChecked: true
                });
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("View Profile Component Unmounted");
                } else {
                    this.setState({
                        isPostAvailabilityChecked: true
                    });
                }
            });
    }

    /**
     * Checks if the logged in user is following the usser whose profile is being viewed
     */
    checkIfFollowed() {
        axios
            .get("http://localhost:8000/api/isFollowing/" + this.state.email)
            .then(res => {
                this.setState({
                    isFollowing: res.data.isFollowing,
                    isFollowingChecked: true
                });
                console.log("Is following ", res.data);
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("View Profile Component Unmounted");
                }

                console.log("Is following ", error);
            });
    }

    /**
     * Handles the creation of a following for the logged in user
     */
    follow() {
        this.setState({
            isFollowingChecked: false
        });

        axios
            .get(
                "http://localhost:8000/api/follow/" + this.state.email,
                this.configAxios
            )
            .then(res => {
                this.setState({
                    isFollowing: res.data.isFollowing,
                    isFollowingChecked: true
                });
                console.log("Is following ", res.data);
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("View Profile Component Unmounted");
                }

                console.log("Is following ", error);
            });
    }

    /**
     * Handles unfollowing the user whose profile is being viewed
     */
    unfollow() {
        this.setState({
            isFollowingChecked: false
        });

        axios
            .get(
                "http://localhost:8000/api/unfollow/" + this.state.email,
                this.configAxios
            )
            .then(res => {
                this.setState({
                    isFollowing: res.data.isFollowing,
                    isFollowingChecked: true
                });
                console.log("Is following ", res.data);
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("View Profile Component Unmounted");
                }
                // this.setState({
                //     isPostAvailabilityChecked: true
                // });
                console.log("Is following ", error);
            });
    }

    render() {
        const {
            followBtnClass,
            followBtnText,
            followBtnIcon,
            onClickFunction
        } = this.state.isFollowingChecked
            ? this.state.isFollowing
                ? {
                      followBtnClass: "btn-outline-danger",
                      followBtnText: "Unfollow",
                      followBtnIcon: "fa-times",
                      onClickFunction: this.unfollow
                  }
                : {
                      followBtnClass: "btn-success",
                      followBtnText: "Follow",
                      followBtnIcon: "fa-plus",
                      onClickFunction: this.follow
                  }
            : {
                  followBtnClass: "btn-dark",
                  followBtnText: "Loading",
                  followBtnIcon: "fa-spinner fa-pulse",
                  onClickFunction: null
              };

        return (
            <React.Fragment>
                <Nav hasNotification={true} count={9} />
                <Banner text={this.name + "'s Profile"} />
                <div className="container pt-5">
                    <div className=" d-flex justify-content-center">
                        <div className="img-circle-wrapper-profile">
                            <img
                                src={
                                    "http://localhost:8000/" +
                                    this.state.profile_image
                                }
                                className="img-circle"
                                alt="profile image"
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            className={
                                "mx-auto btn my-3 font-weight-bold " +
                                followBtnClass
                            }
                            onClick={onClickFunction}
                            disabled={!this.state.isFollowingChecked}
                        >
                            <span className={"fa " + followBtnIcon}></span>
                            &nbsp;{followBtnText}
                        </button>
                        <h5 className="font-weight-bold">{this.name}</h5>
                    </div>
                    <div className="row">
                        {this.state.posts.length > 0 ? (
                            this.state.posts.map(item => (
                                <PostContainer
                                    key={item.post_id}
                                    imgUrl={
                                        "http://localhost:8000/" +
                                        item.post_image
                                    }
                                    text={item.post_text}
                                    likes={item.likes}
                                    hearts={item.hearts}
                                    comments={item.comments}
                                    postId={item.post_id}
                                />
                            ))
                        ) : this.state.isPostAvailabilityChecked ? (
                            <p className="offset-md-4 font-weight-bold text-center text-muted">
                                <span className="fab fa-searchengin fa-2x"></span>{" "}
                                Seems like {this.name} has no posts yet.
                            </p>
                        ) : (
                            <div className="font-weight-bold offset-md-6 text-center">
                                <span className="fa fa-spinner fa-pulse fa-3x"></span>
                                <p className="">Loading</p>
                            </div>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default withRouter(ViewProfile);
