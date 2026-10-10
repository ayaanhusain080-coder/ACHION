import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { createACHIONAI } from "../../ai/src/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize ACHION AI
let achionAI: ReturnType<typeof createACHIONAI>;

try {
  achionAI = createACHIONAI();

  console.log(
    `🤖 ACHION AI initialized with ${achionAI.engine.getProviderName()} provider`,
  );
} catch (error) {
  console.error("❌ Failed to initialize ACHION AI:", error);
  process.exit(1);
}

// Root route
app.get("/", (_req, res) => {
  res.json({
    name: "ACHION API",
    status: "online",
    ai: {
      status: "online",
      provider: achionAI.engine.getProviderName(),
    },
  });
});

// Health route
app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "ACHION API is running",
    ai: {
      status: "online",
      provider: achionAI.engine.getProviderName(),
    },
  });
});

// AI Chat route
app.post("/ai/chat", async (req, res) => {
  try {
    const { message } = req.body as {
      message?: unknown;
    };

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Message is required and must be a non-empty string.",
      });
    }

    const result = await achionAI.assistant.process(message.trim());

    return res.json({
      success: true,
      response: result.response.content,
      provider: result.response.provider,
      model: result.response.model,
      intent: {
        type: result.intent.type,
        confidence: result.intent.confidence,
        parameters: result.intent.parameters,
      },
    });
  } catch (error) {
    console.error("❌ AI chat error:", error);

    return res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to process AI request.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(
    `🚀 ACHION API running on http://localhost:${PORT}`,
  );
});
