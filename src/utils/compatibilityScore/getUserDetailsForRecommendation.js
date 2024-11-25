export async function getUserDetailsForRecommendation(user) {
  const { basicDetails, backgroundDetails } = user;

  return {
    preferredPartner: basicDetails.preferredPartner,
    city: basicDetails.city,
    country: basicDetails.country,
    gender: basicDetails.gender,
    religion: backgroundDetails?.religion,
    caste: backgroundDetails?.caste,
  };
}
