import Link from "next/link";

export default function TestIntro() {
    return(
        <div className="flex flex-col gap-6 justify-center align-middle items-center min-h-screen mt-0 px-20">
            <h1 className="text-center font-bold font-inter text-5xl mb-10">
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
                    <h1 className="text-3xl font-bold">
                    Start Test
                    </h1>
                </Link>
            </button>
            <p className="text-sm">
                Already know your personality type?  
                <Link href={'/selectPersonality'} className="pl-1 hover:underline">
                    Click here to skip the test.
                </Link>
            </p>
        </div>
    );
}