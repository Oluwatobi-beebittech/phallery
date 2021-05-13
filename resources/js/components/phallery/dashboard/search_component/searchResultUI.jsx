import React, { Component } from "react";

class SearchResultUI extends Component {
    render() {
        return (
            <div className="container">
                <div className="search-result">
                    <div className="list-group font-weight-bold">
                        <a
                            href="#"
                            className="list-group-item list-group-item-action d-flex flex-row align-items-center border-left-0 border-right-0"
                        >
                            <div className="img-circle-wrapper">
                                <img
                                    src="../image/1a.jpg"
                                    className="img-circle"
                                />
                            </div>
                            <p className="mb-1">&nbsp; Alpha Juanita</p>
                        </a>
                        <a
                            href="#"
                            className="list-group-item list-group-item-action d-flex flex-row align-items-center border-left-0 border-right-0"
                        >
                            <div className="img-circle-wrapper">
                                <img
                                    src="../image/1a.jpg"
                                    className="img-circle"
                                />
                            </div>
                            <p className="mb-1">&nbsp; Alpha Juanita</p>
                        </a>
                        <a
                            href="#"
                            className="list-group-item list-group-item-action d-flex flex-row align-items-center border-left-0 border-right-0"
                        >
                            <div className="img-circle-wrapper">
                                <img
                                    src="../image/1a.jpg"
                                    className="img-circle"
                                />
                            </div>
                            <p className="mb-1">&nbsp; Alpha Juanita</p>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchResultUI;
