import Image from "next/image";
import Navbar from "components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-red-700">Hello World!</p>
      <Link href={'/Register'}>Register</Link>
    </main>
  );
}
