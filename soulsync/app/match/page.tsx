"use client";
import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import HeartIcon from '../../public/assets/icons/heart.svg';
import CrossedHeartIcon from '../../public/assets/icons/crossed-heart.svg';

export default function Match() {
  const [user, setUser] = useState({
    name: 'John Doe',
    mbti: 'ENFP',
    description: 'John is known for his enthusiastic, creative, and sociable nature. He thrives in dynamic environments and enjoys exploring new ideas and possibilities.'
  });
  const [likeStatus, setLikeStatus] = useState('');
  const [matchFilters, setMatchFilters] = useState({
    bestMatch: false,
    oppositeMatch: false
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLike = () => {
    setLikeStatus('liked');
  };

  const handleDislike = () => {
    setLikeStatus('disliked');
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setMatchFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked
    }));
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
      <div className="relative min-h-screen bg-white flex flex-col items-center pt-20">
        <div className="absolute top-0 right-0 pt-5 pr-5">
          <button onClick={toggleDropdown} className="py-2 px-4 rounded-full hover:bg-gray-200">
            <img src="/assets/icons/settings.png" alt="Settings" className="w-5 h-5"/>
          </button>
          {dropdownVisible && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl">
                <h2 className="text-lg font-semibold px-4 py-2">Filters</h2>
                <label className="block text-gray-800 text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <input
                      type="checkbox"
                      name="bestMatch"
                      checked={matchFilters.bestMatch}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                  /> Best Match
                </label>
                <label className="block text-gray-800 text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <input
                      type="checkbox"
                      name="oppositeMatch"
                      checked={matchFilters.oppositeMatch}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                  /> Opposites Match
                </label>
              </div>
          )}
        </div>
        <h1 className="text-5xl font-bold mb-20">Take a look at this person</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full text-center"
             style={{transform: 'scale(1.2)'}}>
          <h2 className="text-3xl font-semibold">{user.name}</h2>
          <p className="text-lg mt-4 mb-6">Personality: {user.mbti}</p>
          <p className="text-gray-700 text-lg">{user.description}</p>
          <div className="flex justify-center gap-40 mt-10">
            <button
                onClick={handleDislike}
                className={`relative flex items-center justify-center w-16 h-16 rounded-full border border-black ${likeStatus === 'disliked' ? 'opacity-50 cursor-not-allowed' : 'group hover:bg-red-500 hover:text-white hover:border-white'}`}
                disabled={likeStatus === 'disliked'}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src={CrossedHeartIcon} alt="Dislike" className="w-8 h-8 group-hover:fill-white"/>
              </div>
            </button>
            <button
                onClick={handleLike}
                className={`relative flex items-center justify-center w-16 h-16 rounded-full border border-black ${likeStatus === 'liked' ? 'opacity-50 cursor-not-allowed' : 'group hover:bg-green-300 hover:text-white hover:border-white'}`}
                disabled={likeStatus === 'liked'}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src={HeartIcon} alt="Like" className="w-8 h-8"/>
              </div>
            </button>
          </div>

        </div>
      </div>
  );
}
