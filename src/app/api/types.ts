import { LoginUserSchema, RegisterUserSchema } from "@/schemas/user.schema";
import { PropertyStatus, PropertyType } from "@prisma/client";
import z from "zod";

export type RegisterInput = z.infer<typeof RegisterUserSchema>;
export type LoginInput = z.infer<typeof LoginUserSchema>;
export type PropertyInput = {
  title: string;
  description?: string | null;
  address: string;
  price: number;
  type: PropertyType;
  status?: PropertyStatus;
  PropertyImage?: {
    url: string;
    thumbnail?: boolean;
    order?: number;
  }[];
};
