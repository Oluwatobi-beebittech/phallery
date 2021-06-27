import React, { Component, useEffect, useState } from "react";
import Nav from "./nav";
import Banner from "./banner";
import CreatePost from "./create_post";
import PostContainer from "./post_component/postContainer";
import axios from "axios";
import Cookies from "universal-cookie";

function Feeds() {
    const sanctumTokenCookie = new Cookies();
    const sanctumToken = sanctumTokenCookie.get("sanctum_token");

    const [myPosts, setMyPosts] = useState([]);
    const [isPostAvailabilityChecked, setIsPostAvailabilityChecked] = useState(
        false
    );

    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const configAxios = { cancelToken: source.token };
    axios.defaults.headers.common = {
        Authorization: "Bearer " + sanctumToken
    };

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/post/myposts", configAxios)
            .then(res => {
                setIsPostAvailabilityChecked(true);
                setMyPosts(res.data);
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("Feeds component unmounted");
                } else {
                    setIsPostAvailabilityChecked(true);
                }
            });

        return () => {
            source.cancel("Feeds component unmounted");
        };
    });

    return (
        <React.Fragment>
            <Nav hasNotification={true} count={9} />
            <Banner text="My Posts" />
            <div className="container">
                <CreatePost caller="feeds" />

                <div className="row">
                    {myPosts.length > 0 ? (
                        myPosts.map(item => (
                            <PostContainer
                                key={item.post_id}
                                imgUrl={
                                    "http://localhost:8000/" + item.post_image
                                }
                                poster_first_name={item.poster_first_name}
                                poster_last_name={item.poster_last_name}
                                poster_profile_image={item.poster_profile_image}
                                text={item.post_text}
                                likes={item.likes}
                                hearts={item.hearts}
                                comments={item.comments}
                                postId={item.post_id}
                                self_like={item.self_like}
                                self_heart={item.self_heart}
                                self_comment={item.self_comment}
                                poster_email="self"
                            />
                        ))
                    ) : isPostAvailabilityChecked ? (
                        <p className="offset-md-4 font-weight-bold text-center text-muted">
                            <span className="fab fa-searchengin fa-2x"></span>{" "}
                            Seems like you have no posts yet. Try creating one
                        </p>
                    ) : (
                        <div className="d-block font-weight-bold offset-md-6">
                            <span className="fa fa-spinner fa-pulse fa-3x text-center "></span>
                            <p className="text-center ">Loading</p>
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Feeds;
