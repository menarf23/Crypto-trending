import './App.css';
// import axios from 'axios';
import Coins from './Coins';
// import TrendingCoinsTable from './TrendingCoinsTable';
// import FavoriteCoinsTable from './FavoriteCoinsTable';
import Header from './Header';
import Footer from './Footer';
import * as React from "react";
// import { useEffect, useState } from 'react';

function App() {

  return (
    <div className="App">
      <Header />
      <Coins />
      <Footer />
    </div>
  );
}

export default App;
