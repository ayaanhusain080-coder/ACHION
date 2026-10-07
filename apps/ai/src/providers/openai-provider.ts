import { AIProvider, AIRequest, AIResponse } from "../core/ai-engine";

export interface OpenAIProviderConfig {
  apiKey: string;
  model: string;
  baseUrl?: string;
}

interface OpenAIResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

export class OpenAIProvider implements AIProvider {
  name = "openai";

  private apiKey: string;
  private model: string;
  private baseUrl: string;

  constructor(config: OpenAIProviderConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model;
    this.baseUrl =
      config.baseUrl?.replace(/\/+$/, "") ?? "https://api.openai.com/v1";
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: request.messages,
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 1000,
      }),
    });

    const data = (await response.json()) as OpenAIResponse & {
      error?: {
        message?: string;
      };
    };

    if (!response.ok) {
      throw new Error(
        data.error?.message ??
          `OpenAI request failed with status ${response.status}`,
      );
    }

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("AI provider returned an empty response.");
    }

    return {
      content,
      provider: this.name,
      model: this.model,
    };
  }
}
