import * as machineRepository from "../repository/machineRepository";

export const getListar = () => machineRepository.getListar();

export const newMaquina = (data: { name: string; tipo: string }) =>
  machineRepository.newMaquina(data);

export const update = (id: string, data: { name: string; tipo: string }) =>
  machineRepository.update(id, data);

export const deleteMaquina = (id: string) => machineRepository.deleteMaquina(id);
