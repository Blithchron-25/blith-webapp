import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import blogo from "../assets/name.png";

const Navbar = () => {
	return (
		<nav className="bg-navbar mb-1 w-screen z-10 fixed">
			<div className="text-white p-5 flex flex-row items-center justify-center">
				<Link to="/" className="w-27 h-10">
					<img src={blogo} alt="logo" />
				</Link>
				<Link to="/profile" className="mr-2 ml-auto">
					<FaUser size={25} className="text-white" />
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
