import "./App.css";
import Home from "./Home";
import Favorites from "./Favorites";
import Footer from "./Footer";
import * as React from "react";
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/"  element={<Home />}/>
        <Route path="/Favorites"  element={<Favorites />} />
      </Routes>
      <footer><Footer /></footer>
    </div>
  );
}

export default App;
