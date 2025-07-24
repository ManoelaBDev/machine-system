import { Router } from "express";
import { createMachineSchema } from "../schemas/machineSchemas";
import { zodValidator } from "../middleware/zodValidator";
import * as machineController from "../controller/machineController";

const router = Router();

router.get("/machines", machineController.getListar);
router.post("/machines", zodValidator(createMachineSchema), machineController.newMaquina);
router.put("/machines/:id", zodValidator(createMachineSchema), machineController.update);
router.delete("/machines/:id", machineController.deleteMaquina);

export default router;

