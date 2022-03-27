import { PrismaClient } from "@prisma/client";

export let noorPrisma: PrismaClient;

declare global {
  var noorDb: PrismaClient;
}

if (process.env.NODE_ENV === "production") {
  noorPrisma = new PrismaClient();
} else {
  if (!global.noorDb) {
    global.noorDb = new PrismaClient();
  }
  noorPrisma = global.noorDb;
}

// Functions
export function getAllUsers() {
  return noorPrisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
