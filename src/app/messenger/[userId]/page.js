"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import Chat from "../../../components/Chat";
import io from "socket.io-client";

let socket;

function MessengerPage({ params }) {
  const { userId } = params;
  const router = useRouter();

  const [connections, setConnections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user connections
    const fetchConnections = async () => {
      try {
        const response = await fetch(`/api/connections?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch connections");
        const data = await response.json();
        setConnections(data.connectedProfiles || []);
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();

    // Initialize socket
    socket = io("http://localhost:3000");
    socket.emit("userStatus", userId, true);

    return () => {
      socket.emit("userStatus", userId, false);
      socket.disconnect();
    };
  }, [userId]);

  const filteredConnections = connections.filter((connection) =>
    connection.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-700 h-full overflow-hidden">
        <nav className="bg-dark-gray py-6 px-4 flex items-center text-lg font-semibold">
          <button onClick={() => router.back()} className="p-2 mr-2">
            <FaArrowLeft className="text-white" />
          </button>
          <span className="flex-grow text-center">Swyamvar.com</span>
        </nav>

        <div className="p-4 h-full overflow-y-auto">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 bg-transparent border border-red-500 rounded-md placeholder-gray-400"
            />
            <FaSearch className="absolute top-4 left-4 text-red-500" />
          </div>

          {loading ? (
            <p>Loading connections...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredConnections.length === 0 ? (
            <p>No connections found.</p>
          ) : (
            <ul className="space-y-4">
              {filteredConnections.map((connection) => (
                <li
                  key={connection.id}
                  onClick={() => setSelectedUser(connection)}
                  className={`p-4 cursor-pointer bg-dark-gray rounded-lg flex items-center ${
                    selectedUser?.id === connection.id ? "bg-gray-950" : ""
                  }`}
                >
                  <img
                    src={connection.profilePicture || "/default-avatar.png"}
                    alt={`${connection.fullname}'s avatar`}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-lg font-semibold">
                      {connection.fullname}
                    </p>
                    <p className="text-sm text-gray-500">
                      {connection.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-2/3 h-full flex flex-col">
        {selectedUser ? (
          <Chat user={selectedUser} currentUserId={userId} socket={socket} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Select a user to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessengerPage;
