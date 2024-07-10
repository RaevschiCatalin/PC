//@ts-nocheck
"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import HeartIcon from '../../public/assets/icons/heart.svg';
import CrossedHeartIcon from '../../public/assets/icons/crossed-heart.svg';
import getProfileId, { fetchUserList, fetchUserData, matchUsers, getCurrentUser } from '../../backend/index'; // Adjust the path accordingly
import Loading from '../../components/Loading';
import { likeProfile, onMatchUpdate } from '../../backend/matching';

export default function Match() {
  const [user, setUser] = useState(null);
  const [likeStatus, setLikeStatus] = useState('');
  const [isBestMatch, setIsBestMatch] = useState(true); // Toggle state
  const [currentUserProfileId, setCurrentUserProfileId] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [potentialMatches, setPotentialMatches] = useState([]);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [matches, setMatches] = useState({});  // To store real-time match data

  useEffect(() => {
    async function fetchProfileIdAndData() {
      const currentUserProfileId = await getCurrentUser();
      const profileId = await getProfileId();
      setCurrentUserProfileId(profileId);
      const userData = await fetchUserData(); // Assuming fetchUserData() fetches the current user's data
      setCurrentUserData(userData);
    }
    fetchProfileIdAndData();
  }, []);

  useEffect(() => {
    async function fetchMatches() {
      if (currentUserProfileId && currentUserData) {
        try {
          const minPercent = isBestMatch ? 80 : 1; // Adjust minPercent based on toggle state
          const matches = await fetchUserList(minPercent, 10, currentUserData); // Adjust numberOfUsers as needed
          if (matches && matches.users && matches.users.length > 0) {
            setPotentialMatches(matches.users);
            setUser(matches.users[0]);
          } else {
            setPotentialMatches([]);
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching matches:", error);
        }
      }
    }
    fetchMatches();
  }, [currentUserProfileId, currentUserData, isBestMatch]); // Re-fetch when toggle state changes

  useEffect(() => {
    // Set up real-time match listener
    const unsubscribe = onMatchUpdate((newMatches) => {
      setMatches(newMatches);
      console.log('New matches:', newMatches);
    });


    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleNextUser = () => {
    setLikeStatus('');
    setPotentialMatches((prevMatches) => prevMatches.slice(1));
    setUser(potentialMatches[1] || null);
  };

  const handleLike = async () => {
    if (user) {
      try {
        await likeProfile(user.id);  // Call the new likeProfile function
        setLikedProfiles((prevLikedProfiles) => [
          ...prevLikedProfiles,
          user.id,
        ]);
        handleNextUser();
      } catch (error) {
        console.error("Error liking profile:", error);
      }
    }
  };

  const handleDislike = () => {
    handleNextUser();
  };

  const handleToggle = () => {
    setIsBestMatch(!isBestMatch);
  };

  const compatibilityScore = user && currentUserData ? matchUsers(currentUserData, user) : null;

  return (
      <div className="relative min-h-screen bg-white flex flex-col items-center pt-20">
        <div className="absolute top-0 right-0 pt-5 pr-5">
          <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={isBestMatch}
                onChange={handleToggle}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-500"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isBestMatch ? 'Best Match' : 'All Matches'}</span>
          </label>
        </div>
        <h1 className="text-5xl font-bold mb-20">Take a look at this person</h1>
        {user ? (
            <div className="bg-white shadow-lg rounded-lg gap-1 p-8 max-w-2xl w-full text-center" style={{ transform: 'scale(1.2)' }}>
              <h2 className="text-4xl font-semibold green_gradient">{user.name}</h2>
              <p className="text-lg mt-4 mb-6"><b className="text-3xl italic">Personality:</b><br/><b>Extroversion:</b> {user.E} <br/> <b> Agreeableness:</b> {user.A} <br/> <b>Conscientiousness:</b> {user.C} <br/><b>Neuroticism:</b> {user.N} <br/> <b>Openness to Experience:</b> {user.O}</p>
              <p className="text-gray-700 text-lg"><b className="text-3xl italic">A brief description:</b> <br/> {user.desc}</p>
              <p className="text-lg mt-4 mb-6"><b className="text-3xl italic">Compatibility Score:</b> {compatibilityScore}%
              </p>
              <div className="flex justify-center gap-40 mt-10">
                <button
                    onClick={handleDislike}
                    className="relative flex items-center justify-center w-16 h-16 rounded-full border border-black group hover:bg-red-500 hover:text-white hover:border-white"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image src={CrossedHeartIcon} alt="Dislike" className="w-8 h-8 group-hover:fill-white" />
                  </div>
                </button>
                <button
                    onClick={handleLike}
                    className="relative flex items-center justify-center w-16 h-16 rounded-full border border-black group hover:bg-green-300 hover:text-white hover:border-white"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image src={HeartIcon} alt="Like" className="w-8 h-8" />
                  </div>
                </button>
              </div>
            </div>
        ) : (
            <Loading />
        )}
      </div>
  );
}
