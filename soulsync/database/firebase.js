import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { config } from 'dotenv';
config({ path: '../.env' });
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"



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
const firestore = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

const userCollection = collection(firestore, "users")
async function addUserId(id) {
    await updateDoc(doc(firestore, "Users", id), {
        id: id,
    })
}
// Adding users without the id
async function addNewUser(mail) {
    const newUser = await addDoc(userCollection, {
        email: mail,
        id: ""
    }).then(res => addUserId(res.id));
}
async function getUser(mail) {
    const user = query(
        collection(firestore, "users"),
        where("email", "==", mail)
    )

    const querySnapshot = await getDocs(user)
    const allDocs = querySnapshot.docs
    return allDocs[0].data()
}
async function getAllUsers() {
    const users = query(
        collection(firestore, "users"),
    )
    const querySnapshot = await getDocs(users)
    return querySnapshot.docs
}



export { auth, database, app, firestore , addNewUser, getUser, getAllUsers };