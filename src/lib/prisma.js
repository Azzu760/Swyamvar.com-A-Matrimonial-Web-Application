import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
    global.prisma.$connect(); // Connect in development environment once
  }
  prisma = global.prisma;
}

export default prisma;
