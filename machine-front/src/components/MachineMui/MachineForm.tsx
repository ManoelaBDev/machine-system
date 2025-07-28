"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Button,
  Typography,
} from "@mui/joy";

import { Machine } from "./MachineTable";
import { machineSchema, MachineRuleZod } from "@/schemas/machineSchema";
import { useCreateMachine } from "@/services/machines/hooks/useCreateMachine";
import { useUpdateMachine } from "@/services/machines/hooks/useUpdateMachine";

interface MachineFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Machine, "id">) => void;
  initialData?: Machine | null;
}

export default function MachineForm({ open, onClose, onSubmit, initialData, }: MachineFormProps) {
  const { register, handleSubmit, reset, formState: { errors }, setValue, } =
    useForm<MachineRuleZod>({
      resolver: zodResolver(machineSchema),
      defaultValues: {
        name: "",
        tipo: "",
      },
    });

  const createMachine = useCreateMachine();
  const updateMachine = useUpdateMachine();

  React.useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        tipo: initialData.tipo,
      });
    } else {
      reset({
        name: "",
        tipo: "",
      });
    }
  }, [initialData, reset]);

  const onFormSubmit: SubmitHandler<MachineRuleZod> = async (data) => {
    try {
      if (initialData) {
        await updateMachine.mutateAsync({ ...data, id: initialData.id });
      } else {
        await createMachine.mutateAsync(data);
      }
      onClose();
    } catch (error) {
      console.error("Erro ao salvar máquina:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <DialogTitle>
          {initialData ? "Editar Máquina" : "Adicionar Nova Máquina"}
        </DialogTitle>
        <DialogContent>Preencha os detalhes da máquina abaixo.</DialogContent>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Stack spacing={2}>
            <FormControl required error={!!errors.name}>
              <FormLabel>Nome da Máquina</FormLabel>
              <Input autoFocus {...register("name")} />
              {errors.name && (
                <Typography color="danger" level="body-xs">
                  {errors.name.message}
                </Typography>
              )}
            </FormControl>

            <FormControl required error={!!errors.tipo}>
              <FormLabel>Tipo</FormLabel>
              <Input {...register("tipo")} />
              {errors.tipo && (
                <Typography color="danger" level="body-xs">
                  {errors.tipo.message}
                </Typography>
              )}
            </FormControl>

            <Stack
              direction="row"
              spacing={2}
              sx={{ pt: 2, justifyContent: "flex-end" }}
            >
              <Button type="button" variant="plain" color="neutral" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" loading={createMachine.isPending || updateMachine.isPending}>
                {initialData ? "Salvar Alterações" : "Adicionar"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
