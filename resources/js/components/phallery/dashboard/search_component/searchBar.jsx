import React, { Component } from "react";
import SearchResultUI from "./searchResultUI";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { searchText: "" };
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(e) {
        this.setState({ searchText: e.target.value });
    }

    render() {
        const searchUI =
            this.state.searchText.trim() != "" ? <SearchResultUI /> : "";
        return (
            <React.Fragment>
                <form className="form-inline ">
                    <div className="col-md-6 mx-auto">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control rounded-left"
                                placeholder="Search for friends"
                                onChange={this.handleSearchChange}
                                value={this.state.searchText}
                            />
                            <div className="input-group-prepend">
                                <button className="btn btn-success rounded-right">
                                    <span className="fa fa-search text-white"></span>
                                </button>
                            </div>
                        </div>
                        {searchUI}
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default SearchBar;
