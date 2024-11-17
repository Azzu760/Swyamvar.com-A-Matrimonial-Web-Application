-- CreateEnum
CREATE TYPE "ConnectionStatus" AS ENUM ('pending', 'accepted', 'declined');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profilePicture" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasicDetails" (
    "userId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "maritalStatus" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "preferredPartner" TEXT,

    CONSTRAINT "BasicDetails_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "BackgroundDetails" (
    "userId" INTEGER NOT NULL,
    "religion" TEXT NOT NULL,
    "caste" TEXT NOT NULL,
    "motherTongue" TEXT NOT NULL,
    "community" TEXT NOT NULL,
    "educationLevel" TEXT NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "annualIncome" TEXT NOT NULL,

    CONSTRAINT "BackgroundDetails_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "PhysicalAttributes" (
    "userId" INTEGER NOT NULL,
    "height" DOUBLE PRECISION,
    "bodyType" TEXT,
    "complexion" TEXT,
    "physicalDisability" BOOLEAN NOT NULL DEFAULT false,
    "hairColor" TEXT,
    "eyeColor" TEXT,
    "weight" DOUBLE PRECISION,
    "skinTone" TEXT,

    CONSTRAINT "PhysicalAttributes_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "AdditionalDetails" (
    "userId" INTEGER NOT NULL,
    "diet" TEXT,
    "smokingHabits" TEXT,
    "hobbiesAndInterests" TEXT,
    "astrologicalSign" TEXT,
    "bio" TEXT,
    "socialMediaLinks" JSONB,

    CONSTRAINT "AdditionalDetails_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Connection" (
    "id" SERIAL NOT NULL,
    "requesterId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "status" "ConnectionStatus" NOT NULL DEFAULT 'pending',
    "connectedAt" TIMESTAMP(3),

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "notificationType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "userId" INTEGER NOT NULL,
    "minAge" INTEGER,
    "maxAge" INTEGER,
    "preferredReligion" TEXT,
    "preferredCaste" TEXT,
    "preferredBodyType" TEXT,
    "preferredComplexion" TEXT,
    "preferredCountry" TEXT,
    "preferredCity" TEXT,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserStatus" (
    "userId" INTEGER NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "lastSeen" TIMESTAMP(3),

    CONSTRAINT "UserStatus_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "BasicDetails_userId_key" ON "BasicDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BackgroundDetails_userId_key" ON "BackgroundDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PhysicalAttributes_userId_key" ON "PhysicalAttributes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdditionalDetails_userId_key" ON "AdditionalDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserStatus_userId_key" ON "UserStatus"("userId");

-- AddForeignKey
ALTER TABLE "BasicDetails" ADD CONSTRAINT "BasicDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackgroundDetails" ADD CONSTRAINT "BackgroundDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalAttributes" ADD CONSTRAINT "PhysicalAttributes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalDetails" ADD CONSTRAINT "AdditionalDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStatus" ADD CONSTRAINT "UserStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
