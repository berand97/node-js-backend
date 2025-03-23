import express from "express";
import authenticationRoute from "./authenticacion.route.js";
import reservationRoutes from "./reservation.routes.js";
import departmentRoutes from "./department.routes.js";
import spacesRoute from "./space.route.js";
import userRoute from "./user.route.js";
import availabilityRoutes from "./availability.routes.js";
import statisticsRoutes from "./statistics.routes.js";

const router = express.Router();

router.use("/autenticacion", authenticationRoute);
router.use("/reservaciones", reservationRoutes);
router.use("/departamentos", departmentRoutes);
router.use("/espacios", spacesRoute);
router.use("/usuarios", userRoute);
router.use("/availability", availabilityRoutes);
router.use("/statistics", statisticsRoutes);

export default router;