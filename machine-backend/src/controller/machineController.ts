import { Request, Response } from "express";
import * as machineService from "../services/machineService";

export const getAll = async (_req: Request, res: Response) => {
  const machines = await machineService.getAll();
  res.json(machines);
};

export const create = async (req: Request, res: Response) => {
  const { name, tipo } = req.body;
  const machine = await machineService.create({ name, tipo });
  res.status(201).json(machine);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, tipo } = req.body;
  const machine = await machineService.update(id, { name, tipo });
  res.json(machine);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  await machineService.remove(id);
  res.status(204).send();
};
