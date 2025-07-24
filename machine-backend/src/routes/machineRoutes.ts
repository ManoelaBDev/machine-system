import { Router } from "express";
import { createMachineSchema } from "../schemas/machineSchemas";
import { zodValidator } from "../middleware/zodValidator";
import * as machineController from "../controller/machineController";
import { machineIdSchemas } from "../schemas/machineIdSchemas";

const router = Router();

router.get("/machines", machineController.getListar);
router.post("/machines", zodValidator(createMachineSchema), machineController.newMaquina);
router.put("/machines/:id", zodValidator(createMachineSchema), machineController.update);
router.delete("/machines/:id", zodValidator(machineIdSchemas), machineController.deleteMaquina);


export default router;

