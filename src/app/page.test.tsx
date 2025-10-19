import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@/test/utils";
import Home from "./page";
import { prisma } from "@/lib/prisma";

// Mock the prisma client
vi.mock("@/lib/prisma", () => ({
  prisma: {
    note: {
      findMany: vi.fn(),
    },
  },
}));

const mockPrisma = vi.mocked(prisma);

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the page title", async () => {
    mockPrisma.note.findMany.mockResolvedValue([]);

    const component = await Home();
    render(component);

    expect(screen.getByText("AI Notes Hub")).toBeInTheDocument();
  });

  it('displays "No notes yet" when there are no notes', async () => {
    mockPrisma.note.findMany.mockResolvedValue([]);

    const component = await Home();
    render(component);

    expect(screen.getByText("No notes yet.")).toBeInTheDocument();
  });

  it("displays notes when they exist", async () => {
    const mockNotes = [
      {
        id: 1,
        title: "Test Note 1",
        summary: "This is a test note summary",
        content: "Full content here",
        createdAt: new Date("2024-01-01"),
      },
      {
        id: 2,
        title: "Test Note 2",
        summary: "Another test note summary",
        content: "More content here",
        createdAt: new Date("2024-01-02"),
      },
    ];

    mockPrisma.note.findMany.mockResolvedValue(mockNotes);

    const component = await Home();
    render(component);

    expect(screen.getByText("Test Note 1")).toBeInTheDocument();
    expect(screen.getByText("This is a test note summary")).toBeInTheDocument();
    expect(screen.getByText("Test Note 2")).toBeInTheDocument();
    expect(screen.getByText("Another test note summary")).toBeInTheDocument();
  });

  it("calls prisma.note.findMany with correct parameters", async () => {
    mockPrisma.note.findMany.mockResolvedValue([]);

    const component = await Home();
    render(component);

    expect(mockPrisma.note.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: "desc" },
    });
  });
});
