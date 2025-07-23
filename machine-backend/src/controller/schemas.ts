import { z } from 'zod';

export const get = z.object({
  params: z.object({
    enterpriseId: z.string().trim().uuid()
  })
}); 