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
        this.cookies = new Cookies();
    }
    componentDidMount() {
        this.redirect();
    }

    redirect() {
        let value = "";
        let token = "";
        const cookies = this.cookies;

        if (cookies.get("sanctum_token")) {
            token = cookies.get("sanctum_token");
        } else {
            value = queryString.parse(window.location.search);
            token = value.token;
        }

        axios.defaults.headers.common = { Authorization: "Bearer " + token };
        axios.get("/api/dashboard").then(res => {
            console.log(res);
            console.log("Redirection", res.data.redirect);
            console.log("Redirection", res.data.status);
            // if (res.data.status != "success") {
            //     this.setState({
            //         status: res.data.status,
            //         redirect: "/",
            //         token: ""
            //     });
            // } else {
            //     this.setState({
            //         status: res.data.status,
            //         redirect: res.data.redirect,
            //         token: token
            //     });
            // }
            this.setState({
                status: res.data.status,
                redirect: res.data.redirect,
                token: token
            });
        });
    }
    render() {
        const cookies = this.cookies;

        if (this.state.status === "success") {
            cookies.set("sanctum_token", this.state.token, {
                path: "/",
                secure: true,
                sameSite: "lax"
            });

            return <Redirector to={this.state.redirect} />;
        } else if (typeof this.state.status === "undefined") {
            if (cookies.get("sanctum_token")) {
                cookies.remove("sanctum_token");
                console.log("Remove");
            }
            return <Redirector to="/" />;
        } else {
            return (
                <section className="viewport-80 text-white">
                    <div className="container h-100 d-flex flex-column align-items-md-center">
                        <div className="mx-auto my-auto text-center">
                            <p className="text-muted ">
                                You will be redirected automatically. If this
                                does not happen, click the go to dashboard
                                button
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
}

export default Redirect;
