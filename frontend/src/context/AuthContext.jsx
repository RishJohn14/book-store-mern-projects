import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}


export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();


    // Resgister a user

    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    const googleUser = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    const logoutUser = () => {
        return auth.signOut();
    }
 
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if(user){
               const {email, displayName, photoURL} = user;
               const userData = {
                     email,
                     username: displayName,
                     photo: photoURL
               }
            }       
        }
        );

        return () => unsubscribe();
    }, []);


    const value = {
        currentUser,
        registerUser,
        loginUser,
        googleUser,
        logoutUser,
        loading

    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
};

 