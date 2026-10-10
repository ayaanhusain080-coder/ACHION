import {
  randomBytes,
  randomUUID,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import type {
  AuthResponse,
  PublicUser,
  User,
} from "../types/auth.js";

interface Session {
  token: string;
  userId: string;
  createdAt: string;
}

const users: User[] = [];
const sessions: Session[] = [];

const HASH_KEY_LENGTH = 64;
const SALT_LENGTH = 16;

const hashPassword = (
  password: string,
): string => {
  const salt = randomBytes(SALT_LENGTH).toString(
    "hex",
  );

  const hash = scryptSync(
    password,
    salt,
    HASH_KEY_LENGTH,
  ).toString("hex");

  return `${salt}:${hash}`;
};

const verifyPassword = (
  password: string,
  storedHash: string,
): boolean => {
  const [salt, hash] = storedHash.split(":");

  if (!salt || !hash) {
    return false;
  }

  const derivedHash = scryptSync(
    password,
    salt,
    HASH_KEY_LENGTH,
  );

  const storedHashBuffer = Buffer.from(
    hash,
    "hex",
  );

  if (
    storedHashBuffer.length !==
    derivedHash.length
  ) {
    return false;
  }

  return timingSafeEqual(
    storedHashBuffer,
    derivedHash,
  );
};

const toPublicUser = (
  user: User,
): PublicUser => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const createSession = (
  userId: string,
): string => {
  const token = randomBytes(32).toString("hex");

  sessions.push({
    token,
    userId,
    createdAt: new Date().toISOString(),
  });

  return token;
};

export const registerUser = (
  name: string,
  email: string,
  password: string,
): AuthResponse | null => {
  const normalizedEmail =
    email.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.email === normalizedEmail,
  );

  if (existingUser) {
    return null;
  }

  const now = new Date().toISOString();

  const user: User = {
    id: randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(password),
    createdAt: now,
    updatedAt: now,
  };

  users.push(user);

  const token = createSession(user.id);

  return {
    user: toPublicUser(user),
    token,
  };
};

export const loginUser = (
  email: string,
  password: string,
): AuthResponse | null => {
  const normalizedEmail =
    email.trim().toLowerCase();

  const user = users.find(
    (item) => item.email === normalizedEmail,
  );

  if (!user) {
    return null;
  }

  if (
    !verifyPassword(
      password,
      user.passwordHash,
    )
  ) {
    return null;
  }

  const token = createSession(user.id);

  return {
    user: toPublicUser(user),
    token,
  };
};

export const getUserById = (
  id: string,
): PublicUser | undefined => {
  const user = users.find(
    (item) => item.id === id,
  );

  if (!user) {
    return undefined;
  }

  return toPublicUser(user);
};

export const getUserByToken = (
  token: string,
): PublicUser | undefined => {
  const session = sessions.find(
    (item) => item.token === token,
  );

  if (!session) {
    return undefined;
  }

  return getUserById(session.userId);
};