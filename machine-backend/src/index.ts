import express from "express";
import machineRoutes from "./routes/machineRoutes";

const app = express();
app.use(express.json());

app.use("/", machineRoutes);

app.use("/health", (req, res) => {

  res.status(200).json({
    status: "ok",
    message: "API is running",
  });
});

app.listen(3333, () => {
  console.log("🚀 API rodando em http://localhost:3333");
});