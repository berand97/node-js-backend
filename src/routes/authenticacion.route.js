import express from "express";
import { AuthenticationController } from "../controllers/authentication.controller.js";

const router = express.Router();

router.get("/", AuthenticationController.getAllUsers );


export default router;
 