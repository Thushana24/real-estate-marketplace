import { PropertySchema } from "@/schemas/property.schema";
import { LoginUserSchema, RegisterUserSchema } from "@/schemas/user.schema";
import z from "zod";

export type RegisterInput = z.infer<typeof RegisterUserSchema>;
export type LoginInput = z.infer<typeof LoginUserSchema>;
export type PropertyInput = z.infer<typeof PropertySchema>;
