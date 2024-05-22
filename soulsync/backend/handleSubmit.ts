import {ref, set} from "firebase/database";
import {database} from "../database/firebase.js";
//db push logic in care le bagi in tabele
//plus logic cu getter a datelor de aici din db
const pushDataToDatabase = async (data: any) => {
try {
        const reference = ref(database, 'profiles/' + 'placeholder%gmail%com');
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

const getDataFromDatabase = async () => {
    try {
        // Get data from database
    } catch (error) {
        console.error(error);
    }
}

export { pushDataToDatabase };