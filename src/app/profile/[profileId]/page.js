"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import {
  FaArrowLeft,
  FaPhoneAlt,
  FaStar,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaCheckCircle,
} from "react-icons/fa";
import dummyUsers from "../../data/dummyUsers2";

const Profile = ({ params }) => {
  const router = useRouter(); // Initialize useRouter
  const { profileId } = params; // Accessing profileId directly from params
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("not_connected");

  useEffect(() => {
    if (profileId) {
      console.log("Profile ID:", profileId); // Log the id for debugging
      const foundUser = dummyUsers.find((u) => u.id === parseInt(profileId));
      setUser(foundUser);
      setIsLoading(false);
    }
  }, [profileId]);

  const handleConnect = () => {
    if (connectionStatus === "not_connected") {
      setConnectionStatus("pending");
      console.log("Connection request sent.");
    } else if (connectionStatus === "connected") {
      console.log("You are already connected with this user.");
    }
  };

  // Function to handle back navigation
  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }

  if (!user) {
    return <p className="text-white">User not found.</p>;
  }

  const currentYear = new Date().getFullYear();
  const age = currentYear - user.yearOfBirth;

  // Determine if the user is connected to apply styles
  const isConnected = connectionStatus === "connected";

  return (
    <div
      className={`w-full mx-auto mt-16 text-white rounded-lg shadow-lg ${
        isConnected ? "bg-dark-gray" : ""
      }`}
    >
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-dark-gray py-4 pl-6 flex items-center text-white text-lg font-semibold z-10">
        <button
          onClick={handleBack} // Use the handleBack function
          className="flex items-center justify-center p-2 mr-2"
        >
          <FaArrowLeft className="text-white" />
        </button>
        <span className="flex-grow text-center">{user.firstname}</span>
      </nav>

      <div className="flex flex-row justify-between mt-16 py-4 mx-8">
        {/* Left Section */}
        <div className="w-1/3 p-4 bg-transparent">
          <div className="text-center relative">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-2 border-2 border-gray-500"
            />
            <h2 className="text-xl font-semibold flex items-center justify-center">
              {user.name}
              {user.verified && (
                <span className="ml-2 text-green-500 font-bold">
                  <FaCheckCircle />
                </span>
              )}
            </h2>
            <p className="text-gray-300">{`${user.city}, ${user.country}`}</p>
            <p
              className={`mt-2 ${
                connectionStatus === "not_connected" ? "blur-sm" : ""
              }`}
            >
              {user.bio || "Data not available."}
            </p>

            <div
              className={`bg-red-500 text-white py-1 px-2 mt-2 rounded-md inline-block ${
                connectionStatus === "not_connected" ? "blur-sm" : ""
              }`}
            >
              {user.maritalStatus || "Data not available."}
            </div>
            <p
              className={`mt-2 flex justify-center items-center ${
                connectionStatus === "not_connected" ? "blur-sm" : ""
              }`}
            >
              <FaPhoneAlt className="mr-1" />
              {user.phone || "Data not available."}
            </p>
            <p
              className={`mt-2 flex justify-center items-center ${
                connectionStatus === "not_connected" ? "blur-sm" : ""
              }`}
            >
              <FaStar className="mr-1" />
              Astrological Sign:{" "}
              {user.astrologicalSign || "Data not available."}
            </p>

            {/* Social Media Links */}
            <div className="mt-4 flex justify-center space-x-4">
              {user.socialMedia?.facebook && (
                <a
                  href={user.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-white h-6 w-6" />
                </a>
              )}
              {user.socialMedia?.twitter && (
                <a
                  href={user.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-white h-6 w-6" />
                </a>
              )}
              {user.socialMedia?.instagram && (
                <a
                  href={user.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-white h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-600 mx-4"></div>

        {/* Right Section */}
        <div className="w-2/3 p-4 space-y-6">
          {/* Basic Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Basic Details</h3>
            <div className="text-sm flex flex-col space-y-2">
              <div className="flex justify-between">
                <span>Full Name</span>
                <span>{user.name || "Data not available."}</span>
              </div>
              <div className="flex justify-between">
                <span>Gender</span>
                <span>{user.gender || "Data not available."}</span>
              </div>
              <div className="flex justify-between">
                <span>Age</span>
                <span>{age}</span>
              </div>
              <div className="flex justify-between">
                <span>Marital Status</span>
                <span>{user.maritalStatus || "Data not available."}</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-600" />

          {/* Diversity Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Diversity Details</h3>
            <div className="text-sm flex flex-col space-y-2">
              <div className="flex justify-between">
                <span>Country</span>
                <span>{user.country || "Data not available."}</span>
              </div>
              <div className="flex justify-between">
                <span>City</span>
                <span>{user.city || "Data not available."}</span>
              </div>
              <div className="flex justify-between">
                <span>Address Line</span>
                <span
                  className={`${
                    connectionStatus === "not_connected" ? "blur-sm" : ""
                  }`}
                >
                  {user.addressLine || "Data not available."}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Religion</span>
                <span>{user.religion || "Data not available."}</span>
              </div>
              <div className="flex justify-between">
                <span>Community</span>
                <span>{user.community || "Data not available."}</span>
              </div>
              <div className="flex justify-between">
                <span>Mother Tongue</span>
                <span>{user.motherTongue || "Data not available."}</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-600" />

          {/* Additional Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Additional Details</h3>
            <div className="text-sm flex flex-col space-y-2">
              <div className="flex justify-between">
                <span>Highest Qualification</span>
                <span>
                  {user.highestQualification || "Data not available."}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Height</span>
                <span>
                  {user.height ? `${user.height} cm` : "Data not available."}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Body Type</span>
                <span>{user.bodyType || "Data not available."}</span>
              </div>
              <div className="flex justify-between">
                <span>Complexion</span>
                <span>{user.complexion || "Data not available."}</span>
              </div>
              <div className="flex justify-between">
                <span>Diet</span>
                <span>{user.diet || "Data not available."}</span>
              </div>
              <div className="flex justify-between">
                <span>Occupation</span>
                <span>{user.occupation || "Data not available."}</span>
              </div>
              <div className="flex justify-between">
                <span>Salary</span>
                <span>{user.salary || "Data not available."}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleConnect}
            className={`mt-4 w-full py-2 rounded-md ${
              connectionStatus === "connected"
                ? "bg-dark-gray"
                : connectionStatus === "pending"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {connectionStatus === "not_connected" && "Connect"}
            {connectionStatus === "pending" && "Pending..."}
            {connectionStatus === "connected" && "Connected"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
