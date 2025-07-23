import express from "express";
import machineRoutes from "./routes/machineRoutes";

const app = express();
app.use(express.json());

app.use("/machines", machineRoutes);

app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});
