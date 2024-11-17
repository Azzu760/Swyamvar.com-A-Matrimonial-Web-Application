import prisma from "../../../../lib/prisma";
import {
  getUserDetailsForRecommendation,
  calculateCompatibilityScore,
} from "../../../../utils/compatibilityScore";

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

export async function GET(req) {
  const userId = req.headers.get("x-user-id");

  if (!userId) {
    return new Response(JSON.stringify({ message: "User ID is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Fetch the logged-in user's details
    const loggedInUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        basicDetails: true,
        backgroundDetails: true,
        physicalAttributes: true,
        additionalDetails: true,
      },
    });

    if (!loggedInUser) {
      return new Response(JSON.stringify({ message: "User not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Format the logged-in user's details
    const formattedLoggedInUser = await getUserDetailsForRecommendation(
      loggedInUser
    );

    // Fetch profiles of the opposite gender with matching criteria
    const recommendedProfiles = await prisma.user.findMany({
      where: {
        id: { not: userId }, // Exclude the logged-in user
        basicDetails: {
          gender: formattedLoggedInUser.gender === "Male" ? "Female" : "Male",
        },
        backgroundDetails: {
          religion: formattedLoggedInUser.religion || undefined,
          caste: formattedLoggedInUser.caste || undefined,
        },
        physicalAttributes: {
          bodyType: formattedLoggedInUser.bodyType || undefined,
          complexion: formattedLoggedInUser.complexion || undefined,
        },
      },
      include: {
        basicDetails: true,
        backgroundDetails: true,
        physicalAttributes: true,
        additionalDetails: true,
      },
    });

    // Enhance profiles with compatibility score and return top 5 matches
    const enhancedProfiles = await Promise.all(
      recommendedProfiles.map(async (profile) => {
        const profileData = await getUserDetailsForRecommendation(profile);
        const compatibilityScore = calculateCompatibilityScore(
          formattedLoggedInUser,
          profileData
        );

        // Calculate age from date of birth
        const age = profileData.dateOfBirth
          ? calculateAge(profileData.dateOfBirth)
          : null;

        // Concatenate first name and last name for the name field
        const name = `${profile.basicDetails?.firstName || ""} ${
          profile.basicDetails?.lastName || ""
        }`.trim();

        return {
          id: profile.id,
          name: name || "Unknown",
          age: age,
          maritalStatus: profile.basicDetails?.maritalStatus || "Unknown",
          bio: profile.additionalDetails?.bio || "No bio available",
          compatibilityScore: compatibilityScore,
        };
      })
    );

    // Sort profiles by compatibility score (descending) and return top 5
    const sortedProfiles = enhancedProfiles
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
      .slice(0, 5);

    return new Response(JSON.stringify(sortedProfiles), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
