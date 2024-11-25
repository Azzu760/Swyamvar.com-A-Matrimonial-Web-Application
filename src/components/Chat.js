import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import io from "socket.io-client";

function Chat({ user, currentUserId }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://localhost:3000", { path: "/socket.io" });
    }

    socket.current.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.current.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (messageInput.trim() === "") return;

    const newMessage = {
      senderId: currentUserId,
      receiverId: user.id,
      message: messageInput,
    };

    socket.current.emit("sendMessage", newMessage);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const { newMessage: sentMessage, allMessages } = await res.json();
      setMessages(allMessages);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessageInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 bg-dark-gray flex items-center">
        <img
          src={user.profilePicture || "/default-avatar.png"}
          alt={`${user.fullname}'s avatar`}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="text-xl font-semibold">{user.fullname}</p>
          <p
            className={`text-sm ${
              user.online ? "text-green-500" : "text-gray-500"
            }`}
          >
            {user.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Scrollable Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 bg-black scrollbar-hidden">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === currentUserId ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                msg.senderId === currentUserId
                  ? "bg-blue-500 text-white"
                  : "bg-blue-700 text-white"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-4 bg-dark-gray flex items-center">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="w-full p-3 text-white bg-transparent border border-gray-500 rounded-md"
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 p-2 bg-red-500 text-white rounded-full"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default Chat;
