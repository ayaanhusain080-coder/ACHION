import { MemoryStore } from "./core/memory";

async function main() {
  console.log("=== ACHION MEMORY TEST ===");

  // First memory store
  const memory1 = new MemoryStore();

  console.log("\n1. Saving memory...");

  memory1.set(
    "user_name",
    "Ayan",
  );

  memory1.set(
    "favorite_project",
    "ACHION",
  );

  console.log("Saved memories:");
  console.log(memory1.list());

  // Create a completely new MemoryStore instance.
  // This checks whether data is actually loaded from disk.
  console.log("\n2. Creating new MemoryStore...");

  const memory2 = new MemoryStore();

  console.log("Loaded memories:");
  console.log(memory2.list());

  // Verify saved data
  console.log("\n3. Checking persistence...");

  const userName = memory2.getValue("user_name");
  const favoriteProject = memory2.getValue(
    "favorite_project",
  );

  console.log("User name:", userName);
  console.log("Favorite project:", favoriteProject);

  if (
    userName === "Ayan" &&
    favoriteProject === "ACHION"
  ) {
    console.log("\n✅ MEMORY TEST PASSED");
    console.log(
      "ACHION successfully saved and reloaded memory.",
    );
  } else {
    console.log("\n❌ MEMORY TEST FAILED");
  }
}

main().catch((error) => {
  console.error("\n❌ Memory test failed:", error);
  process.exit(1);
});