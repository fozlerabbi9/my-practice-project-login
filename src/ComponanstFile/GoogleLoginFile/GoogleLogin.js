import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase.init';


const auth = getAuth(app)

const GoogleLogin = () => {
    const [error, serError] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const googleProvider = new GoogleAuthProvider();

    const { displayName, email, photoURL } = userInfo;

    const googleLogInFun = () => {
        signInWithPopup(auth, googleProvider)
            .then(res => {
                const user = res.user;
                setUserInfo(user);
                console.log(user)
            })
            .catch(err => {
                serError("dismis login");
                console.log(err.message);
            })
        console.log("ckicked")
    }

    const logOut = () => {
        signOut(auth)
        .then(()=>{
            setUserInfo({})
        })
        .catch(()=>{
            setUserInfo({})
        })
    }

    //========>>> Start HTML 
    return (
        <div className='google-login-style'>
            {
                displayName ? <button onClick={logOut}>log out</button>
                    : <button onClick={googleLogInFun}>Google Login</button>
            }
            <p>{error}</p>

            {displayName && <div>
                <h2>Name : {displayName}</h2>
                <p>Email : {email}</p>
                <img src={photoURL} alt="" />
            </div>}

        </div>
    );
};

export default GoogleLogin;