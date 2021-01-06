import React from "react";
import ReactDOM from "react-dom";
import Redirect from "./phallery/dashboard/redirect";
import Home from "./phallery/dashboard/home";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function Dashboard() {
    return (
        <React.Fragment>
            <Router>
                <Redirect />
                <Switch>
                    <Route exact path="/dashboard/feeds" component={Home} />
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default Dashboard;

if (document.getElementById("body")) {
    ReactDOM.render(<Dashboard />, document.getElementById("body"));
}
