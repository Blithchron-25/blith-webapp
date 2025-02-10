import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { GrGallery } from "react-icons/gr";
import { FaHandshake } from "react-icons/fa";
import { GrMap } from "react-icons/gr";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleHam = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <div>
      {isOpen ? (
        <div className="bg-sidemenu text-white p-2 min-h-screen flex flex-col">
          <div>
            <RxCross1
              size={25}
              onClick={handleHam}
              className="ml-auto mr-4 mt-2 mb-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 ml-4 mr-4 mb-2 mt-8 place-items-center">
            <div className="border-white border-2 size-24 opacity-70 flex flex-col items-center justify-center">
              <img src="/src/assets/events.png" alt="events" className="size-10" />
                EVENTS
            </div>
            <div className="border-white border-2 opacity-70 size-24 flex flex-col items-center justify-center">
              <GrGallery size={30} />
              GALLERY
            </div>
            <div className="border-white border-2 size-24 opacity-70 flex flex-col items-center justify-center">
              <FaHandshake size={30} />
              SPONSORS
            </div>
            <div className="border-white border-2 size-24 opacity-70 flex flex-col items-center justify-center">
              <GrMap size={30} />
              MAP
            </div>
            <div className="border-white border-2 size-24 opacity-70 flex flex-col items-center justify-center">
              <img src='/src/assets/team.png' alt="team" className="size-10" />
              TEAM
            </div>
          </div>
            <div className="mt-auto">
          <hr className="border-white" />
          <div className="text-2xl flex flex-row items-center justify-center">
            LogOut
            <RiLogoutCircleRLine size={20} className="ml-2" />
          </div>
          </div>
        </div>
      ) : (
        <nav className="bg-navbar mb-1">
          <div className="text-white p-2 flex flex-row items-center">
            <GiHamburgerMenu size={20} onClick={handleHam} />
            <img
              src="/src/assets/name.png"
              alt="logo"
              className="w-20 h-10 m-auto"
            />
            <FaUser size={20} />
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
