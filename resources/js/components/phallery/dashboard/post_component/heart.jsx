import React, { Component } from "react";
class Heart extends Component {
    constructor(props) {
        super(props);
        this.state = { isClicked: false, count: this.props.count };
    }
    render() {
        const color = this.state.isClicked
            ? "fa fa-heart text-danger"
            : "far fa-heart";
        const classText = color + " fa-2x text-decoration-none";
        return (
            <React.Fragment>
                <p class="h5 font-weight-bold">{this.state.count}</p>
                <a href="#" className={classText}></a>
            </React.Fragment>
        );
    }
}

export default Heart;
