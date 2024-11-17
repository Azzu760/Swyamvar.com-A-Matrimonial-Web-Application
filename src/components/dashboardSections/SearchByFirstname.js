"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaTimes } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner"; // Import the spinner

const SearchByFirstname = ({ userId }) => {
  const [firstName, setFirstName] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  useEffect(() => {
    if (firstName) {
      const fetchProfiles = async () => {
        setIsLoading(true); // Start loading

        try {
          const response = await fetch(`/api/user/search?userId=${userId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstName, userId }),
          });

          if (response.ok) {
            const data = await response.json();
            setFilteredProfiles(data);
          } else {
            console.error("Failed to fetch profiles");
          }
        } catch (error) {
          console.error("Error fetching profiles:", error);
        } finally {
          setIsLoading(false); // Stop loading
        }
      };

      fetchProfiles();
    } else {
      setFilteredProfiles([]);
    }
  }, [firstName, userId]);

  const handleProfileClick = (profileId) => {
    router.push(`/profile/${profileId}?userId=${userId}`);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center mb-4 relative">
        <input
          type="text"
          placeholder="Search by Firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="p-2 outline-none text-gray-400 bg-dark-gray rounded w-full pl-10 transition-colors duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500"
        />
        <FaSearch className="absolute left-3 text-gray-500" />
        {firstName && (
          <FaTimes
            className="absolute right-3 text-gray-500 cursor-pointer"
            onClick={() => setFirstName("")}
          />
        )}
      </div>

      {isLoading ? (
        <LoadingSpinner /> // Show spinner while loading
      ) : firstName && filteredProfiles.length > 0 ? (
        filteredProfiles.map((profile) => (
          <div
            key={profile.userId}
            className="flex items-center p-3 bg-dark-gray mb-1 rounded shadow"
          >
            <img
              src={profile.profilePicture || "/default-profile-pic.jpg"}
              alt={profile.name}
              className="w-16 h-16 rounded-full mr-4 cursor-pointer"
              onClick={() => handleProfileClick(profile.userId)}
            />
            <div className="flex flex-col flex-grow">
              <div className="flex items-center">
                <span className="font-semibold">{profile.name}</span>
                <span className="bg-red-700 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                  {profile.maritalStatus}
                </span>
              </div>
              <span>{profile.age} years old</span>
            </div>
            <div className="ml-auto">
              {profile.isVerified ? (
                <span className="text-green-500">Verified</span>
              ) : (
                <span className="text-gray-500">Not Verified</span>
              )}
            </div>
          </div>
        ))
      ) : firstName ? (
        <div className="text-gray-500 text-center">
          No profiles matched your search.
        </div>
      ) : null}
    </div>
  );
};

export default SearchByFirstname;
