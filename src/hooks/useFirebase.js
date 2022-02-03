import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    getIdToken,
} from "@firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState("");
    const [updatedName, setUpdatedName] = useState("");
    const [userRole, setUserRole] = useState("normal");

    const auth = getAuth();

    //   GOOGLE SIGN IN
    const signInWithGoogle = () => {
        setIsLoading(true);
        const gAuthProvider = new GoogleAuthProvider();
        signInWithPopup(auth, gAuthProvider)
            .then((result) => {
                setUser(result.user);
                saveUser(result.user.uid, result.user.email, result.user.displayName, "PUT");
                getUserRole(result.user.uid);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(setIsLoading(false));
    };

    //   EMAIN AND PASSWORD SIGN UP
    const createAccountWithEmailPassword = (email, password, name) => {
        console.log(email, name);
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                await setUser(userCredential.user);
                console.log("user created");
                await saveUser(userCredential.user.uid, email, name, "POST");
                console.log("saved to db");
                setUserProfile(auth, name);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            })
            .finally(setIsLoading(false));
    };

    // SET USER PROFILE
    const setUserProfile = (auth, name) => {
        setIsLoading(true);
        updateProfile(auth.currentUser, {
            displayName: name,
        })
            .then(() => {
                // Profile updated!
                console.log("profile updated");
                setUpdatedName(name);
            })
            .catch((error) => {
                // An error occurred
                console.log(error);
            })
            .finally(setIsLoading(false));
    };

    //   EMAIN AND PASSWORD LOGIN
    const logInWithEmailandPassword = (email, password) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                getUserRole(userCredential.user.uid);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(setIsLoading(false));
    };

    //SAVE USER INFO TO DATABASE
    const saveUser = async (uid, email, displayName, method) => {
        const user = { uid, email, displayName };
        // await fetch("https://bonosri-bonsai.herokuapp.com/users", {
        await fetch("http://localhost:5000/users", {
            method: method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };

    //GET USER ROLE / SECURITY LEVEL
    const getUserRole = async (uid) => {
        setIsLoading(true);
        // await fetch(`https://bonosri-bonsai.herokuapp.com/users/${uid}`)
        await fetch(`http://localhost:5000/users/${uid}`)
            .then((res) => res.json())
            .then((userDb) => {
                console.log(userDb);
                if (userDb?.role) {
                    setUserRole(userDb.role);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(setIsLoading(false));
    };

    //   LOG OUT
    const logOut = () => {
        signOut(auth).then(setUser(null));
    };

    //   GET CURRENT USER WITH AUTH OBSERVER
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
                getUserRole(user.uid);
                getIdToken(user).then((idToken) => setToken(idToken));
                // ...
            } else {
                // User is signed out
            }
            setIsLoading(false);
        });
    }, [updatedName]);

    return {
        user,
        error,
        setError,
        token,
        userRole,
        isLoading,
        signInWithGoogle,
        createAccountWithEmailPassword,
        logInWithEmailandPassword,
        logOut,
    };
};

export default useFirebase;
