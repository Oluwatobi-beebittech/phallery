import React, { Component } from "react";
import Nav from "./nav";
import Banner from "./banner";
import CreatePost from "./create_post";
import PostContainer from "./post_component/postContainer";
import SearchBar from "./search_component/searchBar";

function Home(props) {
    
    return (
        <React.Fragment>
            <Nav hasNotification={true} count={9} />
            <Banner text="Feeds" />
            <div className="container my-3">
                <CreatePost caller="home"/>
                <SearchBar />

                <div className="row">
                    <PostContainer
                        imgUrl="../image/1a.jpg"
                        text="This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer."
                        likes={0}
                        hearts={0}
                        comments={0}
                    />
                    <PostContainer
                        imgUrl="../image/1a.jpg"
                        text="This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer."
                        likes={0}
                        hearts={0}
                        comments={0}
                    />
                    <PostContainer
                        imgUrl="../image/1a.jpg"
                        text="This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer."
                        likes={0}
                        hearts={0}
                        comments={0}
                    />
                    <PostContainer
                        imgUrl="../image/1a.jpg"
                        text="This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer."
                        likes={0}
                        hearts={0}
                        comments={0}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export default Home;
