"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

function ChangePassword({ params }) {
  const router = useRouter();
  const { profileId } = params; // Fetch profileId directly from params in Next.js 13

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSaveChanges = async () => {
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      const response = await changePassword({
        profileId, // Pass profileId to identify which user's password to change
        oldPassword,
        newPassword,
      });
      if (response.success) {
        setSuccess("Password changed successfully.");
      } else {
        setError(response.message || "Old password is incorrect.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <nav className="w-full pl-6 bg-dark-gray py-4 flex items-center text-white text-lg font-semibold">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center p-2 mr-2"
        >
          <FaArrowLeft className="text-white" />
        </button>
        <span className="flex-grow text-center">Change Password</span>
      </nav>

      <div className="bg-dark-gray p-8 rounded shadow-md w-full max-w-md mt-8">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block text-gray-500">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full mt-2 p-2 bg-transparent border rounded outline-none focus:ring-2 focus:ring-dark-gray"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-500">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mt-2 p-2 bg-transparent border rounded outline-none focus:ring-2 focus:ring-dark-gray"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-500">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-2 p-2 bg-transparent border rounded outline-none focus:ring-2 focus:ring-dark-gray"
          />
        </div>

        <button
          onClick={handleSaveChanges}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;
