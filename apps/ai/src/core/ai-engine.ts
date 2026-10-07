export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIRequest {
  messages: AIMessage[];
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  content: string;
  provider: string;
  model?: string;
}

export interface AIProvider {
  name: string;

  generate(request: AIRequest): Promise<AIResponse>;
}

/**
 * Central AI engine for ACHION.
 *
 * The engine does not depend on a specific AI provider.
 * Providers can be plugged in later without changing the
 * rest of the AI architecture.
 */
export class AIEngine {
  private provider: AIProvider;

  constructor(provider: AIProvider) {
    this.provider = provider;
  }

  getProviderName(): string {
    return this.provider.name;
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    this.validateRequest(request);

    return this.provider.generate({
      ...request,
      temperature: request.temperature ?? 0.7,
      maxTokens: request.maxTokens ?? 1000,
    });
  }

  async ask(message: string, systemPrompt?: string): Promise<AIResponse> {
    const messages: AIMessage[] = [];

    if (systemPrompt) {
      messages.push({
        role: "system",
        content: systemPrompt,
      });
    }

    messages.push({
      role: "user",
      content: message,
    });

    return this.generate({ messages });
  }

  private validateRequest(request: AIRequest): void {
    if (!request.messages || request.messages.length === 0) {
      throw new Error("AI request must contain at least one message.");
    }

    for (const message of request.messages) {
      if (!message.content?.trim()) {
        throw new Error("AI message content cannot be empty.");
      }
    }
  }
}
