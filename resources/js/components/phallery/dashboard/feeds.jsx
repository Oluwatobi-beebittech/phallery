import React, { Component } from "react";
import Nav from "./nav";
import Banner from "./banner";
import CreatePost from "./create_post";

class Feeds extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav />
                <Banner text="My Posts" />
                <div className="container">
                    <CreatePost />
                    
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card my-3 border-0 bg-none">
                                <img
                                    className="card-img-top mx-auto rounded shadow"
                                    src="../image/1a.jpg"
                                    alt="Card image cap"
                                />
                                <div className="card-body mx-auto bg-white rounded-bottom shadow">
                                    <p className="card-text">
                                        This is a wider card with supporting
                                        text below as a natural lead-in to
                                        additional content. This content is a
                                        little bit longer.
                                    </p>
                                    <div className="card-text d-flex justify-content-around">
                                        <a
                                            href="#"
                                            className="far fa-heart fa-2x text-decoration-none"
                                        ></a>
                                        <a
                                            href="#"
                                            className="far fa-thumbs-up fa-2x text-decoration-none"
                                        ></a>
                                        <a
                                            href="#"
                                            className="far fa-comment-dots fa-2x text-decoration-none"
                                        ></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card my-3 border-0 bg-none">
                                <img
                                    className="card-img-top mx-auto rounded shadow"
                                    src="../image/1a.jpg"
                                    alt="Card image cap"
                                />
                                <div className="card-body mx-auto bg-white rounded-bottom shadow">
                                    <p className="card-text">
                                        This is a wider card with supporting
                                        text below as a natural lead-in to
                                        additional content. This content is a
                                        little bit longer.
                                    </p>
                                    <div className="card-text d-flex justify-content-around">
                                        <a
                                            href="#"
                                            className="far fa-heart fa-2x text-decoration-none"
                                        ></a>
                                        <a
                                            href="#"
                                            className="far fa-thumbs-up fa-2x text-decoration-none"
                                        ></a>
                                        <a
                                            href="#"
                                            className="far fa-comment-dots fa-2x text-decoration-none"
                                        ></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card my-3 border-0 bg-none">
                                <img
                                    className="card-img-top mx-auto rounded shadow"
                                    src="../image/1a.jpg"
                                    alt="Card image cap"
                                />
                                <div className="card-body mx-auto bg-white rounded-bottom shadow">
                                    <p className="card-text">
                                        This is a wider card with supporting
                                        text below as a natural lead-in to
                                        additional content. This content is a
                                        little bit longer.
                                    </p>
                                    <div className="card-text d-flex justify-content-around">
                                        <a
                                            href="#"
                                            className="far fa-heart fa-2x text-decoration-none"
                                        ></a>
                                        <a
                                            href="#"
                                            className="far fa-thumbs-up fa-2x text-decoration-none"
                                        ></a>
                                        <a
                                            href="#"
                                            className="far fa-comment-dots fa-2x text-decoration-none"
                                        ></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card my-3 border-0 bg-none">
                                <img
                                    className="card-img-top mx-auto rounded shadow"
                                    src="../image/1a.jpg"
                                    alt="Card image cap"
                                />
                                <div className="card-body mx-auto bg-white rounded-bottom shadow">
                                    <p className="card-text">
                                        This is a wider card with supporting
                                        text below as a natural lead-in to
                                        additional content. This content is a
                                        little bit longer.
                                    </p>
                                    <div className="card-text d-flex justify-content-around">
                                        <a
                                            href="#"
                                            className="far fa-heart fa-2x text-decoration-none"
                                        ></a>
                                        <a
                                            href="#"
                                            className="far fa-thumbs-up fa-2x text-decoration-none"
                                        ></a>
                                        <a
                                            href="#"
                                            className="far fa-comment-dots fa-2x text-decoration-none"
                                        ></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card my-3 border-0 bg-none">
                                <img
                                    className="card-img-top mx-auto rounded shadow"
                                    src="../image/1a.jpg"
                                    alt="Card image cap"
                                />
                                <div className="card-body mx-auto bg-white rounded-bottom shadow">
                                    <p className="card-text">
                                        This is a wider card with supporting
                                        text below as a natural lead-in to
                                        additional content. This content is a
                                        little bit longer.
                                    </p>
                                    <div className="card-text d-flex justify-content-around">
                                        <a
                                            href="#"
                                            className="far fa-heart fa-2x text-decoration-none"
                                        ></a>
                                        <a
                                            href="#"
                                            className="far fa-thumbs-up fa-2x text-decoration-none"
                                        ></a>
                                        <a
                                            href="#"
                                            className="far fa-comment-dots fa-2x text-decoration-none"
                                        ></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Feeds;
