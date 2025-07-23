import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export const zodValidator =
  (schema:ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    next();
  };
