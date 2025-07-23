export interface Machine {
    id: string;
    name: string;
    type: string;
}

export interface CreateMachine {
    name: string;
    type: string;
}

export interface UpdateMachine {
    name?: string;
    type?: string;
}

export interface DeleteMachine {
    id: string;
}
