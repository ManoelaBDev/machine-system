'use client';

import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

// Ícones
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import PowerOffRoundedIcon from '@mui/icons-material/PowerOffRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';

// Importando os tipos do componente pai
import { Machine, MachineStatus } from './MachineTable';

// --- Componente do Menu de Ações (interno da linha) ---
function RowMenu({ onDeleteClick, onEditClick }: { onDeleteClick: () => void; onEditClick: () => void; }) {
  return (
    <Dropdown>
      <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}>
        <EditNoteRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem onClick={onEditClick}><EditRoundedIcon /> Editar</MenuItem>
        <Divider />
        <MenuItem color="danger" onClick={onDeleteClick}><DeleteRoundedIcon /> Deletar</MenuItem>
      </Menu>
    </Dropdown>
  );
}

interface MachineRowProps {
  machine: Machine;
  onEdit: (machine: Machine) => void;
  onDelete: (machine: Machine) => void;
}

export default function MachineRow({ machine, onEdit, onDelete }: MachineRowProps) {
  return (
    <tr>
      <td>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Avatar size="sm"><DnsRoundedIcon /></Avatar>
          <Typography level="body-xs">{machine.name}</Typography>
        </Box>
      </td>
      <td>
        <Typography level="body-xs">{machine.tipo}</Typography>
      </td>
      <td>
        <Chip
          variant="soft"
          size="sm"
          startDecorator={
            {
              Online: <PowerSettingsNewRoundedIcon />,
              Offline: <PowerOffRoundedIcon />,
              Manutenção: <BuildRoundedIcon />,
            }[machine.status]
          }
          color={
            {
              Online: 'success',
              Offline: 'danger',
              Manutenção: 'warning',
            }[machine.status] as ColorPaletteProp
          }
        >
          {machine.status}
        </Chip>
      </td>
      <td style={{ textAlign: 'center' }}>
        <RowMenu
          onDeleteClick={() => onDelete(machine)}
          onEditClick={() => onEdit(machine)}
        />
      </td>
    </tr>
  );
}
