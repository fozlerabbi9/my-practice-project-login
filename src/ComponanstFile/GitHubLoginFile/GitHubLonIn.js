import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../../firebase.init';

const auth = getAuth(app)

const GitHubLonIn = () => {
    const gitHubProvider = new GithubAuthProvider();
    const [userInfo, setUserInfo] = useState({});

    const hitHubLoging = () =>{
        signInWithPopup(auth, gitHubProvider)
        .then(res=>{
            const userInfo = res.user;
            setUserInfo(userInfo);
            console.log(userInfo)
        })
        .catch(err=>{
            console.log(err)
        })

    }
    return (
        <div>
          <button onClick={hitHubLoging}>Github Login </button>
          <h2>{userInfo.displayName}</h2>
        </div>
    );
};

export default GitHubLonIn;



