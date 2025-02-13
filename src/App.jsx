import { Routes, Route } from 'react-router-dom';
import './App.css';
import "./pages/stylesheets/tailwind.css";
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import Profile from "./pages/profile.jsx"; 
import EventsPage from './pages/events.jsx';
import EventPage from './pages/event.jsx';
import Rewards from "./pages/Rewards.jsx";
import Navbar from "./components/Navbar.jsx";
import Scanner from "./pages/Scanner.jsx";
import PrivateRoute from './components/privateRoute.jsx';
import Login from './pages/Login.jsx';
import AuthProvider from './firebase/AuthContext.jsx';
import Leaderboard from './pages/Leaderboard.jsx';

const App = () => {
  return (
    <>
    <AuthProvider>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="rewards" element={<PrivateRoute><Rewards /></PrivateRoute>} />
      <Route path='scanner' element={<PrivateRoute><Scanner /></PrivateRoute>} />
       <Route path="events" element={<EventsPage />} />
			<Route path="event" element={<EventPage />} />
      <Route path="login" element={<Login />} />
      <Route path='/leaderboard' element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
    </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
