import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: {},
            isLoading: false
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getAlert = this.getAlert.bind(this);
        this.getErrors = this.getErrors.bind(this);
        this.getErrorMessage = this.getErrorMessage.bind(this);
    }

    handleOnChange(e) {
        switch (e.target.name) {
            case "firstName":
                this.setState({ firstName: e.target.value });
                break;
            case "lastName":
                this.setState({ lastName: e.target.value });
                break;
            case "email":
                this.setState({ email: e.target.value });
                break;
            case "phone":
                this.setState({ phone: e.target.value });
                break;
            default:
                break;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isLoading: true });
        const input = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            phone_number: this.state.phone
        };
        axios.get("/sanctum/csrf-cookie").then((res) => {
            axios
                .post("api/register", input)
                .then((res) => {
                    console.log(res);
                    let success = { OK: "Success" };
                    this.setState({
                        message: success,
                        isLoading: false
                    });
                })
                .catch(err => {
                    this.setState({
                        message: err.response.data.errors,
                        isLoading: false
                    });
                });
        });
    }

    getAlert() {
        if (this.state.message.OK === "Success") {
            return (
                <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                >
                    <strong>
                        Registration was successful. Check your email for
                        confirmation.
                    </strong>
                </div>
            );
        }

        const error =
            this.state.message === "Database Unreachable"
                ? "Error connecting to the database"
                : "Some errors were encountered";
        return (
            <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
            >
                <strong>{error}</strong>
            </div>
        );
    }

    getErrors(field) {
        let returnValue = "form-control ";

        switch (field) {
            case "firstName":
                returnValue =
                    typeof this.state.message.first_name !== "undefined"
                        ? returnValue + "is-invalid"
                        : returnValue;

                break;
            case "lastName":
                returnValue =
                    typeof this.state.message.last_name !== "undefined"
                        ? returnValue + "is-invalid"
                        : returnValue;

                break;
            case "email":
                returnValue =
                    typeof this.state.message.email !== "undefined"
                        ? returnValue + "is-invalid"
                        : returnValue;

                break;
            case "phone":
                returnValue =
                    typeof this.state.message.phone_number !== "undefined"
                        ? returnValue + "is-invalid"
                        : returnValue;

                break;
            default:
                break;
        }
        return returnValue;
    }

    getErrorMessage(field) {
        return typeof this.state.message[field] !== "undefined" ? (
            <small className="invalid-feedback" role="alert">
                <strong>{this.state.message[field][0]}</strong>
            </small>
        ) : (
            ""
        );
    }
    render() {
        const disabled = this.state.isLoading;
        const { icon, loadText, btnProp } =
            this.state.isLoading === true
                ? {
                      icon: "fa fa-spinner fa-pulse",
                      loadText: "Working on it",
                      btnProp: "btn bg-dark text-white"
                  }
                : {
                      icon: "fa fa-shoe-prints",
                      loadText: "Get Started",
                      btnProp: "btn btn-primary"
                  };

        return (
            <section className="bg-dark-trans viewport-80">
                <div className="container h-100 d-flex align-items-center">
                    <div className="col-lg-8 bg-white rounded-lg shadow mx-auto px-0">
                        <div className="w-100 text-center bg-kente mx-0">
                            <h2 className="w-100 h-100 bg-dark-trans text-white py-1 text-shadow">
                                Sign Up
                            </h2>
                        </div>
                        <div className="container">
                            {Object.entries(this.state.message).length === 0
                                ? ""
                                : this.getAlert()}
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-row my-3">
                                    <div className="col">
                                        <label
                                            className="sr-only"
                                            htmlFor="firstName"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className={this.getErrors(
                                                "firstName"
                                            )}
                                            placeholder="First name"
                                            name="firstName"
                                            id="firstName"
                                            required
                                            autoComplete="firstName"
                                            autoFocus
                                            value={this.state.firstName}
                                            onChange={this.handleOnChange}
                                        />
                                        {this.getErrorMessage("first_name")}
                                    </div>
                                    <div className="col">
                                        <label
                                            className="sr-only"
                                            htmlFor="lastName"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className={this.getErrors(
                                                "lastName"
                                            )}
                                            placeholder="Last name"
                                            id="lastName"
                                            name="lastName"
                                            required
                                            autoComplete="lastName"
                                            value={this.state.lastName}
                                            onChange={this.handleOnChange}
                                        />
                                        {this.getErrorMessage("last_name")}
                                    </div>
                                </div>
                                <div className="form-row mb-3">
                                    <div className="col">
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
                                                type="email"
                                                className={this.getErrors(
                                                    "email"
                                                )}
                                                placeholder="Email"
                                                id="email"
                                                name="email"
                                                required
                                                autoComplete="email"
                                                value={this.state.email}
                                                onChange={this.handleOnChange}
                                            />
                                            {this.getErrorMessage("email")}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label
                                            className="sr-only"
                                            htmlFor="phone"
                                        >
                                            Phone Number
                                        </label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text bg-dark text-white">
                                                    <span className="fa fa-phone-alt"></span>
                                                </div>
                                            </div>
                                            <input
                                                type="tel"
                                                className={this.getErrors(
                                                    "phone"
                                                )}
                                                placeholder="Phone Number"
                                                id="phone"
                                                name="phone"
                                                autoComplete="phone"
                                                value={this.state.phone}
                                                onChange={this.handleOnChange}
                                            />
                                            {this.getErrorMessage(
                                                "phone_number"
                                            )}
                                        </div>
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

export default Signup;
