import React, { Component } from "react";
class Like extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <a
                    href="#"
                    className="far fa-thumbs-up fa-2x text-decoration-none"
                ></a>
                <span class="badge badge-pill badge-warning">
                    {this.props.count}
                </span>
            </React.Fragment>
        );
    }
}

export default Like;
