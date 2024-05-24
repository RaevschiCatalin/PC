import {onValue, ref, set} from "firebase/database";
import {database} from "../database/firebase";
import {loggedID} from "./index";

//push data pentru profile, restul datelor pot fi updated cu write user
const pushDataToDatabase = async (data: any) => {
try {
        const reference = ref(database, 'profiles/' + loggedID);
        set(reference, {
            name: data.name,
            dob: data.yearOfBirth,
            city: data.city,
            description: data.description
        })
    } catch (error) {
        console.error(error);
    }
}

// get data, in snapshot se afla tot ce e in database
const getDataFromDatabase = async (ID: any) => {
    try {
        let reference = ref(database, 'users/' + ID);
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            console.log(snapshot.val());
        });
        reference = ref(database, 'profiles/' + ID);
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            console.log(snapshot.val());
        });
    } catch (error) {
        console.error(error);
    }
}

export { pushDataToDatabase };