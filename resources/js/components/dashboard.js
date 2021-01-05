import React from "react";
import ReactDOM from "react-dom";
import Redirect from "./phallery/dashboard/redirect";

function Dashboard() {
    return (
        <React.Fragment>
            <Redirect />
            
        </React.Fragment>
    );
}

export default Dashboard;

if (document.getElementById("body")) {
    ReactDOM.render(<Dashboard />, document.getElementById("body"));
}
