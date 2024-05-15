import Image from "next/image";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p className="text-red-700">Hello World!</p>
      <Link href={'/register'}>Register</Link>
      <Link href={'/login'}>Login</Link>
      <Link href={'/forgotPassword'}>Forgot Password</Link>
    </div>
  );
}
