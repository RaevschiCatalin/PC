"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic for handling forgot password request
    console.log("Forgot password request for email:", email);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-orange-400">
      <div className="w-full max-w-md">
        <h1 className="text-2xl mb-4 text-center">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4 border rounded-2xl border-orange-400 border-solid p-6 bg-white">
          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Reset Password</button>
          <div className="text-center mt-2">
            <p className="text-sm">Remembered your password? <Link href="/Login" className="text-blue-500 hover:underline">Login here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
