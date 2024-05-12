import User from './user.js';
//doi useri creati pt testare
const user0 = new User("0", "placeholder", "placeholder");
const user1 = new User("1", "placeholder", "placeholder");
user0.E=40, user0.A=40, user0.C=40, user0.N=40, user0.O=40
user1.E=30, user1.A=30, user1.C=30, user1.N=30, user1.O=30
//alg de matching, returneaza valoarea match-ului sub forma de numar%
function matchUsers(user0, user1) {
    const E = Math.abs(user0.E - user1.E) * 2.5
    const A = Math.abs(user0.A - user1.A) * 2.5
    const C = Math.abs(user0.C - user1.C) * 2.5
    const N = Math.abs(user0.N - user1.N) * 2.5
    const O = Math.abs(user0.O - user1.O) * 2.5
    return 100-((E*20/100)+(A*20/100)+(C*20/100)+(N*20/100)+(O*20/100))
}
//return test
console.log(matchUsers(user0, user1))