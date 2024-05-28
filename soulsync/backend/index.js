import { ref, set, push, update, get } from "firebase/database";
import { database } from "../database/firebase.js";
import { getID, setID } from "./globals.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const auth = getAuth();
const firestore = getFirestore();

export function getCurrentUser() {
    return auth.currentUser;
}

export async function writeUserData(email, password) {
    const usersRef = ref(database, 'users');
    const newUserRef = push(usersRef);

    await set(newUserRef, {
        email: email,
        password: password,
    });
}

export async function pushDataToDatabase(data) {
    const user = getCurrentUser();
    if (!user) {
        console.error("No user authenticated.");
        return;
    }

    try {
        setID(user.uid);
        const profilesRef = ref(database, 'profiles');
        const newProfileRef = push(profilesRef);

        await set(newProfileRef, {
            name: data.name,
            dob: data.yearOfBirth,
            city: data.city,
            description: data.description,
            E: 0,
            A: 0,
            C: 0,
            N: 0,
            O: 0
        });
    } catch (error) {
        console.error(error);
    }
}

export async function updateQuiz(E, A, C, N, O) {
    const user = getCurrentUser();
    if (!user) {
        console.error("No user authenticated.");
        return;
    }

    const reference = ref(database, 'profiles/' + user.uid);
    try {
        // Retrieve the existing document
        const snapshot = await get(reference);
        if (snapshot.exists()) {
            const existingData = snapshot.val();

            // Update the necessary fields
            const updatedData = {
                ...existingData,
                E: E,
                A: A,
                C: C,
                N: N,
                O: O
            };

            // Update the document with the modified data
            await set(reference, updatedData);
            console.log(user.uid);
            console.log("Profile updated successfully.");
        } else {
            console.error("Document does not exist.");
        }
    } catch (error) {
        console.error("Error updating profile:", error);
    }
}



export function matchUsers(user0, user1) {
    const E = Math.abs(user0.E - user1.E) * 2.5;
    const A = Math.abs(user0.A - user1.A) * 2.5;
    const C = Math.abs(user0.C - user1.C) * 2.5;
    const N = Math.abs(user0.N - user1.N) * 2.5;
    const O = Math.abs(user0.O - user1.O) * 2.5;
    return 100 - ((E * 20 / 100) + (A * 20 / 100) + (C * 20 / 100) + (N * 20 / 100) + (O * 20 / 100));
}

export async function validateEmail(email) {
    const usersRef = ref(database, 'users/');
    try {
        const snapshot = await get(usersRef);
        const data = snapshot.val();

        if (!data) {
            console.log("No users in the database.");
            return true;
        }

        for (let user in data) {
            if (data[user].email === email) {
                console.log("Duplicate email found: ", email);
                return false;
            }
        }
        console.log("Email is unique: ", email);
        return true;
    } catch (error) {
        console.error("Error checking email uniqueness: ", error);
        return false;
    }
}

export async function fetchUserData() {
    const user = getCurrentUser();
    if (!user) {
        console.error("No user authenticated.");
        return null;
    }

    try {
        const userDoc = doc(firestore, 'profiles', user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
            const data = userSnapshot.data();
            return {
                name: data.name || '',
                dob: data.dob || '',
                city: data.city || '',
                description: data.description || '',
                E: data.E || 0,
                A: data.A || 0,
                C: data.C || 0,
                N: data.N || 0,
                O: data.O || 0,
            };
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
        return null;
    }
}


