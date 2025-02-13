import React, {useEffect, useState} from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase/firebase.config";
import { getAuth } from "firebase/auth";
import './stylesheets/profile.css';
import coin from '../assets/coin1.png';
import { useAuth } from "../firebase/AuthContext";
import { RiLogoutCircleRLine } from "react-icons/ri";


function Profile() {
    const [blithCredits, setBlithCredits] = useState(0);
    const [userUid, setUserUid] = useState("");
    const firestore = getFirestore(app);
    const auth = getAuth(app);

    const { currentUser } = useAuth();
    const { logout } = useAuth();
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

  const handleLogout = async () => {
    await logout();
  };

    return (
        <div id="profile-page">
            <div id="profile_bkg"></div>
            <div id="profile">
                <div id="user-info">
                    <img id="profile_picture" src={user?.photo} />
                    <div id="profile_name">{user.username}</div>
                    <div className="mt-6">
                      <div style={{display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "10px", backgroundColor: "rgba(0, 0, 0, 0.2)", margin: "0 10vw"}}>
                        <div className="flex flex-row items-center justify-center mt-10">
                            <div className="rounded-full">
                                <img src={coin} alt="coin" className="mr-auto ml-auto size-15" />
                            </div>
                            <h2 className="text-3xl font-bold drop-shadow-lg text-white mb-0" style={{ textShadow: "5px 0px 10px rgb(156, 10, 119)"}}>BlithCoins</h2>
                        </div>
                        <h3 className="text-xxl mt-10px mb-[40px] font-bold drop-shadow-lg text-white" style={{ textShadow: "5px 0px 10px rgb(156, 10, 119)"}}>{blithCredits}</h3>
                      </div>
                    </div>
                    <button onClick={handleLogout} className="bg-sidemenu mt-10 text-2xl flex flex-row items-center justify-center mt-4 mx-auto">
                        LogOut
                        <RiLogoutCircleRLine size={20} className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );    
}

export default Profile;