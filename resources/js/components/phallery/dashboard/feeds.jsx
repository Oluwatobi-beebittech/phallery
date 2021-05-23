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

    useEffect(() => {
        axios.defaults.headers.common = {
            Authorization: "Bearer " + sanctumToken
        };
        axios
            .get("http://localhost:8000/api/post/myposts")
            .then(res => {
                setMyPosts(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    });

    return (
        <React.Fragment>
            <Nav hasNotification={true} count={9} />
            <Banner text="My Posts" />
            <div className="container">
                <CreatePost />

                <div className="row">
                    {myPosts.map(item => (
                        <PostContainer
                            key={item.post_id}
                            imgUrl={"http://localhost:8000/" + item.post_image}
                            text={item.post_text}
                            likes={item.likes}
                            hearts={item.hearts}
                            comments={item.comments}
                            postId={item.post_id}
                        />
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Feeds;
