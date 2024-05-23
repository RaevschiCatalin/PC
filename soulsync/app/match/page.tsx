'use client'

import Head from 'next/head';
import { useState } from 'react';

export default function Match() {
  const [user, setUser] = useState({
    name: 'John Doe',
    mbti: 'ENFP',
    description: 'John is known for his enthusiastic, creative, and sociable nature. He thrives in dynamic environments and enjoys exploring new ideas and possibilities.'
  });
  const [likeStatus, setLikeStatus] = useState('');

  const handleLike = () => {
    setLikeStatus('liked');
    // Optionally, add backend update or API call here to record the like
  };

  const handleDislike = () => {
    setLikeStatus('disliked');
    // Optionally, add backend update or API call here to record the dislike
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-6">Take a look at this person</h1>
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

