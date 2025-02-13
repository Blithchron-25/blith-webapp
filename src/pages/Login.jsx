import React from "react";
import { useAuth } from "../firebase/AuthContext";
import { FaGoogle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./stylesheets/tailwind.css"

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
            
            <div className="flex flex-col items-center justify-center mt-20 w-screen h-screen">
                <button onClick={handleLogin} type="button" class="flex flex-roe items-center content-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"><FaGoogle /> Login With Google</button>
            </div>       
        </>
    );
}

export default Login;