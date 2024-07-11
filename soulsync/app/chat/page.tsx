//@ts-nocheck
"use client";

import React, { useEffect, useState } from 'react';
import { getChatList, sendMessage, getMessages, getUserNameByChatID, getSenderName,deleteChat } from "backend/chat";

export default function Chat() {
    const [chatList, setChatList] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        async function fetchChatList() {
            const chatIDs = await getChatList();
            const chatUsernames = await Promise.all(chatIDs.map(async (chatID) => {
                const chatName = await getUserNameByChatID(chatID);
                return { chatID, chatName };
            }));
            setChatList(chatUsernames);
        }
        fetchChatList();
    }, []);

    useEffect(() => {
        async function fetchMessages() {
            if (selectedChat) {
                const chatMessages = await getMessages(selectedChat);
                console.log("Fetched messages:", chatMessages);

                let messagesArray = chatMessages;

                if (!Array.isArray(chatMessages)) {
                    messagesArray = Object.entries(chatMessages).map(([key, message]) => ({ key, ...message }));
                }

                const messagesWithSenderNames = await Promise.all(
                    messagesArray.map(async (message) => {
                        const senderName = await getSenderName(message.sender);
                        return { ...message, senderName };
                    })
                );
                setMessages(messagesWithSenderNames);
            }
        }
        fetchMessages();
    }, [selectedChat]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        await sendMessage(newMessage, selectedChat);
        setNewMessage('');
        const updatedMessages = await getMessages(selectedChat);

        let messagesArray = updatedMessages;

        if (!Array.isArray(updatedMessages)) {
            messagesArray = Object.entries(updatedMessages).map(([key, message]) => ({ key, ...message }));
        }

        const messagesWithSenderNames = await Promise.all(
            messagesArray.map(async (message) => {
                const senderName = await getSenderName(message.sender);
                return { ...message, senderName };
            })
        );
        setMessages(messagesWithSenderNames);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleDeleteChat = async () => {
        await deleteChat(selectedChat);
        setSelectedChat(null);
        setMessages([]);
    };

    return (
        <div className="flex flex-col pt-20 pb-20 items-center h-screen bg-white">
            <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-2xl">
                <div className="w-1/4 bg-white border-r border-gray-200 rounded-l-2xl">
                    <div className="py-4 px-2">
                        <h3 className="text-lg font-semibold text-rose-500 mb-2">Matches</h3>
                        <ul className="space-y-2">
                            {chatList.map(({ chatID, chatName }) => (
                                <li
                                    key={chatID}
                                    className="p-2 hover:bg-blue-50 cursor-pointer"
                                    onClick={() => setSelectedChat(chatID)}
                                >
                                    {chatName}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex-1 p-6 flex flex-col">
                    {selectedChat && (
                        <>
                            <button className="self-end mb-4 p-2 bg-red-500 text-white rounded-lg" onClick={handleDeleteChat}>
                                Delete Chat
                            </button>
                            <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-100 rounded-r-2xl max-h-80">
                                {messages.length > 0 ? (
                                    messages.map(({ key, message, senderName, timestamp }) => (
                                        <p key={key} className="text-gray-800 text-sm">
                                            <strong>{senderName}:</strong> {message} <br />
                                            <small>{new Date(timestamp).toLocaleString()}</small>
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-800 text-sm">No messages yet.</p>
                                )}
                            </div>
                            <div className="mt-auto">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <button className="black_btn z-50 ml-3" onClick={handleSendMessage}>
                                        Send
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                    {!selectedChat && (
                        <div className="flex-1 flex items-center justify-center">
                            <p className="text-gray-800 text-sm">Select a chat to start messaging.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
