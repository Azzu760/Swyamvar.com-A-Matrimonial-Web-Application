import prisma from "../../../lib/prisma";

export async function POST(req) {
  try {
    const { userId, verificationCode } = await req.json();
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found." }), {
        status: 404,
      });
    }

    if (user.verificationCode !== verificationCode) {
      return new Response(
        JSON.stringify({ message: "Invalid verification code." }),
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Verification failed:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error.",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
