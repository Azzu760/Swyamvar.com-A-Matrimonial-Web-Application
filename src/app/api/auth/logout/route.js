export default async function handler(req, res) {
  if (req.method === "POST") {
    // Logic to clear any server-side sessions, cookies, or token invalidation
    // Example: res.clearCookie('yourSessionCookie'); // Clear cookie if using cookies
    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
