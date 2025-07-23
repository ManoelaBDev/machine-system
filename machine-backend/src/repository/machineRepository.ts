import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAll = () => prisma.machine.findMany();

export const create = (data: { name: string; tipo: string }) =>
  prisma.machine.create({ data });

export const update = (id: string, data: { name: string; tipo: string }) =>
  prisma.machine.update({
    where: { id },
    data,
  });

export const remove = (id: string) =>
  prisma.machine.delete({
    where: { id },
  });
