import React from "react";
import secondpg from "../assets/background/2nd pg.png";
import "../fonts.css";
import { useEffect, useState } from "react";

export function Page_2() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const dynamicStyles = {
		container: {
			backgroundImage: `url(${secondpg})`,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center center",
			height: "100vh",
			width: "100vw",
			minHeight: "100vh",
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-start",
			justifyContent: "flex-start",
			textAlign: "left",
			paddingLeft: windowWidth > 768 ? "50px" : "5vw",
			paddingTop: "10vh",
		},
		h1: {
			fontFamily: "Proxima Nova, sans-serif",
			color: "#fff9f9",
			fontSize: "2em",
			maxWidth: "90%",
			marginBottom: "10px",
		},
		h2: {
			fontFamily: "Proxima Nova, sans-serif",
			fontWeight: "normal",
			color: "#fff9f9",
			fontSize: "20px",
			maxWidth: "90%",
			marginBottom: "20px",
		},
		scrollContainer: {
			display: "flex",
			overflowX: "scroll", // Forces horizontal scrolling
			whiteSpace: "nowrap", // Prevents wrapping
			gap: "20px",
			width: "90vw", // Ensures it spans across viewport
			padding: "10px 0",
			scrollSnapType: "x mandatory",
		},
		eventCard: {
			minWidth: "250px", // Forces horizontal scrolling
			height: "250px",
			fontFamily: "Times new roman, sans-serif",
			fontSize: "1.2em",
			background: "linear-gradient(0deg, #6E00A2, #29003C)",
			borderRadius: "12px",
			color: "#fff",
			padding: "10px",
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-around",
			scrollSnapAlign: "start",
			boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
		},
		eventCardImg: {
			width: "100%",
			aspectRatio: "11/9",
			objectFit: "cover",
			borderRadius: "12px",
		},
	};

	return (
		<div style={dynamicStyles.container}>
			<h1 style={dynamicStyles.h1}>Hello, Dumbass</h1>
			<h2 style={dynamicStyles.h2}>Ready to let the fun unfold?</h2>

			{/* Horizontally Scrollable Event Cards - Now Scrolls Properly */}
			<div style={dynamicStyles.scrollContainer}>
				<div style={dynamicStyles.eventCard}>
					<img style={dynamicStyles.eventCardImg} src="/antaragnee.webp" />
					Antaragnee - 16th Feb
				</div>
				<div style={dynamicStyles.eventCard}>
					<img style={dynamicStyles.eventCardImg} src="/synchro.webp" />
					Synchronize - 16th Feb
				</div>
				<div style={dynamicStyles.eventCard}>
					<img style={dynamicStyles.eventCardImg} src="/st.webp" />
					String Theory - 14th Feb
				</div>
				<div style={dynamicStyles.eventCard}>
					<img style={dynamicStyles.eventCardImg} src="/street.webp" />
					Street Beat - 15th Feb
				</div>
			</div>

			<div style={dynamicStyles.scrollContainer}>
				<div style={dynamicStyles.eventCard}>
					<img style={dynamicStyles.eventCardImg} src="/panache.webp" />
					Panache - 16th Feb
				</div>
				<div style={dynamicStyles.eventCard}>
					<img style={dynamicStyles.eventCardImg} src="/flavor.webp" />
					FlavorFest - 14th Feb
				</div>
				<div style={dynamicStyles.eventCard}>
					<img style={dynamicStyles.eventCardImg} src="/skirmish.webp" />
					Skirmish - 15th Feb
				</div>
				<div style={dynamicStyles.eventCard}>
					<img style={dynamicStyles.eventCardImg} src="/mirage.webp" />
					Mirage - 16th Feb
				</div>
			</div>

			{/* Upcoming Events Section */}
			{/* <h1 style={{ ...dynamicStyles.h1, marginTop: "20px" }}>Upcoming Events</h1>
      <h2 style={{ ...dynamicStyles.h2, marginTop: "20px" }}>Day 1 - 3</h2>
      <div style={dynamicStyles.scrollContainer}>
        <div style={dynamicStyles.eventCard}>Antaragnee - Live Now</div>
        <div style={dynamicStyles.eventCard}>Synchronize - 11:00 AM</div>
        <div style={dynamicStyles.eventCard}>Battle of Bands - 3:00 PM</div>
        <div style={dynamicStyles.eventCard}>Stand-up Comedy - 6:00 PM</div>
      </div> */}
		</div>
	);
}

export default Page_2;
