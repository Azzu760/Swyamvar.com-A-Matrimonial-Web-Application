import prisma from "../../../../lib/prisma";
import { sendNotification } from "../../../../lib/notifications";

export async function POST(req) {
  try {
    const body = await req.json();
    const { senderId, receiverId } = body;

    // Validate input
    if (!senderId || !receiverId) {
      const errorMessage = "Missing required fields";
      console.log("Status: 400, Error:", errorMessage);
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 400,
      });
    }

    // Check if a connection already exists between the requester and receiver
    const existingConnection = await prisma.connection.findUnique({
      where: {
        requesterId_receiverId: {
          requesterId: senderId,
          receiverId,
        },
      },
    });

    console.log("Existing connection:", existingConnection);

    // If the connection exists, return the appropriate status
    if (existingConnection) {
      let connectionStatus;

      // If the connection is still pending or already connected
      if (existingConnection.status === "pending") {
        connectionStatus = "Pending";
      } else if (existingConnection.status === "connected") {
        connectionStatus = "Connected";
      }

      console.log("Connection status (existing):", connectionStatus); // Log the connection status

      // Return the connection status instead of error
      return new Response(JSON.stringify({ connectionStatus }), {
        status: 200,
      });
    }

    // Create a new connection request
    const connection = await prisma.connection.create({
      data: {
        requesterId: senderId,
        receiverId,
        status: "pending", // The request is pending initially
      },
    });

    console.log("New connection created:", connection);

    // Send a notification to the receiver about the new connection request
    await sendNotification(
      receiverId,
      `You have a new connection request from ${senderId}.`,
      "connection_request"
    );

    // Log the notification sending process
    console.log("Notification sent to receiver:", receiverId);

    // Log the success response
    const connectionStatus = "Pending"; // Since it's a new connection request
    console.log("Connection status (new request):", connectionStatus); // Log the connection status

    // Return the connection status as "Pending"
    return new Response(JSON.stringify({ connectionStatus }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error sending connection request:", error);

    const errorMessage = "Failed to send connection request.";
    console.log("Status: 500, Error:", errorMessage);

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}
