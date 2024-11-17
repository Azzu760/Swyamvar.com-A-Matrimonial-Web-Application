// Utility function to format and filter user details for compatibility scoring
export async function getUserDetailsForRecommendation(user) {
  const { basicDetails, backgroundDetails, physicalAttributes } = user;

  return {
    id: user.id,
    gender: basicDetails?.gender || null,
    dateOfBirth: basicDetails?.dateOfBirth || null,
    age: calculateAge(basicDetails?.dateOfBirth), // Calculate age
    religion: backgroundDetails?.religion || null,
    caste: backgroundDetails?.caste || null,
    bodyType: physicalAttributes?.bodyType || null,
    complexion: physicalAttributes?.complexion || null,
  };
}

// Function to calculate age from date of birth
function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return null;
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Adjust age if the birthday hasn't occurred yet this year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

// Calculate compatibility score based on various criteria
export function calculateCompatibilityScore(user, profile) {
  let score = 0;

  // Example scoring criteria
  if (user.gender !== profile.gender) score += 20; // Different genders
  if (user.religion && user.religion === profile.religion) score += 25;
  if (user.caste && user.caste === profile.caste) score += 15;
  if (user.bodyType && user.bodyType === profile.bodyType) score += 10;
  if (user.complexion && user.complexion === profile.complexion) score += 10;

  // Age compatibility: add points if within a compatible age range (e.g., within 5 years)
  const ageDifference = Math.abs(user.age - profile.age);
  if (ageDifference <= 5) score += 20;

  return score;
}
