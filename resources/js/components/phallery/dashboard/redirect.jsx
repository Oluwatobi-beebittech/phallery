import React, { Component } from "react";
import queryString from "query-string";
import axios from "axios";
import { Redirect as Redirector } from "react-router-dom";

class Redirect extends Component {
    constructor(props) {
        super(props);
        this.state = { status: "", redirect: "" };
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
            console.log(res.data.redirect);
            this.setState({
                status: res.data.status,
                redirect: res.data.redirect
            });
        });
    }
    render() {
        if (this.state.status === "success") {
            return <Redirector to={this.state.redirect} />;
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
