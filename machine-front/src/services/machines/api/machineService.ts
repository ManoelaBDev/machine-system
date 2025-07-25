import { Machine, CreateMachine, UpdateMachine } from './types';
import { API_BASE_URL } from '@/lib/api';

const mockMachines: Machine[] = [
    { id: '1', name: 'Lathe', type: 'CNC' },
    { id: '2', name: 'Drill', type: 'Manual' },
];


export async function getAllMachines(): Promise<Machine[]> {
    const response = await fetch(`${API_BASE_URL}/machines`);

    if (!response.ok) {
        throw new Error(`Erro ao obter lista de máquinas: ${response.statusText}`);
    }
    
    return response.json();
}

export async function createNewMachine(machineToCreate: CreateMachine): Promise<Machine> {
    const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(machineToCreate),
    });

    if (!response.ok) {
        throw new Error(`Erro ao criar a máquina: ${response.statusText}`);
    }
    
    return response.json();
}

export async function updateExistingMachine(machineId: string, machineUpdates: UpdateMachine): Promise<Machine> {
    const response = await fetch(`${API_BASE_URL}${machineId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(machineUpdates),
    });
    
    if (!response.ok) {
        throw new Error(`Erro ao atualizar a máquina: ${response.statusText}`);
    }
    
    return response.json();
}

export async function deleteExistingMachine(machineId: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}${machineId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Erro ao deletar a máquina: ${response.statusText}`);
    }

    return { success: true };
}