import { Machine, CreateMachine, UpdateMachine } from './types';

const mockMachines: Machine[] = [
    { id: '1', name: 'Lathe', type: 'CNC' },
    { id: '2', name: 'Drill', type: 'Manual' },
];

function simulateRequest<T>(responseData: T, shouldSimulateFailure = false, responseDelayMilliseconds = 500): Promise<T> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSimulateFailure) {
                reject(new Error('Erro simulado na requisição'));
            } else {
                resolve(responseData);
            }
        }, responseDelayMilliseconds);
    });
}

export async function getAllMachines(): Promise<Machine[]> {
    return simulateRequest(mockMachines);
}

export async function createNewMachine(machineToCreate: CreateMachine): Promise<Machine> {
    const newMachineObject: Machine = {
        id: crypto.randomUUID(),
        ...machineToCreate,
    };
    mockMachines.push(newMachineObject);

    return simulateRequest(newMachineObject);
}

export async function updateExistingMachine(machineId: string, machineUpdates: UpdateMachine): Promise<Machine> {
    const foundMachine = mockMachines.find(machineItem => machineItem.id === machineId);
    if (!foundMachine) {
        return simulateRequest<Machine>(null as any, true);
    }
    Object.assign(foundMachine, machineUpdates);
    return simulateRequest(foundMachine);
}

export async function deleteExistingMachine(machineId: string): Promise<{ success: boolean }> {
    const machineIndex = mockMachines.findIndex(machineItem => machineItem.id === machineId);
    if (machineIndex === -1) {
        return simulateRequest<{ success: boolean }>(null as any, true);
    }
    mockMachines.splice(machineIndex, 1);
    return simulateRequest({ success: true });
}