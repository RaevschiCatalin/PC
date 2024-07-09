import TestReport from "../../components/TestReport";

export default function ReportPage() {

    return (
        <div className="flex flex-col gap-6 justify-center items-center min-h-screen mt-0 px-20">

            <div className="flex flex-col gap-4 items-center">
                <TestReport />
            </div>
        </div>
    );
}
