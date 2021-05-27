import React, { Component } from "react";
import { createBrowserHistory } from "history";
import axios from "axios";
import Cookies from "universal-cookie";

class SearchResultUI extends Component {
    constructor(props) {
        super(props);
        this.state = { searchResult: [] };
        const cookie = new Cookies();

        const sanctum_token = cookie.get("sanctum_token");

        axios.defaults.headers.common = {
            Authorization: "Bearer " + sanctum_token
        };

        this.cancelToken = axios.CancelToken;
        this.source = this.cancelToken.source();
        this.configAxios = { cancelToken: this.source.token };

        this.history = createBrowserHistory();
        this.viewSearchResult = this.viewSearchResult.bind(this);
        this.getUnknownState = this.getUnknownState.bind(this);
        this.setSearchResultFocus = this.setSearchResultFocus.bind(this);
    }
    getUnknownState() {
        return {
            email: "unknown@xyz.com",
            profile_image: "profile/eTTydgxzlOOusgqWEtSgejskl.jpg",
            first_name: "No result found",
            last_name: ""
        };
    }
    componentDidMount() {
        axios
            .get(
                "http://localhost:8000/api/search/" + this.props.text,
                this.configAxios
            )
            .then(res => {
                let result =
                    res.data.length > 0 ? res.data : [this.getUnknownState()];

                this.setState({ searchResult: result });
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log("Search Result Unmounted");
                } else {
                    this.setState({
                        searchResult: [this.getUnknownState()]
                    });
                }
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.text !== this.props.text) {
            axios
                .get(
                    "http://localhost:8000/api/search/" + this.props.text,
                    this.configAxios
                )
                .then(res => {
                    let result =
                        res.data.length > 0
                            ? res.data
                            : [this.getUnknownState()];

                    this.setState({ searchResult: result });
                })
                .catch(err => {
                    if (axios.isCancel(err)) {
                        console.log("Search Result Unmounted");
                    } else {
                        this.setState({
                            searchResult: [this.getUnknownState()]
                        });
                    }
                });
        }
    }

    componentWillUnmount() {
        this.source.cancel("Search Result Unmounted");
    }

    viewSearchResult(e) {
        e.preventDefault();
    }
    setSearchResultFocus(value) {
        this.props.searchResultFocused(value);
    }
    render() {
        return (
            <div className="container">
                <div className="search-result">
                    <div className="list-group font-weight-bold">
                        {this.state.searchResult.length > 0 ? (
                            this.state.searchResult.map(item => (
                                <a
                                    key={item.email}
                                    href=""
                                    onClick={this.viewSearchResult}
                                    onMouseOver={() =>
                                        this.setSearchResultFocus(true)
                                    }
                                    onMouseLeave={() =>
                                        this.setSearchResultFocus(false)
                                    }
                                    className="list-group-item list-group-item-action d-flex flex-row align-items-center border-left-0 border-right-0"
                                >
                                    <div className="img-circle-wrapper">
                                        <img
                                            src={
                                                "http://localhost:8000/" +
                                                item.profile_image
                                            }
                                            className="img-circle"
                                        />
                                    </div>
                                    <p className="mb-1">
                                        &nbsp;{" "}
                                        {item.first_name + " " + item.last_name}
                                    </p>
                                </a>
                            ))
                        ) : (
                            <div className="font-weight-bold py-3">
                                <p className="text-center">
                                    <span className="fa fa-spinner fa-pulse text-center"></span>
                                    &nbsp;Loading
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchResultUI;
