import prisma from "../../../../lib/prisma";
import { sendNotification } from "../../../../lib/notifications";

export async function POST(req) {
  try {
    const body = await req.json();
    const { senderId, receiverId, action } = body;

    // Validate input
    if (!senderId || !receiverId || !action) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Update the connection status
    const connection = await prisma.connection.updateMany({
      where: {
        requesterId: senderId,
        receiverId,
        status: "pending",
      },
      data: {
        status: action === "accept" ? "accepted" : "declined",
      },
    });

    // If no connection found
    if (connection.count === 0) {
      return new Response(
        JSON.stringify({ error: "Connection request not found." }),
        { status: 404 }
      );
    }

    // Send notifications based on action
    if (action === "accept") {
      await sendNotification(
        senderId,
        `Your connection request to ${receiverId} has been accepted.`,
        "connection_accepted"
      );
      await sendNotification(
        receiverId,
        `You accepted the connection request from ${senderId}.`,
        "connection_accepted"
      );
    } else if (action === "decline") {
      await sendNotification(
        senderId,
        `Your connection request to ${receiverId} has been declined.`,
        "connection_declined"
      );
      await sendNotification(
        receiverId,
        `You declined the connection request from ${senderId}.`,
        "connection_declined"
      );
    }

    return new Response(
      JSON.stringify({ status: action === "accept" ? "accepted" : "declined" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error responding to connection request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to respond to connection request." }),
      { status: 500 }
    );
  }
}
