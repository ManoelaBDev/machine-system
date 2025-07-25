import { Machine } from "@/services/machines/api/types";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { useDeleteMachine } from "@/services/machines/hooks/useDeleteMachine";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
    machine: Machine;
}

export default function MachineRow({ machine }: Props) {
    const router = useRouter();
    const deleteMutation = useDeleteMachine();
    const [openDialog, setOpenDialog] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync(machine.id);
            setOpenDialog(false);
        } catch (error) {
            console.error("Erro ao deletar máquina:", error);
        }
    };

    return (
        <>
            <TableRow>
                <TableCell>{machine.name}</TableCell>
                <TableCell>{machine.tipo}</TableCell>
                <TableCell>
                    <IconButton
                        aria-label="Editar"
                        onClick={() => router.push(`/pages/machines/[id]/${machine.id}`)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Deletar" onClick={() => setOpenDialog(true)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Confirma exclusão?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja excluir a máquina {machine.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button onClick={handleDelete} color="error" disabled={deleteMutation.isLoading}>
                        {deleteMutation.isLoading ? "Excluindo..." : "Excluir"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
