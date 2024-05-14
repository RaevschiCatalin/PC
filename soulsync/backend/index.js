//Test creeare obiect
//NOTE: cum importam metode din alte pachete
import User from './user.js'
import {onValue, ref, set} from "firebase/database";
import {database} from "../database/firebase.js";

const user = new User("placeholder", "placeholder")
console.log(user)
//NU-I PLACE EMAIL CA ID CA ARE PUNCT, tre de fixuit

export function writeUserData(email, password, E, A, C, N, O) {
    const reference = ref(database, 'users/' + email);
    set(reference, {
        email: email,
        password: password,
        E: E,
        A: A,
        C: C,
        N: N,
        O: O
    });
}

export function readUserData(email) {
    const reference = ref(database, 'users/' + email);
    onValue(reference, (snapshot) => {
        console.log(snapshot.val())
    })
}