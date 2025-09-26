import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function privateRoute(
  _: NextRequest,
  cb: (user: { id: number }, token: string) => Promise<NextResponse>
) {
  try {
    const authorization = (await headers()).get("Authorization");
    const token = authorization?.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "MISSING_AUTH_TOKEN",
            message: "Authorization token is required",
          },
        },
        { status: 401 }
      );
    }

    jwt.verify(token, process.env.JWT_SECRET!);
    const decodedToken = jwt.decode(token) as JwtPayload & { id: number };

    return cb(decodedToken, token);
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code:
              error instanceof TokenExpiredError
                ? "TOKEN_EXPIRED"
                : "INVALID_TOKEN",
            message: error.message,
          },
        },
        { status: 401 }
      );
    }

    // Handle unexpected errors
    console.error("Unexpected error in privateRoute:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "An unexpected error occurred",
          ...(process.env.NODE_ENV === "development" && {
            details: error instanceof Error ? error.message : String(error),
          }),
        },
      },
      { status: 500 }
    );
  }
}
