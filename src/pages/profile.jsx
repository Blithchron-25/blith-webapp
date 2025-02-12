import React, {useEffect, useState} from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase/firebase.config";
import { getAuth } from "firebase/auth";
import '../stylesheets/profile.css';




function Profile({ user }) {
    const [blithCredits, setBlithCredits] = useState(0);
const firestore = getFirestore(app);
const auth = getAuth(app);

useEffect(() => {
    const fetchUserCredits = async () => {
      const user = auth.currentUser;
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
    return (
        <div id="profile-page">
            <div id="profile_bkg"></div>
            <div id="profile">
                <div id="user-info">
                    <img id="profile_picture" src={user.profile_picture} />
                    <div id="profile_name">{user.name}</div>
                    <div id='profile_blith_credits'>blithCredits<br />{blithCredits}</div>
                    <div id='profile_line_2'>{user.some_data}</div>
                </div>
            </div>
        </div>
    );    
}

export default Profile;