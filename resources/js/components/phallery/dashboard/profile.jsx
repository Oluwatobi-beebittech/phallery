import React, { Component } from "react";
import Nav from "./nav";
import Banner from "./banner";
class Profile extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav />
                <Banner text="Profile" />

                <div className="container">
                    <button className="btn btn-outline-danger my-3">
                        <span className="fa fa-plus-square"></span>
                        &nbsp;Logout
                    </button>
                    <div className="container rounded shadow-lg bg-white p-3 text-center">
                        <h1 className="fa fa-user-circle fa-5x mx-auto"></h1>
                        <button className="btn btn-outline-info">
                            <i className="fa fa-pencil"></i> Edit
                        </button>
                        <form className="">
                            
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Profile;
