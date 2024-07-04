import { ref, set, push, update, get } from "firebase/database";
import { database } from "../database/firebase.js";
import { getID, setID } from "./globals.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import User from "./user.js";

const auth = getAuth();
const firestore = getFirestore();

export function getCurrentUser() {
    return auth.currentUser;
}
export default async function getProfileId(){
    const user = getCurrentUser();
    if (!user) {
        console.error("No user authenticated.");
        return;
    }

    try {
        // Get the user's record from the database
        const userRef = ref(database, `users/${user.uid}`);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val();

        if (!userData || !userData.profileId) {
            console.error("User profile not found.");
            return;
        }

        // Get the profile ID from the user's record
        const profileId = userData.profileId;
        console.log("Profile ID: ", profileId);
        return profileId;
    } catch (e){
        console.error("Error getting profile ID: ", e);
        return;
    }
}
export async function writeUserData(email, password) {
    const user = getCurrentUser();
    if (!user) {
        console.error("No user authenticated.");
        return;
    }

    const usersRef = ref(database, 'users/' + user.uid);
    await set(usersRef, {
        email: email,
        password: password,
        profileId: '',
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

        const profileId = newProfileRef.key;
        const userRef = ref(database, 'users/' + user.uid);
        await update(userRef, {
            profileId: profileId
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

    try {
        // Get the user's record from the database
        const userRef = ref(database, `users/${user.uid}`);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val();

        if (!userData || !userData.profileId) {
            console.error("User profile not found.");
            return;
        }

        // Get the profile ID from the user's record
        const profileId = userData.profileId;
        console.log("Profile ID: ", profileId);

        // Update the corresponding profile with the new values
        const profileRef = ref(database, `profiles/${profileId}`);
        await update(profileRef, {
            E: E,
            A: A,
            C: C,
            N: N,
            O: O
        });

        console.log("Profile updated successfully.");
    } catch (error) {
        console.error("Error updating profile:", error);
    }
}

export function personalityType (user){
    let results ={
        E, A, C, N, O
    }

    if (user.E <= 15)
        results.E = "-"
    else if (user.E > 15 && user.E < 25)
        results.E = "="
    else
        results.E = "+"

    if (user.A <= 15)
        results.A = "-"
    else if (user.A > 15 && user.A < 25)
        results.A = "="
    else
        results.A = "+"

    if (user.C <= 15)
        results.C = "-"
    else if (user.C > 15 && user.C < 25)
        results.C = "="
    else
        results.C = "+"

    if (user.N <= 15)
        results.N = "-"
    else if (user.N > 15 && user.E < 25)
        results.N = "="
    else
        results.N = "+"

    if (user.O <= 15)
        results.O = "-"
    else if (user.O > 15 && user.O < 25)
        results.O = "="
    else
        results.O = "+"

    return results
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
    const profileId = await getProfileId();
    if (!profileId) {
        console.error("No profile ID found.");
        return null;
    }

    try {
        const profileRef = ref(database, `profiles/${profileId}`);
        const profileSnapshot = await get(profileRef);
        const data = profileSnapshot.val();

        if (data) {
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
            console.log('No such profile!');
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
        return null;
    }
}

//functie ce returneaza procentul de match intre doi useri
export function matchUsers(user0, user1) {
    const E = Math.abs(user0.E - user1.E) * 2.5;
    const A = Math.abs(user0.A - user1.A) * 2.5;
    const C = Math.abs(user0.C - user1.C) * 2.5;
    const N = Math.abs(user0.N - user1.N) * 2.5;
    const O = Math.abs(user0.O - user1.O) * 2.5;
    return 100 - ((E * 20 / 100) + (A * 20 / 100) + (C * 20 / 100) + (N * 20 / 100) + (O * 20 / 100));
}

//functie ce returneaza o lista json cu toate datele relevante la userii cautati
//minPercent -> procentul minim de match cautat
//numberOfUsers -> numarul de useri cautati
//currentUser -> utilizatorul curent (subject to change)
export async function fetchUserList(minPercent, numberOfUsers, currentUser){
    try {
        let k = 0
        let userList ={
            users: []
        }
        const userRef = ref(database,'users/')
        const userSnapshot = await get(userRef)
        const userData = userSnapshot.val();
        for (let data in userData) {
            let profileRef = ref(database, 'profiles/' + userData[data].profileId)
            let profileSnapshot = await get(profileRef);
            let profileData = profileSnapshot.val();
            let user = new User(userData[data].profileId, profileData.E, profileData.A, profileData.C, profileData.N, profileData.O,
                profileData.city, profileData.description, profileData.dob, profileData.name)
            if (matchUsers(currentUser, user) >= minPercent && k < numberOfUsers){
                userList.users.push({
                    "id": userData[data].profileId,
                    "E": user.E,
                    "A": user.A,
                    "C": user.C,
                    "N": user.N,
                    "O": user.O,
                    "city": user.city,
                    "desc": user.desc,
                    "dob": user.dob,
                    "name": user.name
                })
                k += 1
            }
            else if (k == numberOfUsers)
                break
        }
        return userList;
    }
    catch (error){
        console.error("Error fetching user list:", error);
    }
}

//testare functie noua
//const currentUser = new User("placeholder", 32, 12, 23, 45, 7,
//    "placeholder", "placeholder", "placeholder", "placeholder")
//console.log(await fetchUserList(0,3, currentUser))
