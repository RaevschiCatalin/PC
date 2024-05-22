export default class User {

    constructor(id, email, password, E, A, C, N, O) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.E = E;
        this.A = A;
        this.C = C;
        this.N = N;
        this.O = O;
    }

    setID (id) {
        id = id.replace("@", "%")
        id = id.replace(".", "%")
        this.id = id;
    }

}