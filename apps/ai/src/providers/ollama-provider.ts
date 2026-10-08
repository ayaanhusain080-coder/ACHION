import {
  AIProvider,
  AIRequest,
  AIResponse,
} from "../core/ai-engine";

export interface OllamaProviderConfig {
  model: string;
  baseUrl?: string;
}

interface OllamaResponse {
  message?: {
    content?: string;
  };
  error?: string;
}

export class OllamaProvider implements AIProvider {
  name = "ollama";

  private model: string;
  private baseUrl: string;

  constructor(config: OllamaProviderConfig) {
    this.model = config.model;
    this.baseUrl =
      config.baseUrl?.replace(/\/+$/, "") ??
      "http://127.0.0.1:11434";
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const response = await fetch(
      `${this.baseUrl}/api/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.model,
          messages: request.messages,
          stream: false,
          options: {
            temperature: request.temperature ?? 0.7,
            num_predict: request.maxTokens ?? 1000,
          },
        }),
      },
    );

    const data = (await response.json()) as OllamaResponse;

    if (!response.ok) {
      throw new Error(
        data.error ??
          `Ollama request failed with status ${response.status}`,
      );
    }

    const content = data.message?.content;

    if (!content) {
      throw new Error(
        "Ollama returned an empty response.",
      );
    }

    return {
      content,
      provider: this.name,
      model: this.model,
    };
  }
}