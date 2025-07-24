import express from "express";
import machineRoutes from "./routes/machineRoutes";

const app = express();
app.use(express.json());

app.use("/", machineRoutes);

app.use("/health", () => {

  console.log("Funcionando")
});

app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});
