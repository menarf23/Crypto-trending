import './App.css';
import axios from 'axios';
import * as React from "react";
import { useEffect, useState } from 'react';


function SearchBar(props) {

    const [searchText, setSearchText] = useState("");

    function handleChange(event) {
        props.onSearch(event.target.value)
        setSearchText(event.target.value);
    }
    

    return(
        <div className="SearchBar">
            <input onChange={handleChange} value={searchText} placeholder="Search for cryptocurrencies..." />
        </div>

    );
}

export default SearchBar;