import prisma from "@/lib/prisma";
import { RegisterUserSchema } from "@/schemas/user.schema";
import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = RegisterUserSchema.parse(body);

    const isUserExist = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    if (isUserExist) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "USER_ALREADY_EXISTS",
            message: "User is already exist",
          },
        },
        { status: 409 }
      );
    }

    const { firstName, lastName, email, password } = validatedData;

    const hashedPassword = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userResponse } = user;

    return NextResponse.json(
      {
        success: true,
        data: {
          user: {
            ...userResponse,
          },
        },
        message: "User created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to register user" },
      { status: 500 }
    );
  }
}
