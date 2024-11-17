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
    <hr className="border-gray-600 my-4" />
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

  const handleConnectionUpdate = async () => {
    try {
      const isRequesting =
        connectionStatus === "not_connected" || connectionStatus === "declined";
      const updatedStatus = isRequesting ? "pending" : "accepted";
      const endpoint = isRequesting
        ? "/api/connections/sendRequest"
        : "/api/connections/respondToRequest";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: userId,
          receiverId: profileId,
          action: updatedStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to update connection status.");
        return;
      }

      const data = await response.json();

      // If the connection status in the response matches the updated status, set it
      if (data.status === updatedStatus) {
        setConnectionStatus(data.connectionStatus);
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error updating connection:", error);
      setError("An error occurred while updating connection status.");
    }
  };

  const connectionButtonText = {
    not_connected: "Connect",
    pending: "Cancel",
    accepted: "Connected",
    declined: "Resend",
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
      <nav className="fixed top-0 left-0 w-full bg-dark-gray py-4 pl-6 flex items-center text-white text-lg font-semibold z-10">
        <button
          onClick={handleBack}
          className="flex items-center justify-center p-2 mr-2"
        >
          <FaArrowLeft className="text-white" />
        </button>
        <span className="flex-grow text-center">{user.name}</span>
      </nav>

      <div className="flex flex-col sm:flex-row justify-between mt-16 py-4 mx-8">
        <div className="w-full sm:w-1/3 p-4 bg-transparent">
          <div className="text-center relative">
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
            <p className="text-gray-300">{`${user.city}, ${user.country}`}</p>
            <p className="mt-2">{user.bio || "Data not available."}</p>
            <p className="mt-2 bg-red-600 text-white py-1 px-2 rounded-md inline-block text-sm font-medium">
              {user.maritalStatus}
            </p>
            <p className="mt-3 flex justify-center items-center text-gray-300">
              <FaPhoneAlt className="mr-2" />
              {user.phone}
            </p>
            {/* Social Media Links */}
            <div className="mt-6 flex justify-center space-x-4">
              {user.facebookLink && (
                <a
                  href={user.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-blue-600 hover:text-blue-800 text-2xl" />
                </a>
              )}
              {user.instagramLink && (
                <a
                  href={user.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-pink-500 hover:text-pink-700 text-2xl" />
                </a>
              )}
              {user.twitterLink && (
                <a
                  href={user.twitterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-blue-400 hover:text-blue-600 text-2xl" />
                </a>
              )}
            </div>
            <button
              onClick={handleConnectionUpdate}
              className={`w-2/3 py-2 mt-4 rounded-md ${
                connectionStatus === "pending"
                  ? "bg-yellow-500"
                  : connectionStatus === "accepted"
                  ? "bg-green-500"
                  : connectionStatus === "declined"
                  ? "bg-blue-500"
                  : "bg-red-500"
              }`}
            >
              {connectionButtonText[connectionStatus]}
            </button>
          </div>
        </div>

        <div className="w-full sm:w-2/3 p-4 bg-transparent grid grid-cols-2 sm:grid-cols-2 gap-4">
          {sections.map((section, index) => (
            <UserSection key={index} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
