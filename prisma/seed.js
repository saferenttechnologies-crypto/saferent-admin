import bcrypt from "bcrypt";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const adminEmail = "admin@saferenttechnologies.com";

  const existingAdmin = await prisma.admin.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (existingAdmin) {
    console.log("ℹ️ Super Admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("Shabeer@124", 12);

  await prisma.admin.create({
    data: {
      fullName: "SafeRent Super Admin",
      email: adminEmail,
      passwordHash: hashedPassword,
      role: "SUPER_ADMIN",
      isActive: true,
      isVerified: true,
    },
  });

  console.log("✅ Super Admin created successfully.");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });