import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaLock,
  FaQuestionCircle,
  FaInfoCircle,
  FaSignOutAlt,
  FaCheck,
} from "react-icons/fa";

function Profile() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const user = {
    id: "123",
    profilePic: "/user/user2.jpg",
    name: "John Doe",
    city: "New York",
    country: "USA",
    bio: "Loving life and sharing experiences",
    maritalStatus: "Single",
    verified: true,
  };

  const menuItems = [
    { icon: <FaUser />, label: "My Details", path: `/my-detail/${user.id}` },
    {
      icon: <FaLock />,
      label: "Change Password",
      path: `/change-password/${user.id}`,
    },
    { icon: <FaQuestionCircle />, label: "Get Help", path: `/get-help` },
    { icon: <FaInfoCircle />, label: "About Us", path: `/about-us` },
    {
      icon: <FaSignOutAlt className="text-red-500" />,
      label: <span className="text-red-500">Logout</span>,
      path: null,
      onClick: () => setShowLogoutModal(true),
    },
  ];

  const handleLogout = () => {
    setShowLogoutModal(false);
    router.push("/");
  };

  return (
    <div className="p-4 bg-transparent text-white rounded-lg w-4/5 mx-auto shadow-lg">
      <div className="bg-transparent text-center">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-gray-500"
        />
        <h2 className="text-xl font-semibold flex items-center justify-center">
          {user.name}
          {user.verified && (
            <FaCheck className="ml-2 p-1 bg-blue-500 rounded-full text-white" />
          )}{" "}
          {/* Conditional rendering */}
        </h2>
        <p className="text-gray-300">
          {user.city}, {user.country}
        </p>
        <p className="text-gray-400 mt-1">{user.bio}</p>
        <div className="bg-red-500 text-white py-1 px-2 mt-2 rounded-md w-1/4 inline-block">
          {user.maritalStatus}
        </div>
      </div>

      <hr className="my-4 border-gray-600" />

      <div className="bg-transparent">
        {menuItems.map((item, index) => (
          <Link href={item.path || "#"} key={index} className="block">
            <div
              className={`flex justify-between items-center p-3 rounded-md cursor-pointer hover:bg-dark-gray ${
                item.label === "Logout" ? "text-red-500" : ""
              }`}
              onClick={item.onClick}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-white">{item.label}</span>
              </div>
              <span className="text-gray-400">{">"}</span>
            </div>
          </Link>
        ))}
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-dark-gray text-white p-4 mt-32 rounded-lg shadow-lg text-center w-1/2 max-w-md">
            <p className="mb-6 text-left">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
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
