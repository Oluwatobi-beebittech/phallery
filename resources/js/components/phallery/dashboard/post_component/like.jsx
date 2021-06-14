import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

class Like extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: this.props.self_like,
            count: this.props.count
        };
        this.onLikeClicked = this.onLikeClicked.bind(this);
        this.processLike = this.processLike.bind(this);
        this.processUnlike = this.processUnlike.bind(this);

        const sanctumTokenCookie = new Cookies();
        const sanctumToken = sanctumTokenCookie.get("sanctum_token");
        axios.defaults.headers.common = {
            Authorization: "Bearer " + sanctumToken
        };

        const cancelToken = axios.CancelToken;
        this.source = cancelToken.source();
        this.configAxios = { cancelToken: this.source.token };
    }

    processLike() {
        axios
            .get(
                "http://localhost:8000/api/post/like/" + this.props.postId,
                this.configAxios
            )
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    processUnlike() {
        axios
            .get(
                "http://localhost:8000/api/post/unlike/" + this.props.postId,
                this.configAxios
            )
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    onLikeClicked(e) {
        e.preventDefault();
        const previousClick = this.state.isClicked;
        const countAdjust = previousClick
            ? this.state.count - 1
            : this.state.count + 1;
        this.setState({ isClicked: !previousClick, count: countAdjust });
        if (previousClick) {
            this.processUnlike();
        } else {
            this.processLike();
        }
    }

    componentWillUnmount() {
        this.source.cancel();
    }

    render() {
        const color = this.state.isClicked
            ? "fa fa-thumbs-up text-primary"
            : "far fa-thumbs-up";
        const classText = color + " fa-2x text-decoration-none";
        return (
            <React.Fragment>
                <p className="h5 font-weight-bold">{this.state.count}</p>
                <a
                    href=""
                    className={classText}
                    onClick={this.onLikeClicked}
                ></a>
            </React.Fragment>
        );
    }
}

export default Like;
