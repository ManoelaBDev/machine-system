"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { machineSchema, MachineRuleZod } from "@/schemas/machineSchema";
import { TextField, Button, Stack } from "@mui/material";

interface Props {
    defaultValues?: MachineRuleZod;
    onSubmit: (data: MachineRuleZod) => void;
    isLoading?: boolean;
}

export default function MachineForm({ defaultValues, onSubmit, isLoading }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MachineRuleZod>({
        resolver: zodResolver(machineSchema),
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
                <TextField
                    label="Nome"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    fullWidth
                    disabled={isLoading}
                />
                <TextField
                    label="Tipo"
                    {...register("tipo")}
                    error={!!errors.tipo}
                    helperText={errors.tipo?.message}
                    fullWidth
                    disabled={isLoading}
                />
                <Button type="submit" variant="contained" disabled={isLoading}>
                    {isLoading ? "Salvando..." : "Salvar"}
                </Button>
            </Stack>
        </form>
    );
}
