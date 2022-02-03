import React from "react";
import "./SearchBar.css";

const SearchBar = (props) => {
    return (
        <input
            type="text"
            onChange={props.onSearchTextChange}
            value={props.searchText}
            name="searchText"
            placeholder="Search"
        />
    );
};

export default SearchBar;