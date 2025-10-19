import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "./prisma";

// Mock PrismaClient
vi.mock("@prisma/client", () => ({
  PrismaClient: vi.fn().mockImplementation(() => ({
    note: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  })),
}));

describe("Prisma Client", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("exports a prisma client instance", () => {
    expect(prisma).toBeDefined();
    expect(prisma.note).toBeDefined();
  });

  it("has all required note methods", () => {
    expect(prisma.note.findMany).toBeDefined();
    expect(prisma.note.findUnique).toBeDefined();
    expect(prisma.note.create).toBeDefined();
    expect(prisma.note.update).toBeDefined();
    expect(prisma.note.delete).toBeDefined();
  });
});
