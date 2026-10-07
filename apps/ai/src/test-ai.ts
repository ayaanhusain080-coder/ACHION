import { MemoryStore } from "./core/memory";
import { createACHIONAI } from "./index";

async function main() {
  console.log("=================================");
  console.log("       ACHION AI MEMORY TEST");
  console.log("=================================");

  const achion = createACHIONAI();

  // 1. Save a memory
  console.log("\n[1] Saving memory...");

  let result = await achion.assistant.process(
    "Remember that my favorite project is ACHION",
  );

  console.log("ACHION:", result.response.content);

  // 2. Display memories
  console.log("\n[2] Reading memories...");

  result = await achion.assistant.process(
    "What do you remember?",
  );

  console.log("ACHION:");
  console.log(result.response.content);

  // 3. Direct memory check
  console.log("\n[3] Direct MemoryStore check...");

  const memories = achion.memory.list();

  for (const memory of memories) {
    console.log(
      `${memory.key} = ${memory.value}`,
    );
  }

  // 4. Recall specific memory
  console.log("\n[4] Recalling specific memory...");

  result = await achion.assistant.process(
    "What is my favorite project?",
  );

  console.log("ACHION:", result.response.content);

  // 5. Create a new MemoryStore
  // This verifies that memory was written to disk.
  console.log("\n[5] Testing persistence after reload...");

  
  const reloadedMemory = new MemoryStore();

  const savedProject =
    reloadedMemory.getValue("my favorite project");

  console.log(
    "Reloaded value:",
    savedProject,
  );

  if (savedProject === "ACHION") {
    console.log(
      "\n✅ PERSISTENT MEMORY TEST PASSED",
    );
  } else {
    console.log(
      "\n❌ PERSISTENT MEMORY TEST FAILED",
    );
  }

  console.log("\n=================================");
}

main().catch((error) => {
  console.error("\n❌ AI test failed:", error);
  process.exit(1);
});