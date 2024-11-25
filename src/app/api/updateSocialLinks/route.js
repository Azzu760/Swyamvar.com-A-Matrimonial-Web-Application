import prisma from "../../../lib/prisma";

export async function PUT(req) {
  try {
    const { userId, platform, link } = await req.json();
    console.log("Received data:", { userId, platform, link }); // Log the incoming data

    // Validate required fields
    if (!userId || !platform || !link) {
      return new Response(
        JSON.stringify({ message: "Missing required fields." }),
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found." }), {
        status: 404,
      });
    }

    const validPlatforms = ["facebookLink", "twitterLink", "instagramLink"];

    if (!validPlatforms.includes(platform)) {
      return new Response(
        JSON.stringify({ message: "Invalid platform name." }),
        { status: 400 }
      );
    }

    const updatedDetails = await prisma.additionalDetails.update({
      where: { userId },
      data: {
        [platform]: link,
      },
    });

    return new Response(
      JSON.stringify({
        message: `${platform} updated successfully.`,
        updatedDetails,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating social media link:", error); // Log the error details
    return new Response(
      JSON.stringify({
        message: "Internal server error.",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
