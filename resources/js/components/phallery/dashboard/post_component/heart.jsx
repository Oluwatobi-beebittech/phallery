import React, { Component } from "react";
class Heart extends Component {
    constructor(props) {
        super(props);
        this.state = { isClicked: this.props.self_heart, count: this.props.count };
        this.onHeartClicked = this.onHeartClicked.bind(this);
        this.processHeart = this.processHeart.bind(this);
        this.processUnheart = this.processUnheart.bind(this);

        const sanctumTokenCookie = new Cookies();
        const sanctumToken = sanctumTokenCookie.get("sanctum_token");
        axios.defaults.headers.common = {
            Authorization: "Bearer " + sanctumToken
        };

        const cancelToken = axios.CancelToken;
        this.source = cancelToken.source();
        this.configAxios = { cancelToken: this.source.token };
    }

    processHeart() {
        axios
            .get(
                "http://localhost:8000/api/post/heart/" + this.props.postId,
                this.configAxios
            )
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    processUnheart() {
        axios
            .get(
                "http://localhost:8000/api/post/unheart/" + this.props.postId,
                this.configAxios
            )
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    onHeartClicked(e) {
        e.preventDefault();
        const previousClick = this.state.isClicked;
        const countAdjust = previousClick
            ? this.state.count - 1
            : this.state.count + 1;
        this.setState({ isClicked: !previousClick, count: countAdjust });
        if (previousClick) {
            this.processUnheart();
        } else {
            this.processHeart();
        }
    }

    componentWillUnmount() {
        this.source.cancel();
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
