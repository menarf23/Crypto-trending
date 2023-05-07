import axios from "axios";
import SearchBar from "./SearchBar";
import TrendingCoinsTable from "./TrendingCoinsTable";
import SearchTable from "./SearchTable";
import Header from "./Header";
import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { debounce } from "lodash";

function Home() {

  const [trendingCoins, setTrendingCoins] = useState([]);
  const favCoinsIDs = [];
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setSearchActive] = useState(false);

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/search/trending`)
    .then(response => {
      console.log("Raw data: ", response);
      const originalCoins = response.data.coins;
      originalCoins.forEach(element => {
        element.item.favorite_status = false;
      });

      if (localStorage.getItem("FavCoinsIDs")) {
        originalCoins.forEach(element => {
          if (localStorage.getItem("FavCoinsIDs").includes(element.item.id) ){
            element.item.favorite_status = true;
          }
        });
      }
      else {
        localStorage.setItem("FavCoinsIDs", favCoinsIDs );
      }

      setTrendingCoins(originalCoins);
    });
  }, []); 

  console.log("Trending Coins: ", trendingCoins);
  console.log("Search Coins: ", searchResults);

  function toggleFavoriteStatus(row) {
    const coinToUpdateIndex = trendingCoins.findIndex(coin => coin.item.coin_id === row.original.item.coin_id);
    const temporaryTrendingCoins = [...trendingCoins];

    temporaryTrendingCoins.forEach(element => {
      if (localStorage.getItem("FavCoinsIDs").includes(element.item.id) ){
        element.item.favorite_status = true;
      }
      else {
        element.item.favorite_status = false;
      }
    });      
    
    temporaryTrendingCoins[coinToUpdateIndex].item.favorite_status = !row.original.item.favorite_status;
    setTrendingCoins(temporaryTrendingCoins);

    trendingCoins.forEach(element => {
      if (element.item.favorite_status === true) {
        favCoinsIDs.push(element.item.id);
      }
      localStorage.setItem("FavCoinsIDs", favCoinsIDs );
    });

    console.log("Favorite Coins IDs: ", favCoinsIDs);
  }

  function getSearchData(searchedTerm) {

    if (searchedTerm.length > 0) {
      axios.get(`https://api.coingecko.com/api/v3/search?query=${searchedTerm}`)
      .then(response => {
        setSearchResults(response.data.coins);
      });
    }
    else {
      setSearchResults([]);
    }

    console.log("Searched term: ", searchedTerm);
  }

  const debouncedOnSearch = useMemo(
    () => debounce(getSearchData, 300), []
    );

  function toggleSearchState(textLength) {
    textLength > 0 ? setSearchActive(true) : setSearchActive(false)
  }

  return (
    <div className="Home_page">
      <header><Header name="Trending Cryptocurrencies"/></header>

      <SearchBar onSearch={debouncedOnSearch} searchState={toggleSearchState}/>
      
      {!isSearchActive ? <TrendingCoinsTable trendCoins={trendingCoins} favoriteStatus={toggleFavoriteStatus}/> 
      : <SearchTable searchCoins={searchResults} />}
              
    </div>
  );
}

export default Home;
