"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExistingMachine } from "../api/machineService";
import { MachineRuleZod } from "@/schemas/machineSchema";

export function useUpdateMachine(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: MachineRuleZod) => updateExistingMachine(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["machines"] });
        },
    });
}
