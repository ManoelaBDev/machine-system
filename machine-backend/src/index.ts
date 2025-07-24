import express from "express";
import machineRoutes from "./routes/machineRoutes";

const app = express();
app.use(express.json());

app.use("/", machineRoutes);

app.listen(3333, () => {
  console.log("🚀 API rodando em http://localhost:3333");
});