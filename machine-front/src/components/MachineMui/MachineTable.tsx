'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

// Importando os novos componentes filhos
import MachineRow from './MachineRow';
import MachineForm from './MachineForm';

// --- Tipos e Dados de Exemplo ---
// Em um projeto real, isso viria de um arquivo de tipos compartilhado
export type MachineStatus = 'Online' | 'Offline' | 'Manutenção';
export type Machine = {
    id: string;
    name: string;
    status: MachineStatus;
    tipo: string;
};

const exampleMachines: Machine[] = [
    { id: String(crypto.randomUUID()), name: 'Torno Mecânico TMB-500 Bumafer', status: 'Online', tipo: 'Torno Mecânico' },
    { id: String(crypto.randomUUID()), name: 'Centro de Usinagem VARIAXIS i-500', status: 'Online', tipo: 'Centro de Usinagem CNC' },
    { id: String(crypto.randomUUID()), name: 'TORNO CNC ROMI CENTUR 30D', status: 'Offline', tipo: 'Torno CNC' },
    { id: String(crypto.randomUUID()), name: 'CURVADORA CT 65', status: 'Manutenção', tipo: 'Curvadora de Tubos CNC' },
    { id: String(crypto.randomUUID()), name: 'Máquina de quinagem elétrica pura série BDE', status: 'Online', tipo: 'Dobradeira de chapas CNC' },
];

// --- Componente Principal da Tabela ---
export default function MachineTable() {
    // --- Estados ---
    const [machines, setMachines] = React.useState(exampleMachines);
    const [machineToDelete, setMachineToDelete] = React.useState<Machine | null>(null);
    const [machineToEdit, setMachineToEdit] = React.useState<Machine | null>(null);
    const [isFormOpen, setIsFormOpen] = React.useState(false);

    // --- Handlers de Ações ---
    const handleDeleteRequest = (machine: Machine) => {
        setMachineToDelete(machine);
    };

    const confirmDelete = () => {
        if (!machineToDelete) return;
        setMachines((prevMachines) =>
            prevMachines.filter((m) => m.id !== machineToDelete.id),
        );
        setMachineToDelete(null);
    };

    const handleEditRequest = (machine: Machine) => {
        setMachineToEdit(machine);
        setIsFormOpen(true);
    };

    const handleAddRequest = () => {
        setMachineToEdit(null); // Garante que o formulário esteja vazio para adição
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
    };

    const handleFormSubmit = (formData: Omit<Machine, 'id'>) => {
        if (machineToEdit) {
            // Lógica de Edição
            setMachines((prev) =>
                prev.map((m) => (m.id === machineToEdit.id ? { ...m, ...formData } : m)),
            );
        } else {
            // Lógica de Adição
            const newMachine: Machine = {
                id: String(crypto.randomUUID()),
                ...formData,
            };
            setMachines((prev) => [...prev, newMachine]);
        }
        setIsFormOpen(false); // Fecha o formulário após submissão
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', py: 2, gap: 1.5, flexWrap: 'wrap' }}>
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Buscar por máquina</FormLabel>
                    <Input size="sm" placeholder="Buscar" startDecorator={<SearchIcon />} />
                </FormControl>
            </Box>

            <Sheet
                className="MachineTableContainer"
                variant="outlined"
                sx={{ width: '100%', borderRadius: 'sm', flexShrink: 1, overflow: 'auto', minHeight: 0 }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{
                        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '12px',
                        '--TableCell-paddingX': '16px',
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: 240 }}>Nome da Máquina</th>
                            <th style={{ width: 200 }}>Tipo</th>
                            <th style={{ width: 140 }}>Status</th>
                            <th style={{ width: 80, textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {machines.map((machine) => (
                            <MachineRow
                                key={machine.id}
                                machine={machine}
                                onEdit={handleEditRequest}
                                onDelete={handleDeleteRequest}
                            />
                        ))}
                    </tbody>
                </Table>
            </Sheet>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                <Button startDecorator={<AddIcon />} onClick={handleAddRequest}>
                    Adicionar Nova Máquina
                </Button>
            </Box>

            {/* Modal de Confirmação para Deletar */}
            <Modal open={!!machineToDelete} onClose={() => setMachineToDelete(null)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle><WarningRoundedIcon /> Confirmação de Exclusão</DialogTitle>
                    <Divider />
                    <DialogContent>
                        Você tem certeza que deseja deletar a máquina "{machineToDelete?.name}"?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={confirmDelete}>Deletar</Button>
                        <Button variant="plain" color="neutral" onClick={() => setMachineToDelete(null)}>Cancelar</Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>

            {/* Modal com Formulário para Adicionar/Editar */}
            <MachineForm
                open={isFormOpen}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
                initialData={machineToEdit}
            />
        </>
    );
}

