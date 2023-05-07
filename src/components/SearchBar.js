import * as React from "react";
import { useState } from "react";


function SearchBar(props) {

    const [searchText, setSearchText] = useState("");

    function handleChange(event) {
        setSearchText(event.target.value);
        props.onSearch(event.target.value);
        props.searchState(event.target.value.length);
    }

    return(
        <div>
            <input className="SearchBar" onChange={handleChange} value={searchText} placeholder="Search for cryptocurrencies..." />
        </div>

    );
}

export default SearchBar;