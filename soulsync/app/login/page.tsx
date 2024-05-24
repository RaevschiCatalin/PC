"use client"

import Link from 'next/link';
import { useState, ChangeEvent, FormEvent } from 'react';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import { auth } from '../../database/firebase';
import {useRouter} from "next/navigation";
import {loggedID, setID} from "../../backend";

export default function Login() {
  const[signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const res = await signInWithEmailAndPassword(formData.email, formData.password);
      if(res === null || res ===undefined) throw new Error("Invalid email or password");
      //set current user
      await setID(formData.email);
      //start a user session
      setIsUserLoggedIn(true);
      router.push("/")
    }catch (error){
      // @ts-ignore
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen pb-10">
      <div className="w-full max-w-md">
        <h1 className="text-2xl mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4 border rounded-2xl border-black border-solid p-6 bg-white">
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
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
          <div className="text-center mt-2">
            <p className="text-sm">Don&apos;t have an account? <Link href="/register" className="text-blue-500 hover:underline">Register here</Link></p>
          </div>
          <div className="text-center mt-2">
            <p className="text-sm"> <Link href="/forgotPassword" className="text-blue-500 hover:underline">Forgot Password</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}