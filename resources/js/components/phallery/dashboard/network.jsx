import React, { Component } from "react";
import Nav from "./nav";
import Banner from "./banner";
import SearchBar from "./search_component/searchBar";
import axios from "axios";
import Cookies from "universal-cookie";

class Network extends Component {
    constructor(props) {
        this.state = { connectionResult: [], isNetworkChecked: false };

        const sanctumTokenCookie = new Cookies();
        const sanctumToken = sanctumTokenCookie.get("sanctum_token");
        axios.defaults.headers.common = {
            Authorization: "Bearer " + sanctumToken
        };

        const cancelToken = axios.CancelToken;
        this.source = cancelToken.source();
        this.configAxios = { cancelToken: this.source.token };

        this.loadConection = this.loadConection.bind(this);
    }

    componentDidMount() {
        this.loadConnection();
    }

    componentDidUpdate() {
        this.loadConnection();
    }

    /**
     * Loads all connections of the user
     */
    loadConnection() {
        axios
            .get("http://localhost:8000/api/network/all", this.configAxios)
            .then(res => {
                this.setState({
                    connectionResult: res.data,
                    isNetworkChecked: true
                });
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("My network component unmounted");
                }
                this.setState({ isNetworkChecked: true });
            });
    }
    render() {
        return (
            <React.Fragment>
                <Nav hasNotification={true} count={9} />
                <Banner text="My Network" />
                <div className="container my-3">
                    <SearchBar />

                    <div className="rounded-lg bg-primary text-white col-md-1  py-1 mx-auto text-center my-2 shadow-lg">
                        <h4 className="font-weight-bold">
                            {this.state.connectionResult.length > 0
                                ? this.state.connectionResult.length
                                : "Search and make connections"}
                        </h4>
                        {this.state.connectionResult.length > 0 ? (
                            <small className="font-weight-bold">
                                Connections
                            </small>
                        ) : (
                            ""
                        )}
                    </div>

                    <div className="row justify-content-around text-center mt-2 link-card">
                        {this.state.connectionResult > 0 ? (
                            this.state.connectionResult.map(item => (
                                <a className="col-md-3 rounded-lg bg-white shadow">
                                    <p className="mt-2 fa-2x">
                                        <span className="fa fa-user-circle fa-2x "></span>
                                    </p>
                                    <p className="font-weight-bold">
                                        Adinoyi, Abraham
                                    </p>
                                    <p>
                                        <span className="fas fa-link"></span> 43
                                        connections
                                    </p>
                                </a>
                            ))
                        ) : isNetworkChecked ? (
                            <p className="offset-md-4 font-weight-bold text-center text-muted">
                                <span className="fab fa-searchengin fa-2x"></span>{" "}
                                Seems like you have not made connections yet.
                                <br />
                                Search and start making connections
                            </p>
                        ) : (
                            <div className="font-weight-bold offset-md-6 text-center">
                                <span className="fa fa-spinner fa-pulse fa-3x"></span>
                                <p className="">Loading</p>
                            </div>
                        )}
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
