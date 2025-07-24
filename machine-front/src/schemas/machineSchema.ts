import { z } from "zod";

export const machineSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Nome precisa de ao menos 3 caracteres" }),
    tipo: z
        .string(),
});

export type Machine = z.infer<typeof machineSchema>;