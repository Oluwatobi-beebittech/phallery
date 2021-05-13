import React, { Component } from "react";
import Nav from "./nav";
import Banner from "./banner";
import CreatePost from "./create_post";
import PostContainer from "./post_component/postContainer";

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

                            <div className="container">
                                <div className="search-result">
                                    <div className="list-group">
                                        <a
                                            href="#"
                                            className="list-group-item list-group-item-action d-flex flex-row align-items-center border-left-0 border-right-0"
                                        >
                                            <div className="img-circle-wrapper">
                                                <img
                                                    src="../image/1a.jpg"
                                                    className="img-circle"
                                                />
                                            </div>
                                            <p className="mb-1">
                                                &nbsp; Alpha Juanita
                                            </p>
                                        </a>
                                        <a
                                            href="#"
                                            className="list-group-item list-group-item-action d-flex flex-row align-items-center border-left-0 border-right-0"
                                        >
                                            <div className="img-circle-wrapper">
                                                <img
                                                    src="../image/1a.jpg"
                                                    className="img-circle"
                                                />
                                            </div>
                                            <p className="mb-1">
                                                &nbsp; Alpha Juanita
                                            </p>
                                        </a>
                                        <a
                                            href="#"
                                            className="list-group-item list-group-item-action d-flex flex-row align-items-center border-left-0 border-right-0"
                                        >
                                            <div className="img-circle-wrapper">
                                                <img
                                                    src="../image/1a.jpg"
                                                    className="img-circle"
                                                />
                                            </div>
                                            <p className="mb-1">
                                                &nbsp; Alpha Juanita
                                            </p>
                                        </a>
                                    </div>
                                </div>
                            </div>
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
