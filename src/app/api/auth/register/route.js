import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      countryCode,
      phone,
      gender,
      dateOfBirth,
      maritalStatus,
      country,
      city,
      preferredPartner,
      religion,
      caste,
      motherTongue,
      community,
      educationLevel,
      fieldOfStudy,
      profession,
      annualIncome,
      height,
      bodyType,
      complexion,
      physicalDisability,
      hairColor,
      eyeColor,
      weight,
      skinTone,
      diet,
      smokingHabits,
      hobbiesAndInterests,
      astrologicalSign,
      bio,
      facebookLink,
      instagramLink,
      twitterLink,
    } = await request.json();

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      return NextResponse.json(
        { message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          countryCode,
          phone,
        },
      });

      await prisma.basicDetails.create({
        data: {
          userId: user.id,
          firstName,
          lastName,
          gender,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          maritalStatus,
          country,
          city,
          preferredPartner,
        },
      });

      await prisma.backgroundDetails.create({
        data: {
          userId: user.id,
          religion,
          caste,
          motherTongue,
          community,
          educationLevel,
          fieldOfStudy,
          profession,
          annualIncome,
        },
      });

      await prisma.physicalAttributes.create({
        data: {
          userId: user.id,
          height: parseFloat(height),
          bodyType,
          complexion,
          physicalDisability,
          hairColor,
          eyeColor,
          weight: parseFloat(weight),
          skinTone,
        },
      });

      await prisma.additionalDetails.create({
        data: {
          userId: user.id,
          diet,
          smokingHabits,
          hobbiesAndInterests,
          astrologicalSign,
          bio,
          facebookLink,
          instagramLink,
          twitterLink,
        },
      });

      return user;
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json(
      { message: "User created successfully", token },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "Email or phone number already registered." },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
