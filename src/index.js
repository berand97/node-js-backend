import express from "express";
import _sequelize from "./config/database.config.js";
import authenticationRoute from "./routes/authenticacion.route.js";
import userRoute from "./routes/user.route.js";

const app = express();

app.use(express.json());

app.use("/autenticacion", authenticationRoute);
app.use("/usuarios", userRoute);

app.listen(8080, () => {
  console.log("Servidor iniciado en el puerto 8080 ❤️");
});
