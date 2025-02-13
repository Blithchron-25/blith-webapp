import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import {getFunctions, httpsCallable} from "firebase/functions";
import { Link } from "react-router-dom";
import { useAuth } from "../firebase/AuthContext";
import { app } from "../firebase/firebase.config";
import QuestionCard from "../components/QuestionCard";

const QRScan = () => {
    const [scanned, setScanned] = useState(false);
    const [blithCredits, setBlithCredits] = useState(30);
    const [questionId, setQuestionId] = useState("");
    const { currentUser } = useAuth();
    const functions = getFunctions(app);
    const addcredits = httpsCallable(functions, "addBlithCredits");

    const handleScan = async (data) => {
        if (data && !scanned) {
            setQuestionId(data.text);
            console.log("User ID:", data.text);
            setScanned(true);
        }
    };
	const handleError = (err) => {
		console.error('QR Scan Error:', err);
	};


	const handleCancel = () => {
		setBlithCredits(0);
		setUserUid('');
		setScanned(false);
	};

    return (
        <div className="flex flex-col items-center mt-20">
            {!scanned ? (
                <>
                <QrReader
                    delay={300}
                    style={{ width: "60%", height: "60%" }}
                    onError={handleError}
                    onScan={handleScan}
                    // constraints={{
                    //     video: { facingMode: { exact: "environment" } } // Forces back camera
                    // }}
                />
                <Link to="/">
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg mt-8 text-sm  w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Home
                </button>
                </Link>
                </>
            ) : (
                <QuestionCard queId={questionId} />
            )}
        </div>
    );
};

export default QRScan;
