import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { GrGallery } from "react-icons/gr";
import { FaHandshake } from "react-icons/fa";
import { GrMap } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useAuth } from "../firebase/AuthContext";
import blogo from "../assets/name.png";
import eventlogo from "../assets/events.png";
import teamlogo from "../assets/team.png";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { logout } = useAuth();
	const handleHam = () => {
		isOpen ? setIsOpen(false) : setIsOpen(true);
	};

	const handleLogout = async () => {
		await logout();
	};

	return (
		<div>
			{isOpen &&
				<div className="bg-sidemenu text-white p-2 min-h-screen flex z-10 flex-col fixed">
					<div>
						<RxCross1 size={25} onClick={handleHam} className="ml-auto mr-4 mt-2 mb-2" />
					</div>
					<div className="grid grid-cols-2 gap-4 ml-4 mr-4 mb-2 mt-8 place-items-center">
						<Link to="/events">
							<div className="border-white border-2 size-24 opacity-70 flex flex-col items-center justify-center">
								<img src={eventlogo} alt="events" className="size-10" />
								EVENTS
							</div>
						</Link>
						<Link to="/gallery">
							<div className="border-white border-2 opacity-70 size-24 flex flex-col items-center justify-center">
								<GrGallery size={30} />
								GALLERY
							</div>
						</Link>
						<Link to="/sponsors">
							<div className="border-white border-2 size-24 opacity-70 flex flex-col items-center justify-center">
								<FaHandshake size={30} />
								SPONSORS
							</div>
						</Link>
						<Link to="/map">
							<div className="border-white border-2 size-24 opacity-70 flex flex-col items-center justify-center">
								<GrMap size={30} />
								MAP
							</div>
						</Link>
						<Link to="/team">
							<div className="border-white border-2 size-24 opacity-70 flex flex-col items-center justify-center">
								<img src={teamlogo} alt="team" className="size-10" />
								TEAM
							</div>
						</Link>
					</div>
					<div className="mt-auto">
						<hr className="border-white" />
						<button
							onClick={handleLogout}
							className="bg-sidemenu text-2xl flex flex-row items-center justify-center"
						>
							LogOut
							<RiLogoutCircleRLine size={20} className="ml-2" />
						</button>
					</div>
				</div>
			}
      <nav className="bg-navbar mb-1 w-screen z-10 fixed">
					<div className="text-white p-4 flex flex-row items-center">
						<GiHamburgerMenu size={25} onClick={handleHam} />
						<Link to="/" className="w-25 h-10 m-auto">
							<img src={blogo} alt="logo" />
						</Link>
						<Link to="/profile" className="mr-2">
							<FaUser size={25} className="text-white" />
						</Link>
					</div>
				</nav>
		</div>
	);
};

export default Navbar;
