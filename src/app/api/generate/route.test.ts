import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";
import { NextRequest } from "next/server";
import OpenAI from "openai";

// Mock OpenAI
vi.mock("openai", () => ({
  default: vi.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: vi.fn(),
      },
    },
  })),
}));

// Mock Prisma
vi.mock("@/lib/prisma", () => ({
  prisma: {
    note: {
      create: vi.fn(),
    },
  },
}));

// Mock Sentry
vi.mock("@sentry/nextjs", () => ({
  captureException: vi.fn(),
}));

describe("/api/generate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should generate a note successfully", async () => {
    const mockOpenAI = new OpenAI();
    const mockCreate = vi.mocked(mockOpenAI.chat.completions.create);
    const { prisma } = await import("@/lib/prisma");
    const mockPrismaCreate = vi.mocked(prisma.note.create);

    // Mock OpenAI response
    mockCreate.mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify({
              title: "Test Note",
              summary: "This is a test summary",
              content: "# Test Note\n\nThis is test content.",
            }),
          },
        },
      ],
    } as unknown as Awaited<ReturnType<typeof mockCreate>>);

    // Mock Prisma response
    mockPrismaCreate.mockResolvedValue({
      id: 1,
      title: "Test Note",
      summary: "This is a test summary",
      content: "# Test Note\n\nThis is test content.",
      createdAt: new Date(),
    });

    const request = new NextRequest("http://localhost:3000/api/generate", {
      method: "POST",
      body: JSON.stringify({ topic: "artificial intelligence" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty("id");
    expect(data.data).toHaveProperty("title", "Test Note");
    expect(data.data).toHaveProperty("summary", "This is a test summary");
  });

  it("should return validation error for invalid input", async () => {
    const request = new NextRequest("http://localhost:3000/api/generate", {
      method: "POST",
      body: JSON.stringify({ topic: "" }), // Empty topic should fail validation
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toContain("Validation error");
  });

  it("should handle OpenAI API errors gracefully", async () => {
    const mockOpenAI = new OpenAI();
    const mockCreate = vi.mocked(mockOpenAI.chat.completions.create);

    // Mock OpenAI error
    mockCreate.mockRejectedValue(new Error("OpenAI API error"));

    const request = new NextRequest("http://localhost:3000/api/generate", {
      method: "POST",
      body: JSON.stringify({ topic: "test topic" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.error).toContain("Failed to generate note");
  });
});
