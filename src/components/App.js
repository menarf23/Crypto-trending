import './App.css';
import axios from 'axios';
import TrendingCoinsTable from './TrendingCoinsTable';
import FavoriteCoinsTable from './FavoriteCoinsTable';
import Header from './Header';
import Footer from './Footer';
import * as React from "react";
import { useEffect, useState } from 'react';

function App() {

  const [trendingCoins, setTrendingCoins] = useState([]);
  // const [favoriteCoins, setFavoriteCoins] = useState([]);
  const favCoinsIDs = [];
  // localStorage.setItem("FavCoinsIDs", favCoinsIDs );
  
  

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/search/trending`)
    .then(response => {
      console.log("Raw data: ", response);
      const originalCoins = response.data.coins;
      originalCoins.forEach(element => {
        element.item.favorite_status = false;
      });

      originalCoins.forEach(element => {
        if (localStorage.getItem("FavCoinsIDs").includes(element.item.id) ){
          element.item.favorite_status = true;
        }
      });


      console.log("Raw coins: ", response.data.coins);
      setTrendingCoins(originalCoins);
    });
  }, []); 

  console.log("Trending Coins: ", trendingCoins);
  // console.log("Favorite Coins: ", favoriteCoins);
  // console.log("Favorite Coins IDs: ", favCoinsIDs);



  function toggleFavoriteStatus(row) {
    const coinToUpdateIndex = trendingCoins.findIndex(coin => coin.item.coin_id === row.original.item.coin_id
      );
    const temporaryTrendingCoins = [...trendingCoins];
    temporaryTrendingCoins[coinToUpdateIndex].item.favorite_status = !row.original.item.favorite_status;
    setTrendingCoins(temporaryTrendingCoins);

    // const temporaryFavoriteCoins = temporaryTrendingCoins.filter (element => element.item.favorite_status === true);
    // setFavoriteCoins(temporaryFavoriteCoins);

    // const favCoinsIDs = [];
    temporaryTrendingCoins.forEach(element => {
      if (element.item.favorite_status === true) {
        favCoinsIDs.push(element.item.id);
      }
      localStorage.setItem("FavCoinsIDs", favCoinsIDs );
    });

    console.log("Favorite Coins IDs: ", favCoinsIDs);



    
      
    
    // const temporaryCoins = [...trendingCoins];
    // temporaryCoins[id].item.favorite_status = !trendingCoins[id].item.favorite_status;
    // setTrendingCoins(temporaryCoins);
  }

  return (
    <div className="App">
      <Header />
      
      <TrendingCoinsTable trendCoins={trendingCoins} favoriteStatus={toggleFavoriteStatus}/>
      <FavoriteCoinsTable favCoins={trendingCoins.filter (element => element.item.favorite_status === true)} favoriteStatus={toggleFavoriteStatus}/>
      

      <Footer />
    </div>
  );
}

export default App;
