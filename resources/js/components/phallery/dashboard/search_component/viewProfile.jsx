import React, { Component } from "react";
import Nav from "../nav";
import Banner from "../banner";
import PostContainer from "../post_component/postContainer";
import { withRouter } from "react-router";
import axios from "axios";
import Cookies from "universal-cookie";

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
        }
    }

    componentDidMount() {
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
                console.log(res.data);
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("View Profile Component Unmounted");
                }
                this.setState({
                    isPostAvailabilityChecked: true
                });
            });
    }

    // componentDidUpdate() {
    //     axios
    //         .get(
    //             "https://localhost:8000/post/" + this.state.email,
    //             this.configAxios
    //         )
    //         .then(res => {
    //             this.setState({
    //                 posts: res.data,
    //                 isPostAvailabilityChecked: true
    //             });
    //         })
    //         .catch(error => {
    //             if (axios.isCancel(error)) {
    //                 console.log("View Profile Component Unmounted");
    //             }
    //             this.setState({
    //                 isPostAvailabilityChecked: true
    //             });
    //         });
    // }

    componentWillUnmount() {
        this.source.cancel("View Profile Component Unmounted");
    }

    render() {
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
                        <button className="mx-auto btn btn-success my-3 font-weight-bold">
                            <span className="fa fa-plus"></span>&nbsp;Follow
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
