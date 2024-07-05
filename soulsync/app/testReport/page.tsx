"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { personalityDescription } from "../../backend";
import Loading from "../../components/Loading";

export default function TestReport() {
    const [testResults, setTestResults] = useState(null);

    useEffect(() => {
        async function fetchTestResults() {
            const results = await personalityDescription();
            // @ts-ignore
            setTestResults(results);
        }
        fetchTestResults();
    }, []);

    return (
        <div className="flex flex-col gap-6 justify-center items-center min-h-screen mt-0 px-20">
            <h1 className="text-4xl font-bold mb-4">
                Here&apos;s a summary of your test results
            </h1>
            <div className="flex flex-col gap-4 items-center">
                {testResults ? (
                    <div className="text-center mb-4">
                        <p><strong>Extroversion:</strong> {testResults.E}</p>
                        <p><strong>Agreeableness:</strong> {testResults.A}</p>
                        <p><strong>Conscientiousness:</strong> {testResults.C}</p>
                        <p><strong>Neuroticism:</strong> {testResults.N}</p>
                        <p><strong>Openness to Experience:</strong> {testResults.O}</p>
                    </div>
                ) : (
                    <div className="mb-4">
                        <Loading />
                    </div>
                )}
                <button className="black_btn z-50">
                    <Link href={'/match'} className="text-3xl">
                        <h1 className="text-3xl font-bold">
                            Continue
                        </h1>
                    </Link>
                </button>
            </div>
        </div>
    );
}
