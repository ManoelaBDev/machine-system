export interface Machine {
    id: string;
    name: string;
    tipo: string;
    status: string;
}

export interface CreateMachine {
    name: string;
    tipo: string;
    status: string;
}

export interface UpdateMachine {
    name?: string;
    tipo?: string;
    status: string;
}