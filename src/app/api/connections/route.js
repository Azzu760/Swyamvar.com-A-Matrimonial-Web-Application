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

    // Fetch connections with status "accepted"
    const connections = await prisma.connection.findMany({
      where: {
        status: "accepted",
        OR: [{ requesterId: userId }, { receiverId: userId }],
      },
      include: {
        requester: {
          select: {
            id: true,
            profilePicture: true,
            status: {
              select: {
                isOnline: true,
                lastSeen: true,
              },
            },
            basicDetails: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        receiver: {
          select: {
            id: true,
            profilePicture: true,
            status: {
              select: {
                isOnline: true,
                lastSeen: true,
              },
            },
            basicDetails: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    // Process connections to get profiles of connected users
    const connectedProfiles = connections.map((connection) => {
      const isRequester = connection.requesterId === userId;
      const connectedUser = isRequester
        ? connection.receiver
        : connection.requester;

      return {
        id: connectedUser.id,
        fullname: `${connectedUser.basicDetails.firstName} ${connectedUser.basicDetails.lastName}`,
        profilePicture:
          connectedUser.profilePicture ||
          "https://example.com/default-profile.png",
        isOnline: connectedUser.status?.isOnline || false,
        lastSeen: connectedUser.status?.lastSeen || null,
      };
    });

    return new Response(JSON.stringify({ connectedProfiles }), { status: 200 });
  } catch (error) {
    console.error("Error fetching connections:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
