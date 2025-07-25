"use client";

import { useMachines } from '@/services/machines/hooks/useMachines';
import MachineTable from '@/components/Machine/MachineTable';
import { CircularProgress, Alert, Box } from '@mui/material';

export default function MachineList() {
  const { data, isLoading, isError, error } = useMachines();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        Erro ao carregar máquinas: {(error as Error).message}
      </Alert>
    );
  }

  return <MachineTable machines={data ?? []} />;
}
