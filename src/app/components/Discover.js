import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";

function Discover() {
  const router = useRouter();
  const profilesData = [
    {
      id: 1,
      image: "/user/user1.jpg",
      name: "John Doe",
      age: 28,
      maritalStatus: "Single",
      bio: "Loves hiking and exploring new places.",
      compatibilityScore: 85,
      matches: 12,
    },
    {
      id: 2,
      image: "/user/user2.jpg",
      name: "Jane Smith",
      age: 32,
      maritalStatus: "Divorced",
      bio: "Passionate about cooking and traveling.",
      compatibilityScore: 78,
      matches: 8,
    },
    {
      id: 3,
      image: "/user/user1.jpg",
      name: "Emily Johnson",
      age: 30,
      maritalStatus: "Single",
      bio: "Avid reader and aspiring chef.",
      compatibilityScore: 92,
      matches: 15,
    },
    {
      id: 4,
      image: "/user/user2.jpg",
      name: "Chris Evans",
      age: 35,
      maritalStatus: "Single",
      bio: "Adventure seeker and fitness enthusiast.",
      compatibilityScore: 80,
      matches: 20,
    },
    {
      id: 5,
      image: "/user/user1.jpg",
      name: "Sarah Connor",
      age: 29,
      maritalStatus: "Widowed",
      bio: "Tech geek with a love for sci-fi.",
      compatibilityScore: 88,
      matches: 9,
    },
    {
      id: 6,
      image: "/user/user2.jpg",
      name: "Alice Wong",
      age: 26,
      maritalStatus: "Single",
      bio: "Photographer with a passion for nature.",
      compatibilityScore: 91,
      matches: 14,
    },
    {
      id: 7,
      image: "/user/user1.jpg",
      name: "Tom Hardy",
      age: 40,
      maritalStatus: "Divorced",
      bio: "Film buff who enjoys cooking.",
      compatibilityScore: 83,
      matches: 10,
    },
    {
      id: 8,
      image: "/user/user2.jpg",
      name: "Emma Stone",
      age: 31,
      maritalStatus: "Single",
      bio: "Cat lover and a bibliophile.",
      compatibilityScore: 89,
      matches: 18,
    },
  ];

  // Initialize each profile with a default "not connected" status
  const [profiles, setProfiles] = useState(
    profilesData.map((profile) => ({
      ...profile,
      connectionStatus: "not_connected",
    }))
  );

  const handleViewProfile = (profileId) => {
    router.push(`/profile/${profileId}`);
  };

  const handleConnect = (profileId) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === profileId
          ? { ...profile, connectionStatus: "pending" }
          : profile
      )
    );
  };

  const handleAcceptConnection = (profileId) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === profileId
          ? { ...profile, connectionStatus: "connected" }
          : profile
      )
    );
  };

  return (
    <div className="flex flex-wrap gap-6 p-4 justify-center">
      {profiles.map((profile) => (
        <div
          key={profile.id}
          className="bg-dark-gray rounded-lg shadow-md p-4 w-80 text-left flex flex-col items-start"
        >
          <img
            src={profile.image}
            alt={profile.name}
            loading="lazy"
            className="w-full h-48 rounded-t-lg object-cover mb-4"
          />
          <div className="flex justify-between w-full items-center mb-2">
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <button
              onClick={() => handleViewProfile(profile.id)}
              className="text-gray-400 p-2 hover:text-white transition"
              aria-label={`View ${profile.name}'s profile`}
            >
              <FaEye />
            </button>
          </div>
          <p className="text-gray-400">{profile.age} years old</p>
          <p className="text-gray-400">
            Marital Status: {profile.maritalStatus}
          </p>
          <p className="text-gray-200 my-3">{profile.bio}</p>
          <div className="flex flex-col items-start mb-4">
            <span className="text-gray-400">
              Compatibility Score:{" "}
              <strong>{profile.compatibilityScore}%</strong>
            </span>
            <span className="text-gray-400">
              Matches: <strong>{profile.matches}</strong>
            </span>
          </div>
          {profile.connectionStatus === "not_connected" && (
            <button
              onClick={() => handleConnect(profile.id)}
              className="w-full border-2 border-red-500 text-gray-400 px-4 py-2 rounded-none hover:bg-red-500 hover:text-white transition mb-2"
            >
              Connect
            </button>
          )}
          {profile.connectionStatus === "pending" && (
            <button
              onClick={() => handleAcceptConnection(profile.id)}
              className="w-full border-2 border-yellow-500 text-yellow-400 px-4 py-2 rounded-none hover:bg-yellow-500 hover:text-white transition mb-2"
            >
              Pending
            </button>
          )}
          {profile.connectionStatus === "connected" && (
            <button
              className="w-full border-2 border-green-500 text-green-400 px-4 py-2 rounded-none cursor-default"
              disabled
            >
              Connected
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Discover;
