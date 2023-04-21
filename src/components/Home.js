import './App.css';
import * as React from "react";
import TrendingCoinsTable from './TrendingCoinsTable';
import SearchTable from './SearchTable';

function Home(props) {
    return (
    <div> 
        {props.searchStatus ? <TrendingCoinsTable trendCoins={props.trendCoins} favoriteStatus={props.favoriteStatus}/> 
        : <SearchTable searchCoins={props.searchCoins} />}
    </div>
    );
    
}

export default Home;