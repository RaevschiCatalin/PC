"use client";
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../database/firebase';
import { useRouter } from 'next/navigation';
import { sendEmailVerification } from 'firebase/auth';

export default function VerifyEmail() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        if (user) {
            if (user.emailVerified) {
                router.push('/completeProfile');
            }
        }
    }, [user, router]);

    const resendVerificationEmail = async () => {
        if (user) {
            await sendEmailVerification(user);
            setEmailSent(true);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Verify Your Email</h1>
                <p className="mb-4">A verification email has been sent to {user?.email}. Please verify your email to continue.</p>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    onClick={resendVerificationEmail}
                    disabled={emailSent}
                >
                    {emailSent ? 'Verification Email Sent' : 'Resend Verification Email'}
                </button>
            </div>
        </div>
    );
}
