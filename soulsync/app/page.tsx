import WelcomeHeader from "../components/WelcomeHeader";
import MatchButton from "../components/MatchButton";
import Link from "next/link";


export default function Home() {
  return (
      <main className="flex flex-col items-center justify-start min-h-screen ">
        <div className="w-4/5 md:w-3/4 h-2 mt-12 pb-2 mb-6">
          <WelcomeHeader/>
        </div>
          <div className="mt-96 items-center">
              <MatchButton/>
          </div>
      </main>
  );
}
