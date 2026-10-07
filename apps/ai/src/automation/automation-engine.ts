export type AutomationStatus = "active" | "paused";

export interface Automation {
  id: string;
  name: string;
  description?: string;
  trigger: string;
  action: string;
  status: AutomationStatus;
  createdAt: number;
}

export class AutomationEngine {
  private automations = new Map<string, Automation>();

  create(automation: Omit<Automation, "id" | "createdAt">): Automation {
    const id = crypto.randomUUID();

    const newAutomation: Automation = {
      ...automation,
      id,
      createdAt: Date.now(),
    };

    this.automations.set(id, newAutomation);

    return newAutomation;
  }

  get(id: string): Automation | undefined {
    return this.automations.get(id);
  }

  list(): Automation[] {
    return Array.from(this.automations.values());
  }

  pause(id: string): boolean {
    const automation = this.automations.get(id);

    if (!automation) {
      return false;
    }

    automation.status = "paused";
    return true;
  }

  activate(id: string): boolean {
    const automation = this.automations.get(id);

    if (!automation) {
      return false;
    }

    automation.status = "active";
    return true;
  }

  delete(id: string): boolean {
    return this.automations.delete(id);
  }

  clear(): void {
    this.automations.clear();
  }
}
