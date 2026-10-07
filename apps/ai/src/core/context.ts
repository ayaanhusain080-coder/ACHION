export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface UserContext {
  userId?: string;
  name?: string;
  activeProjectId?: string;
  metadata: Record<string, unknown>;
}

export class AIContext {
  private messages: ConversationMessage[] = [];
  private user: UserContext;

  constructor(user?: Partial<UserContext>) {
    this.user = {
      userId: user?.userId,
      name: user?.name,
      activeProjectId: user?.activeProjectId,
      metadata: user?.metadata ?? {},
    };
  }

  addUserMessage(content: string): void {
    this.addMessage("user", content);
  }

  addAssistantMessage(content: string): void {
    this.addMessage("assistant", content);
  }

  getMessages(): ConversationMessage[] {
    return [...this.messages];
  }

  getRecentMessages(limit = 10): ConversationMessage[] {
    return this.messages.slice(-limit);
  }

  getUser(): UserContext {
    return {
      ...this.user,
      metadata: { ...this.user.metadata },
    };
  }

  setUserContext(updates: Partial<UserContext>): void {
    this.user = {
      ...this.user,
      ...updates,
      metadata: {
        ...this.user.metadata,
        ...(updates.metadata ?? {}),
      },
    };
  }

  clearConversation(): void {
    this.messages = [];
  }

  private addMessage(role: ConversationMessage["role"], content: string): void {
    if (!content.trim()) {
      return;
    }

    this.messages.push({
      role,
      content: content.trim(),
      timestamp: Date.now(),
    });
  }
}
