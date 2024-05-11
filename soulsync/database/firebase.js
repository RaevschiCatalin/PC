import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { config } from 'dotenv';
config({ path: '../.env' });


// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};


const app = initializeApp(firebaseConfig);

// Database reference
const database = getDatabase(app);

// Add new user
function writeUserData(userID, email, password, E, A, C, N, O) {
    const db = getDatabase();
    const reference = ref(db, 'users/' + userID);
    set(reference, {
        email: email,
        password: password,
        E: E,
        A: A,
        C: C,
        N: N,
        O: O
    });
}


// Get data from user by ID
function readUserData(userID) {
    const reference = ref(database, 'users/' + userID);
    onValue(reference, (snapshot) => {
        const data = snapshot.val();
        console.log(snapshot.val());
    });
}

// test
writeUserData(0, "placeholder", "placeholder");
readUserData(0);
