import { ref, set, push, update, get } from "firebase/database";
import { database } from "../database/firebase.js";
import { getID, setID } from "./globals.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import User from "./user.js";
import path from 'path';
import {personalityTypes} from './personalityTypes.json' assert { type: 'json' };

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
export async function updateUserDescription(description){
    const user = getCurrentUser();
    if (!user) {
        console.error("No user authenticated.");
        return;
    }
    try {
        const profileId = await getProfileId();
        const profileRef = ref(database, `profiles/${profileId}`);
        await update(profileRef, {
            description: description
        });
    } catch (error) {
        console.error("Error updating description: ", error);
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

async function getTestScores(){
    const profileId = await getProfileId();
    if (!profileId) {
        console.error("No profile ID found.");
        return null;
    }
    try{
        const profileRef = ref(database, `profiles/${profileId}`);
        const profileSnapshot = await get(profileRef);
        const data = profileSnapshot.val();
        if(data){
            return {
                E: data.E || 0,
                A: data.A || 0,
                C: data.C || 0,
                N: data.N || 0,
                O: data.O || 0,
            }
        }
    }catch (e){
        console.error("Error fetching personality description: ", e);
        return null;
    }
}

export async function getPersonalityResults() {
    const score = await getTestScores();

    if (score) {
        console.log("Retrieved Scores:", score);
    } else {
        console.error("No scores retrieved.");
        return null;
    }


    const scores  = {
        E: score.E,
        A: score.A,
        C: score.C,
        N: score.N,
        O: score.O
    };

    const personalityTypes = {
        E: {
            "-": {
                scoreRange: "<16",
                desc: "Introvert, you prefer solitude or the company of a few close friends over large social gatherings. You find peace and rejuvenation in quiet, solitary environments and may feel drained after too much social interaction. Your introspective nature allows you to explore your thoughts and feelings deeply."
            },
            "=": {
                scoreRange: "16-24",
                desc: "Average, you exhibit a balance between introversion and extroversion. You are comfortable in social situations but also value your alone time. You can navigate different social environments with ease, neither feeling overwhelmed by too much interaction nor isolated by too little."
            },
            "+": {
                scoreRange: ">24",
                desc: "Extrovert, you thrive in social settings and enjoy being around people. You are energized by interactions and often seek out opportunities to connect with others. Your outgoing nature makes you adept at networking and forming new relationships. You are often the life of the party and enjoy lively discussions and group activities."
            }
        },
        A: {
            "-": {
                scoreRange: "<16",
                desc: "Competitive, you have a strong desire to win and assert your ideas. You enjoy challenges and are motivated by the drive to succeed. While this can lead to significant achievements, it can sometimes make collaboration difficult as you might prioritize your own goals over group harmony. Your assertiveness can be a powerful tool when used constructively."
            },
            "=": {
                scoreRange: "16-24",
                desc: "Average, you maintain a balance between being assertive and agreeable. You can assert your opinions and needs when necessary but also value cooperation and harmony. This makes you adaptable in various social and professional settings, able to stand up for yourself while also maintaining positive relationships."
            },
            "+": {
                scoreRange: ">24",
                desc: "Agreeable, you prioritize getting along with others and often go out of your way to avoid conflicts. You are empathetic, considerate, and cooperative, making you a great team player. Your desire for harmony can sometimes lead you to compromise too much, but it also fosters strong, positive relationships with those around you."
            }
        },
        C: {
            "-": {
                scoreRange: "<16",
                desc: "Spontaneous, you thrive on adventure and unpredictability. You prefer to live in the moment and enjoy flexibility in your plans. This can make you highly adaptable and open to new experiences, but it might also lead to challenges in maintaining long-term commitments and responsibilities."
            },
            "=": {
                scoreRange: "16-24",
                desc: "Average, you exhibit a balance between spontaneity and conscientiousness. You can appreciate the value of planning and structure while also remaining open to unexpected opportunities. This balance allows you to manage responsibilities effectively while still enjoying life's surprises."
            },
            "+": {
                scoreRange: ">24",
                desc: "Conscientious, you prefer a structured and organized approach to life. You set goals, plan meticulously, and follow through with your commitments. Your attention to detail and reliability make you a dependable individual, though sometimes you might struggle with flexibility and spontaneity."
            }
        },
        N: {
            "-": {
                scoreRange: "<16",
                desc: "Reactive, you experience your emotions intensely and often wear them on your sleeve. You may find it challenging to contain your feelings, leading to expressive reactions to situations. This emotional transparency can foster deep connections with others, but it might also make emotional regulation more difficult."
            },
            "=": {
                scoreRange: "16-24",
                desc: "Average, you maintain a balanced approach to emotional experiences. You can express your feelings when appropriate but also manage them effectively. This emotional equilibrium allows you to navigate life's ups and downs with resilience, neither overly reactive nor detached."
            },
            "+": {
                scoreRange: ">24",
                desc: "Stable, you possess a calm and steady emotional disposition. You are less likely to be overwhelmed by stress and can maintain your composure in difficult situations. Your stability allows you to provide support to others and handle challenges with a level head, though you might sometimes appear emotionally distant."
            }
        },
        O: {
            "-": {
                scoreRange: "<16",
                desc: "Consistent, you value routine and predictability. You prefer a structured life where you can plan and anticipate outcomes. This consistency can provide a sense of security and reliability, though it might limit your openness to new experiences and spontaneous changes."
            },
            "=": {
                scoreRange: "16-24",
                desc: "Average, you balance consistency with openness to new experiences. You can appreciate the stability of routine while remaining open to occasional changes and new ideas. This makes you adaptable and versatile, able to enjoy both the familiar and the novel aspects of life."
            },
            "+": {
                scoreRange: ">24",
                desc: "Open, you are curious and eager to explore new experiences and ideas. You thrive on variety and often seek out new adventures and learning opportunities. Your open-mindedness can lead to a rich, diverse life, though it might also make it challenging to settle into long-term routines."
            }
        }
    };

    let results = {
        E: "",
        A: "",
        C: "",
        N: "",
        O: ""
    };

    const getCategory = (score) => {
        if (score < 16) return "-";
        if (score >= 16 && score <= 24) return "=";
        if (score > 24) return "+";
    };

    for (let type in results) {
        let category = getCategory(scores[type]);
        results[type] = personalityTypes[type][category].desc;
    }


    return results;
}




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

// testare functie noua
// const currentUser = new User("placeholder", 32, 12, 23, 45, 7,
//    "placeholder", "placeholder", "placeholder", "placeholder")
// console.log(await fetchUserList(0,3, currentUser))

