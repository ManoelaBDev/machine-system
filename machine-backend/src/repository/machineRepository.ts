import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getListar = () => prisma.machine.findMany();

export const newMaquina = (data: { name: string; tipo: string, status: string }) =>
  prisma.machine.create({ data });

export const update = (id: string, data: { name: string; tipo: string, status: string }) =>
  prisma.machine.update({
    where: { id },
    data,
  });

export const deleteMaquina = (id: string) =>
  prisma.machine.delete({
    where: { id },
  });
