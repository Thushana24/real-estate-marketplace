import { PropertyStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import privateRoute from "../../helpers/privateRoute";
import handleError from "../../helpers/handleError";
import { PropertySchema } from "@/schemas/property.schema";

/**
 * @route POST /api/blog
 * @desc Create a new blog
 * @access Public
 */
export async function POST(request: NextRequest) {
  return privateRoute(request, async (user) => {
    try {
      const body = await request.json();
      const userId = user?.id;
      const validatedData = PropertySchema.parse(body);

      const { title, description, address, price, type, PropertyImage } =
        validatedData;

      const newProperty = await prisma?.property.create({
        data: {
          title: title,
          description: description ?? null,
          address: address,
          price: price,
          type: type,
          status: PropertyStatus.ACTIVE,
          ownerId: userId,

          PropertyImage: {
            create: PropertyImage?.map((img) => ({
              url: img.url,
              thumbnail: img.thumbnail ?? false,
              order: img.order ?? 1,
            })),
          },
        },
        include: {
          PropertyImage: true,
        },
      });

      return NextResponse.json(
        {
          success: true,
          data: newProperty,
          message: "Property created successfully.",
        },
        { status: 201 }
      );
    } catch (error) {
      return handleError(error, "Failed to create property");
    }
  });
}
