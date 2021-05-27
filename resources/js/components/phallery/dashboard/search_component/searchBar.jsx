import React, { Component } from "react";
import SearchResultUI from "./searchResultUI";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { searchText: "", focused: false };
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.unFocused = this.unFocused.bind(this);
        this.focused = this.focused.bind(this);
    }

    handleSearchChange(e) {
        this.setState({ searchText: e.target.value });
    }

    unFocused() {
        this.setState({ focused: false });
    }

    focused() {
        this.setState({ focused: true });
    }
    render() {
        const searchUI =
            this.state.searchText.trim() != "" && this.state.focused ? (
                <SearchResultUI text={this.state.searchText} />
            ) : (
                ""
            );
        return (
            <React.Fragment>
                <form className="form-inline ">
                    <div className="col-md-6 mx-auto">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <span className="fa fa-search"></span>
                                </div>
                            </div>
                            <input
                                type="text"
                                className="form-control rounded-left"
                                placeholder="Search for friends"
                                onChange={this.handleSearchChange}
                                onBlur={this.unFocused}
                                onFocus={this.focused}
                                value={this.state.searchText}
                            />
                        </div>
                        {searchUI}
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default SearchBar;
