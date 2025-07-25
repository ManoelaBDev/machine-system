import { useMutation, useQueryClient } from "react-query";
import { createNewMachine } from '../api/machineService';

export function useCreateMachine() {
    const queryClient = useQueryClient();
    
    return useMutation(createNewMachine, {
        onSuccess: () => {queryClient.invalidateQueries(['machines']);},
    });
}
