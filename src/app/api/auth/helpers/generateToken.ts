import jwt from "jsonwebtoken";

export default function generateToken(id: number) {
  try {
    const token = jwt.sign({ id }, process?.env?.JWT_SECRET || " ", {
      expiresIn: "30m",
    });
    return token;
  } catch {
    throw {
      code: "error-generating-jwt",
      message: "failed to generate jwt token",
    };
  }
}
