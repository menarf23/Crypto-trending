import './App.css';
import axios from 'axios';
import SearchBar from './SearchBar';
import TrendingCoinsTable from './TrendingCoinsTable';
import FavoriteCoinsTable from './FavoriteCoinsTable';
import SearchTable from './SearchTable';
import Header from './Header';
import Footer from './Footer';
import * as React from "react";
import { useEffect, useState } from 'react';

function App() {

  const [trendingCoins, setTrendingCoins] = useState([]);
  const favCoinsIDs = [];
  const [searchResults, setSearchResults] = useState([]);
  

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

      console.log("Raw coins: ", response.data.coins);
      setTrendingCoins(originalCoins);
    });
  }, []); 

  console.log("Trending Coins: ", trendingCoins);

  function toggleFavoriteStatus(row) {
    const coinToUpdateIndex = trendingCoins.findIndex(coin => coin.item.coin_id === row.original.item.coin_id);
    const temporaryTrendingCoins = [...trendingCoins];
    temporaryTrendingCoins[coinToUpdateIndex].item.favorite_status = !row.original.item.favorite_status;
    setTrendingCoins(temporaryTrendingCoins);


    temporaryTrendingCoins.forEach(element => {
      if (element.item.favorite_status === true) {
        favCoinsIDs.push(element.item.id);
      }
      localStorage.setItem("FavCoinsIDs", favCoinsIDs );
    });

    console.log("Favorite Coins IDs: ", favCoinsIDs);
  }

  function getSearchData(searchedTerm) {
    axios.get(`https://api.coingecko.com/api/v3/search?query=${searchedTerm}`)
    .then(response => {   
      if (searchedTerm.length > 0) {
        setSearchResults(response.data.coins);
      }
      else {
        setSearchResults([]);
      }
    });

    console.log("Searched term: ", searchedTerm);
  }

  return (
    <div className="App">
      <Header />
      <SearchBar onSearch={getSearchData} />
      <TrendingCoinsTable 
      trendCoins={trendingCoins} favoriteStatus={toggleFavoriteStatus}/>
      <SearchTable searchCoins={searchResults} />
      
      <FavoriteCoinsTable 
      favCoins={trendingCoins.filter (element => element.item.favorite_status === true)} 
      favoriteStatus={toggleFavoriteStatus}/>
      

      <Footer />
    </div>
  );
}

export default App;
