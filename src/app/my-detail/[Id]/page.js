"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaCheckCircle, FaPhoneAlt, FaStar } from "react-icons/fa";
import SocialMedia from "./SocialMedia";
import VerificationDetail from "./VerificationDetail";

function MyDetail({ params }) {
  const router = useRouter();
  const { id: userId } = params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [originalUser, setOriginalUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUser(data);
        setOriginalUser(data); // Store original data
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChange = (key, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [key]: value,
    }));
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("Failed to save changes");
      const updatedUser = await response.json();
      setUser(updatedUser);
      setOriginalUser(updatedUser); // Update original data after save
      setEditing(false);
      console.log("User details saved:", updatedUser);
    } catch (error) {
      console.error("Error saving user data:", error);
      setError(error.message);
    }
  };

  const handleCancelChanges = () => {
    setUser(originalUser); // Revert to original data
    setEditing(false);
  };

  if (loading) {
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

  return (
    <div className="w-full mx-auto mt-16 bg-black text-white rounded-lg shadow-lg max-w-9xl">
      <nav className="fixed top-0 left-0 w-full bg-dark-gray py-4 px-6 flex items-center justify-between text-white text-lg font-semibold shadow-md z-10">
        <button
          onClick={() => router.back()}
          className="p-2 text-white rounded hover:bg-gray-800 transition duration-200"
        >
          <FaArrowLeft />
        </button>

        <span className="absolute left-1/2 transform -translate-x-1/2">
          My Details
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row justify-between mt-20 lg:mt-24 py-8 px-8">
        <div className="w-full lg:w-1/3 p-6 rounded-lg shadow-md text-center relative">
          <img
            src={user.profilePicture || "/default-profile-pic.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto mb-2 border-4 border-gray-600 cursor-pointer hover:opacity-90 transition duration-200"
            onClick={() => document.getElementById("fileInput").click()}
          />

          <h2 className="text-xl font-semibold flex items-center justify-center">
            {user.name}
            {user.isVerified && (
              <FaCheckCircle className="text-blue-500 ml-2" />
            )}
          </h2>
          <p className="text-gray-400">{`${user.city}, ${user.country}`}</p>
          {editing ? (
            <input
              type="text"
              className="bg-transparent text-center border-b border-red-500 focus:outline-none text-white w-full mt-2"
              value={user.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Your bio"
            />
          ) : (
            <p>{user.bio}</p>
          )}
          <p className="mt-2 bg-red-600 text-white py-1 px-2 rounded-md inline-block text-sm font-medium">
            {user.maritalStatus}
          </p>
          <p className="mt-3 flex justify-center items-center text-gray-300">
            <FaPhoneAlt className="mr-1" />
            {user.countryCode}-{user.phone}
          </p>
          <p className="mt-3 mb-2 flex justify-center items-center text-gray-300">
            <FaStar className="mr-1" />
            Astrological Sign: {user.astrologicalSign}
          </p>
          <SocialMedia
            userId={user.id}
            facebookLink={user.facebookLink}
            instagramLink={user.instagramLink}
            twitterLink={user.twitterLink}
            handleChange={handleChange}
          />

          <div className="flex justify-center py-6 space-x-4">
            {editing ? (
              <>
                <button
                  onClick={handleSaveChanges}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-200"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelChanges}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-500 w-[400px] text-white py-2 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
              >
                Edit Profile
              </button>
            )}
          </div>

          <VerificationDetail verified={user.isVerified} userId={user.id} />

          <input
            type="file"
            accept="image/*"
            id="fileInput"
            className="hidden"
            onChange={handleProfilePicChange}
          />
        </div>

        <div className="hidden lg:block w-px bg-gray-600 mx-8"></div>

        <div className="w-full lg:w-2/3 p-6 rounded-lg shadow-md mt-8 lg:mt-0 space-y-4">
          <UserSection
            title="Basic Details"
            details={[
              { label: "Age", value: user.age, key: "age" },
              { label: "Gender", value: user.gender, key: "gender" },
              {
                label: "Date of Birth",
                value: user.dateOfBirth,
                key: "dateOfBirth",
              },
              {
                label: "Preferred Partner",
                value: user.preferredPartner,
                key: "preferredPartner",
              },
            ]}
            editable={editing}
            handleChange={handleChange}
          />

          <hr className="border-gray-600 my-4" />

          <UserSection
            title="Background Details"
            details={[
              { label: "Religion", value: user.religion, key: "religion" },
              { label: "Caste", value: user.caste, key: "caste" },
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
              {
                label: "Annual Income",
                value: user.annualIncome,
                key: "annualIncome",
              },
            ]}
            editable={editing}
            handleChange={handleChange}
          />

          <hr className="border-gray-600 my-4" />

          <UserSection
            title="Physical Attributes"
            details={[
              { label: "Height", value: `${user.height} ft`, key: "height" },
              { label: "Body Type", value: user.bodyType, key: "bodyType" },
              {
                label: "Complexion",
                value: user.complexion,
                key: "complexion",
              },
              { label: "Hair Color", value: user.hairColor, key: "hairColor" },
              { label: "Eye Color", value: user.eyeColor, key: "eyeColor" },
              { label: "Weight", value: `${user.weight} Kg`, key: "weight" },
              { label: "Skin Tone", value: user.skinTone, key: "skinTone" },
              {
                label: "Physical Disability",
                value: user.physicalDisability,
                key: "physicalDisability",
              },
            ]}
            editable={editing}
            handleChange={handleChange}
          />

          <hr className="border-gray-600 my-4" />

          <UserSection
            title="Additional Details"
            details={[
              { label: "Diet", value: user.diet, key: "diet" },
              {
                label: "Smoking Habit",
                value: user.smokingHabits,
                key: "smokingHabit",
              },
              {
                label: "Hobby and Interest",
                value: user.hobbiesAndInterests,
                key: "hobbyAndInterest",
              },
              {
                label: "Astrological Sign",
                value: user.astrologicalSign,
                key: "astrologicalSign",
              },
            ]}
            editable={editing}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

const UserSection = ({ title, details, editable, handleChange }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-items-between">
      {" "}
      {/* Aligns items to the end */}
      {details.map(({ label, value, key }) => (
        <div key={key} className="w-full sm:w-auto">
          {" "}
          {/* Width adjusted to fit content */}
          <label className="text-sm text-gray-400">{label}</label>
          {editable ? (
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full p-2 bg-transparent border-b border-red-500 text-white focus:outline-none"
            />
          ) : (
            <p className="text-gray-200">{value}</p>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default MyDetail;
