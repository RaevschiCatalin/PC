import {ref, set, update} from "firebase/database";
import {database} from "../database/firebase.js";
import {getID, setID} from "./globals.js";

export async function writeUserData(email, password) {
    const reference = ref(database, 'users/' + getID());
    set(reference, {
        email: email,
        password: password,
    })
}

const pushDataToDatabase = async (data) => {
    try {
        setID("placeholder%gmail%com");
        const reference = ref(database, 'profiles/' + getID());
        set(reference, {
            name: data.name,
            dob: data.yearOfBirth,
            city: data.city,
            description: data.description,
            E: 0,
            A: 0,
            C: 0,
            N: 0,
            O: 0
        })
    } catch (error) {
        console.error(error);
    }
}

export async function updateQuiz(E, A, C, N, O) {
    setID("placeholder%gmail%com");
    const reference = ref(database, 'profiles/' + getID())
    update(reference, {
        E: E,
        A: A,
        C: C,
        N: N,
        O: O
    })
}

export function matchUsers(user0, user1) {
    const E = Math.abs(user0.E - user1.E) * 2.5
    const A = Math.abs(user0.A - user1.A) * 2.5
    const C = Math.abs(user0.C - user1.C) * 2.5
    const N = Math.abs(user0.N - user1.N) * 2.5
    const O = Math.abs(user0.O - user1.O) * 2.5
    return 100-((E*20/100)+(A*20/100)+(C*20/100)+(N*20/100)+(O*20/100))
}

export {pushDataToDatabase};