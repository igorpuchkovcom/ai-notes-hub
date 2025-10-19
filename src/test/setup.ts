import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Make React available globally
global.React = React;

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  usePathname: () => "/",
}));

// Mock Prisma client
vi.mock("@/lib/prisma", () => ({
  prisma: {
    note: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

// Mock environment variables
process.env.DATABASE_URL = "file:./test.db";
