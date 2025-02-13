import React from "react";
import secondpg from "../assets/background/2nd pg.png";
import fourthtext from "../assets/background/fourthpagetext.png";
import video from "../assets/background/video.png";

function About() {
	return (
		<div
			style={{
				backgroundImage: `url(${secondpg})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				minHeight: "100vh",
				width: "100vw",
				position: "relative",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<img
				src={fourthtext}
				alt="Overlay"
				style={{
					position: "absolute",
					top: "13vh",
					left: "50%",
					transform: "translateX(-50%)",
					maxWidth: "90%",
					maxHeight: "90vh",
					objectFit: "contain",
					boxSizing: "border-box",
				}}
			/>
			<div
				style={{
					position: "absolute",
					top: "55vh",
					left: "5%",
					width: "90%",
					height: "30vh",
					backgroundColor: "rgb(58, 13, 83)",
					objectFit: "contain",
					borderRadius: "20px",
				}}
			>
				<iframe
					style={{
						position: "absolute",
						top: "0",
						left: "0",
						width: "100%",
						height: "100%",
						border: "none",
						borderRadius: "20px",
					}}
					src="https://www.youtube.com/embed/uGOBZxO32pg?si=4XZXTkyyEPUyFYlV"
					title="YouTube video player"
					frameborder="5"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			</div>
		</div>
	);
}

export default About;
