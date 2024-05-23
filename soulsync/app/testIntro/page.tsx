import Link from "next/link";

export default function TestIntro() {
    return(
        <div className="flex flex-col items-center min-h-screen mt-20 px-10">
            <h1 className="text-center text-5xl mb-10">
                Almost there! Just a few more questions to go.
            </h1>
            <p className="text-center text-2xl mb-4">
                The following test will help you understand your personality better and match with other people.
            </p>
            <p className="text-center text-2xl mb-10">
                Take your time, don&apos;t rush the questions! The answers range from 1 to 5, with 1 being &quot;Strongly Disagree&quot; and 5 being &quot;Strongly Agree&quot;.
            </p>
            <button className="black_btn z-50">
                <Link href={'/personalityTest'} className="text-3xl">
                    Start Test
                </Link>
            </button>
        </div>
    );
}