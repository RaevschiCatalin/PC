import {ref, set} from "firebase/database";
import {database} from "../database/firebase.js";

export function writeUserData(email, password, E, A, C, N, O) {
    let ID = email.replace("@", "%")
    ID = ID.replace(".", "%")
    let reference = ref(database, 'users/' + ID)
    set(reference, {
        email: email,
        password: password,
    })
    reference = ref(database, 'profiles/' + ID)
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