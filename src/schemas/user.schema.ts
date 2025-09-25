import { z } from "zod";

const RegisterUserSchema = z
  .object({
    firstName: z
      .string({ required_error: "First name is required" })
      .min(2, { message: "First name must be at least 2 characters long" })
      .max(50, { message: "First name cannot exceed 50 characters" })
      .trim()
      .regex(/^[a-zA-Z\s-]+$/, {
        message: "First name can only contain letters, spaces, and hyphens",
      }),

    lastName: z
      .string({ required_error: "Last name is required" })
      .min(2, { message: "Last name must be at least 2 characters long" })
      .max(50, { message: "Last name cannot exceed 50 characters" })
      .trim()
      .regex(/^[a-zA-Z\s-]+$/, {
        message: "Last name can only contain letters, spaces, and hyphens",
      }),

    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email format" })
      .max(255, { message: "Email cannot exceed 255 characters" })
      .trim()
      .toLowerCase(),

    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(100, { message: "Password cannot exceed 100 characters" })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((val) => /\d/.test(val), {
        message: "Password must contain at least one number",
      })
      .refine((val) => /[!@#$%^&*]/.test(val), {
        message:
          "Password must contain at least one special character (!@#$%^&*)",
      })
      .refine((val) => /^[A-Za-z\d!@#$%^&*]+$/.test(val), {
        message:
          "Password can only contain letters, numbers, and special characters (!@#$%^&*)",
      }),
    confirmPassword: z.string(),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirm password"],
  });

const LoginUserSchema = z.object({
  email: z
    .string()
    .max(255, "Email must be at most 255 characters long")
    .email("Invalid email format")
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .trim(),
});

export { RegisterUserSchema, LoginUserSchema };
