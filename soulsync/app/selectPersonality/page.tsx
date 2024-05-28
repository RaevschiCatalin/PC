'use client'
import Link from "next/link";
import { useState, ChangeEvent } from 'react';
import {updateQuiz} from "../../backend";

export default function SelectPersonality() {
    const [selectedType, setSelectedType] = useState('');

    const personalityTypes = [
        "INTJ", "INTP", "ENTJ", "ENTP",
        "INFJ", "INFP", "ENFJ", "ENFP",
        "ISTJ", "ISFJ", "ESTJ", "ESFJ",
        "ISTP", "ISFP", "ESTP", "ESFP"
    ];

    const handleSelection = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
    };

    const handleSubmit = () => {
        // Here, you might handle the form submission, such as navigating to another page or storing the selection
        alert(`Personality Type ${selectedType} selected!`);
        updateQuiz(23,32,12,45,7);
    };

    return (
        <div className="flex flex-col gap-6 items-center min-h-screen mt-0 pb-20 pt-20">
            <h1 className="text-center font-bold font-inter text-5xl mb-10">
                Select a personality type
            </h1>
            <p className="text-center text-2xl mb-4">
                If you already know your personality type, select it below.
            </p>
            <form className="flex flex-col items-center z-30" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <select 
                    value={selectedType}
                    onChange={handleSelection}
                    className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                >
                    <option value="" disabled>Select your personality type</option>
                    {personalityTypes.map(type => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className={`mt-4 px-8 py-3 font-bold rounded transition duration-300 ${
                        selectedType ? 'black_btn z-50' : 'bg-gray-300 rounded-full cursor-not-allowed'
                    }`}
                    disabled={!selectedType}
                >
                    <Link href={'/match'}>
                        <h1 className="text-xl font-bold">
                            Continue
                        </h1>
                    </Link>
                </button>
            </form>
        </div>
    );
}


