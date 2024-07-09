import {ref, set, push, update, get, child, onValue} from "firebase/database";
import { database } from "../database/firebase.js";
import { getCurrentUser } from "./index";

// @ts-ignore
export async function likeUser(likedUserId) {
    const user = getCurrentUser();
    if (!user) {
        console.error("No user authenticated.");
        return;
    }

    const userId = user.uid;
    const likesRef = ref(database, `likes/${userId}/${likedUserId}`);
    const timestamp = new Date().toISOString();

    try {
        await set(likesRef, { timestamp });
        console.log(`User ${userId} liked user ${likedUserId}`);

        // Check if the liked user has already liked the current user
        const mutualLike = await checkMutualLike(userId, likedUserId);
        if (mutualLike) {
            await createMatch(userId, likedUserId);
        }
    } catch (error) {
        console.error("Error liking user:", error);
    }
}
// @ts-ignore
export async function likeProfile(likedProfileId) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        console.error("No user authenticated.");
        return;
    }

    try {
        const likesRef = ref(database, `likes/${currentUser.uid}/${likedProfileId}`);
        await set(likesRef, { liked: true });

        // Check for mutual like
        const mutualLikeRef = ref(database, `likes/${likedProfileId}/${currentUser.uid}`);
        const mutualLikeSnapshot = await get(mutualLikeRef);
        if (mutualLikeSnapshot.exists()) {
            await createMatch(currentUser.uid, likedProfileId);
        }
    } catch (error) {
        console.error("Error liking profile:", error);
    }
}


// @ts-ignore
async function checkMutualLike(userId, likedUserId) {
    const likedUserLikesRef = ref(database, `likes/${likedUserId}/${userId}`);
    const likedUserLikesSnapshot = await get(likedUserLikesRef);

    return likedUserLikesSnapshot.exists();
}

// @ts-ignore
async function createMatch(userId, likedUserId) {
    const matchesRef = ref(database, `matches`);
    const newMatchRef = push(matchesRef);
    const timestamp = new Date().toISOString();

    try {
        await set(newMatchRef, {
            users: {
                [userId]: true,
                [likedUserId]: true,
            },
            timestamp,
        });
        console.log(`Match created between user ${userId} and user ${likedUserId}`);
    } catch (error) {
        console.error("Error creating match:", error);
    }
}
//@ts-ignore
export function onMatchUpdate(callback) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        console.error("No user authenticated.");
        return;
    }

    const matchesRef = ref(database, `matches/${currentUser.uid}`);

    return onValue(matchesRef, (snapshot) => {
        if (snapshot.exists()) {
            const matches = snapshot.val();
            // Call the callback function with the new matches data
            callback(matches);
        } else {
            // Handle the case where there are no matches
            callback({});
        }
    });
}