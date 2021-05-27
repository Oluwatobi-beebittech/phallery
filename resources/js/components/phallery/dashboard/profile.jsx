import React, { Component } from "react";
import Nav from "./nav";
import Banner from "./banner";
class Profile extends Component {
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
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Profile;
