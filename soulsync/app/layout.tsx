import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoulSync",
  description: "SoulSync™ is a platform for people to find their soulmates.",
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
    <main className='app'>
        <Nav/>
        {children}
        <Footer/>
    </main>
    </body>
    </html>
  );
}
