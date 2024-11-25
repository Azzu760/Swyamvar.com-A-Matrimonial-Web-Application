"use client";

import React, { useState, useEffect } from "react";
import {
  FaHeart,
  FaFacebookMessenger,
  FaBell,
  FaRegBell,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Discover from "../../../components/dashboardSections/Discover";
import Search from "../../../components/dashboardSections/Search";
import Preferences from "../../../components/dashboardSections/Preferences";
import Profile from "../../../components/dashboardSections/Profile";

function Dashboard({ params }) {
  const { userId } = params; // Logged-in user's ID
  const [activeLink, setActiveLink] = useState("Discover");
  const [loading, setLoading] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false); // Notification state
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notifications?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch notifications");

        const data = await response.json();
        setHasNotifications(data.notificationCount > 0);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const navigateToNotifications = () => {
    router.push(`/notifications/${userId}`);
  };

  const navigateToMessenger = () => {
    router.push(`/messenger/${userId}`);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-dark-gray text-white shadow-lg z-50">
        <div className="max-w-8xl mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-between h-16">
          <div className="flex items-center">
            <FaHeart className="hidden sm:block text-red-500 h-3 w-3 mr-2 sm:h-6 sm:w-6" />
            <div className="hidden sm:block text-2xl font-bold">
              <a href="/">Swyamvar.com</a>
            </div>
            <ul className="flex justify-between text-gray-600 gap-1.5 sm:gap-5 sm:ml-5 list-none">
              {["Discover", "Search", "Preferences", "Profile"].map((link) => (
                <li key={link}>
                  <a
                    onClick={() => handleLinkClick(link)}
                    className={`${
                      activeLink === link
                        ? "text-red-500 border-b-2 border-red-500 pb-2"
                        : ""
                    } cursor-pointer`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center">
            <div className="flex justify-between gap-3 sm:gap-5">
              <button onClick={navigateToMessenger}>
                <FaFacebookMessenger />
              </button>
              <button onClick={navigateToNotifications}>
                {hasNotifications ? <FaBell /> : <FaRegBell />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="mt-16 p-4">
        {activeLink === "Discover" && (
          <Discover userId={userId} loading={loading} />
        )}
        {activeLink === "Search" && <Search userId={userId} />}
        {activeLink === "Preferences" && <Preferences userId={userId} />}
        {activeLink === "Profile" && <Profile userId={userId} />}
      </div>
    </>
  );
}

export default Dashboard;
