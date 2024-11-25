import prisma from "../../../../lib/prisma";

// Utility function to calculate age
const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return "Not Specified";
  const birthDate = new Date(dateOfBirth);
  const ageDiff = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970); // Convert milliseconds to years
};

// Helper function to find connection status
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

// Function to format user details
const getUserDetails = async (user, connectionStatus) => {
  const {
    basicDetails,
    backgroundDetails,
    additionalDetails,
    physicalAttributes,
    status,
    isVerified,
    countryCode,
    phone,
  } = user;

  const firstName = basicDetails?.firstName || "N/A";
  const lastName = basicDetails?.lastName || "N/A";

  return {
    id: user.id,
    email: user.email,
    profilePicture: user.profilePicture || "/default-profile-pic.png",
    isVerified: isVerified ?? false,
    countryCode: countryCode || "Not Specified",
    phone: phone || "Not Specified",
    name: `${firstName} ${lastName}`,
    age: calculateAge(basicDetails?.dateOfBirth),
    gender: basicDetails?.gender || "Not Specified",
    dateOfBirth: basicDetails?.dateOfBirth
      ? basicDetails.dateOfBirth.toISOString().split("T")[0]
      : "Not Specified",
    maritalStatus: basicDetails?.maritalStatus || "Not Specified",
    city: basicDetails?.city || "Unknown City",
    country: basicDetails?.country || "Unknown Country",
    preferredPartner: basicDetails?.preferredPartner || "Not Specified",
    religion: backgroundDetails?.religion || "Not Specified",
    caste: backgroundDetails?.caste || "Not Specified",
    motherTongue: backgroundDetails?.motherTongue || "Not Specified",
    community: backgroundDetails?.community || "Not Specified",
    educationLevel: backgroundDetails?.educationLevel || "Not Specified",
    fieldOfStudy: backgroundDetails?.fieldOfStudy || "Not Specified",
    profession: backgroundDetails?.profession || "Not Specified",
    annualIncome: backgroundDetails?.annualIncome || "Not Specified",
    height: physicalAttributes?.height || "Not Specified",
    bodyType: physicalAttributes?.bodyType || "Not Specified",
    complexion: physicalAttributes?.complexion || "Not Specified",
    hairColor: physicalAttributes?.hairColor || "Not Specified",
    eyeColor: physicalAttributes?.eyeColor || "Not Specified",
    weight: physicalAttributes?.weight || "Not Specified",
    skinTone: physicalAttributes?.skinTone || "Not Specified",
    physicalDisability:
      physicalAttributes?.physicalDisability || "Not Specified",
    diet: additionalDetails?.diet || "Not Specified",
    smokingHabits: additionalDetails?.smokingHabits || "Not Specified",
    hobbiesAndInterests:
      additionalDetails?.hobbiesAndInterests || "Not Specified",
    astrologicalSign: additionalDetails?.astrologicalSign || "Not Specified",
    bio: additionalDetails?.bio || "No bio available.",
    facebookLink: additionalDetails?.facebookLink || "",
    instagramLink: additionalDetails?.instagramLink || "",
    twitterLink: additionalDetails?.twitterLink || "",
    isOnline: status?.isOnline ?? false,
    lastSeen: status?.lastSeen ? status.lastSeen.toISOString() : "Never",
    connectionStatus,
  };
};

// GET Request Handler
export async function GET(req, { params }) {
  const { id, profileId } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        basicDetails: true,
        backgroundDetails: true,
        additionalDetails: true,
        physicalAttributes: true,
        status: true,
        connections: {
          where: {
            OR: [{ requesterId: id }, { receiverId: id }],
          },
          select: {
            status: true,
          },
        },
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Fetch connection status using updated logic
    const connectionStatus = await findConnectionStatus(id, profileId);

    const userDetails = await getUserDetails(user, connectionStatus);

    return new Response(JSON.stringify(userDetails), { status: 200 });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

// PUT Request Handler - Update user data
export async function PUT(req, { params }) {
  const { id } = params; // User ID from the request URL
  const userData = await req.json(); // Parse user data from the request body

  try {
    if (!userData) {
      return new Response(
        JSON.stringify({ message: "No user data provided" }),
        { status: 400 }
      );
    }

    // Perform the nested update
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        basicDetails: {
          update: userData.basicDetails || {},
        },
        backgroundDetails: {
          update: userData.backgroundDetails || {},
        },
        physicalAttributes: {
          update: userData.physicalAttributes || {},
        },
        additionalDetails: {
          update: userData.additionalDetails || {},
        },
      },
    });

    return new Response(
      JSON.stringify({ message: "User updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user data:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
