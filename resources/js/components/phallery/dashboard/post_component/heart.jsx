import React, { Component } from "react";
class Heart extends Component {
    constructor(props) {
        super(props);
        this.state = { isClicked: false };
    }
    render() {
        return (
            <React.Fragment>
                <a
                    href="#"
                    className="far fa-heart fa-2x text-decoration-none"
                ></a>
                <span class="badge badge-pill badge-warning">
                    {this.props.count}
                </span>
            </React.Fragment>
        );
    }
}

export default Heart;
