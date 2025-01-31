import { Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import EventsPage from './pages/events.jsx';
import EventPage from './pages/event.jsx';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="about" element={<About />} />
			<Route path="events" element={<EventsPage />} />
			<Route path="event" element={<EventPage />} />
		</Routes>
	);
}

export default App;
