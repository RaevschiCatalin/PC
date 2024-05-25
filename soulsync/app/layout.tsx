import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import {AuthProvider} from "../components/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoulSync",
  description: "SoulSync™ is a platform for people to find their soulmates.",
  icons: "/assets/icons/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>

    <div className='gradient'></div>
    <main>
        <Nav/>

        {children}

        <Footer/>
    </main>
    </body>
    </html>
  );
}
