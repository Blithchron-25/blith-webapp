import { Routes, Route } from 'react-router-dom';
import './App.css';
import "./pages/stylesheets/tailwind.css";
import React from 'react';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import Profile from "./pages/profile.jsx"; 
import EventsPage from './pages/events.jsx';
import EventPage from './pages/event.jsx';
import Rewards from "./pages/Rewards.jsx";
import Navbar from "./components/Navbar.jsx";
import Scanner from "./pages/Scanner.jsx";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="profile" element={<Profile user={{
        name: "FULL NAME",
        profile_picture: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRLM_YMOn41npXKC5fX-TSRfe20jO-nK1cfON36eskj5100UzlH4JMmJVsjNYxZPV4R0vw6DHIw0dqN-osUB5Iw7Q",
        blith_credits: "Credits",
        some_data: "Some Data"
      }} />} />
      <Route path="rewards" element={<Rewards />} />
      <Route path='scanner' element={<Scanner />} />
       <Route path="events" element={<EventsPage />} />
			<Route path="event" element={<EventPage />} />
    </Routes>
    </>
  );
}

export default App;
