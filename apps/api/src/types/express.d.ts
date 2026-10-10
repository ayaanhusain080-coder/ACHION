import type { PublicUser } from "./auth.js";

declare global {
  namespace Express {
    interface Locals {
      user?: PublicUser;
    }
  }
}

export {};