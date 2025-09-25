import { NextResponse } from "next/server";
import { z } from "zod";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export type CustomError = {
  success: boolean;
  error: {
    code: string;
    message: string;
    errors?: Record<string, unknown>[];
  };
};

export default function handleError(error: any, defaultMessage: string) {
  console.error(defaultMessage, error);

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "validation-failed",
          message: "Validation failed.",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
      },
      { status: 400 }
    );
  }

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

  return NextResponse.json(
    { code: "server-error", message: defaultMessage },
    { status: 500 }
  );
}
