import React, { useEffect, useState } from "react";
import "./stylesheets/events.css";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase/firebase.config";
import "./stylesheets/tailwind.css"

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const firestore = getFirestore(app);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const querySnapshot = await getDocs(collection(firestore, "users"));
                if (querySnapshot.empty) {
                    console.log("No matching documents");
                    return;
                }
                const usersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setLeaderboard(usersData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }

        fetchUsers();
    }, []);

    function LeaderCard({ user }) {
        return (
            <div className="leader-cont flex flex-row items-center">
                <img className="size-10 ml-2 rounded-full items-center" src={user.profileUrl} alt={user.name} />
                <h2 className="text-xl">{user.username}</h2>
                <p className="ml-auto mr-2 text-3xl">{user.blithCredits}</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Leaderboard</h1>
            <div className="leaderboard-container">
                {leaderboard.length > 0 ? (
                    leaderboard.map(user => <LeaderCard key={user.id} user={user} />)
                ) : (
                    <p>No users found</p>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
