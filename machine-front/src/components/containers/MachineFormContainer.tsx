"use client";

import MachineForm from "@/components/Machine/MachineForm";
import { useCreateMachine } from "@/services/machines/hooks/useCreateMachine";
import { useUpdateMachine } from "@/services/machines/hooks/useUpdateMachine";
import { useRouter } from "next/navigation";
import { MachineRuleZod } from "@/schemas/machineSchema";
import { useState } from "react";
import { Machine } from "@/services/machines/api/types";

interface Props {
    initialData?: Machine;
    isEdit?: boolean;
}

export default function MachineFormContainer({ initialData, isEdit = false }: Props) {
    const router = useRouter();

    const createMutation = useCreateMachine();
    const updateMutation = useUpdateMachine(initialData?.id ?? "");

    const [formLoading, setFormLoading] = useState(false);

    const onSubmit = async (data: MachineRuleZod) => {
        setFormLoading(true);
        try {
            if (isEdit && initialData) {
                await updateMutation.mutateAsync(data);
            } else {
                await createMutation.mutateAsync(data);
            }
            router.push("/machines");
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <MachineForm
            defaultValues={initialData}
            onSubmit={onSubmit}
            isLoading={formLoading || createMutation.isLoading || updateMutation.isLoading}
        />
    );
}
