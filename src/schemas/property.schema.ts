import { z } from "zod";
import { PropertyType, PropertyStatus } from "@prisma/client";

const PropertyImageSchema = z.object({
  url: z.string({ required_error: "Image URL is required" }).url("Invalid URL"),
  thumbnail: z.boolean().optional().default(false),
  order: z
    .number()
    .min(1, { message: "Order must be at least 1" })
    .optional()
    .default(1),
});

const PropertySchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title cannot exceed 100 characters" })
    .trim(),

  description: z
    .string()
    .max(1000, { message: "Description cannot exceed 1000 characters" })
    .optional()
    .nullable(),

  address: z
    .string({ required_error: "Address is required" })
    .max(255, { message: "Address cannot exceed 255 characters" })
    .trim(),

  price: z
    .number({ required_error: "Price is required" })
    .positive({ message: "Price must be a positive number" }),

  type: z.nativeEnum(PropertyType, {
    required_error: "Property type is required",
  }),

  status: z
    .nativeEnum(PropertyStatus)
    .optional()
    .default(PropertyStatus.ACTIVE),

  PropertyImage: z.array(PropertyImageSchema).optional().default([]),
});

const PropertyQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Page must be a positive number",
    }),
  size: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 25))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Size must be a positive number",
    }),
  search: z.string().optional(),
});
export { PropertySchema, PropertyImageSchema, PropertyQuerySchema };
