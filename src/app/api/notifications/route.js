import prisma from "../../../lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ message: "Missing userId" }), {
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        receivedConnections: {
          where: { status: "pending" },
          select: { requesterId: true },
        },
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const notificationCount = user.receivedConnections.length;

    if (notificationCount > 0) {
      const receiverIds = user.receivedConnections.map(
        (connection) => connection.requesterId
      );

      const receivers = await prisma.user.findMany({
        where: { id: { in: receiverIds } },
        select: {
          id: true,
          profilePicture: true,
          basicDetails: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      const usersToConnect = receivers.map((receiver) => {
        const fullName = `${receiver.basicDetails.firstName} ${receiver.basicDetails.lastName}`;
        const profilePicture =
          receiver.profilePicture || "https://example.com/default-profile.png";

        return {
          userId: receiver.id,
          name: fullName,
          profilePicture,
          action: "Accept/Decline",
        };
      });

      return new Response(
        JSON.stringify({ usersToConnect, notificationCount }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "No pending connection requests.",
          notificationCount: 0,
        }),
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching received connection requests:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error. Please try again later.",
      }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { requesterId, receiverId, action } = await req.json();

    if (!requesterId || !receiverId || !action) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    const status = action === "accept" ? "accepted" : "declined";

    // Update connection status in the database
    await prisma.connection.updateMany({
      where: {
        requesterId,
        receiverId,
        status: "pending",
      },
      data: {
        status,
      },
    });

    return new Response(
      JSON.stringify({ message: "Connection status updated successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating connection status:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
