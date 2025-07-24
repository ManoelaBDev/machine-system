import { z } from "zod";

export const machineIdSchemas = z.object({
  params: z.object({
    id: z.string().uuid(), 
  }),
});