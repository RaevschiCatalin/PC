"use client";

import Link from 'next/link';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../database/firebase';
import { validateEmail, writeUserData } from '../../backend/index';
import { setID } from '../../backend/globals';
import Image from "next/image";
import svgIcon from '../../public/assets/icons/logo1.svg';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailValid = await validateEmail(formData.email);
    if (!emailValid) {
      alert('Please enter a unique email address.');
      return;
    }

    if (formData.password === formData.repeatPassword) {
      try {
        const res = await createUserWithEmailAndPassword(formData.email, formData.password);
        if (!res) throw new Error('Failed to create user');

        // User session is automatically handled by Firebase
        // setID(formData.email.replace("@", '%').replace(".", '%'));
        // await writeUserData(formData.email, formData.password);

        // Redirect user to complete profile page
        router.push('/verifyEmail');
      } catch (message) {
        console.error(message);
        alert(message);
      }
    } else {
      alert('Passwords do not match.');
    }
  };

  return (
      <div className="flex justify-center items-center h-screen pb-10">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-12">
            <Image
                src={svgIcon}
                alt="My SVG"
                width={120}
                height={120}
            />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
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
                  className="mr-2 z-10"

              />
              <label className="text-sm">I accept the <span className='text-blue-500'><Link href='/terms'>terms and conditions</Link></span> </label>
            </div>
            <button type="submit"
                    className="w-full black_btn">
              Register
            </button>
            <div className="text-center mt-2">
              <p className="text-sm">Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login here</Link></p>
            </div>
          </form>
        </div>
      </div>
  );
}
