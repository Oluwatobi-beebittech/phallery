import React, { Component } from "react";
import Nav from "../nav";
import Banner from "../banner";
import PostContainer from "../post_component/postContainer";
import { withRouter } from "react-router";
import axios from "axios";
import Cookies from "universal-cookie";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { DOMAIN_NAME } from "../../env";
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
            this.state = {
                ...this.props.location.state,
                followingConnectionResult: [],
                followerConnectionResult: [],
                isFollowingNetworkChecked: false,
                isFollowerNetworkChecked: false
            };
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
            this.loadFollowingConnection = this.loadFollowingConnection.bind(
                this
            );
            this.loadFollowerConnection = this.loadFollowerConnection.bind(
                this
            );
        }
    }

    componentDidMount() {
        this.checkIfFollowed();
        this.loadPosts();
        this.loadFollowingConnection();
        this.loadFollowerConnection();
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
                `${DOMAIN_NAME}/api/post/${this.state.email}`,
                this.configAxios
            )
            .then(res => {
                console.log(res.data);
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
     * Loads all connections that the user follows
     */
    loadFollowingConnection() {
        axios
            .get(
                `${DOMAIN_NAME}/api/network/followings/${this.state.email}`,
                this.configAxios
            )
            .then(res => {
                console.log(res.data);
                this.setState({
                    followingConnectionResult: res.data,
                    isFollowingNetworkChecked: true
                });
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("view profile component unmounted");
                } else {
                    this.setState({
                        isFollowingNetworkChecked: true
                    });
                }
            });
    }

    /**
     * Loads all connections that the user follows
     */
    loadFollowerConnection() {
        axios
            .get(
                `${DOMAIN_NAME}/api/network/followers/${this.state.email}`,
                this.configAxios
            )
            .then(res => {
                console.log(res.data);
                this.setState({
                    followerConnectionResult: res.data,
                    isFollowerNetworkChecked: true
                });
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("View profile component unmounted");
                } else {
                    this.setState({
                        isFollowerNetworkChecked: true
                    });
                }
            });
    }

    /**
     * Checks if the logged in user is following the user whose profile is being viewed
     */
    checkIfFollowed() {
        axios
            .get(`${DOMAIN_NAME}/api/isFollowing/${this.state.email}`)
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
                `${DOMAIN_NAME}/api/follow/${this.state.email}`,
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
                `${DOMAIN_NAME}/api/unfollow/${this.state.email}`,
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
                                    `${DOMAIN_NAME}/${this.state.profile_image}`
                                }
                                className="img-circle"
                                alt="profile image"
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <h5 className="font-weight-bold mt-1">{this.name}</h5>
                        <button
                            className={
                                "mx-auto btn my-2 font-weight-bold " +
                                followBtnClass
                            }
                            onClick={onClickFunction}
                            disabled={!this.state.isFollowingChecked}
                        >
                            <span className={"fa " + followBtnIcon}></span>
                            &nbsp;{followBtnText}
                        </button>
                    </div>
                    <Tabs defaultActiveKey="posts" id="view-profile-tabs">
                        <Tab
                            eventKey="posts"
                            title="Posts"
                            tabClassName="font-weight-bold"
                        >
                            <div className="row">
                                {this.state.posts.length > 0 ? (
                                    this.state.posts.map(item => (
                                        <PostContainer
                                            key={item.post_id}
                                            imgUrl={
                                                `${DOMAIN_NAME}/${item.post_image}`
                                            }
                                            poster_first_name={
                                                item.poster_first_name
                                            }
                                            poster_last_name={
                                                item.poster_last_name
                                            }
                                            poster_profile_image={
                                                item.poster_profile_image
                                            }
                                            text={item.post_text}
                                            poster_email={item.user_email}
                                            likes={item.likes}
                                            hearts={item.hearts}
                                            comments={item.comments}
                                            postId={item.post_id}
                                            self_like={item.self_like}
                                            self_heart={item.self_heart}
                                            self_comment={item.self_comment}
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
                        </Tab>
                        <Tab
                            eventKey="following"
                            title="Following "
                            tabClassName="font-weight-bold"
                        >
                            <div className="row text-center mt-2 link-card">
                                {this.state.isFollowingNetworkChecked &&
                                this.state.followingConnectionResult.length >
                                    0 ? (
                                    this.state.followingConnectionResult.map(
                                        connection => (
                                            <a
                                                key={connection.conn_follow_id}
                                                className="col-md-3 rounded-lg bg-white shadow"
                                                onClick={e => {
                                                    e.preventDefault();
                                                }}
                                            >
                                                <div className="img-circle-wrapper">
                                                    <img
                                                        src={
                                                            `${DOMAIN_NAME}/${connection.conn_profile_image}`
                                                        }
                                                        className="img-circle"
                                                    />
                                                </div>
                                                <p className="font-weight-bold">
                                                    {connection.conn_first_name +
                                                        " " +
                                                        connection.conn_last_name}
                                                </p>
                                                <p>
                                                    <span className="fas fa-link"></span>{" "}
                                                    {
                                                        connection.conn_following_count
                                                    }{" "}
                                                    following
                                                </p>
                                                <p>
                                                    <span className="fas fa-link"></span>{" "}
                                                    {
                                                        connection.conn_follower_count
                                                    }{" "}
                                                    follower
                                                </p>
                                            </a>
                                        )
                                    )
                                ) : this.state.isFollowingNetworkChecked ? (
                                    <p className="offset-md-4 font-weight-bold text-center text-muted">
                                        <span className="fab fa-searchengin fa-2x"></span>{" "}
                                        Seems like you have not made connections
                                        yet.
                                        <br />
                                        Search and start making connections
                                    </p>
                                ) : (
                                    <div className="font-weight-bold offset-md-6 text-center">
                                        <span className="fa fa-spinner fa-pulse fa-3x"></span>
                                        <p className="">Loading</p>
                                    </div>
                                )}
                            </div>
                            <div className="px-4"> </div>
                        </Tab>
                        <Tab
                            eventKey="followers"
                            title="Followers "
                            tabClassName="font-weight-bold"
                        >
                            <div className="row text-center mt-2 link-card">
                                {this.state.isFollowerNetworkChecked &&
                                this.state.followerConnectionResult.length >
                                    0 ? (
                                    this.state.followerConnectionResult.map(
                                        connection => (
                                            <a
                                                key={connection.conn_follow_id}
                                                className="col-md-3 rounded-lg bg-white shadow"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    this.viewProfile(
                                                        connection
                                                    );
                                                }}
                                            >
                                                <div className="img-circle-wrapper">
                                                    <img
                                                        src={
                                                            `${DOMAIN_NAME}/${connection.conn_profile_image}`
                                                        }
                                                        className="img-circle"
                                                    />
                                                </div>
                                                <p className="font-weight-bold">
                                                    {connection.conn_first_name +
                                                        " " +
                                                        connection.conn_last_name}
                                                </p>
                                                <p>
                                                    <span className="fas fa-link"></span>{" "}
                                                    {
                                                        connection.conn_following_count
                                                    }{" "}
                                                    following
                                                </p>
                                                <p>
                                                    <span className="fas fa-link"></span>{" "}
                                                    {
                                                        connection.conn_follower_count
                                                    }{" "}
                                                    follower
                                                </p>
                                            </a>
                                        )
                                    )
                                ) : this.state.isFollowerNetworkChecked ? (
                                    <p className="offset-md-4 font-weight-bold text-center text-muted">
                                        <span className="fab fa-searchengin fa-2x"></span>{" "}
                                        Seems like you have not made connections
                                        yet.
                                        <br />
                                        Search and start making connections
                                    </p>
                                ) : (
                                    <div className="font-weight-bold offset-md-6 text-center">
                                        <span className="fa fa-spinner fa-pulse fa-3x"></span>
                                        <p className="">Loading</p>
                                    </div>
                                )}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </React.Fragment>
        );
    }
}
export default withRouter(ViewProfile);
