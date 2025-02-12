import { Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import Rewards from "./pages/Rewards.jsx";
import Navbar from "./components/Navbar.jsx";
import Scanner from "./pages/Scanner.jsx";
function App() {
  return (
    <div>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="rewards" element={<Rewards />} />
      <Route path='scanner' element={<Scanner />} />
    </Routes>
    </div>
  );
}

export default App;
