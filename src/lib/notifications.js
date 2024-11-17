import prisma from "./prisma";

export const sendNotification = async (userId, message, notificationType) => {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        message,
        notificationType,
      },
    });
    console.log("Notification sent:", notification);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
