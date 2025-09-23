import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import auth from '../../Firebase/Firebase_inIt';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const[loading , setLoading] = useState(true)


    const createUser = (email, Password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,Password)
    }

    const signIn = (email, Password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,Password)
    }

    const signInwithGoogle = ()=>{
        setLoading(true)
       return signInWithPopup(auth,googleProvider)
    }
    const logOut=()=>{
        setLoading(true)
        return signOut(auth);
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            setLoading(false);

        })
        return ()=>{
            unSubscribe();
        }

    },[])
    const authInfo = {
        createUser,signInwithGoogle, signIn,user,loading,logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;