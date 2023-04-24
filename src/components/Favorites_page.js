import './App.css';
import axios from 'axios';
import FavoriteCoinsTable from './FavoriteCoinsTable';
import Header from './Header';
import Footer from './Footer';
import * as React from "react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Favorites() {

  const [trendingCoins, setTrendingCoins] = useState([]);
  const favCoinsIDs = [];

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/search/trending`)
    .then(response => {
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
      setTrendingCoins(originalCoins);
    });
  }, []); 

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
  }
  

  return (
    <div className="Favorites_page">
      <header><Header name="Favorite Cryptocurrencies" /></header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Favorites_page">Favorite Coins</Link>
          </li>
        </ul>
      </nav>

      <FavoriteCoinsTable 
        favCoins={trendingCoins.filter (element => element.item.favorite_status === true)} 
        favoriteStatus={toggleFavoriteStatus}/>
            
      <footer><Footer /></footer>
    </div>
  );
}

export default Favorites;
