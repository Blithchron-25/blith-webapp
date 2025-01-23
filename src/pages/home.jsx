import React from "react";
import backlong from "../assets/background/backlong.png";

export function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${backlong})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}>
    </div>
  );
};

export default Home;