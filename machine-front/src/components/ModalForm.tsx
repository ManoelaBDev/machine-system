'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const schema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    tipo: z.string().min(1, 'Tipo é obrigatório'),
    disponibilidade: z.enum(['disponivel', 'indisponivel']),
});

type FormData = z.infer<typeof schema>;

interface ModalFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitData: (data: FormData) => void;
}

export default function ModalForm({ isOpen, onClose, onSubmitData }: ModalFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            nome: '',
            tipo: '',
            disponibilidade: 'disponivel',
        },
    });

    const handleFormSubmit = (data: FormData) => {
        onSubmitData(data);
        reset(); // limpa o formulário
        onClose(); // fecha modal
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md w-96 shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4">Formulário</h2>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Nome"
                            {...register('nome')}
                            className="border p-2 rounded w-full"
                        />
                        {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Tipo"
                            {...register('tipo')}
                            className="border p-2 rounded w-full"
                        />
                        {errors.tipo && <p className="text-red-500 text-sm">{errors.tipo.message}</p>}
                    </div>

                    <div>
                        <select {...register('disponibilidade')} className="border p-2 rounded w-full">
                            <option value="disponivel">Disponível</option>
                            <option value="indisponivel">Indisponível</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}
