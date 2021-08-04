import React from "react";
import ReactDOM from "react-dom";
import Index from "./index";
import Redirect from "./phallery/dashboard/redirect";
import Home from "./phallery/dashboard/home";
import Feeds from "./phallery/dashboard/feeds";
import Profile from "./phallery/dashboard/profile";
import Network from "./phallery/dashboard/network";
import Notifications from "./phallery/dashboard/notifications";
import ViewProfile from "./phallery/dashboard/search_component/viewProfile";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function Dashboard() {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/dashboard/search"
                        component={ViewProfile}
                    />
                    <Route
                        exact
                        path="/dashboard/notifications"
                        component={Notifications}
                    />
                    <Route
                        exact
                        path="/dashboard/profile"
                        component={Profile}
                    />
                    <Route
                        exact
                        path="/dashboard/mynetwork"
                        component={Network}
                    />
                    <Route exact path="/dashboard/myposts" component={Feeds} />
                    <Route exact path="/dashboard/feeds" component={Home} />
                    <Route exact path="/" component={Index} />
                    <Redirect />
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default Dashboard;

if (document.getElementById("body")) {
    ReactDOM.render(<Dashboard />, document.getElementById("body"));
}
