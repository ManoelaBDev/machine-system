'use client';

import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

// Importando os tipos
import { Machine, MachineStatus } from './MachineTable';

interface MachineFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Machine, 'id'>) => void;
  initialData?: Machine | null;
}

const defaultState = {
  name: '',
  tipo: '',
  status: 'Online' as MachineStatus,
};

export default function MachineForm({ open, onClose, onSubmit, initialData }: MachineFormProps) {
  const [formData, setFormData] = React.useState(defaultState);

  // Efeito para popular o formulário quando o modo de edição é ativado
  React.useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        tipo: initialData.tipo,
        status: initialData.status,
      });
    } else {
      setFormData(defaultState);
    }
  }, [initialData, open]); // Roda quando o modal abre ou os dados mudam

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    if (newValue) {
      setFormData((prev) => ({ ...prev, status: newValue as MachineStatus }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
    onClose(); // Fecha o modal após a submissão
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <DialogTitle>{initialData ? 'Editar Máquina' : 'Adicionar Nova Máquina'}</DialogTitle>
        <DialogContent>Preencha os detalhes da máquina abaixo.</DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl required>
              <FormLabel>Nome da Máquina</FormLabel>
              <Input name="name" value={formData.name} onChange={handleChange} autoFocus />
            </FormControl>
            <FormControl required>
              <FormLabel>Tipo</FormLabel>
              <Input name="tipo" value={formData.tipo} onChange={handleChange} />
            </FormControl>
            <FormControl required>
              <FormLabel>Status</FormLabel>
              <Select name="status" value={formData.status} onChange={handleSelectChange}>
                <Option value="Online">Online</Option>
                <Option value="Offline">Offline</Option>
                <Option value="Manutenção">Manutenção</Option>
              </Select>
            </FormControl>
            <Stack direction="row" spacing={2} sx={{ pt: 2, justifyContent: 'flex-end' }}>
              <Button type="button" variant="plain" color="neutral" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                {initialData ? 'Salvar Alterações' : 'Adicionar'}
              </Button>
            </Stack>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
