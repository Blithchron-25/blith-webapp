import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import {getFunctions, httpsCallable} from "firebase/functions";
//import { app } from "../firebase/firebaseconfig";
import { Link } from "react-router-dom";

const QRScan = () => {
    const [scanned, setScanned] = useState(false);
    const [blithCredits, setBlithCredits] = useState(0);
    const [questionId, setQuestionId] = useState("");
    //const functions = getFunctions(app);
    //const addcredits = httpsCallable(functions, "addBlithCredits");

    const handleScan = async (data) => {
        if (data && !scanned) {
            setQuestionId(data.text);
            console.log("User ID:", data.text);
            setScanned(true);
        }
    };

    const handleError = (err) => {
        console.error("QR Scan Error:", err);
    };


    // const handleSubmit = async () => {
    //     if(blithCredits !== 0 && userUid !== "") {
    //         const uid = userUid;
    //         console.log("User ID:", uid);
    //         const credit = blithCredits;
    //         console.log("Blith Credits:", credit);
    //         const rdata = {"userId": uid, "blithCredits": credit};
    //         const res = await addcredits(rdata);
    //         const d = await res.json();
    //         console.log(d);

    //         if(res.ok) {
    //             console.log("Blith Credits Added Successfully");
    //             setBlithCredits(0);
    //             setUserUid("");
    //             setScanned(false);
    //         }
    //         else {
    //             console.error("Error Adding Blith Credits");
    //         }
    //     }
    // }

    // const handleCancel = () => {
    //     setBlithCredits(0);
    //     setUserUid("");
    //     setScanned(false);
    // };

    return (
        <div className="flex flex-col items-center">
            {!scanned ? (
                <>
                <QrReader
                    delay={300}
                    style={{ width: "60%", height: "60%" }}
                    onError={handleError}
                    onScan={handleScan}
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
                <></>//<QuestionCard id={questionId}></QuestionCard>
            )}
        </div>
    );
};

export default QRScan;