import { Router } from "express";
import { createMachineSchema } from "../schemas/machineSchemas";
import { zodValidator } from "../middleware/zodValidator";
import * as machineController from "../controller/machineController";

const router = Router();

router.get("/", machineController.getAll);
router.post("/", zodValidator(createMachineSchema), machineController.create);
router.put("/:id", zodValidator(createMachineSchema), machineController.update);
router.delete("/:id", machineController.remove);

export default router;

