'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import getProfileId, {fetchUserData, updateUserDescription} from '../../backend/index';

export default function Profile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [userData, setUserData] = useState({
        name: '',
        dob: '',
        city: '',
        description: '',
        E: 0,
        A: 0,
        C: 0,
        N: 0,
        O: 0,
    });
    const [tempDescription, setTempDescription] = useState('');

    const auth = getAuth();
    const profileId = getProfileId();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const data = await fetchUserData();
                if (data) {
                    setUserData({
                        name: data.name || '',
                        dob: data.dob || '',
                        city: data.city || '',
                        description: data.description || '',
                        E: data.E || 0,
                        A: data.A || 0,
                        C: data.C || 0,
                        N: data.N || 0,
                        O: data.O || 0,
                    });
                }
            }
        });

        return () => unsubscribe();
    }, [auth]);
    // @ts-ignore
    const calculateAge = (dob) => {
        if (!dob) return '';
        const birthDate = new Date(dob);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs); // milliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    // @ts-ignore
    const openModal = (section) => {
        setModalContent(section);
        setTempDescription(userData.description);  // Load the current description
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    // @ts-ignore
    const handleSave = async (e) => {
        e.preventDefault();
        // Push the new description to the database
        updateUserDescription(tempDescription);
        closeModal();
    };

    return (
        <div className="min-h-screen bg-white text-black">
            <div className="max-w-4xl mx-auto p-6 flex items-center justify-center mb-10 flex-col">
                <div className="flex items-center justify-center mb-10">
                    <h1 className="text-5xl font-bold">Welcome, <span className='text-rose-500'>{userData.name}</span>!</h1>
                </div>

                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Age: <span className='font-normal text-purple-600'>{calculateAge(userData.dob).toString()}</span></h1>

                </div>

                <div className="mb-6">
                    <h1 className="text-3xl font-bold">City: <span className='font-normal text-purple-600'>{userData.city}</span></h1>
                </div>

                <div className="mb-6 flex items-center justify-center flex-col">
                    <h1 className="text-3xl font-bold">Test Scores:</h1>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                        <li><b>Extroversion</b>: {userData.E.toString()} (Average Score is: 20)</li>
                        <li><b>Agreeableness</b>: {userData.A.toString()} (Average Score is: 14)</li>
                        <li><b>Conscientiousness</b>: {userData.C.toString()} (Average Score is: 14)</li>
                        <li><b>Neuroticism</b>: {userData.N.toString()} (Average Score is: 38)</li>
                        <li><b>Openness to Experience</b>: {userData.O.toString()} (Average Score is: 8)</li>
                    </ul>
                    <button
                        className="px-6 py-3 my-6 bg-purple-300 text-white rounded-full border border-black transition-all hover:bg-white hover:text-black text-center text-md font-inter">
                        <Link href="testReport">
                            View Detailed Report
                        </Link>
                    </button>
                </div>

                <div className="mb-6">
                    <div className="flex items-center">
                        <h2 className="text-3xl font-semibold">Description</h2>
                        <button
                            onClick={() => openModal('Description')}
                            aria-label="Edit description"
                            className="ml-4 z-50">
                            <img src="/assets/icons/pencil.png" alt="Edit" className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-lg mt-2">
                        {userData.description}
                    </p>
                </div>
                <div className="text-center text-xl mt-8">
                    <button className="px-6 py-3 bg-yellow-200 text-black rounded-full border border-black transition-all hover:bg-black hover:text-white text-center text-md font-inter">
                        <Link href={"/personalityTest"}>
                            Redo Personality Test
                        </Link>
                    </button>
                </div>
                <div className="text-center text-xl mt-8">
                    <button className="px-6 py-3 bg-black text-white rounded-full border border-black transition-all hover:bg-white hover:text-black text-center text-md font-inter">
                        <Link href={"/match"}>
                            Back to matching
                        </Link>
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-2xl font-semibold mb-4">Update {modalContent}</h2>
                        <form onSubmit={handleSave}>
                            <textarea
                                value={tempDescription}
                                onChange={(e) => setTempDescription(e.target.value)}
                                className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
                            ></textarea>
                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={closeModal} className="px-4 py-2 outline_btn">Cancel</button>
                                <button type="submit" className="px-4 py-2 black_btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
