import Image from "next/image";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-red-700">Hello World!</p>
      <Link href={'/register'}>Register</Link>
      <Link href={'/login'}>Login</Link>
      <Link href={'/forgot Password'}>Forgot Password</Link>
    </main>
  );
}
