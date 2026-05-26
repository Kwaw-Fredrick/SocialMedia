import { PrismaClient } from "@prisma/client";

export const db = global.db || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.db = db;
}