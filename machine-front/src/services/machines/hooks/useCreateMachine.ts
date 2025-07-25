"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewMachine } from "../api/machineService";
import { MachineRuleZod } from "@/schemas/machineSchema";

export function useCreateMachine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MachineRuleZod) => createNewMachine(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["machines"] });
    },
  });
}
