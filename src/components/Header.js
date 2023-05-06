import { yellow } from "@mui/material/colors";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header className="App-header">
            <Link style={{color: yellow[500]}} to="/"> 
                <div title="Home" className="header-button">
                    <HomeIcon className="header-icon" style={{fontSize: "48px"}} />
                </div>
            </Link>
                <h1>{props.name}</h1>
            <Link style={{color: yellow[500]}} to="/Favorites">
                <div title="Favorites" className="header-button">
                    <FavoriteIcon className="header-icon" style={{fontSize: "48px"}}/>
                 </div> 
            </Link>
        </header>
    )
}

export default Header;