import express from "express";
import { initDB } from "./config/database.config.js";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import "./schemas/index.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("System is up and running");
});

app.use("/api/v1/", routes);
initDB();

app.listen(8080, () => {
  console.log("Servidor iniciado en el puerto 8080 ❤️");
});
