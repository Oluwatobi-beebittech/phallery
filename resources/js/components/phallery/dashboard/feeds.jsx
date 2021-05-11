import React, { Component } from "react";
import Nav from "./nav";
import Banner from "./banner";
import CreatePost from "./create_post";
import PostContainer from "./post_component/postContainer";

class Feeds extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav />
                <Banner text="My Posts" />
                <div className="container">
                    <CreatePost />

                    <div className="row">
                        <PostContainer
                            imgUrl="../image/1a.jpg"
                            text="This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer."
                        />
                        <PostContainer
                            imgUrl="../image/1a.jpg"
                            text="This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer."
                        />
                        <PostContainer
                            imgUrl="../image/1a.jpg"
                            text="This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer."
                        />
                        <PostContainer
                            imgUrl="../image/1a.jpg"
                            text="This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer."
                        />
                        <PostContainer
                            imgUrl="../image/1a.jpg"
                            text="This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer."
                        />
                        <PostContainer
                            imgUrl="../image/1a.jpg"
                            text="This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer."
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Feeds;
