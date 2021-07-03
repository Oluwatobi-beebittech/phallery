import React from "react";
import ReactDOM from "react-dom";
import Nav from "./phallery/nav";
import Footer from "./phallery/footer";

function Index() {
    return (
        <React.Fragment>
            <Nav />
            <Footer />
        </React.Fragment>
    );
}

export default Index;

if (document.getElementById("body")) {
    ReactDOM.render(<Index />, document.getElementById("body"));
}
