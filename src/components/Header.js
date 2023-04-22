import React from "react";

function Header(props) {
    return (
        <header className="App-header">
            <h1>{props.name}</h1>
        </header>
    )
    
}

export default Header;