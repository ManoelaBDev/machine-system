import { z } from "zod";

export const machineSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Nome precisa de ao menos 3 caracteres" }),
    tipo: z
        .string(),
});

export type MachineRuleZod = z.infer<typeof machineSchema>;