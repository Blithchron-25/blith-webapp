import { Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import Home from './pages/home.jsx';
import Page_2 from "./pages/page2.jsx";
import About from './pages/about.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="page_2" element={<Page_2 />} />
      <Route path="about" element={<About />} />
    </Routes>
  );
}

export default App;
