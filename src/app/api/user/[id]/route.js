import prisma from "../../../../lib/prisma";

async function getUserDetails(user) {
  const {
    basicDetails,
    backgroundDetails,
    additionalDetails,
    physicalAttributes,
    status,
    profilePicture,
    isVerified,
    countryCode,
    phone,
  } = user;

  // Calculate age from dateOfBirth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "Not Specified";
    const birthDate = new Date(dateOfBirth);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970); // Convert milliseconds to years
  };

  // Get firstName and lastName
  const firstName = basicDetails?.firstName || "N/A";
  const lastName = basicDetails?.lastName || "N/A";

  return {
    id: user.id,
    email: user.email,
    profilePicture: user.profilePicture || "/default-profile-pic.png",
    isVerified: isVerified ?? false,
    countryCode: countryCode || "Not Specified",
    phone: phone || "Not Specified",
    // Concatenated Name
    name: `${firstName} ${lastName}`,
    // Age Calculation
    age: calculateAge(basicDetails?.dateOfBirth),
    // Basic Details
    gender: basicDetails?.gender || "Not Specified",
    dateOfBirth: basicDetails?.dateOfBirth
      ? basicDetails.dateOfBirth.toISOString().split("T")[0]
      : "Not Specified",
    maritalStatus: basicDetails?.maritalStatus || "Not Specified",
    city: basicDetails?.city || "Unknown City",
    country: basicDetails?.country || "Unknown Country",
    preferredPartner: basicDetails?.preferredPartner || "Not Specified",
    // Background Details
    religion: backgroundDetails?.religion || "Not Specified",
    caste: backgroundDetails?.caste || "Not Specified",
    motherTongue: backgroundDetails?.motherTongue || "Not Specified",
    community: backgroundDetails?.community || "Not Specified",
    educationLevel: backgroundDetails?.educationLevel || "Not Specified",
    fieldOfStudy: backgroundDetails?.fieldOfStudy || "Not Specified",
    profession: backgroundDetails?.profession || "Not Specified",
    annualIncome: backgroundDetails?.annualIncome || "Not Specified",
    // Physical Attributes
    height: physicalAttributes?.height || "Not Specified",
    bodyType: physicalAttributes?.bodyType || "Not Specified",
    complexion: physicalAttributes?.complexion || "Not Specified",
    hairColor: physicalAttributes?.hairColor || "Not Specified",
    eyeColor: physicalAttributes?.eyeColor || "Not Specified",
    weight: physicalAttributes?.weight || "Not Specified",
    skinTone: physicalAttributes?.skinTone || "Not Specified",
    physicalDisability: physicalAttributes?.physicalDisability || [],
    // Additional Details
    diet: additionalDetails?.diet || "Not Specified",
    smokingHabits: additionalDetails?.smokingHabits || "Not Specified",
    hobbiesAndInterests:
      additionalDetails?.hobbiesAndInterests || "Not Specified",
    astrologicalSign: additionalDetails?.astrologicalSign || "Not Specified",
    bio: additionalDetails?.bio || "No bio available.",
    facebookLink: additionalDetails?.facebookLink || "",
    instagramLink: additionalDetails?.instagramLink || "",
    twitterLink: additionalDetails?.twitterLink || "",
    // User Status
    isOnline: status?.isOnline ?? false,
    lastSeen: status?.lastSeen ? status.lastSeen.toISOString() : "Never",
  };
}

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        basicDetails: true,
        backgroundDetails: true,
        additionalDetails: true,
        physicalAttributes: true,
        status: true,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const userDetails = await getUserDetails(user);

    return new Response(JSON.stringify(userDetails), { status: 200 });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
