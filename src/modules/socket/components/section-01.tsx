"use client";

import { WebsocketContext } from "@/contexts/WebsocketContext";
import React, { useContext, useEffect, useState } from "react";

type MessagePayload = {
  message: string;
  data: {
    senderid: number;
    receiverid: number;
    message: string;
    timestamp: string;
  };
};

const Section01 = () => {
  const socket = useContext(WebsocketContext);
  const [value, setValue] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [conversationId] = useState(987); // Conversation ID
  const [senderId] = useState(516); // Random 3-digit number
  const [receiverId] = useState(517); // Random 3-digit number

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected!");
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Disconnected!");
      setIsConnected(false);
    };

    const handleNewMessage = (data: MessagePayload) => {
      console.log(`onNewMessageChat-${conversationId} RECEIVED`);
      console.log(data);
      setMessages((prev) => [...prev, data]);
    };

    // Set initial connection state
    setIsConnected(socket.connected);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on(`onNewMessageChat-${conversationId}`, handleNewMessage);

    return () => {
      console.log("Unregistered Events!");
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off(`onNewMessageChat-${conversationId}`, handleNewMessage);
    };
  }, [socket, senderId]);

  const handleSendMessage = () => {
    if (!value.trim()) return;
    socket.emit("newMessageChat", {
      conversationid: conversationId,
      senderid: senderId,
      receiverid: receiverId,
      message: value,
    });
    setValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto py-5 lg:py-10 px-5 lg:px-0">
      {/* Socket Chat Box */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-white">Socket Chat Box</h2>
              <div className="bg-white/20 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-white">
                  User ID: {senderId}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isConnected ? "bg-green-400" : "bg-red-400"
                } animate-pulse`}
              ></div>
              <span
                className={`text-sm font-medium ${
                  isConnected ? "text-green-100" : "text-red-100"
                }`}
              >
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-80 overflow-y-auto bg-gray-50 p-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium">No messages yet</p>
                <p className="text-sm">Start a conversation!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    item.data.senderid === senderId
                      ? "bg-green-200"
                      : "bg-red-200"
                  } rounded-lg p-4 shadow-sm border border-gray-100`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                        {JSON.stringify(item, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex space-x-3">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              disabled={!isConnected}
            />
            <button
              onClick={handleSendMessage}
              disabled={!isConnected || !value.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Socket Update Schedule Data */}
      <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white">
            Socket Update Schedule Data
          </h3>
        </div>
        <div className="p-6">
          <div className="text-center text-gray-600">
            <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-lg font-medium mb-2">
              Real-time Schedule Updates
            </p>
            <p className="text-sm">
              This section can be used for real-time schedule updates and
              notifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section01;
