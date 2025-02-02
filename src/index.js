import express from "express";
import { initDB } from "./config/database.config.js";
import "./schemas/index.js";
import authenticationRoute from "./routes/authenticacion.route.js";
import userRoute from "./routes/user.route.js";

const app = express();

app.use(express.json());

app.use("/autenticacion", authenticationRoute);
app.use("/usuarios", userRoute);

initDB();

app.listen(8080, () => {
  console.log("Servidor iniciado en el puerto 8080 ❤️");
});
