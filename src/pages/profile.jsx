import React, {useEffect, useState} from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase/firebase.config";
import { getAuth } from "firebase/auth";
import './stylesheets/profile.css';
import coin from '../assets/coin1.png';
import { useAuth } from "../firebase/AuthContext";



function Profile() {
    const [blithCredits, setBlithCredits] = useState(0);
    const [userUid, setUserUid] = useState("");
    const firestore = getFirestore(app);
    const auth = getAuth(app);

    const { currentUser } = useAuth();
    const user = currentUser;

useEffect(() => {
    const fetchUserCredits = async () => {
      if(user){
        console.log(user);
        setUserUid(user.uid);
        const userdocRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userdocRef);
        try{
        if(userDoc.exists()){
          setBlithCredits(userDoc.data().blithCredits || 0);
        }else{
          console.log("User not found");
        }
      }catch(err){
        console.log(err);
      }
      }
    };
    fetchUserCredits();
  }, [auth]);

  const fetchImage = async () => {
    fetch(`${user.photo}`).then((response) => {
      console.log(response);
    });
  }

    return (
        <div id="profile-page">
            <div id="profile_bkg"></div>
            <div id="profile">
                <div id="user-info">
                    <img id="profile_picture" src={user?.photo} />
                    <div id="profile_name">{user.username}</div>
                    <div className="mt-6">
                        <div className="flex flex-row items-center justify-center">
                            <div className="rounded-full">
                                <img src={coin} alt="coin" className="mr-auto ml-auto size-15" />
                            </div>
                            <h2 className="mr-5 text-3xl font-bold drop-shadow-lg  text-white" style={{ textShadow: "5px 0px 10px rgb(156, 10, 119)"}}>BlithCoins</h2>
                        </div>
                        <h3 className="text-xl mt-[10px] mb-[40px] font-bold drop-shadow-lg text-white" style={{ textShadow: "5px 0px 10px rgb(156, 10, 119)"}}>{blithCredits}</h3>
                    </div>
                </div>
            </div>
        </div>
    );    
}

export default Profile;