import express from "express";
import machineRoutes from "./routes/machineRoutes";
import cors from "cors";

const app = express();

app.use(cors({
  origin: 'http://192.168.18.33:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use("/", machineRoutes);

app.use("/health", (req, res) => {

  res.status(200).json({
    status: "ok",
    message: "API is running",
  });
});

app.listen(3333, '0.0.0.0', () => {
  console.log("🚀 API rodando em http://0.0.0.0:3333");
});