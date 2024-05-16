import Image from "next/image";
import Footer from "../components/Footer";
import Link from "next/link";
import WelcomeHeader from "../components/WelcomeHeader";

export default function Home() {
  return (
      <main className="flex flex-col items-center justify-start min-h-screen ">
        <div className="w-4/5 md:w-3/4 h-2 mt-12 pb-2 mb-6">
          <WelcomeHeader/>
        </div>
      </main>
  );
}
