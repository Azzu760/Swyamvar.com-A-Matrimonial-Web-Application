import prisma from "../../../lib/prisma";

// Handle GET requests
export async function GET(req, { params, query }) {
  const { userId } = query;

  // Check if userId is provided in the query parameters
  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
    });
  }

  try {
    // Fetch notifications for the specific user, filtered by unread status
    const notifications = await prisma.notification.findMany({
      where: {
        userId: parseInt(userId), // Parse userId to integer
        read: false, // Only fetch unread notifications
      },
      orderBy: {
        createdAt: "desc", // Newest notifications first
      },
    });

    // Format notifications if needed
    const formattedNotifications = notifications.map((notification) => {
      let message = "";
      let statusClass = ""; // For status-based styling

      // Assuming a notification type of "connection"
      if (notification.type === "connection") {
        switch (notification.status) {
          case "pending":
            message = `Connection request from ${notification.senderName} is pending.`;
            statusClass = "text-yellow-500"; // Yellow for pending
            break;
          case "accepted":
            message = `Connection request from ${notification.senderName} has been accepted.`;
            statusClass = "text-green-500"; // Green for accepted
            break;
          case "declined":
            message = `Connection request from ${notification.senderName} has been declined.`;
            statusClass = "text-red-500"; // Red for declined
            break;
          default:
            message = `Unknown status from ${notification.senderName}.`;
            statusClass = "text-gray-500"; // Gray for unknown status
        }
      }

      return {
        id: notification.id,
        message,
        statusClass,
        createdAt: notification.createdAt,
      };
    });

    // Return formatted notifications as JSON response
    return new Response(JSON.stringify(formattedNotifications), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch notifications" }),
      { status: 500 }
    );
  }
}
