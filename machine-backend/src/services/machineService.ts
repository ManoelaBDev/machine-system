import * as machineRepository from "../repository/machineRepository";

export const getAll = () => machineRepository.getAll();

export const create = (data: { name: string; tipo: string }) =>
  machineRepository.create(data);

export const update = (id: string, data: { name: string; tipo: string }) =>
  machineRepository.update(id, data);

export const remove = (id: string) => machineRepository.remove(id);
