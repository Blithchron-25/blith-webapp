import { Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import Profile from "./pages/profile.jsx"; 
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="profile" element={<Profile user={{
        name: "FULL NAME",
        profile_picture: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRLM_YMOn41npXKC5fX-TSRfe20jO-nK1cfON36eskj5100UzlH4JMmJVsjNYxZPV4R0vw6DHIw0dqN-osUB5Iw7Q",
        blith_credits: "Credits",
        some_data: "Some Data"
      }} />} />
    </Routes>
  );
}

export default App;
