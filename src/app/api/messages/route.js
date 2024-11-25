import prisma from "../../../lib/prisma";

// POST - Create a new message
export async function POST(req) {
  const { senderId, receiverId, message } = await req.json();

  try {
    // Create the new message in the database
    const newMessage = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        message,
      },
    });

    // Query all messages between the sender and receiver
    const allMessages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: senderId,
            receiverId: receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      },
      orderBy: {
        sentAt: "asc", // Ensure messages are ordered by the time they were created
      },
    });

    // Respond with the new message and all previous messages between the users
    return new Response(JSON.stringify({ newMessage, allMessages }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating message:", error);
    return new Response(JSON.stringify({ error: "Error creating message" }), {
      status: 500,
    });
  }
}

// GET - Retrieve all messages between two users
export async function GET(req) {
  const { senderId, receiverId } = req.url.searchParams;

  try {
    // Query all messages between the sender and receiver
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: senderId,
            receiverId: receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      },
      orderBy: {
        sentAt: "asc", // Ensure messages are ordered by the time they were created
      },
    });

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new Response(JSON.stringify({ error: "Error fetching messages" }), {
      status: 500,
    });
  }
}
