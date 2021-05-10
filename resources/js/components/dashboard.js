import React from "react";
import ReactDOM from "react-dom";
import Redirect from "./phallery/dashboard/redirect";
import Home from "./phallery/dashboard/home";
import Feeds from "./phallery/dashboard/feeds";
import Profile from "./phallery/dashboard/profile";
import Notifications from "./phallery/dashboard/notifications";
import Index from "./index";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function Dashboard() {
    return (
        <React.Fragment>
            <Router>
                <Switch>
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
                    <Route exact path="/dashboard/myposts" component={Feeds} />
                    <Route exact path="/dashboard/feeds" component={Home} />

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
