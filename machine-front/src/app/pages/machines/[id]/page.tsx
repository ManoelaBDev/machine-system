"use client";

import { useEffect, useState } from "react";
import { Machine } from "@/services/machines/api/types";
import { CircularProgress, Alert, Box } from "@mui/material";
import MachineFormContainer from "@/components/containers/MachineFormContainer";

interface EditProps {
    params: {
        id: string
    }
}

export default function EditMachinePage(props: EditProps) {
    const { params } = props;
    // const id = JSON.stringify(props.params?.id)

    const [machine, setMachine] = useState<Machine | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    // useEffect(() => {
    //     console.log("ID da máquina:", id);
    //     if (!id) {
    //         setError("ID da máquina não fornecido");
    //         setLoading(false);
    //         return;
    //     }

    //     const fetchMachine = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await axios.get(`${API_BASE_URL}/machines/${id}`);
    //             setMachine(response.data);
    //         } catch (err) {
    //             if (axios.isAxiosError(err)) {
    //                 setError(`Erro ao buscar máquina: ${err.response?.data?.message || err.message}`);
    //             } else {
    //                 setError("Erro desconhecido ao buscar máquina");
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchMachine();
    // }, [id]);

    useEffect(() => {
        const teste = async () => {
            const parametros = await params;
            console.log(parametros)
        }
        teste();
    }, []);

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
