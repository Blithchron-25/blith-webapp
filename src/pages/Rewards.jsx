import React, { useEffect, useState } from "react";
import bg from "../assets/rewards.png";
import coin from "../assets/coin1.png";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase/firebase.config";
import { getAuth } from "firebase/auth";

const Rewards = () => {
	const [blithCredits, setBlithCredits] = useState(0);
	const [userUid, setUserUid] = useState(" ");
	const firestore = getFirestore(app);
	const auth = getAuth(app);
	useEffect(() => {
		const fetchUserCredits = async () => {
			const user = auth.currentUser;
			if (user) {
				console.log(user);
				setUserUid(user.uid);
				const userdocRef = doc(firestore, "users", user.uid);
				const userDoc = await getDoc(userdocRef);
				try {
					if (userDoc.exists()) {
						setBlithCredits(userDoc.data().blithCredits || 0);
					} else {
						console.log("User not found");
					}
				} catch (err) {
					console.log(err);
				}
			}
		};
		fetchUserCredits();
	}, [auth]);
	return (
		// put navbar here or in a separate component
		<div
			className="w-screen h-screen flex flex-col ml-0 items-center"
			style={{ backgroundImage: `url(${bg})` }}
		>
			<div
				className="rounded-full p-1 drop-shadow-2xl"
				style={{ textShadow: "5px 0px 10px rgb(156, 10, 119)" }}
			>
				<img src={coin} alt="coin" className="w-[185px] h-[173px] mt-[90px]" />
			</div>
			<h1
				className="text-3xl font-bold drop-shadow-lg mt-[10px] text-white"
				style={{ textShadow: "5px 0px 10px rgb(156, 10, 119)" }}
			>
				BLITHCOIN
			</h1>
			<h3
				className="text-2xl mt-[10px] mb-[40px] font-bold drop-shadow-lg text-white"
				style={{ textShadow: "5px 0px 10px rgb(156, 10, 119)" }}
			>
				{blithCredits}
			</h3>
			{userUid && <QrCard value={userUid} />}
			{/* change this value to the user's unique uid */}
		</div>
	);
};

export default Rewards;
