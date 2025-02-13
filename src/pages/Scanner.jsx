import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import { getFunctions, httpsCallable } from 'firebase/functions';
//import { app } from "../firebase/firebaseconfig";
import QuestionCard from '../components/QuestionCard';
import { Link } from 'react-router-dom';

const QRScan = () => {
	const [scanned, setScanned] = useState(false);
	const [blithCredits, setBlithCredits] = useState(0);
	const [userUid, setUserUid] = useState('');
	//const functions = getFunctions(app);
	//const addcredits = httpsCallable(functions, "addBlithCredits");

	const handleScan = async (data) => {
		if (data && !scanned) {
			setUserUid(data.text);
			console.log('User ID:', data.text);
			setScanned(true);
		}
	};

	const handleError = (err) => {
		console.error('QR Scan Error:', err);
	};

	const handleInputChange = (event) => {
		setBlithCredits(event.target.value);
	};

	const handleSubmit = async () => {
		if (blithCredits !== 0 && userUid !== '') {
			const uid = userUid;
			console.log('User ID:', uid);
			const credit = blithCredits;
			console.log('Blith Credits:', credit);
			const rdata = { userId: uid, blithCredits: credit };
			const res = await addcredits(rdata);
			const d = await res.json();
			console.log(d);

			if (res.ok) {
				console.log('Blith Credits Added Successfully');
				setBlithCredits(0);
				setUserUid('');
				setScanned(false);
			} else {
				console.error('Error Adding Blith Credits');
			}
		}
	};

	const handleCancel = () => {
		setBlithCredits(0);
		setUserUid('');
		setScanned(false);
	};

	return (
		<div className="flex flex-col items-center">
			{!scanned ? (
				<>
					<QrReader
						delay={300}
						style={{ width: '60%', height: '60%' }}
						onError={handleError}
						onScan={handleScan}
					/>
					<Link to="/">
						<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg mt-8 text-sm  w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							Home
						</button>
					</Link>
				</>
			) : (
				<div className="flex flex-col items-center">
					<h1 className="text-center font-bold text-green-500 text-2xl mt-4">
						Scanned Successfully
					</h1>
					<input
						type="number"
						id="number"
						value={blithCredits}
						onChange={handleInputChange}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mt-6 focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Enter BlithCredits"
						required
					/>
					<button
						type="submit"
						onClick={handleSubmit}
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg mt-8 text-sm w-1/3 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Credit
					</button>
					<button
						type="submit"
						onClick={handleCancel}
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg mt-8 text-sm w-1/3 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Cancel
					</button>
				</div>
			)}
		</div>
	);
};

export default QRScan;
