"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MachineFormContainer from "@/components/containers/MachineFormContainer";
import { Machine } from "@/services/machines/api/types";
import axios from "axios";
import { CircularProgress, Alert, Box } from "@mui/material";


export default function EditMachinePage() {
    const searchParams = useSearchParams();
    const id = searchParams?.get("id") ?? undefined;

    const [machine, setMachine] = useState<Machine | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("ID da máquina não fornecido");
            setLoading(false);
            return;
        }

        const fetchMachine = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3333/machines/${id}`);
                setMachine(response.data);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(`Erro ao buscar máquina: ${err.response?.data?.message || err.message}`);
                } else {
                    setError("Erro desconhecido ao buscar máquina");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchMachine();
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!machine) {
        return <Alert severity="warning">Máquina não encontrada</Alert>;
    }

    return (
        <>
            <h1>Editar Máquina</h1>
            <MachineFormContainer initialData={machine} isEdit />
        </>
    );
}
