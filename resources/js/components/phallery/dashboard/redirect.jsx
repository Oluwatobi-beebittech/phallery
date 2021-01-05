import React, { Component } from "react";
import queryString from "query-string";

class Redirect extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // const value = queryString.parse(this.props.location.search);
        // const token = value.token;
        // console.log('token', token);
        console.log(this.props);
    }
    render() {
        return (
            <section className="viewport-80 text-white">
                <div className="container h-100 d-flex flex-column align-items-md-center">
                    <div className="mx-auto my-auto text-center">
                        <p className="text-muted ">
                            You will be redirected automatically. If this does
                            not happen, click the go to dashboard button
                        </p>
                        <a className="btn btn-lg btn-dark">Go to Dashboard</a>
                    </div>
                </div>
            </section>
        );
    }
}

export default Redirect;
