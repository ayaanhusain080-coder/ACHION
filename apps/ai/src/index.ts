import { AIEngine, AIProvider } from "./core/ai-engine";
import { AIContext } from "./core/context";
import { MemoryStore } from "./core/memory";
import { AssistantAgent } from "./agents/assistant-agent";
import { APIClient } from "./integrations/api-client";
import { loadAIConfig } from "./config/env";
import { OpenAIProvider } from "./providers/openai-provider";
import { OllamaProvider } from "./providers/ollama-provider";

export interface ACHIONAI {
  assistant: AssistantAgent;
  api: APIClient;
  engine: AIEngine;
  memory: MemoryStore;
}

export function createACHIONAI(): ACHIONAI {
  const config = loadAIConfig();

  let provider: AIProvider;

  if (config.aiProvider === "ollama") {
    provider = new OllamaProvider({
      model: config.aiModel ?? "llama3.2:latest",
    });
  } else if (config.aiProvider === "openai") {
    if (!config.aiApiKey) {
      throw new Error(
        "ACHION_AI_API_KEY is required when using OpenAI.",
      );
    }

    provider = new OpenAIProvider({
      apiKey: config.aiApiKey,
      model: config.aiModel ?? "gpt-4o-mini",
    });
  } else {
    throw new Error(
      `Unsupported AI provider: ${config.aiProvider}`,
    );
  }

  const engine = new AIEngine(provider);

  const context = new AIContext();

  // Persistent memory for ACHION
  const memory = new MemoryStore();

  const assistant = new AssistantAgent(
    engine,
    context,
    undefined,
    memory,
  );

  const api = new APIClient({
    baseUrl: config.apiBaseUrl,
    timeoutMs: config.requestTimeoutMs,
  });

  return {
    assistant,
    api,
    engine,
    memory,
  };
}

export * from "./core/ai-engine";
export * from "./core/context";
export * from "./core/intent";
export * from "./core/memory";

export * from "./agents/assistant-agent";

export * from "./automation/automation-engine";
export * from "./automation/triggers";

export * from "./integrations/api-client";
export * from "./config/env";

export * from "./providers/openai-provider";
export * from "./providers/ollama-provider";
