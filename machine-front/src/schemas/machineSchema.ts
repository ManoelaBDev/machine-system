import { z } from "zod";

export const machineSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Nome da máquina precisa ser fornecido" }),
    tipo: z
        .string()
        .min(1, { message: "Tipo da máquina precisa ser fornecido" }),
    status: z
        .string()
        .min(1, { message: "Status precisa ser fornecido" }),
});

export type MachineRuleZod = z.infer<typeof machineSchema>;