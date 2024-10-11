"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaCheckCircle, FaPhoneAlt, FaStar } from "react-icons/fa";
import SocialMedia from "./SocialMedia";
import VerificationDetails from "./VerificationDetails";

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState({
    id: "123",
    profilePic: "/user/user2.jpg",
    name: "John Doe",
    city: "New York",
    country: "USA",
    bio: "Loving life and sharing experiences",
    maritalStatus: "Single",
    astrologicalSign: "Leo",
    phone: "+1 234-567-8901",
    verificationDetails: {
      idNumber: "",
      verified: true,
    },
    basicDetails: {
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      dob: "1990-01-01",
    },
    diversityDetails: {
      country: "USA",
      city: "New York",
      addressLine: "123 Main St, New York, NY 10001",
      community: "Community Name",
      religion: "Religion Name",
      motherTongue: "English",
    },
    additionalDetails: {
      qualification: "Bachelor's Degree",
      diet: "Vegan",
      height: "6ft",
      bodyType: "Athletic",
      complexion: "Fair",
    },
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
  });

  const handleChange = (section, key, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [section]: {
        ...prevUser[section],
        [key]: value,
      },
    }));
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to save changes (simulated here)
  const handleSaveChanges = () => {
    // Code to update the user details in the database
    console.log("User details saved:", user);
    // Add your API call here to save the user details to the database
  };

  return (
    <div className="w-full mx-auto mt-16 text-white rounded-lg shadow-lg">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-dark-gray py-4 pl-6 flex items-center text-white text-lg font-semibold z-10">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center p-2 mr-2"
        >
          <FaArrowLeft className="text-white" />
        </button>
        <span className="flex-grow text-center">My Details</span>
      </nav>

      {/* Main Content */}
      <div className="flex flex-row justify-between mt-16 py-4 mx-8">
        {/* Left Section (30% width) */}
        <div className="w-1/3 p-4 bg-transparent">
          <div className="text-center relative">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-2 border-2 border-gray-500 cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
            />
            <h2 className="text-xl font-semibold flex items-center justify-center">
              {user.name}
              {user.verificationDetails.verified && (
                <FaCheckCircle className="text-blue-500 ml-2" />
              )}
            </h2>
            <p className="text-gray-300">{`${user.city}, ${user.country}`}</p>
            <input
              type="text"
              className="bg-transparent text-center border-b border-transparent focus:border-gray-500 focus:outline-none text-white w-full transition duration-200"
              value={user.bio}
              onChange={(e) => handleChange("bio", "bio", e.target.value)}
              placeholder="Your bio"
            />

            <div className="bg-red-500 text-white py-1 px-2 mt-2 rounded-md inline-block">
              {user.maritalStatus}
            </div>
            <p className="mt-2 flex justify-center items-center">
              <FaPhoneAlt className="mr-1" />
              {user.phone}
            </p>
            <p className="mt-2 flex justify-center items-center">
              <FaStar className="mr-1" />
              Astrological Sign: {user.astrologicalSign}
            </p>

            {/* Social Media Component */}
            <SocialMedia
              socialMedia={user.socialMedia}
              handleChange={handleChange}
            />

            {/* Verification Details Component */}
            <VerificationDetails
              verificationDetails={user.verificationDetails}
              handleChange={handleChange}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-600 mx-4"></div>

        {/* Right Section (70% width) */}
        <div className="w-2/3 p-4 space-y-6">
          {/* Basic Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Basic Details</h3>
            <div className="text-sm flex flex-col space-y-2">
              {Object.entries(user.basicDetails).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <label className="capitalize">{key}:</label>
                  <input
                    type="text"
                    className="bg-transparent border-b border-transparent focus:border-gray-500 focus:outline-none text-white text-right transition duration-200"
                    value={value}
                    onChange={(e) =>
                      handleChange("basicDetails", key, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <hr className="border-gray-600" />

          {/* Diversity Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Diversity Details</h3>
            <div className="text-sm space-y-2">
              {Object.entries(user.diversityDetails).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <label className="capitalize">{key}:</label>
                  <input
                    type="text"
                    className="bg-transparent border-b border-transparent focus:border-gray-500 focus:outline-none text-white text-right transition duration-200"
                    value={value}
                    onChange={(e) =>
                      handleChange("diversityDetails", key, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <hr className="border-gray-600" />

          {/* Additional Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Additional Details</h3>
            <div className="text-sm space-y-2">
              {Object.entries(user.additionalDetails).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <label className="capitalize">{key}:</label>
                  <input
                    type="text"
                    className="bg-transparent border-b border-transparent focus:border-gray-500 focus:outline-none text-white text-right transition duration-200"
                    value={value}
                    onChange={(e) =>
                      handleChange("additionalDetails", key, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleSaveChanges}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Save Changes
            </button>
          </div>

          {/* Hidden Input for Profile Picture */}
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleProfilePicChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
