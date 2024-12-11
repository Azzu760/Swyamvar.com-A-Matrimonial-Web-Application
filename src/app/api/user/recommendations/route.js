import prisma from "../../../../lib/prisma";
import { getUserDetailsForRecommendation } from "../../../../utils/compatibilityScore/getUserDetailsForRecommendation";

// Helper function to calculate age from date of birth
function calculateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

// Helper function to find connection status (optimized)
const findConnectionStatus = async (userId, profileId) => {
  const connection = await prisma.connection.findFirst({
    where: {
      OR: [
        { requesterId: userId, receiverId: profileId },
        { receiverId: userId, requesterId: profileId },
      ],
    },
  });
  return connection ? connection.status : "connect";
};

export async function GET(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ message: "User ID is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const loggedInUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        basicDetails: true,
        backgroundDetails: true,
      },
    });

    if (!loggedInUser) {
      return new Response(JSON.stringify({ message: "User not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const formattedLoggedInUser = await getUserDetailsForRecommendation(
      loggedInUser
    );

    const filterCriteria = {
      id: { not: userId }, // Exclude the logged-in user
    };

    // Only consider users that match the preferred partner's gender
    if (formattedLoggedInUser.preferredPartner) {
      filterCriteria.basicDetails = {
        gender: formattedLoggedInUser.preferredPartner,
      };
    }

    const recommendedProfiles = await prisma.user.findMany({
      where: filterCriteria,
      include: {
        basicDetails: true,
        backgroundDetails: true,
        additionalDetails: true,
        connections: {
          // Include the connection information
          where: {
            OR: [{ requesterId: userId }, { receiverId: userId }],
          },
        },
      },
    });

    if (recommendedProfiles.length === 0) {
      return new Response(
        JSON.stringify({ message: "No matching profiles found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const profiles = await Promise.all(
      recommendedProfiles.map(async (profile) => {
        const name = `${profile.basicDetails.firstName || ""} ${
          profile.basicDetails.lastName || ""
        }`.trim();

        const age = profile.basicDetails.dateOfBirth
          ? calculateAge(profile.basicDetails.dateOfBirth)
          : null;

        const maritalStatus = profile.basicDetails.maritalStatus || "Unknown";
        const bio = profile.additionalDetails?.bio || "No bio available";
        const isVerified = profile.isVerified || "";

        let compatibilityScore = 0;

        // Preferred partner is mandatory for matching
        if (
          formattedLoggedInUser.preferredPartner &&
          profile.basicDetails.gender === formattedLoggedInUser.preferredPartner
        ) {
          compatibilityScore += 50; // Higher weight for preferred partner match
        }

        // Other fields are optional and can be used for additional compatibility
        if (
          formattedLoggedInUser.country &&
          profile.basicDetails.country === formattedLoggedInUser.country
        ) {
          compatibilityScore += 20;
        }

        if (
          formattedLoggedInUser.city &&
          profile.basicDetails.city === formattedLoggedInUser.city
        ) {
          compatibilityScore += 10;
        }

        if (
          formattedLoggedInUser.religion &&
          profile.backgroundDetails?.religion === formattedLoggedInUser.religion
        ) {
          compatibilityScore += 10;
        }

        if (
          formattedLoggedInUser.caste &&
          profile.backgroundDetails?.caste === formattedLoggedInUser.caste
        ) {
          compatibilityScore += 10;
        }

        // Fetch the connection status between the logged-in user and the recommended profile
        const connectionStatus = await findConnectionStatus(userId, profile.id);

        return {
          id: profile.id,
          isVerified,
          name,
          age,
          maritalStatus,
          bio,
          compatibilityScore,
          connectionStatus,
        };
      })
    );

    const sortedProfiles = profiles.sort(
      (a, b) => b.compatibilityScore - a.compatibilityScore
    );

    return new Response(JSON.stringify(sortedProfiles), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
