export interface Machine {
    id: string;
    name: string;
    tipo: string;
}

export interface CreateMachine {
    name: string;
    tipo: string;
}

export interface UpdateMachine {
    name?: string;
    tipo?: string;
}