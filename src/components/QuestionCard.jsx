import React, { useEffect, useState } from 'react';
import '../pages/stylesheets/questionCard.css';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { FaPaperPlane } from 'react-icons/fa';
import { useAuth } from '../firebase/AuthContext';
import { app } from '../firebase/firebase.config';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

async function checkLegitimacy(url) {
	if (!url.includes('https://drive.google.com/')) {
		return false;
	}

	let isLegit = false;
	await fetch(url).then((response) => {
		if (!response.ok) {
			isLegit = false;
		}
		isLegit = true;
	});
	return isLegit;
}

function QuestionCard({queId}) {
	const [ans, setAns] = useState('');

	const { currentUser } = useAuth();

	const functions = getFunctions(app);
	const addcredits = httpsCallable(functions, 'addBlithCredits');
	const firebase = getFirestore(app);
	const [example, setExample] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserCredits = async () => {
			const userdocRef = doc(firebase, 'users', currentUser.uid);
			const userDoc = await getDoc(userdocRef);
			if (userDoc.exists()) {
				const currentlyParticipatingEvents = data.currentlyParticipatingEvents;
				if(currentlyParticipatingEvents.includes(queId)){
					alert("You have already submitted in this question");
					navigate("/profile");
				}
			} else {
				console.log('User not found');
			}
		};
		fetchUserCredits();
	}, [])

	useEffect(() => {
		const fetchQuestion = async () => {
			const docRef = doc(firebase, 'questions', id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				setExample(data);
				console.log(data);
			} else {
				console.log('No such document!');
			}
		};
		fetchQuestion();
	}, []);

	const handleInputChange = (event) => {
		setAns(event.target.value);
	};

	const setQuestion = async (id) => {
		const docRef = doc(firebase, 'questions', id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const data = docSnap.data();
			const currentlyParticipatingEvents = data.currentlyParticipatingEvents;
			currentlyParticipatingEvents.push(currentUser.uid);
			const updatedData = { currentlyParticipatingEvents: currentlyParticipatingEvents };
			updateDoc(docRef, updatedData);
		}
	}

	async function handleClick() {
		var correct = false;
		if (example.type == 'text') {
			if (example.answer.includes(ans.toLowerCase())) {
				correct = true;
			}
		} else if (example.type == 'file') {
			correct = await checkLegitimacy(ans);
		}
		if(correct){
			const rdata = { userId: currentUser.uid, blithCredits: 30 };
			const res = await addcredits(rdata);

			if (res.data.blithCredits !== 0) {
				console.log('Blith Credits Added Successfully');
				setQuestion(queId);
				navigate("/profile");
			} else {
				console.error('Error Adding Blith Credits');
			}
		}
	}

	return (
		<div className="container">
			<div className="ques">
				<h2>{example.text}</h2>
			</div>
			<div className="ans">
				<div className="text-box">
					<input
						id="number"
						value={ans}
						onChange={handleInputChange}
						className="text-input"
						placeholder={
							example.type == 'text'
								? 'Enter Answer'
								: 'Enter Drive Link'
						}
						required
					/>
					<button className="btn" onClick={async () => await handleClick()}>
						<FaPaperPlane />
					</button>
				</div>
			</div>
		</div>
	);
}

export default QuestionCard;
