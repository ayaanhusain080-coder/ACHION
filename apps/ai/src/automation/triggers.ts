export type TriggerType = "manual" | "schedule" | "event" | "condition";

export interface Trigger {
  id: string;
  type: TriggerType;
  name: string;
  config: Record<string, unknown>;
  enabled: boolean;
}

export function createTrigger(
  type: TriggerType,
  name: string,
  config: Record<string, unknown> = {},
): Trigger {
  return {
    id: crypto.randomUUID(),
    type,
    name,
    config,
    enabled: true,
  };
}

export function enableTrigger(trigger: Trigger): Trigger {
  return {
    ...trigger,
    enabled: true,
  };
}

export function disableTrigger(trigger: Trigger): Trigger {
  return {
    ...trigger,
    enabled: false,
  };
}
