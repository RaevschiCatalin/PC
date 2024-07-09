//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "./Loading";
import getProfileId, { getPersonalityResults } from "../backend";

export default function TestReport() {
    const [results, setResults] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            const results = await getPersonalityResults();
            // @ts-ignore
            setResults(results);
        };

        fetchResults();
    }, []);

    const currentProfile = getProfileId();

    return (
        <div className="flex flex-col min-w-96 gap-6 justify-center items-center min-h-screen mt-0 px-20">
            <h1 className="text-4xl font-bold mb-8">Here&apos;s a summary of your test results</h1>
            <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full text-center">
                {results ? (
                    <>
                        <p className="text-lg mb-4 "><b className="blue_gradient">Extroversion:</b> {results.E}</p>
                        <p className="text-lg mb-4"><b className="blue_gradient">Agreeableness:</b> {results.A}</p>
                        <p className="text-lg mb-4"><b className="blue_gradient">Conscientiousness:</b> {results.C}</p>
                        <p className="text-lg mb-4"><b className="blue_gradient">Neuroticism:</b> {results.N}</p>
                        <p className="text-lg mb-4"><b className="blue_gradient">Openness to Experience:</b> {results.O}</p>
                    </>
                ) : (
                    <Loading />
                )}
                <div className="flex justify-center mt-6">
                    <button className="black_btn">
                        <Link href={'/match'} className="text-3xl">
                            <h1 className="text-3xl font-bold">Continue</h1>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
