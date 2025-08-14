import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user , setUser] = useState(null);
    const[loading , setLoading] = useState(true);
    
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    // onAuthStateChanged(auth, (currentUser) => {
    //     if (currentUser) {
    //         console.log("User is signed in:", currentUser);
    //     }
    //     else {
    //         console.log("No user is signed in.");
    //     }
    // });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log("User is signed in:", currentUser);
            } else {
                console.log("No user is signed in.");
            }

            setUser(currentUser);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const userInfo = {
        user,
        loading,
        createUser,
        signInWithGoogle,
        signInUser,
        signOutUser
    }


    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;