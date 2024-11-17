import React, { useEffect, useState } from "react";

function Notifications({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notifications?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();

        // Map status to message and class using a lookup table
        const statusLookup = {
          pending: {
            message: "Connection request is pending.",
            statusClass: "text-yellow-500",
          },
          accepted: {
            message: "Connection request has been accepted.",
            statusClass: "text-green-500",
          },
          declined: {
            message: "Connection request has been declined.",
            statusClass: "text-red-500",
          },
        };

        // Filter and format notifications
        const formattedNotifications = data
          .filter((notification) => notification.type === "connection")
          .map((notification) => {
            const {
              message = `Unknown status from ${notification.senderName}.`,
              statusClass = "text-gray-500",
            } = statusLookup[notification.status] || {};

            return {
              id: notification.id,
              message: `${message} from ${notification.senderName}.`,
              statusClass,
            };
          });

        setNotifications(formattedNotifications);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Your Notifications</h1>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 border-l-4 rounded-md ${notification.statusClass} bg-gray-900`}
            >
              {notification.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
