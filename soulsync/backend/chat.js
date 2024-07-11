import { getCurrentUser } from "./index";
import { get, ref, set } from "firebase/database";
import { database } from "../database/firebase.js";

//functie ce da fetch la ID-urile de chat-uri a utilizatorului curent, returnat sub forma de lista
export async function getChatList(){
    const currentUser = await getCurrentUser();
    //erori
    if (!currentUser) {
        console.error("No user authenticated.");
        return;
    }
    //da fetch la lista
    try {
        let chatIDList = {}
        let chatsRef = ref(database, 'chats/');
        let chatsSnapshot = await get(chatsRef);
        let chatsData = chatsSnapshot.val();
        //parcurgem chat-urile, gasim un chat bun, il punem pe lista
        for (let chatID in chatsData) {
            const user0ID = chatID.split('_')[0];
            const user1ID = chatID.split('_')[1];
            if (user0ID == currentUser.uid || user1ID == currentUser.uid) {
                chatIDList.push(chatID)
            }
        }
        return chatIDList
    } catch (error) {
        console.error("Error fetching chatIDs:", error);
    }
}

//functie ce baga un mesaj nou in chat, are nevoie de mesaj si ID-ul chatului
export async function sendMessage(message, chatID){
    const currentUser = await getCurrentUser();
    //erori
    if (!currentUser) {
        console.error("No user authenticated.");
        return;
    }
    if (!message){
        console.error("No message.");
        return;
    }
    if (!chatID){
        console.error("No chatID.");
        return;
    }
    //baga mesajul nou in chat
    try {
        const chatsRef = ref(database, 'chats/'+chatID+'/messages');
        await set(chatsRef, {
            [message]: {
                sender: currentUser.uid
            }
        })
        console.log("Message added!");
    } catch (error) {
        console.error("Error adding message:", error);
    }
}