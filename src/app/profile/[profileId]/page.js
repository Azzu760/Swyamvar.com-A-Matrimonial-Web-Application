"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaArrowLeft,
  FaPhoneAlt,
  FaCheckCircle,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { updateConnectionStatus } from "../../../utils/apiService";

const UserSection = ({ title, details }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-items-between">
      {details.map(({ label, value, key }) => (
        <div key={key} className="w-full sm:w-auto">
          <label className="text-sm text-gray-400">{label}</label>
          <p className="text-gray-200">{value}</p>
        </div>
      ))}
    </div>
  </div>
);

const Profile = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { profileId } = params;
  const userId = searchParams.get("userId");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("not_connected");
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState({});

  useEffect(() => {
    if (profileId && userId) {
      setIsLoading(true);
      fetch(`/api/user/${profileId}?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setUser(data);
            setConnectionStatus(data.connectionStatus || "not_connected");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setError("An error occurred while fetching user data.");
          setIsLoading(false);
        });
    }
  }, [profileId, userId]);

  // Handle connection button
  const handleConnect = async (profileId) => {
    // Prevent concurrent processing for the same profile
    if (processing[profileId]) return;

    try {
      setProcessing((prev) => ({ ...prev, [profileId]: true }));

      // Determine the current connection status
      const profile = user.find((p) => p.id === profileId);
      const currentStatus = profile?.connectionStatus || "connect";

      // Calculate the next status
      const nextStatus =
        currentStatus === "connect"
          ? "pending"
          : currentStatus === "pending"
          ? "accepted"
          : currentStatus === "accepted"
          ? "declined"
          : "connect";

      // Optimistically update the profile in the UI
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === profileId ? { ...p, connectionStatus: nextStatus } : p
        )
      );

      // Update connection status in the backend
      const updatedStatus = await updateConnectionStatus(
        userId,
        profileId,
        nextStatus
      );

      // Ensure the UI reflects the server's response
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === profileId
            ? { ...p, connectionStatus: updatedStatus.status }
            : p
        )
      );
    } catch (err) {
      console.error(
        `Error updating connection for profileId: ${profileId}, nextStatus: ${nextStatus}`,
        err
      );
      setError("Failed to update connection. Please try again.");

      // Rollback the UI state in case of failure
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === profileId
            ? { ...p, connectionStatus: profile?.connectionStatus }
            : p
        )
      );
    } finally {
      setProcessing((prev) => ({ ...prev, [profileId]: false }));
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <p className="text-white text-2xl font-semibold flex space-x-1">
          <span>Loading</span>
          <span className="animate-bounce">.</span>
          <span className="animate-bounce delay-200">.</span>
          <span className="animate-bounce delay-400">.</span>
        </p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!user) {
    return <p className="text-white">User not found.</p>;
  }

  const sections = [
    {
      title: "Basic Details",
      details: [
        { label: "Gender", value: user.gender, key: "gender" },
        { label: "Age", value: user.age, key: "age" },
        {
          label: "Marital Status",
          value: user.maritalStatus,
          key: "maritalStatus",
        },
        {
          label: "Preferred Partner",
          value: user.preferredPartner,
          key: "preferredPartner",
        },
        { label: "Country", value: user.country, key: "country" },
        { label: "City", value: user.city, key: "city" },
      ],
    },
    {
      title: "Background Details",
      details: [
        { label: "Religion", value: user.religion, key: "religion" },
        { label: "Caste", value: user.caste, key: "caste" },
        { label: "Community", value: user.community, key: "community" },
        {
          label: "Mother Tongue",
          value: user.motherTongue,
          key: "motherTongue",
        },
        {
          label: "Education Level",
          value: user.educationLevel,
          key: "educationLevel",
        },
        {
          label: "Profession",
          value: user.profession,
          key: "profession",
        },
      ],
    },
    {
      title: "Physical Attributes",
      details: [
        { label: "Height", value: `${user.height} ft`, key: "height" },
        { label: "Weight", value: `${user.weight} Kg`, key: "weight" },
        { label: "Body Type", value: user.bodyType, key: "bodyType" },
        { label: "Complexion", value: user.complexion, key: "complexion" },
        { label: "Hair Color", value: user.hairColor, key: "hairColor" },
        { label: "Eye Color", value: user.eyeColor, key: "eyeColor" },
      ],
    },
    {
      title: "Additional Details",
      details: [
        { label: "Diet", value: user.diet, key: "diet" },
        {
          label: "Smoking Habits",
          value: user.smokingHabits,
          key: "smokingHabits",
        },
        {
          label: "Hobbies & Interests",
          value: user.hobbiesAndInterests,
          key: "hobbiesAndInterests",
        },
        {
          label: "Astrological Sign",
          value: user.astrologicalSign,
          key: "astrologicalSign",
        },
      ],
    },
  ];

  return (
    <div className="w-full mx-auto mt-16 text-white rounded-lg shadow-lg">
      <nav className="fixed top-0 left-0 w-full bg-dark-gray py-4 px-4 flex items-center text-white text-lg font-semibold z-10">
        <button
          onClick={handleBack}
          className="flex items-center justify-center p-2 mr-2"
        >
          <FaArrowLeft className="text-white" />
        </button>
        <span className="flex-grow text-center">{user.name}</span>
      </nav>

      <div className="flex flex-col mt-20 py-4 px-4 sm:flex-row sm:justify-between">
        <div className="w-full sm:w-1/3 bg-transparent">
          <div className="text-center">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-2 border-2 border-gray-500"
            />
            <h2 className="text-xl font-semibold flex items-center justify-center">
              {user.name}
              {user.isVerified && (
                <span className="ml-2 text-blue-500 font-bold">
                  <FaCheckCircle />
                </span>
              )}
            </h2>
            <p className="text-gray-300 text-sm">{`${user.city}, ${user.country}`}</p>
            <p className="mt-2 text-sm">{user.bio || "Data not available."}</p>
            <p className="mt-2 bg-red-600 text-white py-1 px-2 rounded-md inline-block text-sm font-medium">
              {user.maritalStatus}
            </p>
            <p className="mt-3 flex justify-center items-center text-sm text-gray-300">
              <FaPhoneAlt className="mr-2" />
              {user.countryCode}-{user.phone}
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              {user.facebookLink && (
                <a
                  href={user.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-blue-600 hover:text-blue-800 text-xl" />
                </a>
              )}
              {user.instagramLink && (
                <a
                  href={user.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-pink-500 hover:text-pink-700 text-xl" />
                </a>
              )}
              {user.twitterLink && (
                <a
                  href={user.twitterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-blue-400 hover:text-blue-600 text-xl" />
                </a>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleConnect(user.id);
              }}
              disabled={processing[user.id]}
              className={`mt-4 bg-transparent border-2 rounded-lg py-2 px-4 w-1/2 transition ${
                user.connectionStatus === "connect"
                  ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  : user.connectionStatus === "pending"
                  ? "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                  : user.connectionStatus === "declined"
                  ? "border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
                  : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              }`}
            >
              {user.connectionStatus === "connect"
                ? "Connect"
                : user.connectionStatus === "pending"
                ? "Pending"
                : user.connectionStatus === "declined"
                ? "Declined"
                : "Connected"}
            </button>
          </div>
        </div>

        <div className="w-full sm:w-2/3 p-4 bg-transparent">
          {/* First Group: Basic Details and Background Details */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-4">
            <UserSection {...sections[0]} /> {/* Basic Details */}
            <UserSection {...sections[1]} /> {/* Background Details */}
          </div>

          {/* Divider */}
          <hr className="border-gray-600 my-4" />

          {/* Second Group: Physical Attributes and Additional Details */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <UserSection {...sections[2]} /> {/* Physical Attributes */}
            <UserSection {...sections[3]} /> {/* Additional Details */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
