import React, { Component } from "react";
import Nav from "./nav";
import Banner from "./banner";
import CreatePost from "./create_post";
import PostContainer from "./post_component/postContainer";
import SearchResultUI from "./search_component/searchResultUI";

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav hasNotification={true} count={9} />
                <Banner text="Feeds" />
                <div className="container my-3">
                    <CreatePost />
                    <form className="form-inline ">
                        <div className="col-md-6 mx-auto">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control rounded-left"
                                    placeholder="Search for friends"
                                />
                                <div className="input-group-prepend">
                                    <button className="btn btn-success rounded-right">
                                        <span className="fa fa-search text-white"></span>
                                    </button>
                                </div>
                            </div>
                            <SearchResultUI/>
                        </div>
                    </form>
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
}

export default Home;
