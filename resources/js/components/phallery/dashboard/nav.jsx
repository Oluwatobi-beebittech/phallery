import React from "react";
import Home from "./home";
import Signup from "../auth/signup";
import Signin from "../auth/signin";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function Nav() {
    return (
        <Router>
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
                                to="/signup"
                                className="active nav-link btn btn-lg btn-outline-light bg-dark text-white mr-0"
                            >
                                Get Started &nbsp;
                                <span className="fa fa-shoe-prints"></span>
                            </Link>
                        </li>
                        <li className="nav-item mx-1 my-1">
                            <Link
                                to="/signin"
                                className="nav-link btn btn-lg btn-outline-light bg-dark text-white mr-0"
                            >
                                Sign In &nbsp;
                                <span className="fa fa-arrow-circle-right"></span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Switch>
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/" component={Home} />
                <Route component={Home} />
            </Switch>
        </Router>
    );
}

export default Nav;
