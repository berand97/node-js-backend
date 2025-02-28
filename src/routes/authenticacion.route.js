import express from "express";
import authenticationController from "../controllers/authentication.controller.js";
import { loginValidators } from "../utils/validators/authentication.validator.js";
import validateRequest from "../middlewares/validate-request.js";

const router = express.Router();

router.post("/",
    loginValidators,
    validateRequest,
    authenticationController.login);


export default router;
