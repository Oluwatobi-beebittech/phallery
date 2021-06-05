import React, { Component } from "react";
import { withRouter } from "react-router";
import Nav from "./nav";
import Banner from "./banner";
import SearchBar from "./search_component/searchBar";
import axios from "axios";
import Cookies from "universal-cookie";

class Network extends Component {
    constructor(props) {
        super(props);
        this.state = { connectionResult: [], isNetworkChecked: false };

        const sanctumTokenCookie = new Cookies();
        const sanctumToken = sanctumTokenCookie.get("sanctum_token");
        axios.defaults.headers.common = {
            Authorization: "Bearer " + sanctumToken
        };

        const cancelToken = axios.CancelToken;
        this.source = cancelToken.source();
        this.configAxios = { cancelToken: this.source.token };

        this.loadConnection = this.loadConnection.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
    }

    componentDidMount() {
        this.loadConnection();
    }

    componentDidUpdate() {
        this.loadConnection();
    }

    componentWillUnmount() {
        this.source.cancel("Network Component Unmounted");
    }

    /**
     * Loads all connections of the user
     */
    loadConnection() {
        axios
            .get("http://localhost:8000/api/network/all", this.configAxios)
            .then(res => {
                console.log(res.data);
                this.setState({
                    connectionResult: res.data,
                    isNetworkChecked: true
                });
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("My network component unmounted");
                } else {
                    this.setState({
                        isNetworkChecked: true
                    });
                }
            });
    }

    /**
     * Views the profile of the clicked user
     * @param {Object} connection
     */
    viewProfile(connection) {
        const userObject = {
            email: connection.conn_email,
            first_name: connection.conn_first_name,
            last_name: connection.conn_last_name,
            profile_image: connection.conn_profile_image,
            posts: [],
            isPostAvailabilityChecked: false,
            isFollowingChecked: false,
            isFollowing: false
        };
        this.props.history.push("/dashboard/search", userObject);
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
                            {this.state.isNetworkChecked ? (
                                this.state.connectionResult.length
                            ) : (
                                <span className="fa fa-spinner fa-pulse"></span>
                            )}
                        </h4>

                        <small className="font-weight-bold">Connections</small>
                    </div>

                    <div className="row text-center mt-2 link-card">
                        {this.state.isNetworkChecked &&
                        this.state.connectionResult.length > 0 ? (
                            this.state.connectionResult.map(connection => (
                                <a
                                    key={connection.conn_follow_id}
                                    className="col-md-3 rounded-lg bg-white shadow"
                                    onClick={e => {
                                        e.preventDefault();
                                        this.viewProfile(connection);
                                    }}
                                >
                                    <div className="img-circle-wrapper">
                                        <img
                                            src={
                                                "http://localhost:8000/" +
                                                connection.conn_profile_image
                                            }
                                            className="img-circle"
                                        />
                                    </div>
                                    <p className="font-weight-bold">
                                        {connection.conn_first_name +
                                            " " +
                                            connection.conn_last_name}
                                    </p>
                                    <p>
                                        <span className="fas fa-link"></span>{" "}
                                        {connection.conn_count} connections
                                    </p>
                                </a>
                            ))
                        ) : this.state.isNetworkChecked ? (
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
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Network);
