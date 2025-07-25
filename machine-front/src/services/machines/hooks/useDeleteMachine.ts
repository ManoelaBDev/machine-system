"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExistingMachine } from "../api/machineService";

export function useDeleteMachine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteExistingMachine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["machines"] });
    },
  });
}
