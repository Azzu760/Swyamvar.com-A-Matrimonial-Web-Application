import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Validate required fields
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email and password are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ message: "Invalid email format." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check password length
    if (password.length < 8) {
      return new Response(
        JSON.stringify({
          message: "Password must be at least 8 characters long.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Retrieve user from the database based on email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        email: true,
        password: true,
        id: true,
      },
    });

    // Check if the user exists
    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid credentials." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: "Invalid credentials." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user.id }, // `user.id` is a string
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with success message, userId, and token
    return new Response(
      JSON.stringify({
        message: "Login successful",
        token,
        user: {
          email: user.email,
          id: user.id, // Returned as a string
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
