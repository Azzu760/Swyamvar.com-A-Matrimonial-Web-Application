export async function fetchRecommendedProfiles(userId) {
  try {
    const response = await fetch(`/api/user/recommendations?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching profiles: ${response.status}`);
    }

    const data = await response.json();

    // Include default connectionStatus for profiles without an existing connection
    return data.map((profile) => ({
      ...profile,
      connectionStatus: profile.connectionStatus || "connect",
    }));
  } catch (err) {
    console.error("Error fetching recommended profiles:", err);
    throw err;
  }
}

export async function updateConnectionStatus(userId, profileId, status) {
  try {
    const response = await fetch("/api/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, profileId, status }),
    });

    if (!response.ok) {
      throw new Error("Error updating connection status");
    }

    const updatedData = await response.json();

    // Ensure the updated status is returned
    return updatedData; // Expecting { status: "new_status" }
  } catch (err) {
    console.error("Error updating connection status:", err);
    throw err;
  }
}
