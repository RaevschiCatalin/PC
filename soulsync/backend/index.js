import { ref, set, push, update, get } from "firebase/database";
import { database } from "../database/firebase.js";
import { getID, setID } from "./globals.js";

export async function writeUserData(email, password) {
    // Create a reference to the 'users' collection
    const usersRef = ref(database, 'users');
    // Generate a new unique key for the new user
    const newUserRef = push(usersRef);

    await set(newUserRef, {
        email: email,
        password: password,
    });
}

const pushDataToDatabase = async (data) => {
    try {
        // Set a placeholder ID (update this logic as needed)
        setID("placeholder%gmail%com");
        // Create a reference to the 'profiles' collection
        const profilesRef = ref(database, 'profiles');
        // Generate a new unique key for the new profile
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
    setID("placeholder%gmail%com");
    const reference = ref(database, 'profiles/' + getID());
    await update(reference, {
        E: E,
        A: A,
        C: C,
        N: N,
        O: O
    });
}

export function matchUsers(user0, user1) {
    const E = Math.abs(user0.E - user1.E) * 2.5;
    const A = Math.abs(user0.A - user1.A) * 2.5;
    const C = Math.abs(user0.C - user1.C) * 2.5;
    const N = Math.abs(user0.N - user1.N) * 2.5;
    const O = Math.abs(user0.O - user1.O) * 2.5;
    return 100 - ((E * 20 / 100) + (A * 20 / 100) + (C * 20 / 100) + (N * 20 / 100) + (O * 20 / 100));
}

//checks for duplicate email, returns false if duplicate, true if not
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


export { pushDataToDatabase };
