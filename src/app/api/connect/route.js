import prisma from "../../../lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, profileId, status } = body;

    // Validate required fields
    if (!userId || !profileId || !status) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Check if a connection already exists
    const existingConnection = await prisma.connection.findUnique({
      where: {
        requesterId_receiverId: {
          requesterId: userId,
          receiverId: profileId,
        },
      },
    });

    if (existingConnection) {
      // Prevent updating already accepted connections
      if (existingConnection.status === "accepted" && status !== "declined") {
        return new Response(
          JSON.stringify({
            message: "You are already connected with this user.",
            status: existingConnection.status,
          }),
          { status: 400 }
        );
      }

      // Update the connection status
      const updatedConnection = await prisma.connection.update({
        where: {
          id: existingConnection.id,
        },
        data: { status },
      });

      return new Response(
        JSON.stringify({
          message: "Connection status updated successfully.",
          status: updatedConnection.status,
        }),
        { status: 200 }
      );
    }

    // Create a new connection if it doesn't exist
    const newConnection = await prisma.connection.create({
      data: {
        requesterId: userId,
        receiverId: profileId,
        status,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Connection created successfully.",
        status: newConnection.status,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error handling connection:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
