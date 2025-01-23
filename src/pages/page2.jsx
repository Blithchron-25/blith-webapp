import React from "react";
import secondpg from "../assets/background/2nd pg.png";
import '../fonts.css';

export function Page_2() {
  return (
    <div
      style={{
        backgroundImage: `url(${secondpg})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}>
        <h1 
        style={{
          fontFamily: "Proxima Nova, sans-serif",
          color: "#fff9f9", 
          paddingTop: "80px", 
          paddingRight: "90px",
          fontSize: "30px",
        }}>
        Hello, Dumbass
      </h1>
        <h2
        style={{
          fontFamily: "Proxima Nova, sans-serif",
          fontWeight: "normal",
          color: "#fff9f9", 
          //paddingBottom: "1px", 
          paddingRight: "174px",
          fontSize: "11px",
        }}>
          Ready to let the fun unfold
      </h2>
    </div>
  );
};

export default Page_2;