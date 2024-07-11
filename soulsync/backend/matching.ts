//@ts-nocheck
import { getCurrentUser } from "./index";
import { database } from "../database/firebase";
import { get, onValue, ref, set } from "firebase/database";

export async function likeProfile(likedUserId) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        console.error("No user authenticated.");
        return;
    }

    const currentUserId = currentUser.uid;
    console.log(`User ${currentUserId} liked profile ${likedUserId}`);

    try {
        const likesRef = ref(database, `likes/${currentUserId}/${likedUserId}`);
        await set(likesRef, { liked: true });
        console.log(`Like stored for ${currentUserId} on ${likedUserId}`);

        const mutualLikeRef = ref(database, `likes/${likedUserId}/${currentUserId}`);
        const mutualLikeSnapshot = await get(mutualLikeRef);
        if (mutualLikeSnapshot.exists()) {
            console.log(`Mutual like detected between ${currentUserId} and ${likedUserId}`);
            await createMatch(currentUserId, likedUserId);
        } else {
            console.log(`No mutual like found for ${currentUserId} and ${likedUserId}`);
        }
    } catch (error) {
        console.error("Error liking profile:", error);
    }
}

export async function createMatch(userId, likedUserId) {
    if (!userId || !likedUserId) {
        console.error("User IDs are required to create a match.");
        return;
    }

    const matchId = `${userId}_${likedUserId}`;

    try {
        const matchesRef = ref(database, `matches/${matchId}`);
        const timestamp = new Date().toISOString();

        await set(matchesRef, {
            [userId]: true,
            [likedUserId]: true,
            timestamp,
        });
        console.log(`Match created between ${userId} and ${likedUserId}`);
    } catch (error) {
        console.error("Error creating match:", error);
    }
}

export function onMatchUpdate(callback) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        console.error("No user authenticated.");
        return;
    }

    const currentUserId = currentUser.uid;
    const matchesRef = ref(database, "matches");

    const unsubscribe = onValue(matchesRef, (snapshot) => {
        const matchesData = snapshot.val();
        const userMatches = Object.keys(matchesData || {}).filter((matchId) => {
            const users = matchId.split("_");
            return users.includes(currentUserId);
        }).reduce((acc, matchId) => {
            acc[matchId] = matchesData[matchId];
            return acc;
        }, {});

        callback(userMatches);
    });

    return unsubscribe;
}
