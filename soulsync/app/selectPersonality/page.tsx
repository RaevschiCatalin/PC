'use client';
import Link from "next/link";
import { useState, ChangeEvent } from 'react';
import { updateQuiz } from "../../backend";
import { useRouter } from "next/navigation";

export default function SelectPersonality() {
    const router = useRouter();
    const [selectedType, setSelectedType] = useState('');
    const personalityTypes = [
        "INTJ", "INTP", "ENTJ", "ENTP",
        "INFJ", "INFP", "ENFJ", "ENFP",
        "ISTJ", "ISFJ", "ESTJ", "ESFJ",
        "ISTP", "ISFP", "ESTP", "ESFP"
    ];

    const personalityTypeScores: { [key: string]: number[] } = {
        "INTJ": [15, 12, 18, 35, 30],
        "INTP": [10, 10, 15, 25, 40],
        "ENTJ": [30, 14, 28, 20, 22],
        "ENTP": [28, 16, 24, 18, 30],
        "INFJ": [12, 20, 14, 32, 28],
        "INFP": [8, 18, 12, 30, 35],
        "ENFJ": [25, 22, 20, 15, 25],
        "ENFP": [20, 18, 18, 20, 30],
        "ISTJ": [18, 10, 28, 35, 12],
        "ISFJ": [16, 18, 20, 38, 15],
        "ESTJ": [35, 14, 32, 22, 10],
        "ESFJ": [30, 20, 26, 25, 18],
        "ISTP": [20, 12, 18, 30, 14],
        "ISFP": [18, 14, 16, 32, 20],
        "ESTP": [35, 18, 24, 20, 18],
        "ESFP": [30, 20, 22, 25, 22],
    };

    const handleSelection = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
    };

    const handleSubmit = () => {
        if (selectedType) {
            const [E, A, C, N, O] = personalityTypeScores[selectedType];
            updateQuiz(E, A, C, N, O);
            alert('Personality type selected successfully!');
            router.push('/testReport');
        }
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
                    className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
                    <h1 className="text-xl font-bold">
                        Continue
                    </h1>
                </button>
            </form>
        </div>
    );
}
