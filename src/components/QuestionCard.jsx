import React, { useEffect, useState } from 'react';
import '../pages/stylesheets/questionCard.css';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { FaPaperPlane } from 'react-icons/fa';
import { useAuth } from '../firebase/AuthContext';
import { app } from '../firebase/firebase.config';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

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

	useEffect(() => {
		const fetchQuestion = async () => {
			const docRef = doc(firebase, 'questions', queId);
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

	const setQuestion = (id) => {
		const docRef = doc(firebase, 'questions', id);
		const docSnap = getDoc(docRef);
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
		const rdata = { userId: currentUser.uid, blithCredits: 30 };
		const res = await addcredits(rdata);
		const d = await res.json();
		// console.log(d);

		if (res.ok) {
			console.log('Blith Credits Added Successfully');

		} else {
			console.error('Error Adding Blith Credits');
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
					<button className="btn" onClick={async () => handleClick()}>
						<FaPaperPlane />
					</button>
				</div>
			</div>
		</div>
	);
}

export default QuestionCard;
