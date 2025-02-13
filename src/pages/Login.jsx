import React from "react";
import { useAuth } from "../firebase/AuthContext";
import { FaGoogle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {signInWithGoogle} = useAuth();
    const navigate = useNavigate();
    const handleLogin = async () => {
        console.log("Login");
        await signInWithGoogle();
        navigate(-1);
    }

    return (
        <>
            
            <div className="flex flex-col items-center">
                <button onClick={handleLogin} className="bg-blue-500 text-black p-2 m-2 flex flex-row justify-center items-center"><FaGoogle className="mr-2"/>Login with Google</button>
            </div>       
        </>
    );
}

export default Login;