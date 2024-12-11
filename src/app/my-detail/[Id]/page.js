"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaCheckCircle, FaPhoneAlt, FaStar } from "react-icons/fa";
import SocialMedia from "./SocialMedia";
import VerificationDetail from "./VerificationDetail";
import UserSection from "./userSection";

function MyDetail({ params }) {
  const fileInputRef = useRef(null);
  const router = useRouter();
  const { id: userId } = params;

  const [user, setUser] = useState({ isVerified: false });
  const [originalUser, setOriginalUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  // Fetch user data
  const fetchUserData = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const response = await fetch(`/api/user/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      setUser(data);
      setOriginalUser(data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  // Handle profile picture upload
  const updateProfilePicture = async (file) => {
    if (!file) {
      setError("No file selected. Please choose a profile picture.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("profilePicture", file);

    try {
      setLoading(true);
      const response = await fetch("/api/updateProfilePicture", {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to update profile picture.");

      setUser((prev) => ({ ...prev, profilePicture: result.profilePicture }));
      setError(null);
    } catch (err) {
      console.error("Error updating profile picture:", err.message);
      setError(
        err.message || "Could not update profile picture. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setUser((prevUser) => ({ ...prevUser, [key]: value }));
  };

  // Save edited details
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to save changes.");
      }

      fetchUserData(); // Reload data after saving
      setEditing(false);
    } catch (err) {
      console.error("Error saving changes:", err);
      setError(err.message);
    }
  };

  // Cancel editing
  const handleCancelChanges = () => {
    setUser(originalUser); // Reset to original data
    setEditing(false);
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <p className="text-white text-2xl font-semibold">
          Loading<span className="animate-bounce">...</span>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto mt-16 bg-black text-white rounded-lg shadow-lg max-w-5xl">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-900 py-4 px-6 flex items-center justify-between shadow-md z-10">
        <button
          onClick={() => router.back()}
          className="p-2 rounded hover:bg-gray-800"
        >
          <FaArrowLeft />
        </button>
        <span className="text-lg font-semibold">My Details</span>
      </nav>

      {/* Profile Section */}
      <div className="flex flex-col lg:flex-row justify-between mt-20 lg:mt-24 py-8 px-8">
        {/* Left Section */}
        <div className="w-full lg:w-1/3 p-6 rounded-lg text-center">
          <div className="mb-4">
            <img
              src={user.profilePicture || "/default-profile-pic.png"}
              alt="Profile"
              className="w-28 h-28 rounded-full cursor-pointer border-4 border-white"
              onClick={() => fileInputRef.current.click()}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => updateProfilePicture(e.target.files[0])}
            />
          </div>
          <h2 className="text-xl font-semibold">
            {user.name}
            {user.isVerified && (
              <FaCheckCircle className="text-blue-500 ml-2" />
            )}
          </h2>
          <p className="text-gray-400">{`${user.city}, ${user.country}`}</p>
          <p className="mt-2">{user.bio}</p>
          <SocialMedia {...user} />
          <VerificationDetail verified={user.isVerified} />
          <div className="flex justify-center py-6 space-x-4">
            {editing ? (
              <>
                <button
                  onClick={handleSaveChanges}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelChanges}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-500 text-white py-2 px-8 rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-2/3 p-6">
          <UserSection
            title="Basic Details"
            details={[{ label: "Age", value: user.age }]}
          />
          <UserSection
            title="Background Details"
            details={[{ label: "Religion", value: user.religion }]}
          />
          <UserSection
            title="Physical Attributes"
            details={[{ label: "Height", value: user.height }]}
          />
        </div>
      </div>
    </div>
  );
}

export default MyDetail;
