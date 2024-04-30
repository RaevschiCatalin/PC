// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7OmpX_i4q0rQXJmWaGAGGiLEs6mx3sKs",
    authDomain: "proiectpc-5b158.firebaseapp.com",
    databaseURL: "https://proiectpc-5b158-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "proiectpc-5b158",
    storageBucket: "proiectpc-5b158.appspot.com",
    messagingSenderId: "931928611908",
    appId: "1:931928611908:web:872169d4df2f70b8e8b011",
    measurementId: "G-LSTBND66SG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Add new user
function writeUserData(userID, email, password) {
    const db = getDatabase();
    const reference = ref(db, 'users/' + userID);
    set(reference, {
        email: email,
        password: password
    });
}

// Get data from user by ID
function readUserData(userID) {
    const db = getDatabase();
    const reference = ref(db, 'users/' + userID);
    onValue(reference, (snapshot) => {
        const data = snapshot.val();
        console.log(snapshot.val());
    });
}

// test
//writeUserData(0,"placeholder","placeholder");
//readUserData(0);