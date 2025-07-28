"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { machineSchema, MachineRuleZod } from "@/schemas/machineSchema";

interface ModalFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitData: (data: MachineRuleZod) => void;
    initialData?: MachineRuleZod | null;
}

export default function ModalForm({ isOpen, onClose, onSubmitData, initialData }: ModalFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<MachineRuleZod>({
        resolver: zodResolver(machineSchema),
        defaultValues: initialData || {
            name: "",
            tipo: "",
            status: "Online",
        },
    });

    React.useEffect(() => {
        reset(initialData || {
            name: "",
            tipo: "",
            status: "Online",
        });
    }, [initialData, reset]);

    const handleFormSubmit = (data: MachineRuleZod) => {
        onSubmitData(data);
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md w-96 shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                    aria-label="Fechar"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4">{initialData ? "Editar Máquina" : "Adicionar Máquina"}</h2>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Nome da Máquina"
                            {...register("name")}
                            className="border p-2 rounded w-full"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Tipo"
                            {...register("tipo")}
                            className="border p-2 rounded w-full"
                        />
                        {errors.tipo && <p className="text-red-500 text-sm">{errors.tipo.message}</p>}
                    </div>

                    <div>
                        <select {...register("status")} className="border p-2 rounded w-full">
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                            <option value="Manutenção">Manutenção</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        {initialData ? "Salvar" : "Adicionar"}
                    </button>
                </form>
            </div>
        </div>
    );
}
