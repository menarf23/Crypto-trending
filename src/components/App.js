import './App.css';
// import mockData from "./mock_data.json";
// import axios from 'axios';
import TrendingCoinsTable from './TrendingCoinsTable';
import Header from './Header';
import Footer from './Footer';
import * as React from "react";
// import { useEffect, useState, useMemo } from 'react';
// import {useTable} from "react-table";

function App() {

  return (
    <div className="App">
      <Header />
      <TrendingCoinsTable />

      

      <Footer />
    </div>
  );
}

export default App;
