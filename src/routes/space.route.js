import express from "express";
import SpaceController from "../controllers/space.controller.js";
import validateRequest from "../middlewares/validate-request.js";
import { spaceValidators } from "../utils/validators/space.validator.js";

const router = express.Router();

router.post("/", spaceValidators, validateRequest, SpaceController.createSpace);
router.get("/", SpaceController.getAllSpaces);
router.get("/:id", SpaceController.getSpaceById);
router.put("/:id", spaceValidators, validateRequest, SpaceController.updateSpace);
router.delete("/:id", SpaceController.deleteSpace);

export default router;
