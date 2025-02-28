import express from "express";
import authenticationRoute from "./authenticacion.route.js";
import reservationRoutes from "./reservation.routes.js";
import departmentRoutes from "./department.routes.js";
import spacesRoute from "./space.route.js";
import userRoute from "./user.route.js";

const router = express.Router();

router.use("/autenticacion", authenticationRoute);
router.use("/reservaciones", reservationRoutes);
router.use("/departamentos", departmentRoutes);
router.use("/espacios", spacesRoute);
router.use("/usuarios", userRoute);

export default router;