import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { DOMAIN_NAME } from "../env";

class Nav extends Component {
    constructor(props) {
        super(props);

        const sanctumCookie = new Cookies();
        const sanctumToken = sanctumCookie.get("sanctum_token");
        axios.defaults.headers.common = {
            Authorization: "Bearer " + sanctumToken
        };

        const cancelToken = axios.CancelToken;
        this.source = cancelToken.source();
        this.configAxios = { cancelToken: this.source.token };

        this.state = {
            hasNotification: false,
            notificationCount: 0
        };
        this.setUnreadNotification = this.setUnreadNotification.bind(this);
    }

    componentDidMount() {
        this.setUnreadNotification();
    }

    componentWillUnmount(){
        this.source.cancel("Nav component unmounted");
    }

    setUnreadNotification() {
        let notifyCount = 0;
        axios
            .get(`${DOMAIN_NAME}/api/notification/count`)
            .then(res => {
                console.log(res);
                console.log(res.data.notificationCount);
                notifyCount = res.data.notificationCount;
                let notificationPresent = notifyCount > 0;
                this.setState({
                    notificationCount: notifyCount,
                    hasNotification: notificationPresent
                });
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("Nav unmounted");
                } else {
                    console.log(error);
                    notifyCount = 0;
                    this.setState({
                        notificationCount: notifyCount,
                        hasNotification: false
                    });
                }
            });
        
    }

    render() {
        const notifyIcon = this.state.hasNotification
            ? "text-warning fa fa-bell"
            : "far fa-bell";
        const notifyBadge =
            this.state.notificationCount > 0
                ? "badge badge-pill badge-warning"
                : "";
        const notifyCount =
            this.state.notificationCount > 0
                ? this.state.notificationCount
                : "";
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                    <Link to="/" className="navbar-brand font-weight-bold">
                        Phallery
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item mx-1 my-1">
                                <Link
                                    to="/dashboard/feeds"
                                    className="active nav-link btn btn-lg bg-dark text-white mr-0"
                                >
                                    <span className="fa fa-home"></span>
                                    &nbsp;Home
                                </Link>
                            </li>
                            <li className="nav-item mx-1 my-1">
                                <Link
                                    to="/dashboard/myposts"
                                    className="nav-link btn btn-lg bg-dark text-white mr-0"
                                >
                                    <span className="fa fa-images"></span>
                                    &nbsp;My Posts
                                </Link>
                            </li>
                            <li className="nav-item mx-1 my-1">
                                <Link
                                    to="/dashboard/mynetwork"
                                    className="nav-link btn btn-lg bg-dark text-white mr-0"
                                >
                                    <span className="fa fa-network-wired"></span>
                                    &nbsp;My Network
                                </Link>
                            </li>
                            <li className="nav-item mx-1 my-1">
                                <Link
                                    to="/dashboard/profile"
                                    className="nav-link btn btn-lg bg-dark text-white mr-0"
                                >
                                    <span className="fa fa-user-circle"></span>
                                    &nbsp;Profile
                                </Link>
                            </li>
                            <li className="nav-item mx-1 my-1">
                                <Link
                                    to="/dashboard/notifications"
                                    className="nav-link btn btn-lg bg-dark text-white mr-0"
                                >
                                    <span className={notifyIcon}></span>
                                    &nbsp;Notification&nbsp;
                                    <span className={notifyBadge}>
                                        {notifyCount}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

export default Nav;
