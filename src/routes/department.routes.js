import express from "express";
import DepartmentController from "../controllers/department.controller.js";
import validateRequest from "../middlewares/validate-request.js";
import { departmentValidators } from "../utils/validators/department.validator.js";

const router = express.Router();

router.post("/", departmentValidators, validateRequest, DepartmentController.createDepartment);
router.get("/", DepartmentController.getAllDepartments);
router.get("/:id", DepartmentController.getDepartmentById);
router.put("/:id", departmentValidators, validateRequest, DepartmentController.updateDepartment);
router.delete("/:id", DepartmentController.deleteDepartment);

export default router;
