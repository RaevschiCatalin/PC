"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Navbar, Button } from "flowbite-react";

export default function Nav() {
    return (
      <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="/">
        <img src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SoulSync</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/">
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="/about">
          About
        </Navbar.Link>
        <Navbar.Link href="/login">Login</Navbar.Link>
        <Navbar.Link href="/register">Register</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    );
}