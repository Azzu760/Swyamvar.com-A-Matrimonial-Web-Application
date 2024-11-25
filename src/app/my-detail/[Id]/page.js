"use client";

import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaCheckCircle, FaPhoneAlt, FaStar } from "react-icons/fa";
import SocialMedia from "./SocialMedia";
import VerificationDetail from "./VerificationDetail";

function MyDetail({ params }) {
  const fileInputRef = useRef(null);
  const router = useRouter();
  const { id: userId } = params;
  const [user, setUser] = useState({
    isVerified: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [originalUser, setOriginalUser] = useState(null);

  const fetchUserData = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const response = await fetch(`/api/user/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      setUser(data);
      setOriginalUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const updateProfilePicture = async (userId, file) => {
    if (!file) {
      setError("No file selected. Please choose a profile picture.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId); // Append user ID
    formData.append("profilePicture", file); // Append the file

    try {
      setLoading(true); // Show loading indicator
      const response = await fetch("/api/updateProfilePicture", {
        method: "PUT",
        body: formData, // Send the formData with the file
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to update profile picture.");
      }

      // Update the user profile with the new profile picture URL
      setUser((prev) => ({ ...prev, profilePicture: result.profilePicture }));
      setError(null); // Clear previous errors
    } catch (err) {
      console.error("Error updating profile picture:", err.message);
      setError(
        err.message || "Could not update profile picture. Please try again."
      );
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const handleChange = (key, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [key]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        basicDetails: {
          maritalStatus: user.maritalStatus,
          city: user.city,
          country: user.country,
        },
        backgroundDetails: {
          religion: user.religion,
          caste: user.caste,
          motherTongue: user.motherTongue,
          educationLevel: user.educationLevel,
          profession: user.profession,
          annualIncome: user.annualIncome,
        },
        physicalAttributes: {
          height: user.height,
          bodyType: user.bodyType,
          complexion: user.complexion,
          hairColor: user.hairColor,
          eyeColor: user.eyeColor,
          weight: user.weight,
          skinTone: user.skinTone,
          physicalDisability: user.physicalDisability,
        },
        additionalDetails: {
          diet: user.diet,
          smokingHabits: user.smokingHabits,
          hobbiesAndInterests: user.hobbiesAndInterests,
          astrologicalSign: user.astrologicalSign,
          bio: user.bio,
        },
      };

      const response = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to save changes: ${errorResponse.message}`);
      }

      const fetchResponse = await fetch(`/api/user/${userId}`);
      if (!fetchResponse.ok) {
        throw new Error("Failed to fetch updated user details.");
      }

      const updatedUser = await fetchResponse.json();
      setUser(updatedUser);
      setOriginalUser(updatedUser); // Reset originalUser for changes comparison
      setEditing(false); // Exit editing mode
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
          <div className="flex justify-center rounded-full mb-4">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-28 h-28 rounded-full cursor-pointer outline-4 outline-blue-500 outline-offset-1 border-4 border-white"
                onClick={() => fileInputRef.current.click()}
              />
            ) : (
              <img
                src="/default-profile-pic.png"
                alt="Default Profile"
                className="w-28 h-28 rounded-full cursor-pointer outline-4 outline-blue-500 outline-offset-1 border-4 border-white"
                onClick={() => fileInputRef.current.click()}
              />
            )}
          </div>

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
                className="bg-blue-500 w-[450px] text-white py-2 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
              >
                Edit Profile
              </button>
            )}
          </div>
          <VerificationDetail verified={user.isVerified} userId={user.id} />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => updateProfilePicture(user.id, e.target.files[0])}
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
              {
                label: "Height (in feet)",
                value: `${user.height}`,
                key: "height",
              },
              { label: "Body Type", value: user.bodyType, key: "bodyType" },
              {
                label: "Complexion",
                value: user.complexion,
                key: "complexion",
              },
              { label: "Hair Color", value: user.hairColor, key: "hairColor" },
              { label: "Eye Color", value: user.eyeColor, key: "eyeColor" },
              {
                label: "Weight (in Kg)",
                value: `${user.weight}`,
                key: "weight",
              },
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {details.map(({ label, value, key }) => (
        <div key={key} className="flex flex-col">
          <label className="text-gray-400">{label}</label>
          {editable ? (
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              className="bg-transparent border border-gray-600 text-white py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <span>{value || "Not specified"}</span>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default MyDetail;
