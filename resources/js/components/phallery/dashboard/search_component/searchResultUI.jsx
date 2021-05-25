import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

function SearchResultUI(props) {
    const [searchResult, setSearchResult] = useState([
        {
            email: "a@yahoo.com",
            first_name: "Talt",
            last_name: "Ty",
            profile_image: "post"
        }
    ]);
    const cookie = new Cookies();
    let componentMounted = true;
    const sanctum_token = cookie.get("sanctum_token");
    axios.defaults.headers.common = {
        Authorization: "Bearer " + sanctum_token
    };

    useEffect(() => {
        if (componentMounted) {
            axios
                .get("http://localhost:8000/api/search/" + props.text)
                .then(res => {
                    let result =
                        res.data.length > 0
                            ? res.data
                            : [{ image: "", name: "No result found" }];
                    console.log(result);
                    // setSearchResult(result);
                })
                .catch(() => {
                    setSearchResult([{ image: "", name: "No result yet" }]);
                });
        }
        return () => {
            componentMounted = false;
        };
    });
    return (
        <div className="container">
            <div className="search-result">
                <div className="list-group font-weight-bold">
                    ye
                    {/* {searchResult.map(item => {
                        <a
                            key={item.email}
                            href="#"
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
                                &nbsp; {item.first_name + " " + item.last_name}
                            </p>
                        </a>;
                    })} */}
                </div>
            </div>
        </div>
    );
}

export default SearchResultUI;
