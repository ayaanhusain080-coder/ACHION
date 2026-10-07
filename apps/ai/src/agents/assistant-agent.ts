import { MemoryStore } from "../core/memory";
import { AIEngine, AIResponse } from "../core/ai-engine";
import { AIContext } from "../core/context";
import { detectIntent, Intent } from "../core/intent";
import {
  AutomationEngine,
  Automation,
} from "../automation/automation-engine";

export interface AssistantResult {
  response: AIResponse;
  intent: Intent;
}

export class AssistantAgent {
  private aiEngine: AIEngine;
  private context: AIContext;
  private automationEngine: AutomationEngine;
  private memory: MemoryStore;

  constructor(
    aiEngine: AIEngine,
    context: AIContext = new AIContext(),
    automationEngine: AutomationEngine = new AutomationEngine(),
    memory: MemoryStore = new MemoryStore(),
  ) {
    this.aiEngine = aiEngine;
    this.context = context;
    this.automationEngine = automationEngine;
    this.memory = memory;
  }

  async process(input: string): Promise<AssistantResult> {
    if (!input.trim()) {
      throw new Error("Assistant input cannot be empty.");
    }

    const intent = detectIntent(input);

    this.context.addUserMessage(input);

    // Handle natural-language memory commands
    const memoryResult = this.handleMemoryCommand(input);

    if (memoryResult) {
      const response: AIResponse = {
        content: memoryResult,
        provider: this.aiEngine.getProviderName(),
      };

      this.context.addAssistantMessage(response.content);

      return {
        response,
        intent,
      };
    }

    const systemPrompt = this.buildSystemPrompt(intent);

    const response = await this.aiEngine.ask(
      input,
      systemPrompt,
    );

    this.context.addAssistantMessage(response.content);

    return {
      response,
      intent,
    };
  }

  remember(key: string, value: string): void {
    this.memory.set(key, value);
  }

  recall(key: string): string | undefined {
    return this.memory.getValue(key);
  }

  getMemories() {
    return this.memory.list();
  }

  forget(key: string): boolean {
    return this.memory.delete(key);
  }

  createAutomation(
    automation: Omit<Automation, "id" | "createdAt">,
  ): Automation {
    return this.automationEngine.create(automation);
  }

  getAutomations(): Automation[] {
    return this.automationEngine.list();
  }

  pauseAutomation(id: string): boolean {
    return this.automationEngine.pause(id);
  }

  activateAutomation(id: string): boolean {
    return this.automationEngine.activate(id);
  }

  deleteAutomation(id: string): boolean {
    return this.automationEngine.delete(id);
  }

  getContext(): AIContext {
    return this.context;
  }

  private handleMemoryCommand(
    input: string,
  ): string | null {
    const normalized = input.trim();

    // Example:
    // "Remember that my favorite project is ACHION"
    const rememberMatch = normalized.match(
      /^remember(?: that)?\s+(.+?)\s+(?:is|=)\s+(.+)$/i,
    );

    if (rememberMatch) {
      const key = rememberMatch[1].trim();
      const value = rememberMatch[2].trim();

      this.remember(key, value);

      return `Got it. I'll remember that ${key} is ${value}.`;
    }

    // Example:
    // "Remember: favorite project = ACHION"
    const rememberKeyValueMatch = normalized.match(
      /^remember\s*:\s*(.+?)\s*=\s*(.+)$/i,
    );

    if (rememberKeyValueMatch) {
      const key = rememberKeyValueMatch[1].trim();
      const value = rememberKeyValueMatch[2].trim();

      this.remember(key, value);

      return `Got it. I've saved "${key}".`;
    }

    // Show all saved memories
    if (
      /^(?:what do you remember|show my memories|list my memories|what do you know about me)\??$/i.test(
        normalized,
      )
    ) {
      const memories = this.getMemories();

      if (memories.length === 0) {
        return "I don't have any saved memories yet.";
      }

      return [
        "Here's what I remember:",
        ...memories.map(
          (memory) =>
            `- ${memory.key}: ${memory.value}`,
        ),
      ].join("\n");
    }

    // Example:
    // "What is my favorite project?"
    const recallMatch = normalized.match(
      /^(?:what is|what's|tell me)\s+(?:my\s+)?(.+?)\??$/i,
    );

    if (recallMatch) {
      const key = recallMatch[1].trim();
      const value = this.recall(key);

      if (value) {
        return `I remember that ${key} is ${value}.`;
      }
    }

    // Example:
    // "Forget favorite project"
    // "Forget favorite project from memory"
    const forgetMatch = normalized.match(
      /^(?:forget|delete|remove)\s+(?:my\s+)?(.+?)(?:\s+from memory)?$/i,
    );

    if (forgetMatch) {
      const key = forgetMatch[1].trim();
      const deleted = this.forget(key);

      return deleted
        ? `I've forgotten "${key}".`
        : `I don't have a memory saved for "${key}".`;
    }

    return null;
  }

  private buildSystemPrompt(intent: Intent): string {
    const user = this.context.getUser();

    const recentMessages = this.context
      .getRecentMessages(6)
      .slice(0, -1);

    const conversationHistory =
      recentMessages.length > 0
        ? recentMessages
            .map(
              (message) =>
                `${message.role.toUpperCase()}: ${message.content}`,
            )
            .join("\n")
        : "No previous conversation.";

    const memories = this.memory.list();

    const memoryContext =
      memories.length > 0
        ? memories
            .map(
              (memory) =>
                `- ${memory.key}: ${memory.value}`,
            )
            .join("\n")
        : "No saved memories.";

    return [
      "You are ACHION, a personal operating system assistant.",
      "",
      "IDENTITY:",
      "Your name is ACHION.",
      "You are the intelligent assistant inside the ACHION operating system.",
      "You help the user manage information, tasks, projects, planning, and productivity.",
      "",
      "PERSONALITY:",
      "Be intelligent, calm, concise, practical, and respectful.",
      "Speak naturally and adapt to the user's communication style.",
      "Avoid unnecessary explanations.",
      "",
      "MEMORY:",
      memoryContext,
      "",
      "MEMORY RULES:",
      "Use saved memories when they are relevant to the current request.",
      "Do not invent memories.",
      "Do not claim to remember something unless it exists in the available memory.",
      "",
      "USER CONTEXT:",
      user.name
        ? `User name: ${user.name}`
        : "User name: not provided.",
      user.activeProjectId
        ? `Active project: ${user.activeProjectId}`
        : "Active project: none.",
      "",
      "RECENT CONVERSATION:",
      conversationHistory,
      "",
      "BEHAVIOR:",
      "Understand the user's intent before responding.",
      "Use previous conversation context when it is relevant.",
      "Do not claim to have performed an action when you have not actually performed it.",
      "Do not invent actions, data, or system results.",
      "For tasks and projects, be action-oriented.",
      "If a required capability is unavailable, clearly say so.",
      "",
      `CURRENT INTENT: ${intent.type}`,
      `CONFIDENCE: ${intent.confidence}`,
      `PARAMETERS: ${JSON.stringify(intent.parameters)}`,
    ].join("\n");
  }
}