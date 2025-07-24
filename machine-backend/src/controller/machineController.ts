import { Request, Response } from "express";
import * as machineService from "../services/machineService";

export const getListar = async (req: Request, res: Response) => {
 try {
  const machines = await machineService.getListar();
  res.status(200).json(machines);
 } catch (error) {
  console.error("deu ruim :( ", error)
 } 
};

export const newMaquina = async (req: Request, res: Response) => {
  try {
     const { name, tipo } = req.body;
    const machine = await machineService.newMaquina({ name, tipo });
     res.status(201).json(machine);
  } catch (error) {
    console.log("erro ao adicionar maquina", error)
  }
 
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
  const { name, tipo } = req.body;
  const machine = await machineService.update(id, { name, tipo });
  res.json(machine);
  } catch (error) {
    console.log("erro ao atualizar maquina", error)
  }
};

export const deleteMaquina = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
  await machineService.deleteMaquina(id);
  res.status(204).send();
  } catch (error) {
    console.log("erro ao excluir maquina", error)
  }
};
