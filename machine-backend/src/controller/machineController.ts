import { Request, Response } from "express";
import * as machineService from "../services/machineService";

export const getListar = async (_req: Request, res: Response) => {
  const machines = await machineService.getListar();
  res.json(machines);
};

export const newMaquina = async (req: Request, res: Response) => {
  const { name, tipo } = req.body;
  const machine = await machineService.newMaquina({ name, tipo });
  res.status(201).json(machine);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, tipo } = req.body;
  const machine = await machineService.update(id, { name, tipo });
  res.json(machine);
};

export const deleteMaquina = async (req: Request, res: Response) => {
  const { id } = req.params;
  await machineService.deleteMaquina(id);
  res.status(204).send();
};
