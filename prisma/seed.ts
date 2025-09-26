import { PrismaClient, PropertyStatus } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  // Optional: clear old data (dev only)
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  // Hash passwords
  const hashedPassword1 = await argon2.hash("password123");
  const hashedPassword2 = await argon2.hash("admin123");

  // Create users
  const user1 = await prisma.user.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: hashedPassword1,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      password: hashedPassword2,
    },
  });

  await prisma.property.create({
    data: {
      title: "Luxury Apartment in City Center",
      description: "A spacious 3-bedroom apartment close to metro.",
      address: "123 Main Street, Colombo",
      price: 250000,
      type: "APARTMENT",
      status: PropertyStatus.ACTIVE,
      ownerId: user1.id,
      PropertyImage: {
        create: [
          {
            url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
            thumbnail: true,
            order: 1,
          },
          {
            url: "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg",
            thumbnail: false,
            order: 2,
          },
        ],
      },
    },
  });

  await prisma.property.create({
    data: {
      title: "Cozy House with Garden",
      description: "Perfect for a family, with big backyard.",
      address: "45 Green Road, Galle",
      price: 180000,
      type: "HOUSE",
      status: PropertyStatus.ACTIVE,
      ownerId: user2.id,
      PropertyImage: {
        create: [
          {
            url: "https://example.com/house1.jpg",
            thumbnail: true,
            order: 1,
          },
        ],
      },
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
