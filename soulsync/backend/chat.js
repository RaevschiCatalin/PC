import { getCurrentUser } from "./index.js";
import { get, ref, set, push } from "firebase/database";
import { database } from "../database/firebase.js";

export async function getChatList() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        console.error("No user authenticated.");
        return;
    }

    try {
        let chatIDList = [];
        let chatsRef = ref(database, 'chats/');
        let chatsSnapshot = await get(chatsRef);
        let chatsData = chatsSnapshot.val();
        // Loop through chats, find relevant chats, add them to the list
        for (let chatID in chatsData) {
            const [user0ID, user1ID] = chatID.split('_');
            if (user0ID === currentUser.uid || user1ID === currentUser.uid) {
                chatIDList.push(chatID);
            }
        }
        return chatIDList;
    } catch (error) {
        console.error("Error fetching chatIDs:", error);
    }
}

export const getUserNameByChatID = async (chatID) => {
    const currentUser = await getCurrentUser();
    let userID = "";
    if (!currentUser) {
        console.error("No user authenticated.");
        return;
    }
    try {
        if (chatID.startsWith(currentUser.uid)) {
            userID = chatID.split('_')[1];
        } else {
            userID = chatID.split('_')[0];
        }
        let userRef = ref(database, `users/${userID}`);
        let userSnapshot = await get(userRef);
        let userData = userSnapshot.val();
        let profileRef = ref(database, 'profiles/' + userData.profileId);
        let profileSnapshot = await get(profileRef);
        let profileData = profileSnapshot.val();
        if (!profileData) {
            console.error("No profile data found.");
            return;
        }
        return profileData.name;
    } catch (error) {
        console.error("Error fetching user name:", error);
    }
}

export async function sendMessage(message, chatID) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        console.error("No user authenticated.");
        return;
    }
    if (!message) {
        console.error("No message provided.");
        return;
    }
    if (!chatID) {
        console.error("No chatID provided.");
        return;
    }
    try {
        const chatsRef = ref(database, `chats/${chatID}/messages`);
        await push(chatsRef, {
            message: message,
            sender: currentUser.uid,
            timestamp: new Date().toISOString()
        });
        console.log("Message added!");
    } catch (error) {
        console.error("Error adding message:", error);
    }
}
export async function getSenderName(senderID){
    if(!senderID){
        console.error("No sender ID provided.");
        return;
    }
    try{
        const userRef = ref(database, `users/${senderID}`);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val();
        const profileRef = ref(database, `profiles/${userData.profileId}`);
        const profileSnapshot = await get(profileRef);
        const profileData = profileSnapshot.val();
        return profileData.name;
    }catch (e){
        console.error("Error fetching sender name:", e);
    }
}
export async function deleteChat(chatID) {
    try {
        const chatRef = ref(database, `chats/${chatID}`);
        await set(chatRef, null);
        console.log("Chat deleted!");
    } catch (error) {
        console.error("Error deleting chat:", error);
    }
}
export async function getMessages(chatID) {
    try {
        let messagesRef = ref(database, `chats/${chatID}/messages`);
        let messagesSnapshot = await get(messagesRef);
        return messagesSnapshot.val();
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}
