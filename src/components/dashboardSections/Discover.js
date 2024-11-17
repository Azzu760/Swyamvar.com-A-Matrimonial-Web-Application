"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Discover({ userId }) {
  const router = useRouter();
  const [recommendedProfiles, setRecommendedProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState({});

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const response = await fetch("/api/user/recommendations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": userId,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const profiles = await response.json();
        setRecommendedProfiles(profiles);

        // Initialize the connection status for each profile
        const initialStatus = {};
        profiles.forEach((profile) => {
          initialStatus[profile.id] = "connect"; // Default state is "connect"
        });
        setConnectionStatus(initialStatus);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (userId) fetchProfiles();
  }, [userId]);

  // Function to handle the connection button click
  const handleConnect = async (profileId) => {
    const currentStatus = connectionStatus[profileId];

    if (currentStatus === "connect") {
      // Update status to "pending" on click
      setConnectionStatus((prevStatus) => ({
        ...prevStatus,
        [profileId]: "pending",
      }));

      // Send request to update both users' connection status in the database
      try {
        const response = await fetch("/api/user/connect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            profileId: profileId,
            status: "pending", // Set the status to "pending" for both users
          }),
        });

        if (response.ok) {
          setConnectionStatus((prevStatus) => ({
            ...prevStatus,
            [profileId]: "pending", // Ensure the status is updated
          }));
        } else {
          throw new Error("Error updating connection status");
        }
      } catch (error) {
        console.error("Error connecting:", error);
      }
    }

    if (currentStatus === "pending") {
      // If it's in pending state, update both users to "accepted"
      setConnectionStatus((prevStatus) => ({
        ...prevStatus,
        [profileId]: "accepted",
      }));

      try {
        const response = await fetch("/api/user/connect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            profileId: profileId,
            status: "accepted", // Set the status to "accepted" for both users
          }),
        });

        if (!response.ok) {
          throw new Error("Error finalizing connection");
        }
      } catch (error) {
        console.error("Error finalizing connection:", error);
      }
    }

    // Add handling for declining the connection if needed
    if (currentStatus === "accepted") {
      // In case you need to handle a decline option (e.g. undoing the connection)
      setConnectionStatus((prevStatus) => ({
        ...prevStatus,
        [profileId]: "declined", // You can add this step if you want to allow a decline functionality
      }));
      try {
        const response = await fetch("/api/user/connect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            profileId: profileId,
            status: "declined", // Change the status to "declined" if needed
          }),
        });

        if (!response.ok) {
          throw new Error("Error declining connection");
        }
      } catch (error) {
        console.error("Error declining connection:", error);
      }
    }
  };

  // Function to handle profile view
  const handleViewProfile = (profileId) => router.push(`/profile/${profileId}`);

  return (
    <div className="flex flex-wrap gap-6 p-4 justify-center">
      {isLoading ? (
        <p className="text-gray-400">Loading recommended profiles...</p>
      ) : recommendedProfiles.length > 0 ? (
        recommendedProfiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => handleViewProfile(profile.id)}
            className="bg-dark-gray rounded-lg shadow-md p-4 w-72 text-left flex flex-col items-start cursor-pointer transition transform hover:scale-105 hover:bg-dark-gray-hover hover:shadow-lg"
          >
            <img
              src={profile.profilePicture || "/user/user1.jpg"}
              alt={profile.name}
              loading="lazy"
              className="w-full h-40 rounded-t-lg object-cover mb-4"
            />
            <div className="flex justify-between w-full items-center mb-2">
              <h2 className="text-xl font-semibold">{profile.name}</h2>
            </div>
            <p className="text-gray-400">{profile.age} years old</p>
            <p className="text-gray-400">
              Marital Status: {profile.maritalStatus}
            </p>
            <p className="text-gray-200 my-3">{profile.bio}</p>
            <span className="text-gray-400">
              Compatibility Score:{" "}
              <strong>{profile.compatibilityScore}%</strong>
            </span>

            {/* Connect Button with dynamic state */}
            <button
              onClick={() => handleConnect(profile.id)}
              className={`mt-4 bg-transparent border-2 rounded-lg py-2 px-4 w-full transition ${
                connectionStatus[profile.id] === "connect"
                  ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  : connectionStatus[profile.id] === "pending"
                  ? "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                  : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              }`}
            >
              {connectionStatus[profile.id] === "connect"
                ? "Connect"
                : connectionStatus[profile.id] === "pending"
                ? "Pending"
                : "Connected"}
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No compatible profiles found.</p>
      )}
    </div>
  );
}

export default Discover;
