import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
  override: true,
});

declare const process: {
  env: Record<string, string | undefined>;
};

export interface AIConfig {
  apiBaseUrl: string;
  aiProvider: string;
  aiModel?: string;
  aiApiKey?: string;
  requestTimeoutMs: number;
}

function getEnv(name: string): string | undefined {
  return typeof process !== "undefined" ? process.env[name] : undefined;
}

function getRequiredEnv(name: string, fallback?: string): string {
  const value = getEnv(name) ?? fallback;

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getNumberEnv(name: string, fallback: number): number {
  const value = getEnv(name);

  if (!value) {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${name} must be a positive number.`);
  }

  return parsed;
}

export function loadAIConfig(): AIConfig {
  return {
    apiBaseUrl: getRequiredEnv("ACHION_API_URL", "http://localhost:5000"),

    aiProvider: getRequiredEnv("ACHION_AI_PROVIDER", "ollama"),

    aiModel: getEnv("ACHION_AI_MODEL"),

    aiApiKey: getEnv("ACHION_AI_API_KEY"),

    requestTimeoutMs: getNumberEnv("ACHION_AI_TIMEOUT_MS", 30000),
  };
}
