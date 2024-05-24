import {ref, set} from "firebase/database";
import {database} from "../database/firebase.js";
import user from "./user.js";

let current_user = user;

// modified to only create user with email and pass and give quiz results default values
export function writeUserData(email, password) {
    let ID = email.replace("@", "%")
    ID = ID.replace(".", "%")
    let reference = ref(database, 'users/' + ID)
    set(reference, {
        email: email,
        password: password,
    })
    reference = ref(database, 'profiles/' + ID)
    set(reference, {
        E: 20,
        A: 14,
        C: 14,
        N: 38,
        O: 8
    })
}

// updates quiz results, uses current user
export function updateQuiz(E, A, C, N, O) {
    const reference = ref(database, 'profiles/' + current_user.id)
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

export { current_user };