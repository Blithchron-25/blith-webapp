import QuestionCard from './components/QuestionCard.jsx';
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./pages/stylesheets/tailwind.css";
import React, { useEffect, useState } from "react";
import About from "./pages/about.jsx";
import Profile from "./pages/profile.jsx";
import EventsPage from "./pages/events.jsx";
import EventPage from "./pages/event.jsx";
import Rewards from "./pages/Rewards.jsx";
import Navbar from "./components/Navbar.jsx";
import Scanner from "./pages/Scanner.jsx";
import PrivateRoute from "./components/privateRoute.jsx";
import Login from "./pages/Login.jsx";
import AuthProvider from "./firebase/AuthContext.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Banner from "./components/Banner.jsx";
import LandingPage from './pages/landingpage.jsx';
import BottomNavBar from './components/BottomNavBar.jsx';

const App = () => {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (!isMobile) {
		return <Banner />;
	}


	return (
		<>
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route path="about" element={<About />} />
					<Route
						path="profile"
						element={
							<PrivateRoute>
								<Profile />
							</PrivateRoute>
						}
					/>
					<Route
						path="rewards"
						element={
							<PrivateRoute>
								<Rewards />
							</PrivateRoute>
						}
					/>
					<Route
						path="scanner"
						element={
							<PrivateRoute>
								<Scanner />
							</PrivateRoute>
						}
					/>
					<Route path="events" element={<EventsPage />} />
					<Route path="event" element={<EventPage />} />
					<Route path="login" element={<Login />} />
          			<Route path="/" element={<LandingPage />} />
					<Route
						path="/leaderboard"
						element={
							<PrivateRoute>
								<Leaderboard />
							</PrivateRoute>
						}
					/>

				</Routes>
				<BottomNavBar />
			</AuthProvider>
		</>
	);
};



export default App;
