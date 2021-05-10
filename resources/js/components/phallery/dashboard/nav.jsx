import React from "react";
import Home from "./home";
import Signup from "../auth/signup";
import Signin from "../auth/signin";
import Feeds from "./feeds";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function Nav() {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <Link to="/" className="navbar-brand font-weight-bold">
                    Phallery
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item mx-1 my-1">
                            <Link
                                to="/dashboard/feeds"
                                className="active nav-link btn btn-lg bg-dark text-white mr-0"
                            >
                                <span className="fa fa-home"></span>
                                &nbsp;Home
                            </Link>
                        </li>
                        <li className="nav-item mx-1 my-1">
                            <Link
                                to="/dashboard/myposts"
                                className="nav-link btn btn-lg bg-dark text-white mr-0"
                            >
                                <span className="fa fa-images"></span>
                                &nbsp;My Posts
                            </Link>
                        </li>
                        <li className="nav-item mx-1 my-1">
                            <Link
                                to="/dashboard/mynetwork"
                                className="nav-link btn btn-lg bg-dark text-white mr-0"
                            >
                                <span className="fa fa-network-wired"></span>
                                &nbsp;My Network
                            </Link>
                        </li>
                        <li className="nav-item mx-1 my-1">
                            <Link
                                to="/dashboard/profile"
                                className="nav-link btn btn-lg bg-dark text-white mr-0"
                            >
                                <span className="fa fa-user-circle"></span>
                                &nbsp;Profile
                            </Link>
                        </li>
                        <li className="nav-item mx-1 my-1">
                            <Link
                                to="/dashboard/notifications"
                                className="nav-link btn btn-lg bg-dark text-white mr-0"
                            >
                                <span className="text-warning far fa-bell"></span>
                                &nbsp;Notification&nbsp;
                                <span class="badge badge-pill badge-warning">
                                    12
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default Nav;
