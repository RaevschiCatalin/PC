"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../../components/Loading";
import getProfileId, {getPersonalityResults} from "../../backend";

export default function TestReport() {
    const [results, setResults] = useState(null);
    const testResults = async () => {
        const results = await getPersonalityResults();
    }
    const currentProfile = getProfileId();

    return (
        <div className="flex flex-col gap-6 justify-center items-center min-h-screen mt-0 px-20">
            <h1 className="text-4xl font-bold mb-4">
                Here&apos;s a summary of your test results
            </h1>
            <div className="flex flex-col gap-4 items-center">
                 <Loading />
                {results}
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
