import { useQuery } from "react-query";
import { getAllMachines } from '../api/machineService';

export function useMachines() {
    return useQuery(["machines"], getAllMachines);
}