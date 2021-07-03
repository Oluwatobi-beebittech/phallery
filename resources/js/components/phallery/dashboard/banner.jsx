import React, { Component } from "react";
class Banner extends Component {
    render() {
        return (
            <div className="bg-success py-3">
                <div className="container">
                    <h5 className="font-weight-bold text-white shadow-lg">
                        {this.props.text}
                    </h5>
                </div>
            </div>
        );
    }
}

export default Banner;
