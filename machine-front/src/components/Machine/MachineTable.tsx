import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import MachineRow from "./MachineRow";
import { Machine } from "@/services/machines/api/types";

interface Props {
    machines: Machine[];
}

export default function MachineTable({ machines }: Props) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {machines.map((machine) => (
                        <MachineRow key={machine.id} machine={machine} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
