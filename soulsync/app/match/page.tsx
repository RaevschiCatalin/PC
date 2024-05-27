'use client'
import { useState, ChangeEvent } from 'react';

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
      <h1 className="text-5xl font-bold pb-10">Take a look at this person</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full text-center">
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-md mt-2 mb-4">Personality: {user.mbti}</p>
        <p className="text-gray-600">
          {user.description}
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <button onClick={handleDislike} className={`black_btn ${likeStatus === 'disliked' ? 'opacity-50 cursor-not-allowed' : ''}`}>
            Dislike
          </button>
          <button onClick={handleLike} className={`black_btn ${likeStatus === 'liked' ? 'opacity-50 cursor-not-allowed' : ''}`}>
            Like
          </button>
        </div>
      </div>
    </div>
  );
}
