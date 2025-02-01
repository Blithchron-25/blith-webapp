import { Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import Rewards from "./pages/Rewards.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="rewards" element={<Rewards />} />
    </Routes>
  );
}

export default App;
