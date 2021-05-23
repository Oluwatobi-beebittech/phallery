import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

function SearchResultUI(props) {
    const [searchResult, setSearchResult] = useState([]);
    const cookie = new Cookies();
    const sanctum_token = cookie.get("sanctum_token");
    axios.defaults.headers.common = {
        Authorization: "Bearer " + sanctum_token
    };

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/search/" + props.text)
            .then(res => {
                const result =
                    res.data.length > 0
                        ? res.data
                        : [{ image: "", name: "No result found" }];
                setSearchResult(result);
            })
            .catch(() => {
                setSearchResult([{ image: "", name: "No result yet" }]);
            });
    });
    return (
        <div className="container">
            <div className="search-result">
                <div className="list-group font-weight-bold">
                    <a
                        href="#"
                        className="list-group-item list-group-item-action d-flex flex-row align-items-center border-left-0 border-right-0"
                    >
                        <div className="img-circle-wrapper">
                            <img src="../image/1a.jpg" className="img-circle" />
                        </div>
                        <p className="mb-1">&nbsp; Alpha Juanita</p>
                    </a>
                    <a
                        href="#"
                        className="list-group-item list-group-item-action d-flex flex-row align-items-center border-left-0 border-right-0"
                    >
                        <div className="img-circle-wrapper">
                            <img src="../image/1a.jpg" className="img-circle" />
                        </div>
                        <p className="mb-1">&nbsp; Alpha Juanita</p>
                    </a>
                    <a
                        href="#"
                        className="list-group-item list-group-item-action d-flex flex-row align-items-center border-left-0 border-right-0"
                    >
                        <div className="img-circle-wrapper">
                            <img src="../image/1a.jpg" className="img-circle" />
                        </div>
                        <p className="mb-1">&nbsp; Alpha Juanita</p>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SearchResultUI;
