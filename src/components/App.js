import './App.css';
// import mockData from "./mock_data.json";
import axios from 'axios';
import TrendingCoinsTable from './TrendingCoinsTable';
// import RawData from './RawData';
import Header from './Header';
import Footer from './Footer';
import * as React from "react";
import { useEffect, useState } from 'react';
// import {useTable} from "react-table";

function App() {

  const [trendingCoins, setTrendingCoins] = useState([]);
  const [favoriteCoins, setFavoriteCoins] = useState([]);

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/search/trending`)
    .then(response => {
      console.log("Raw data: ", response);
      const originalCoins = response.data.coins;
      originalCoins.forEach(element => {
        element.item.favorite_status = false;
      });
      console.log("Raw coins: ", response.data.coins);
      setTrendingCoins(originalCoins);
    });
  }, []); 

  console.log("Trending Coins: ", trendingCoins);
  console.log("Favorite Coins: ", favoriteCoins);



  function toggleFavoriteStatus(row) {
    const coinToUpdateIndex = trendingCoins.findIndex(coin => coin.item.coin_id === row.original.item.coin_id
      );
    const temporaryTrendingCoins = [...trendingCoins];
    temporaryTrendingCoins[coinToUpdateIndex].item.favorite_status = !row.original.item.favorite_status;
    setTrendingCoins(temporaryTrendingCoins);

    const temporaryFavoriteCoins = temporaryTrendingCoins.filter (element => element.item.favorite_status === true);
    setFavoriteCoins(temporaryFavoriteCoins);
    // const temporaryCoins = [...trendingCoins];
    // temporaryCoins[id].item.favorite_status = !trendingCoins[id].item.favorite_status;
    // setTrendingCoins(temporaryCoins);
  }

  return (
    <div className="App">
      <Header />
      
      <TrendingCoinsTable trendCoins={trendingCoins} favoriteStatus={toggleFavoriteStatus}/>

      

      <Footer />
    </div>
  );
}

export default App;
