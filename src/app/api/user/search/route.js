import prisma from "../../../../lib/prisma";

export async function POST(req) {
  try {
    const {
      minAge,
      maxAge,
      isVerified,
      maritalStatus,
      country,
      city,
      religion,
      community,
      caste,
      motherTongue,
      gender,
      skinTone,
      bodyType,
      profession,
      educationLevel,
      diet,
      smokingHabits,
      firstName,
      userId,
    } = await req.json();

    // Convert isVerified to a boolean if provided as a string
    const isVerifiedBool =
      isVerified === "true" ? true : isVerified === "false" ? false : undefined;

    // Helper function to calculate birth date range based on age range
    const calculateBirthDateRange = (min, max) => {
      const currentDate = new Date();
      const minDate = new Date(
        currentDate.setFullYear(currentDate.getFullYear() - min)
      );
      const maxDate = new Date(
        currentDate.setFullYear(currentDate.getFullYear() - max)
      );
      return { minDate, maxDate };
    };

    const filters = {
      id: { not: userId },
      ...(isVerifiedBool !== undefined ? { isVerified: isVerifiedBool } : {}),
      ...(minAge || maxAge
        ? {
            basicDetails: {
              dateOfBirth: {
                ...(minAge && {
                  lte: calculateBirthDateRange(minAge, 0).minDate,
                }),
                ...(maxAge && {
                  gte: calculateBirthDateRange(0, maxAge).maxDate,
                }),
              },
            },
          }
        : {}),
      ...(maritalStatus ? { basicDetails: { maritalStatus } } : {}),
      ...(country ? { basicDetails: { country } } : {}),
      ...(city
        ? { basicDetails: { city: { contains: city, mode: "insensitive" } } }
        : {}),
      ...(religion ? { backgroundDetails: { religion } } : {}),
      ...(community ? { backgroundDetails: { community } } : {}),
      ...(caste
        ? {
            backgroundDetails: {
              caste: { contains: caste, mode: "insensitive" },
            },
          }
        : {}),
      ...(motherTongue ? { backgroundDetails: { motherTongue } } : {}),
      ...(profession ? { backgroundDetails: { profession } } : {}),
      ...(gender ? { basicDetails: { gender } } : {}),
      ...(skinTone ? { physicalAttributes: { skinTone } } : {}),
      ...(bodyType ? { physicalAttributes: { bodyType } } : {}),
      ...(educationLevel ? { backgroundDetails: { educationLevel } } : {}),
      ...(diet ? { additionalDetails: { diet } } : {}),
      ...(smokingHabits ? { additionalDetails: { smokingHabits } } : {}),
      ...(firstName
        ? {
            basicDetails: {
              firstName: {
                contains: firstName,
                mode: "insensitive",
              },
            },
          }
        : {}),
    };

    const users = await prisma.user.findMany({
      where: filters,
      select: {
        id: true,
        profilePicture: true,
        basicDetails: {
          select: {
            firstName: true,
            lastName: true,
            dateOfBirth: true,
            maritalStatus: true,
            gender: true,
            country: true,
            city: true,
          },
        },
        backgroundDetails: {
          select: {
            religion: true,
            caste: true,
            educationLevel: true,
            profession: true,
          },
        },
        physicalAttributes: {
          select: {
            skinTone: true,
            bodyType: true,
          },
        },
        additionalDetails: {
          select: {
            diet: true,
            smokingHabits: true,
          },
        },
        isVerified: true,
      },
    });

    const calculateAge = (dateOfBirth) => {
      if (!dateOfBirth) return "Not Specified";
      const birthDate = new Date(dateOfBirth);
      const ageDiff = Date.now() - birthDate.getTime();
      const age = new Date(ageDiff).getUTCFullYear() - 1970;
      return age;
    };

    const profiles = users.map((user) => ({
      userId: user.id,
      image: user.profilePicture,
      name: `${user.basicDetails.firstName} ${user.basicDetails.lastName}`,
      age: calculateAge(user.basicDetails.dateOfBirth),
      maritalStatus: user.basicDetails.maritalStatus,
      gender: user.basicDetails.gender,
      caste: user.backgroundDetails.caste,
      isVerified: user.isVerified,
    }));

    return new Response(JSON.stringify(profiles), { status: 200 });
  } catch (error) {
    console.error("Error in preferences search:", error);
    return new Response("Error fetching profiles", { status: 500 });
  }
}
