import { LoginUserSchema } from "@/schemas/user.schema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verify } from "argon2";
import generateToken from "../../helpers/generateToken";
import handleError from "../../helpers/handleError";

/**
 * @route POST /api/auth/login
 * @desc Handle user login request and return a success response
 * @access Public
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = LoginUserSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const invalidCredientialsResponse = NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_CREDIENTIALS",
          message: "invalid email or password",
        },
      },
      { status: 401 }
    );

    if (!user) {
      return invalidCredientialsResponse;
    }

    const isPassowordValid = await verify(user.password, password);

    if (!isPassowordValid) {
      return invalidCredientialsResponse;
    }

    const token = generateToken(user.id);

    const { password: _, ...userData } = user;

    return NextResponse.json(
      {
        success: true,
        data: {
          user: userData,
          token,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error, "failed to authenticate user");
  }
}
