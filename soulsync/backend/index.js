import {onValue, ref, set} from "firebase/database";
import {database} from "../database/firebase.js";

//NU-I PLACE EMAIL CA ID CA ARE PUNCT, tre de fixuit

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

export function readUserData(email) {
    const reference = ref(database, 'users/' + email);
    onValue(reference, (snapshot) => {
        console.log(snapshot.val())
    })
}

writeUserData("placeholder@gmail.com", "placeholder", 0, 0, 0, 0, 0)