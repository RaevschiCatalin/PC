import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { config } from 'dotenv';
import {write} from "node:fs";
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

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const database = getDatabase(app);

export function writeUserData(email, password, E, A, C, N, O) {
    const reference = ref(database, 'users/' + email);
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

export function readUserData(email) {
    const reference = ref(database, 'users/' + email);
    onValue(reference, (snapshot) => {
        console.log(snapshot.val())
    })
}

export { auth, database, app };