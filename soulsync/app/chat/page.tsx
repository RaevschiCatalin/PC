
export default function Chat() {
    return (
        <div className="flex flex-col pt-20 pb-20 items-center h-screen bg-white">
            <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-2xl">
                {/* User list */}
                <div className="w-1/4 bg-white border-r border-gray-200 rounded-l-2xl">
                    <div className="py-4 px-2">
                        <h3 className="text-lg font-semibold text-rose-500 mb-2">Matches</h3>
                        <ul className="space-y-2">
                            <li className="p-2 hover:bg-blue-50 cursor-pointer">User 1</li>
                            <li className="p-2 hover:bg-blue-50 cursor-pointer">User 2</li>
                            <li className="p-2 hover:bg-blue-50 cursor-pointer">User 3</li>
                            {/* Add more users as needed */}
                        </ul>
                    </div>
                </div>

                {/* Chat area */}
                <div className="flex-1 p-6">
                    <div className="flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-100 rounded-r-2xl">
                            <p className="text-gray-800 text-sm">
                                Say something or use an icebreaker phrase!
                            </p>
                            {/* Messages will be dynamically inserted here */}
                        </div>
                        <div className="mt-auto">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <button className="black_btn z-50 ml-3">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

