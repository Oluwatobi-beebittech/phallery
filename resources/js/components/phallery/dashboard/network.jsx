import React, { Component } from "react";
import Nav from "./nav";
import Banner from "./banner";
import SearchBar from "./search_component/searchBar";

class Network extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav hasNotification={true} count={9} />
                <Banner text="My Network" />
                <div className="container my-3">
                    <SearchBar />

                    <div className="rounded-lg bg-primary text-white col-md-1  py-1 mx-auto text-center my-2 shadow-lg">
                        <h4 className="font-weight-bold">55</h4>
                        <small className="font-weight-bold">Connections</small>
                    </div>

                    <div className="row justify-content-around text-center mt-2 link-card">
                        <a className="col-md-3 rounded-lg bg-white shadow">
                            <p className="mt-2 fa-2x">
                                <span className="fa fa-user-circle fa-2x "></span>
                            </p>
                            <p className="font-weight-bold">Adinoyi, Abraham</p>
                            <p>
                                <span className="fas fa-link"></span> 43
                                connections
                            </p>
                        </a>

                        <a className="col-md-3 rounded-lg bg-white shadow">
                            <p className="mt-2 fa-2x">
                                <span className="fa fa-user-circle fa-2x "></span>
                            </p>
                            <p className="font-weight-bold">Adinoyi, Abraham</p>
                            <p>
                                <span className="fas fa-link"></span> 43
                                connections
                            </p>
                        </a>

                        <a className="col-md-3 rounded-lg bg-white shadow">
                            <p className="mt-2 fa-2x">
                                <span className="fa fa-user-circle fa-2x "></span>
                            </p>
                            <p className="font-weight-bold">Adinoyi, Abraham</p>
                            <p>
                                <span className="fas fa-link"></span> 43
                                connections
                            </p>
                        </a>
                    </div>

                    <div className="row justify-content-around text-center mt-2 link-card">
                        <a className="col-md-3 rounded-lg bg-white shadow">
                            <p className="mt-2 fa-2x">
                                <span className="fa fa-user-circle fa-2x "></span>
                            </p>
                            <p className="font-weight-bold">Adinoyi, Abraham</p>
                            <p>
                                <span className="fas fa-link"></span> 43
                                connections
                            </p>
                        </a>

                        <a className="col-md-3 rounded-lg bg-white shadow">
                            <p className="mt-2 fa-2x">
                                <span className="fa fa-user-circle fa-2x "></span>
                            </p>
                            <p className="font-weight-bold">Adinoyi, Abraham</p>
                            <p>
                                <span className="fas fa-link"></span> 43
                                connections
                            </p>
                        </a>

                        <a className="col-md-3 rounded-lg bg-white shadow">
                            <p className="mt-2 fa-2x">
                                <span className="fa fa-user-circle fa-2x "></span>
                            </p>
                            <p className="font-weight-bold">Adinoyi, Abraham</p>
                            <p>
                                <span className="fas fa-link"></span> 43
                                connections
                            </p>
                        </a>
                    </div>

                    <div className="row justify-content-around text-center mt-2 link-card">
                        <a className="col-md-3 rounded-lg bg-white shadow">
                            <p className="mt-2 fa-2x">
                                <span className="fa fa-user-circle fa-2x "></span>
                            </p>
                            <p className="font-weight-bold">Adinoyi, Abraham</p>
                            <p>
                                <span className="fas fa-link"></span> 43
                                connections
                            </p>
                        </a>

                        <a className="col-md-3 rounded-lg bg-white shadow">
                            <p className="mt-2 fa-2x">
                                <span className="fa fa-user-circle fa-2x "></span>
                            </p>
                            <p className="font-weight-bold">Adinoyi, Abraham</p>
                            <p>
                                <span className="fas fa-link"></span> 43
                                connections
                            </p>
                        </a>

                        <a className="col-md-3 rounded-lg bg-white shadow">
                            <p className="mt-2 fa-2x">
                                <span className="fa fa-user-circle fa-2x "></span>
                            </p>
                            <p className="font-weight-bold">Adinoyi, Abraham</p>
                            <p>
                                <span className="fas fa-link"></span> 43
                                connections
                            </p>
                        </a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Network;
