import React from "react";
import backg from "../assets/background/home.png";

function Home() {
	return (
		<div
			style={{
				height: "100vh",
				width: "100%",
				top: "5vh",
				position: "relative",
				backgroundImage: `url(${backg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		></div>
	);
}
export default Home;
