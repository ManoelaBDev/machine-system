import { z } from "zod";

export const createMachineSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    tipo: z.string().min(2),
  }),
});


