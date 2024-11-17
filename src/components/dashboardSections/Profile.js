"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaLock,
  FaQuestionCircle,
  FaInfoCircle,
  FaSignOutAlt,
  FaCheck,
} from "react-icons/fa";

function Profile({ userId }) {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    {
      icon: <FaUser />,
      label: "My Details",
      onClick: () => router.push(`/my-detail/${userId}`),
    },
    {
      icon: <FaLock />,
      label: "Change Password",
      path: `/change-password/${userId}`,
    },
    { icon: <FaQuestionCircle />, label: "Get Help", path: `/get-help` },
    { icon: <FaInfoCircle />, label: "About Us", path: `/about-us` },
    {
      icon: <FaSignOutAlt className="text-red-500" />,
      label: "Logout",
      onClick: () => setShowLogoutModal(true),
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError("User ID is required");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleLogout = async () => {
    // Clear local storage/session data
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Optional: API call to invalidate server-side sessions
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include", // If using cookies or server-side tokens
    });

    setShowLogoutModal(false);

    // Redirect to login or home page
    router.push("/auth/sign-in");
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!userDetails)
    return <div className="text-center text-red-500">User not found</div>;

  return (
    <div className="p-4 bg-transparent text-white rounded-lg w-4/5 mx-auto shadow-lg">
      <div className="text-center">
        <img
          src={userDetails.profilePicture || "/default-profile-pic.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-gray-500"
        />
        <h2 className="text-xl font-semibold flex items-center justify-center">
          {userDetails.name || "Anonymous"}
          {userDetails.isVerified && (
            <FaCheck className="ml-2 p-1 bg-blue-500 rounded-full text-white" />
          )}
        </h2>
        <p className="text-gray-300">
          {userDetails.city || "City not specified"},{" "}
          {userDetails.country || "Country not specified"}
        </p>
        <p className="text-gray-400 mt-1">
          {userDetails.bio || "Bio not provided."}
        </p>
        <div className="bg-red-500 text-white py-1 px-2 mt-2 rounded-md w-1/4 inline-block">
          {userDetails.maritalStatus || "Marital Status not provided"}
        </div>
      </div>

      <hr className="my-4 border-gray-600" />

      <div>
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={item.onClick}
            className={`flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-dark-gray ${
              item.label === "Logout" ? "text-red-500" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <span className="text-gray-400">{">"}</span>
          </div>
        ))}
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 flex mt-20 items-center justify-center bg-black bg-opacity-50">
          <div className="bg-dark-gray text-white p-4 rounded-lg shadow-md max-w-sm mx-auto">
            <p className="mb-4 text-center">Are you sure you want to logout?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
