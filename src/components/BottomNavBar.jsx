import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdQrCodeScanner } from "react-icons/md";

const BottomNavContainer = styled.div`
	background-color: #673ab7; /* Example: Deep Purple */
	color: white;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 16px;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 100;
	border-radius: 20px 20px 0 0;
	height: 90px;
`;

const NavItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	opacity: ${props =>
		// @ts-ignore
		props.active ? 1 : 0.6};

	&:hover {
		opacity: 0.8;
	}
`;

const IconContainer = styled.div`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: ${props =>
		// @ts-ignore
		props.active ? "rgba(255, 255, 255, 0.2)" : "transparent"};
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Icon = styled.span`
	font-size: 26px;
`;

const Label = styled.span`
	font-size: 16px;
`;

function BottomNavBar() {
	const [activeTab, setActiveTab] = useState("home");
	const navigate = useNavigate();

	const handleTabChange = tab => {
		setActiveTab(tab);
		// You can add navigation logic here using react-router or any other routing library
		console.log(`Navigating to: ${tab}`);
		navigate(`/${tab}`);
	};

	return (
		<BottomNavContainer>
			<NavItem
				// @ts-ignore
				active={activeTab === "home"}
				onClick={() => handleTabChange("")}
			>
				<IconContainer
					// @ts-ignore
					active={activeTab === "home"}
				>
					<Icon>🏠</Icon>
				</IconContainer>
				<Label>Home</Label>
			</NavItem>

			<NavItem
				// @ts-ignore
				active={activeTab === "scanner"}
				onClick={() => handleTabChange("scanner")}
			>
				<IconContainer
					// @ts-ignore
					active={activeTab === "scanner"}
				>
					<Icon>
						<MdQrCodeScanner />
					</Icon>
				</IconContainer>
				<Label>Scanner</Label>
			</NavItem>

			<NavItem
				// @ts-ignore
				active={activeTab === "leaderboard"}
				onClick={() => handleTabChange("leaderboard")}
			>
				<IconContainer
					// @ts-ignore
					active={activeTab === "leaderboard"}
				>
					<Icon>⭐️</Icon>
				</IconContainer>
				<Label>Leaderboard</Label>
			</NavItem>
		</BottomNavContainer>
	);
}

export default BottomNavBar;
