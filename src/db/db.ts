import { PrismaClient } from "@prisma/client";

const PrismaClientSinglton = () => {
  return new PrismaClient();
}

declare global {
  var prisma: undefined | ReturnType<typeof PrismaClientSinglton>
}

const db = globalThis.prisma ?? PrismaClientSinglton()

export default db

if(process.env.NODE_ENV !== 'production') globalThis.prisma = db