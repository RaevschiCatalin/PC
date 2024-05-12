function writeUserData(userID, email, password, E, A, C, N, O) {
    const db = getDatabase();
    const reference = ref(db, 'users/' + userID);
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



function readUserData(userID) {
    const reference = ref(database, 'users/' + userID);
    onValue(reference, (snapshot) => {
        const data = snapshot.val();
        console.log(snapshot.val());
    });
}


writeUserData(0, "placeholder", "placeholder");
readUserData(0);