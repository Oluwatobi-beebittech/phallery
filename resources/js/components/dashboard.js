import React from "react";
import ReactDOM from "react-dom";
import Nav from "./phallery/nav";
import Footer from "./phallery/footer";

function Dashboard() {
    return (
        <React.Fragment>
            <Nav />
            <Footer />
        </React.Fragment>
    );
}

export default Dashboard;

if (document.getElementById("body")) {
    ReactDOM.render(<Dashboard />, document.getElementById("body"));
}
