import React, { Component } from "react";
import queryString from "query-string";
import axios from "axios";
import { Redirect as Redirector } from "react-router-dom";
import Cookies from "universal-cookie";

class Redirect extends Component {
    constructor(props) {
        super(props);
        this.state = { status: "", redirect: "", token: "" };
        this.redirect = this.redirect.bind(this);
    }
    componentDidMount() {
        this.redirect();
    }

    redirect() {
        const value = queryString.parse(window.location.search);
        const token = value.token;
        axios.defaults.headers.common = { Authorization: "Bearer " + token };
        axios.get("/api/dashboard").then(res => {
            console.log(res);
            this.setState({
                status: res.data.status,
                redirect: res.data.redirect,
                token: token
            });
        });
    }
    render() {
        if (this.state.status === "success") {
            const cookies = new Cookies();
            cookies.set("sanctum_token", this.state.token, {
                path: "/",
                secure: true
            });
            cookies.set("redirect", this.state.redirect, { path: "/" });
            return <Redirector to={this.state.redirect} />;
            
        } else if (typeof this.state.status === "undefined") {
            return <Redirector to="/signin" />;
        }
        return (
            <section className="viewport-80 text-white">
                <div className="container h-100 d-flex flex-column align-items-md-center">
                    <div className="mx-auto my-auto text-center">
                        <p className="text-muted ">
                            You will be redirected automatically. If this does
                            not happen, click the go to dashboard button
                        </p>
                        <a
                            className="btn btn-lg btn-dark"
                            onClick={this.redirect}
                        >
                            Go to Dashboard
                        </a>
                    </div>
                </div>
            </section>
        );
    }
}

export default Redirect;
