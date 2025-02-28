import express from "express";
import userController from "../controllers/user.controller.js";
import validateRequest from "../middlewares/validate-request.js";
import { userValidators } from "../utils/validators/user.validator.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";

const router = express.Router();

router.post("/", userValidators, validateRequest, userController.createUser);

router.get("/", authenticateToken, userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", userValidators, validateRequest, userController.updateUser);

router.delete("/:id", userController.deleteUser);

export default router;
