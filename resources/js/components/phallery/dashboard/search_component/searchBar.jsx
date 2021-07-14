import React, { Component } from "react";
import SearchResultUI from "./searchResultUI";

/**
 * Search Bar Component displays search bar
 * @state
 *      @String searchText
 *      @boolean focused - to track input search focus
 *      @boolean searchResultFocus - to track mouse focus on search result
 * @props
 * 
 * @methods
 *      handleSearchChange
 *      focused
 *      searchResultFocused
 */

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            focused: false,
            searchResultFocus: false
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.focused = this.focused.bind(this);
        this.searchResultFocused = this.searchResultFocused.bind(this);
        
    }

    /**
     * Handles the change of search text
     * @param {Event} e 
     */
    handleSearchChange(e) {
        this.setState({ searchText: e.target.value });
    }

    /**
     * Sets the focus of the search input field in this.state
     * @param {Boolean} value
     */
    focused(value) {
        this.setState({ focused: value });
    }

    /**
     * Sets the focus of the search results in this.state
     * @param {Boolean} value 
     */
    searchResultFocused(value) {
        this.setState({ searchResultFocus: value });
    }

    render() {
        const focus = this.state.focused || this.state.searchResultFocus;
        const searchUI =
            this.state.searchText.trim() !== "" && focus ? (
                <SearchResultUI
                    text={this.state.searchText}
                    searchResultFocused={this.searchResultFocused}
                />
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
                                onBlur={() => this.focused(false)}
                                onFocus={() => this.focused(true)}
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
