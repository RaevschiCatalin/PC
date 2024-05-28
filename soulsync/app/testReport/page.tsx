import Link from "next/link";

export default function TestReport(){
    return (
        <div className="flex flex-col gap-6 justify-center align-middle items-center min-h-screen mt-0 px-20">
            <button className="black_btn z-50">
                <Link href={'/match'} className="text-3xl">
                    <h1 className="text-3xl font-bold">
                        Continue
                    </h1>
                </Link>
            </button>
        </div>
    );
}