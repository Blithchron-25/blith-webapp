import React from "react";
import QrCard from "../components/QrCard";
import bg from "../assets/rewards.png";
import coin from "../assets/coin1.png";


const Rewards = () => {
  return (
    // put navbar here or in a separate component
    <div className="w-screen h-screen flex flex-col ml-0 items-center" style={{backgroundImage: `url(${bg})`}}>
        <div className="rounded-full p-1 drop-shadow-2xl" style={{ textShadow: "5px 0px 10px rgb(156, 10, 119)"}}>
            <img src={coin} alt="coin" className="w-[185px] h-[173px] mt-[136px]" />
        </div>
        <h1 className="text-3xl font-bold drop-shadow-lg mb-[100px] text-white" style={{ textShadow: "5px 0px 10px rgb(156, 10, 119)"}}>BLITHCOIN</h1>
        <QrCard value={"Hello World"} /> {/* change this value to the user's unique uid */}
    </div>
  );
};

export default Rewards;
