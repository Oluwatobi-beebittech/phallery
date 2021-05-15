import React, { Component } from "react";
class Heart extends Component {
    constructor(props) {
        super(props);
        this.state = { isClicked: false, count: this.props.count };
        this.onHeartClicked = this.onHeartClicked.bind(this);
    }

    onHeartClicked(e) {
        e.preventDefault();
        const previousClick = this.state.isClicked;
        const countAdjust = previousClick
            ? this.state.count - 1
            : this.state.count + 1;
        this.setState({ isClicked: !previousClick, count: countAdjust });
    }
    render() {
        const color = this.state.isClicked
            ? "fa fa-heart text-danger"
            : "far fa-heart";
        const classText = color + " fa-2x text-decoration-none";
        return (
            <React.Fragment>
                <p className="h5 font-weight-bold">{this.state.count}</p>
                <a
                    href=""
                    className={classText}
                    onClick={this.onHeartClicked}
                ></a>
            </React.Fragment>
        );
    }
}

export default Heart;
