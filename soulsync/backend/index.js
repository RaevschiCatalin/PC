import {ref, set} from "firebase/database";
import {database} from "../database/firebase.js";

export let loggedID
export async function setID(data){
    data = data.replace("@", "%")
    loggedID = data.replace(".", "%")
}

// modified to only create user with email and pass and give quiz results default values
export async function writeUserData(email, password) {
    let reference = ref(database, 'users/' + loggedID)
    set(reference, {
        email: email,
        password: password,
    })
    reference = ref(database, 'profiles/' + loggedID)
    set(reference, {
        E: 20,
        A: 14,
        C: 14,
        N: 38,
        O: 8
    })
}

// updates quiz results, uses current user
export async function updateQuiz(E, A, C, N, O) {
    const reference = ref(database, 'profiles/' + loggedID)
    set(reference, {
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