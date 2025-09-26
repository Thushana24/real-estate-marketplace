import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import handleError from "../../helpers/handleError";
import { PropertyQuerySchema } from "@/schemas/property.schema";
import getPaginationParams from "../../helpers/getPaginationParams";
import { getSearchQuery } from "../../helpers/getSearchQuery";
export async function GET(request: NextRequest) {
  try {
    const PaginationSchema = PropertyQuerySchema.omit({ search: true });
    const SearchSchema = PropertyQuerySchema.pick({ search: true });

    const { page, size } = getPaginationParams({
      request,
      schema: PaginationSchema,
    });

    const { search: searchText } = getSearchQuery({
      request,
      schema: SearchSchema,
    });

    const searchFilter: Prisma.PropertyWhereInput = searchText
      ? {
          OR: [
            { title: { contains: searchText, mode: "insensitive" } },
            { description: { contains: searchText, mode: "insensitive" } },
            { address: { contains: searchText, mode: "insensitive" } },
          ].map((condition) => ({
            ...condition,
          })) as Prisma.PropertyWhereInput[],
        }
      : {};

    const [properties, count] = await prisma.$transaction([
      prisma.property.findMany({
        where: {
          status: "ACTIVE",
          ...searchFilter,
        },
        include: {
          PropertyImage: true,
          Owner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        skip: (page - 1) * size,
        take: size,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.property.count({
        where: {
          status: "ACTIVE",
          ...searchFilter,
        },
      }),
    ]);

    return NextResponse.json(
      {
        items: properties,
        total: count,
        page,
        size,
        totalPages: Math.ceil(count / size),
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "Failed to fetch properties");
  }
}
