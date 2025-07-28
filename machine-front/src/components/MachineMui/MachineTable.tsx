"use client";

import * as React from "react";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import MachineRow from "./MachineRow";
import MachineForm from "./MachineForm";
import { useMachines } from "@/services/machines/hooks/useMachines";
import { useCreateMachine } from "@/services/machines/hooks/useCreateMachine";
import { useDeleteMachine } from "@/services/machines/hooks/useDeleteMachine";
import { Machine } from "@/services/machines/api/types";

export default function MachineTable() {
    const [machineToDelete, setMachineToDelete] = React.useState<Machine | null>(null);
    const [machineToEdit, setMachineToEdit] = React.useState<Machine | null>(null);
    const [isFormOpen, setIsFormOpen] = React.useState(false);

    const { data: machines = [], isLoading } = useMachines();
    const createMachine = useCreateMachine();
    const deleteMachine = useDeleteMachine();

    const handleDeleteRequest = (machine: Machine) => {
        setMachineToDelete(machine);
    };

    const confirmDelete = () => {
        if (!machineToDelete) return;
        deleteMachine.mutate(machineToDelete.id);
        setMachineToDelete(null);
    };

    const handleEditRequest = (machine: Machine) => {
        setMachineToEdit(machine);
        setIsFormOpen(true);
    };

    const handleAddRequest = () => {
        setMachineToEdit(null);
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
    };

    const handleFormSubmit = async (formData: Omit<Machine, "id">) => {
        if (machineToEdit) {
        } else {
            createMachine.mutate(formData);
        }
        setIsFormOpen(false);
    };

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", py: 2, gap: 1.5, flexWrap: "wrap" }}>
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Buscar por máquina</FormLabel>
                    <Input size="sm" placeholder="Buscar" startDecorator={<SearchIcon />} />
                </FormControl>
            </Box>

            <Sheet
                className="MachineTableContainer"
                variant="outlined"
                sx={{
                    width: "100%",
                    borderRadius: "sm",
                    flexShrink: 1,
                    overflow: "auto",
                    minHeight: 0,
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{
                        "--TableCell-headBackground": "var(--joy-palette-background-level1)",
                        "--Table-headerUnderlineThickness": "1px",
                        "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
                        "--TableCell-paddingY": "12px",
                        "--TableCell-paddingX": "16px",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: 240 }}>Nome da Máquina</th>
                            <th style={{ width: 200 }}>Tipo</th>
                            <th style={{ width: 140 }}>Status</th>
                            <th style={{ width: 80, textAlign: "center" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={4} style={{ textAlign: "center", padding: 16 }}>
                                    Carregando máquinas...
                                </td>
                            </tr>
                        ) : (
                            machines.map((machine) => (
                                <MachineRow
                                    key={machine.id}
                                    machine={machine}
                                    onEdit={handleEditRequest}
                                    onDelete={handleDeleteRequest}
                                />
                            ))
                        )}
                    </tbody>
                </Table>
            </Sheet>

            <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
                <Button startDecorator={<AddIcon />} onClick={handleAddRequest}>
                    Adicionar Nova Máquina
                </Button>
            </Box>

            <Modal open={!!machineToDelete} onClose={() => setMachineToDelete(null)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRoundedIcon /> Confirmação de Exclusão
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Tem certeza que deseja deletar a máquina "{machineToDelete?.name}"?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={confirmDelete}>
                            Deletar
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => setMachineToDelete(null)}>
                            Cancelar
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>

            <MachineForm
                open={isFormOpen}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
                initialData={machineToEdit}
            />
        </>
    );
}