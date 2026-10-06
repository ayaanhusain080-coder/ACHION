import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    name: "ACHTON API",
    status: "online",
  });
});

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "ACHTON API is running",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 ACHTON API running on http://localhost:${PORT}`);
});
