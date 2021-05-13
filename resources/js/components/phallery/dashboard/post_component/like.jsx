import React, { Component } from "react";
class Like extends Component {
    constructor(props) {
        super(props);
        this.state = { isClicked: false, count: this.props.count };
    }
    render() {
        const color = this.state.isClicked
            ? "fa fa-thumbs-up text-primary"
            : "far fa-thumbs-up";
        const classText = color + " fa-2x text-decoration-none";
        return (
            <React.Fragment>
                <p className="h5 font-weight-bold">{this.state.count}</p>
                <a href="#" className={classText}></a>
            </React.Fragment>
        );
    }
}

export default Like;
