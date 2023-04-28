// import "./App.css";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";


function RawData() {

  const [coins, setCoins] = useState([]);

  
  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/search/trending`)
    .then(response => {
      console.log("Raw data: ", response);
      const originalCoins = response.data.coins;
      originalCoins.forEach(element => {
        element.item.favorite_status = false;
      });
      console.log("Raw coins: ", response.data.coins);
      setCoins(originalCoins);
    });
  }, []); 
  

  console.log("List of trending coins: ", coins);


}

export default RawData;

