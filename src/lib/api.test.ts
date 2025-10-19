import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "./prisma";

// Mock the prisma client
vi.mock("./prisma", () => ({
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

const mockPrisma = vi.mocked(prisma);

describe("API Logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Note Operations", () => {
    it("should fetch all notes", async () => {
      const mockNotes = [
        {
          id: 1,
          title: "Test Note 1",
          summary: "Summary 1",
          content: "Content 1",
          createdAt: new Date("2024-01-01"),
        },
        {
          id: 2,
          title: "Test Note 2",
          summary: "Summary 2",
          content: "Content 2",
          createdAt: new Date("2024-01-02"),
        },
      ];

      (mockPrisma.note.findMany as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockNotes
      );

      const notes = await prisma.note.findMany({
        orderBy: { createdAt: "desc" },
      });

      expect(notes).toEqual(mockNotes);
      expect(mockPrisma.note.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: "desc" },
      });
    });

    it("should create a new note", async () => {
      const noteData = {
        title: "New Note",
        summary: "New Summary",
        content: "New Content",
      };

      const createdNote = {
        id: 1,
        ...noteData,
        createdAt: new Date("2024-01-01"),
      };

      (
        mockPrisma.note.create as unknown as ReturnType<typeof vi.fn>
      ).mockResolvedValue(createdNote);

      const result = await prisma.note.create({
        data: noteData,
      });

      expect(result).toEqual(createdNote);
      expect(mockPrisma.note.create).toHaveBeenCalledWith({
        data: noteData,
      });
    });

    it("should find a note by id", async () => {
      const mockNote = {
        id: 1,
        title: "Test Note",
        summary: "Test Summary",
        content: "Test Content",
        createdAt: new Date("2024-01-01"),
      };

      (
        mockPrisma.note.findUnique as unknown as ReturnType<typeof vi.fn>
      ).mockResolvedValue(mockNote);

      const note = await prisma.note.findUnique({
        where: { id: 1 },
      });

      expect(note).toEqual(mockNote);
      expect(mockPrisma.note.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it("should update a note", async () => {
      const updateData = {
        title: "Updated Note",
        summary: "Updated Summary",
        content: "Updated Content",
      };

      const updatedNote = {
        id: 1,
        ...updateData,
        createdAt: new Date("2024-01-01"),
      };

      (
        mockPrisma.note.update as unknown as ReturnType<typeof vi.fn>
      ).mockResolvedValue(updatedNote);

      const result = await prisma.note.update({
        where: { id: 1 },
        data: updateData,
      });

      expect(result).toEqual(updatedNote);
      expect(mockPrisma.note.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
      });
    });

    it("should delete a note", async () => {
      const deletedNote = {
        id: 1,
        title: "Deleted Note",
        summary: "Deleted Summary",
        content: "Deleted Content",
        createdAt: new Date("2024-01-01"),
      };

      (
        mockPrisma.note.delete as unknown as ReturnType<typeof vi.fn>
      ).mockResolvedValue(deletedNote);

      const result = await prisma.note.delete({
        where: { id: 1 },
      });

      expect(result).toEqual(deletedNote);
      expect(mockPrisma.note.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
