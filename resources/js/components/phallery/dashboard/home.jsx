import React, { Component } from "react";
import Nav from "./nav";
import Banner from "./banner";
import CreatePost from "./create_post";
import Comment from "./post_component/comment";
import Like from "./post_component/like";
import Heart from "./post_component/heart";

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav />
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
                        </div>
                    </form>
                    <div className="card my-3 border-0 bg-none">
                        <img
                            className="card-img-top col-md-6 mx-auto rounded shadow"
                            src="../image/1a.jpg"
                            alt="Card image cap"
                        />
                        <div className="card-body col-md-6 mx-auto bg-white rounded-bottom shadow">
                            <p className="card-text">
                                This is a wider card with supporting text below
                                as a natural lead-in to additional content. This
                                content is a little bit longer.
                            </p>
                            <div className="card-text d-flex justify-content-around col-md-4">
                                <Heart />
                                <Like />
                                <Comment />
                            </div>
                        </div>
                    </div>

                    <div className="card my-3 border-0 bg-none">
                        <img
                            className="card-img-top col-md-6 mx-auto rounded shadow"
                            src="../image/1c.jpg"
                            alt="Card image cap"
                        />
                        <div className="card-body col-md-6 mx-auto bg-white rounded-bottom shadow">
                            <p className="card-text">
                                This is a wider card with supporting text below
                                as a natural lead-in to additional content. This
                                content is a little bit longer.
                            </p>
                            <div className="card-text d-flex justify-content-around col-md-4">
                                <Heart />
                                <Like />
                                <Comment />
                            </div>
                        </div>
                    </div>

                    <div className="card my-3 border-0 bg-none">
                        <img
                            className="card-img-top col-md-6 mx-auto rounded shadow"
                            src="../image/1b.jpg"
                            alt="Card image cap"
                        />
                        <div className="card-body col-md-6 mx-auto bg-white rounded-bottom shadow">
                            <p className="card-text">
                                This is a wider card with supporting text below
                                as a natural lead-in to additional content. This
                                content is a little bit longer.
                            </p>
                            <div className="card-text d-flex justify-content-around col-md-4">
                                <Heart />
                                <Like />
                                <Comment />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
