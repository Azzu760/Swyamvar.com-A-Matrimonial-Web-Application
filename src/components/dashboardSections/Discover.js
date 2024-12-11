"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchRecommendedProfiles,
  updateConnectionStatus,
} from "../../utils/apiService";
import { FaCheckCircle } from "react-icons/fa";

function Discover({ userId }) {
  const router = useRouter();
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState({});

  // Fetch profiles and their connection statuses
  useEffect(() => {
    if (!userId) return;

    const loadProfiles = async () => {
      try {
        setIsLoading(true);

        // Fetch profiles from the backend, including their current connection status
        const data = await fetchRecommendedProfiles(userId);

        // Ensure profiles include connection status at the time of reload
        setProfiles(data);
      } catch (err) {
        console.error(err);
        setError(
          "Failed to load recommended profiles. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadProfiles();
  }, [userId]);

  // Handle connection button
  const handleConnect = async (profileId) => {
    if (processing[profileId]) return;

    const currentStatus = profiles.find(
      (profile) => profile.id === profileId
    )?.connectionStatus;

    // Calculate the next status based on the current one
    const nextStatus =
      {
        connect: "pending",
        accepted: "declined",
      }[currentStatus] || currentStatus;

    try {
      setProcessing((prev) => ({ ...prev, [profileId]: true }));

      // Update connection status in the backend
      const updatedStatus = await updateConnectionStatus(
        userId,
        profileId,
        nextStatus
      );

      // Update profiles with the new status after successful update
      setProfiles((prev) =>
        prev.map((profile) =>
          profile.id === profileId
            ? { ...profile, connectionStatus: updatedStatus.status }
            : profile
        )
      );
    } catch (err) {
      console.error("Error updating connection:", err);
      setError("Failed to update connection. Please try again.");
    } finally {
      setProcessing((prev) => ({ ...prev, [profileId]: false }));
    }
  };

  const handleViewProfile = (profileId) => {
    router.push(`/profile/${profileId}?userId=${userId}`);
  };

  return (
    <div className="flex flex-wrap gap-6 p-4 justify-center">
      {isLoading ? (
        <p className="text-gray-400">Loading recommended profiles...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : profiles.length > 0 ? (
        profiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => handleViewProfile(profile.id)}
            className="bg-dark-gray rounded-lg shadow-md p-4 w-72 text-left flex flex-col items-start cursor-pointer transition transform hover:scale-105 hover:bg-dark-gray-hover hover:shadow-lg"
            aria-label={`View profile of ${profile.name}`}
          >
            <img
              src={profile.profilePicture || "/user/user1.jpg"}
              alt={profile.name}
              className="w-full h-40 rounded-t-lg object-cover mb-4"
            />
            <div className="flex justify-between w-full items-center mb-2">
              <h2 className="text-xl font-semibold flex items-center justify-center">
                {profile.name}
                {profile.isVerified && (
                  <span className="ml-2 text-blue-500 font-bold">
                    <FaCheckCircle />
                  </span>
                )}
              </h2>
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleConnect(profile.id);
              }}
              disabled={processing[profile.id]}
              className={`mt-4 bg-transparent border-2 rounded-lg py-2 px-4 w-full transition ${
                profile.connectionStatus === "connect"
                  ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  : profile.connectionStatus === "pending"
                  ? "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                  : profile.connectionStatus === "declined"
                  ? "border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
                  : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              }`}
            >
              {profile.connectionStatus === "connect"
                ? "Connect"
                : profile.connectionStatus === "pending"
                ? "Pending"
                : profile.connectionStatus === "declined"
                ? "Declined"
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
