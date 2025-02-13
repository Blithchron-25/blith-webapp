import React, { useState } from 'react';
import '../pages/stylesheets/questionCard.css';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { FaPaperPlane } from 'react-icons/fa';
import { useAuth } from '../firebase/AuthContext';
import { app } from '../firebase/firebase.config';

const example = {
	ques: 'Which event is dedicated to gaming at Blithchron?',
	type: 'file',
	ans: 'skirmish',
};

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

function QuestionCard(props) {
	const [ans, setAns] = useState('');

	const { currentUser } = useAuth();

	const functions = getFunctions(app);
	const addcredits = httpsCallable(functions, 'addBlithCredits');

	const handleInputChange = (event) => {
		setAns(event.target.value);
	};

	async function handleClick() {
		var correct = false;
		if (example.type == 'text') {
			if (example.ans.includes(ans.toLowerCase())) {
				correct = true;
			}
		} else if (example.type == 'file') {
			correct = await checkLegitimacy(ans);
		}
		const rdata = { userId: currentUser.uid, blithCredits: 30 };
		const res = await addcredits(rdata);
		const d = await res.json();
		console.log(d);

		if (res.ok) {
			console.log('Blith Credits Added Successfully');
		} else {
			console.error('Error Adding Blith Credits');
		}
	}

	return (
		<div className="container">
			<div className="ques">
				<h2>{example.ques}</h2>
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
