"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

function NotificationsPage({ params }) {
  const router = useRouter();
  const { userId } = params;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0); // New state for notification count

  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notifications?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();

        const notificationsArray = Array.isArray(data.usersToConnect)
          ? data.usersToConnect
          : [];

        setNotifications(notificationsArray);
        setNotificationCount(data.notificationCount || 0); // Set notification count from the API response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleAction = async (requesterId, receiverId, action) => {
    try {
      const response = await fetch("/api/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requesterId,
          receiverId,
          action,
        }),
      });

      if (response.ok) {
        const message =
          action === "accept"
            ? "Connection accepted successfully."
            : "Connection rejected successfully.";
        alert(message);

        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.userId !== requesterId
          )
        );
        setNotificationCount((prevCount) => prevCount - 1); // Decrease the notification count
      } else {
        const data = await response.json();
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error handling action:", error);
      alert("Error processing your request.");
    }
  };

  const handleViewProfile = (profileId) => {
    router.push(`/profile/${profileId}?userId=${userId}`);
  };

  return (
    <div>
      {/* Navigation bar */}
      <nav className="fixed top-0 left-0 w-full bg-dark-gray py-4 px-6 flex items-center justify-between text-white text-lg font-semibold shadow-md z-10">
        <button
          onClick={() => router.back()} // Navigate back using router
          className="p-2 text-white rounded hover:bg-gray-800 transition duration-200"
        >
          <FaArrowLeft />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2">
          Notifications ({notificationCount}) {/* Display notification count */}
        </span>
      </nav>

      {/* Notifications content */}
      <div className="pt-16 mt-12 w-4/5 md:w-3/5 lg:w-5/6 mx-auto">
        {loading ? (
          <div className="text-center text-lg font-semibold text-gray-500">
            Loading...
          </div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : (
          <>
            {notifications.length === 0 ? (
              <div className="text-center text-lg font-semibold text-gray-500">
                No connection requests available!
              </div>
            ) : (
              <ul className="space-y-6 w-full">
                {notifications.map((notification) => (
                  <li
                    key={notification.userId}
                    className="p-6 bg-dark-gray rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4"
                  >
                    <img
                      src={notification.profilePicture}
                      alt={`${notification.name}'s profile`}
                      className="w-14 h-14 rounded-full shadow-sm border-2 border-yellow-400 cursor-pointer"
                      onClick={() => handleViewProfile(notification.userId)}
                    />
                    <div
                      className="flex-1 text-center md:text-left cursor-pointer"
                      onClick={() => handleViewProfile(notification.userId)}
                    >
                      <p className="font-bold text-white text-lg">
                        {notification.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        New connection request
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-2 w-full md:w-auto space-y-2 md:space-y-0">
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                        onClick={() =>
                          handleAction(notification.userId, userId, "accept")
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                        onClick={() =>
                          handleAction(notification.userId, userId, "reject")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
