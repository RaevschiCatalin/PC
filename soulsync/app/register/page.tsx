"use client"

import Link from 'next/link';
import { useState, ChangeEvent, FormEvent } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
    acceptTerms: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form data and perform registration logic
    // You can add validation logic here
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen pb-10">
      <div className="w-full max-w-md">
        <h1 className="text-2xl mb-4 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4 border rounded-2xl border-orange-400 border-solid p-6 bg-white">
          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Repeat Password:</label>
            <input
              type="password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="text-sm">I accept the terms and conditions</label>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Register</button>
          <div className="text-center mt-2">
            <p className="text-sm">Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}