"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllMachines } from '../api/machineService';

export function useMachines() {
  return useQuery({
    queryKey: ["machines"],
    queryFn: getAllMachines,
  });
}
