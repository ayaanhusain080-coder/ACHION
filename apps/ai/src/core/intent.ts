export enum IntentType {
  CREATE_TASK = "CREATE_TASK",
  LIST_TASKS = "LIST_TASKS",
  COMPLETE_TASK = "COMPLETE_TASK",

  CREATE_PROJECT = "CREATE_PROJECT",
  LIST_PROJECTS = "LIST_PROJECTS",

  GET_ANALYTICS = "GET_ANALYTICS",
  GET_PENDING = "GET_PENDING",

  GENERAL_QUERY = "GENERAL_QUERY",
  UNKNOWN = "UNKNOWN",
}

export interface Intent {
  type: IntentType;
  confidence: number;
  input: string;
  parameters: Record<string, string>;
}

interface IntentRule {
  type: IntentType;
  keywords: string[];
}

const INTENT_RULES: IntentRule[] = [
  {
    type: IntentType.CREATE_TASK,
    keywords: ["create task", "add task", "new task", "make a task"],
  },
  {
    type: IntentType.LIST_TASKS,
    keywords: ["show tasks", "list tasks", "my tasks", "all tasks"],
  },
  {
    type: IntentType.COMPLETE_TASK,
    keywords: ["complete task", "finish task", "done task", "mark task"],
  },
  {
    type: IntentType.CREATE_PROJECT,
    keywords: ["create project", "new project", "add project"],
  },
  {
    type: IntentType.LIST_PROJECTS,
    keywords: ["show projects", "list projects", "my projects", "all projects"],
  },
  {
    type: IntentType.GET_ANALYTICS,
    keywords: ["analytics", "statistics", "stats", "performance"],
  },
  {
    type: IntentType.GET_PENDING,
    keywords: ["pending", "what is pending", "what's pending", "remaining"],
  },
];

export function detectIntent(input: string): Intent {
  const normalizedInput = input.trim().toLowerCase();

  if (!normalizedInput) {
    return {
      type: IntentType.UNKNOWN,
      confidence: 0,
      input,
      parameters: {},
    };
  }

  let bestMatch: IntentRule | null = null;
  let bestScore = 0;

  for (const rule of INTENT_RULES) {
    const matchedKeywords = rule.keywords.filter((keyword) =>
      normalizedInput.includes(keyword),
    );

    if (matchedKeywords.length > bestScore) {
      bestScore = matchedKeywords.length;
      bestMatch = rule;
    }
  }

  if (!bestMatch) {
    return {
      type: IntentType.GENERAL_QUERY,
      confidence: 0.5,
      input,
      parameters: {},
    };
  }

  return {
    type: bestMatch.type,
    confidence: Math.min(0.5 + bestScore * 0.2, 0.95),
    input,
    parameters: extractParameters(normalizedInput, bestMatch.type),
  };
}

function extractParameters(
  input: string,
  intent: IntentType,
): Record<string, string> {
  if (intent === IntentType.CREATE_TASK && input.includes("task")) {
    const taskName = input
      .replace(/create task|add task|new task|make a task/gi, "")
      .trim();

    if (taskName) {
      return {
        title: taskName,
      };
    }
  }

  if (intent === IntentType.CREATE_PROJECT && input.includes("project")) {
    const projectName = input
      .replace(/create project|new project|add project/gi, "")
      .trim();

    if (projectName) {
      return {
        name: projectName,
      };
    }
  }

  return {};
}
