import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export interface MemoryEntry {
  id: string;
  key: string;
  value: string;
  createdAt: number;
  updatedAt: number;
}

export class MemoryStore {
  private memories = new Map<string, MemoryEntry>();
  private filePath: string;

  constructor(filePath = "apps/ai/data/memory.json") {
    this.filePath = filePath;
    this.load();
  }

  set(key: string, value: string): MemoryEntry {
    const now = Date.now();
    const existing = this.memories.get(key);

    const entry: MemoryEntry = {
      id: existing?.id ?? crypto.randomUUID(),
      key,
      value,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };

    this.memories.set(key, entry);
    this.save();

    return entry;
  }

  get(key: string): MemoryEntry | undefined {
    return this.memories.get(key);
  }

  getValue(key: string): string | undefined {
    return this.memories.get(key)?.value;
  }

  list(): MemoryEntry[] {
    return Array.from(this.memories.values());
  }

  delete(key: string): boolean {
    const deleted = this.memories.delete(key);

    if (deleted) {
      this.save();
    }

    return deleted;
  }

  clear(): void {
    this.memories.clear();
    this.save();
  }

  private load(): void {
    if (!existsSync(this.filePath)) {
      return;
    }

    try {
      const raw = readFileSync(this.filePath, "utf-8");
      const entries = JSON.parse(raw) as MemoryEntry[];

      for (const entry of entries) {
        this.memories.set(entry.key, entry);
      }
    } catch {
      console.warn("ACHION memory file could not be loaded.");
    }
  }

  private save(): void {
    const directory = dirname(this.filePath);

    if (!existsSync(directory)) {
      mkdirSync(directory, { recursive: true });
    }

    writeFileSync(
      this.filePath,
      JSON.stringify(this.list(), null, 2),
      "utf-8",
    );
  }
}