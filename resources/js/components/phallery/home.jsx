import React, { Component } from "react";
import Typed from "react-typed";

class Home extends Component {
    render() {
        return (
            <section className="bg-dark-trans viewport-80 text-white">
                <div className="container h-100 d-flex flex-md-row flex-column align-items-md-center">
                    <div className="md-6">
                        <h1 className="font-s-title">Celebrating African</h1>
                        <h1 className="font-s-title">
                            <Typed
                                strings={["People", "Communities", "Heritage"]}
                                typeSpeed={80}
                                backSpeed={80}
                                loop
                            />
                        </h1>
                    </div>
                    <div className="md-6 mx-md-auto">
                        <a
                            href=""
                            className="btn btn-lg btn-outline-light font-s-200"
                        >
                            <span className="fa fa-globe-africa"></span>
                            &nbsp;Explore
                        </a>
                    </div>
                </div>
            </section>
        );
    }
}

export default Home;
