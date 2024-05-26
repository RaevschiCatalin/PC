'use client'

import Link from 'next/link';
import React, { useState } from 'react';

export default function Profile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const openModal = (section: string) => {
        setModalContent(section);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-white text-black">
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex items-center justify-center mb-10">
                    <h1 className="text-5xl font-bold">Welcome, <a className='text-rose-500'>John Doe</a>!</h1>
                </div>

                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Personality type: <a className='font-normal text-purple-600'>ENTP</a></h1>
                </div>

                <div className="mb-6">
                    <div className="flex items-center">
                        <h2 className="text-3xl font-semibold">Personality Traits</h2>
                    </div>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                        <li>Trait 1: Description</li>
                        <li>Trait 2: Description</li>
                        <li>Trait 3: Description</li>
                    </ul>
                </div>

                <div className="mb-6">
                    <div className="flex items-center">
                        <h2 className="text-3xl font-semibold">Description</h2>
                        <button
                            onClick={() => openModal('Description')}
                            aria-label="Edit description"
                            className="ml-4 z-50">
                            <img src="/assets/icons/pencil.png" alt="Edit" className="w-4 h-4"/>
                        </button>
                    </div>
                    <p className="text-lg mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                <div className="text-center mt-8">
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
                        <form>
                            <textarea className="w-full h-32 p-2 border border-gray-300 rounded mb-4"></textarea>
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
