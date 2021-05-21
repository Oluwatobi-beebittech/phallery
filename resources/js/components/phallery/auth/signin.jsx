import React, { Component } from "react";
import axios from "axios";

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = { data: { email: "" }, response: {}, isLoading: false };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.getAlert = this.getAlert.bind(this);
        this.getErrors = this.getErrors.bind(this);
    }

    handleOnChange(e) {
        switch (e.target.name) {
            case "email":
                this.setState({ data: { email: e.target.value } });
                break;
            default:
                break;
        }
    }

    handleOnSubmit(e) {
        e.preventDefault();
        this.setState({ isLoading: true });
        axios.get("/sanctum/csrf-cookie").then((res) => {
            axios
                .post("api/login", { email: this.state.data.email })
                .then((res) => {
                    console.log(res);
                    this.setState({
                        response: res.data,
                        isLoading: false
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        response: err.data,
                        isLoading: false
                    });
                });
        });
    }

    getAlert() {
        if (this.state.response.status === "Success") {
            return (
                <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                >
                    <strong>Check your email for the login link.</strong>
                </div>
            );
        }

        return (
            <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
            >
                <strong>{this.state.response.message}</strong>
            </div>
        );
    }

    getErrors() {
        let returnValue = "form-control ";
        returnValue =
            this.state.response.status === "Failed"
                ? returnValue + "is-invalid"
                : returnValue;
        return returnValue;
    }

    render() {
        const disabled = this.state.isLoading;
        const { icon, loadText, btnProp } =
            this.state.isLoading
                ? {
                      icon: "fa fa-spinner fa-pulse",
                      loadText: "Working on it",
                      btnProp: "btn bg-dark text-white"
                  }
                : {
                      icon: "fa fa-arrow-circle-right",
                      loadText: "Sign In",
                      btnProp: "btn btn-primary"
                  };
        return (
            <section className="bg-dark-trans viewport-80">
                <div className="container h-100 d-flex align-items-center">
                    <div className="col-lg-8 bg-white rounded-lg shadow mx-auto px-0">
                        <div className="w-100 text-center bg-kente mx-0">
                            <h2 className="w-100 h-100 bg-dark-trans text-white py-1 text-shadow">
                                Sign In
                            </h2>
                        </div>
                        <div className="container">
                            {typeof this.state.response.status === "undefined"
                                ? ""
                                : this.getAlert()}
                            <form onSubmit={this.handleOnSubmit}>
                                <div className="form-row my-3">
                                    <div className="col-8 mx-auto">
                                        <label
                                            className="sr-only"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text bg-dark text-white">
                                                    <span className="fa fa-envelope"></span>
                                                </div>
                                            </div>
                                            <input
                                                name="email"
                                                type="email"
                                                className={this.getErrors()}
                                                placeholder="Email"
                                                id="email"
                                                value={this.state.data.email}
                                                onChange={this.handleOnChange}
                                                required
                                                autoComplete="email"
                                                autoFocus
                                            />
                                        </div>
                                        <small className="text-muted mt-1">
                                            A login link will be sent to this
                                            mail.
                                        </small>
                                    </div>
                                </div>

                                <div className="form-row mb-3">
                                    <div className="col-12 text-center">
                                        <button
                                            type="submit"
                                            className={btnProp}
                                            disabled={disabled}
                                        >
                                            {loadText}&nbsp;
                                            <span className={icon}></span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Signin;
