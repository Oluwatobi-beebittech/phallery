import React, { Component } from "react";
import Nav from "./nav";
import Banner from "./banner";
import axios from "axios";
import Cookies from "universal-cookie";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { profile: {} };

        const sanctumTokenCookie = new Cookies();
        const sanctumToken = sanctumTokenCookie.get("sanctum_token");
        axios.defaults.headers.common = {
            Authorization: "Bearer " + sanctumToken
        };

        const cancelToken = axios.CancelToken;
        this.source = cancelToken.source();
        this.configAxios = { cancelToken: this.source.token };
    }

    componentDidMount() {
        this.getProfile();
    }

    componentWillUpdate() {
        this.getProfile();
    }
    componentWillUnmount() {
        this.source.cancel("Profile component unmounted");
    }

    getProfile() {
        axios
            .get(
                "http://localhost:8000/api/profile/myprofile",
                this.configAxios
            )
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                if (axios(error)) {
                    console.log("Profile Unmounted");
                }
            });
    }
    render() {
        return (
            <React.Fragment>
                <Nav hasNotification={true} count={9} />
                <Banner text="Profile" />

                <div className="container">
                    <button className="btn btn-outline-danger my-3">
                        <span className="fa fa-plus-square"></span>
                        &nbsp;Logout
                    </button>
                    <div className="container rounded shadow-lg bg-white p-3 text-center mb-3">
                        <form className="">
                            <div className="form-group">
                                <h1 className="mx-auto">
                                    <span className="fa fa-user-circle fa-3x "></span>
                                </h1>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="photo-upload"
                                    hidden
                                />
                                <label
                                    className="btn btn-outline-success"
                                    htmlFor="photo-upload"
                                >
                                    <i className="fa fa-edit"></i> Edit
                                </label>
                            </div>

                            <div className="w-75 mx-auto">
                                <ul className="list-group list-group-flush">
                                    <div className="form-group ">
                                        <li className="list-group-item border-left-0 border-right-0">
                                            <div className="row">
                                                <div className="col-sm-8 col-md-8">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-sm-4 col-md-4">
                                                    <button className="btn btn-default">
                                                        <span className="text-primary fa fa-pencil-alt"></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="list-group-item border-left-0 border-right-0">
                                            <div className="row">
                                                <div className="col-sm-8 col-md-8">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-sm-4 col-md-4">
                                                    <button className="btn btn-default">
                                                        <span className="text-primary fa fa-pencil-alt"></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="list-group-item border-left-0 border-right-0">
                                            <div className="row">
                                                <div className="col-sm-8 col-md-8">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value="Test"
                                                        disabled
                                                    />
                                                </div>
                                                <div className="col-sm-4 col-md-4">
                                                    <button className="btn btn-default">
                                                        <span className="text-primary fa fa-pencil-alt"></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                </ul>

                                <button className="btn btn-primary font-weight-bold">
                                    <span className="fa fa-save"></span> Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Profile;
