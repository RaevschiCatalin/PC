'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { Navbar, Button } from "flowbite-react";
import { auth } from '../database/firebase';
import { onAuthStateChanged } from "firebase/auth";

export default function Nav() {
    const [isUserLoggedIn, setIsLogged] = useState(false);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLogged(!!user);
        });
        return () => unsubscribe();
    }, []);
    const handleSignOut = () => {
        signOut(auth)
            .catch(err => alert(err))
    }
    return (
        <Navbar fluid rounded>
            <Navbar.Brand as={Link} href="/" >
                <img src="/assets/icons/logo.svg" className="mr-3 h-8 sm:h-9" alt="Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white gap-1"><span className="logo_gradinet">Soul</span>Sync</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>

                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/profile">
                            <Image
                                src="/assets/icons/user.png"
                                width={32}
                                height={32}
                                alt="user"
                                className="rounded-full border-2 border-gray-700"
                            />
                        </Link>
                        <button type="button" className="black_btn" onClick={handleSignOut}>Logout</button>
                    </div>
                ) : (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/login" className="outline_btn">Login</Link>
                        <Link href='/register' className="black_btn">Register</Link>
                    </div>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}
