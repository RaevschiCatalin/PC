//@ts-nocheck
import { getCurrentUser } from "./index";
import { database } from "../database/firebase";
import { get, onValue, ref, set } from "firebase/database";

// @ts-ignore
export async function likeProfile(likedUserId) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        console.error("No user authenticated.");
        return;
    }

    const currentUserId = currentUser.uid;
    console.log(`User ${currentUserId} liked profile ${likedUserId}`);

    try {
        // Store the like in the 'likes' node with the likedUserId
        const likesRef = ref(database, `likes/${currentUserId}/${likedUserId}`);
        await set(likesRef, { liked: true });
        console.log(`Like stored for ${currentUserId} on ${likedUserId}`);

        // Check for mutual like using the likedUserId
        const mutualLikeRef = ref(database, `likes/${likedUserId}/${currentUserId}`);
        const mutualLikeSnapshot = await get(mutualLikeRef);
        if (mutualLikeSnapshot.exists()) {
            console.log(`Mutual like detected between ${currentUserId} and ${likedUserId}`);
            await createMatch(currentUserId, likedUserId);  // Create a match between two user IDs
        } else {
            console.log(`No mutual like found for ${currentUserId} and ${likedUserId}`);
        }
    } catch (error) {
        console.error("Error liking profile:", error);
    }
}

// @ts-ignore
async function createMatch(userId, likedUserId) {
    // Ensure userId < likedUserId to maintain a consistent match ID format
    const matchId = userId < likedUserId ? `${userId}_${likedUserId}` : `${likedUserId}_${userId}`;
    const matchesRef = ref(database, `matches/${matchId}`);
    const timestamp = new Date().toISOString();

    try {
        await set(matchesRef, {
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

// @ts-ignore
export function onMatchUpdate(callback) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        console.error("No user authenticated.");
        return;
    }

    const currentUserId = currentUser.uid;
    const userMatchesRef = ref(database, `matches`);

    return onValue(userMatchesRef, (snapshot) => {
        const matches = {};
        snapshot.forEach(childSnapshot => {
            const matchData = childSnapshot.val();
            if (matchData.users[currentUserId]) {
                matches[childSnapshot.key] = matchData;
            }
        });

        callback(matches);
    });
}
