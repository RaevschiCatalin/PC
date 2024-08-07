'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { Navbar, Button } from "flowbite-react";
import { auth } from '../database/firebase';
import { onAuthStateChanged } from "firebase/auth";
import logo from 'public/assets/icons/logo1.svg'

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
        window.location.href = '/';
    }
    return (
        <Navbar fluid rounded>
            <Navbar.Brand as={Link} href="/" >
                <Image src={logo} className="mr-3 h-8 sm:h-9" alt="Logo" width={50} height={50} />
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white gap-1"><span className="logo_gradinet">Soul</span>Sync</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Link href="/match" className="px-3 py-2 rounded-lg text-lg  font-bold  text-gray-900 hover:underline hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
                    Match
                </Link>
                <Link href="/chat" className="px-3 py-2 rounded-lg text-lg font-bold text-gray-900 hover:underline  hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
                    Chat
                </Link>
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/profile">
                            <Image
                                src="/assets/icons/user.png"
                                width={37}
                                height={37}
                                alt="user"
                                className="rounded-full border-2 border-gray-700 mt-2 mr-2"
                            />
                        </Link>
                        <button type="button" className="black_btn mt-1" onClick={handleSignOut}>Logout</button>
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
