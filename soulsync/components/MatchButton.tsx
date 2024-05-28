"use client";
import { auth } from "../database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import getCurrentUser from "../backend";


function DisplayLogButton() {
    const [isUserLoggedIn, setIsLogged] = useState(!!auth.name);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }
        });
    });

    return (
        <div>
            {isUserLoggedIn ? (
                <div className="flex gap-3 self-center align-middle md:gap-5">
                    <Link href="/match" className="black_btn font-extrabold  h-20 w-72 ">
                        <h1 className="text-2xl">
                            Match with people
                        </h1>
                    </Link>
                </div>
            ) : (
                <div className="flex align-baseline self-center gap-3 md:gap-5">
                    <Link href="/register">
                        <button className="black_btn h-20 w-72">
                            <h1 className="text-4xl font-extrabold">Join Us</h1>
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default DisplayLogButton;