"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExistingMachine } from "../api/machineService";
import { MachineRuleZod } from "@/schemas/machineSchema";

export function useUpdateMachine() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: MachineRuleZod & { id: string }) => {
            const { id, ...rest } = data;
            return updateExistingMachine(id, rest);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["machines"] });
        },
    });
}
