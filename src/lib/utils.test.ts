import { describe, it, expect } from "vitest";
import {
  formatDate,
  truncateText,
  generateSlug,
  validateNoteData,
} from "./utils";

describe("Utils", () => {
  describe("formatDate", () => {
    it("formats a date correctly", () => {
      const date = new Date("2024-01-15T14:30:00Z");
      const formatted = formatDate(date);
      expect(formatted).toMatch(/January 15, 2024/);
    });

    it("handles different time zones", () => {
      const date = new Date("2024-12-25T09:15:30Z");
      const formatted = formatDate(date);
      expect(formatted).toMatch(/December 25, 2024/);
    });
  });

  describe("truncateText", () => {
    it("returns original text when shorter than max length", () => {
      const text = "Short text";
      const result = truncateText(text, 20);
      expect(result).toBe("Short text");
    });

    it("truncates text when longer than max length", () => {
      const text = "This is a very long text that should be truncated";
      const result = truncateText(text, 20);
      expect(result).toBe("This is a very long ...");
    });

    it("handles exact length", () => {
      const text = "Exactly twenty chars";
      const result = truncateText(text, 20);
      expect(result).toBe("Exactly twenty chars");
    });
  });

  describe("generateSlug", () => {
    it("generates a valid slug from title", () => {
      const title = "My Awesome Note Title";
      const slug = generateSlug(title);
      expect(slug).toBe("my-awesome-note-title");
    });

    it("handles special characters", () => {
      const title = "Note with Special Characters!@#$%";
      const slug = generateSlug(title);
      expect(slug).toBe("note-with-special-characters");
    });

    it("handles multiple spaces", () => {
      const title = "Note   with    multiple    spaces";
      const slug = generateSlug(title);
      expect(slug).toBe("note-with-multiple-spaces");
    });

    it("handles multiple hyphens", () => {
      const title = "Note---with---hyphens";
      const slug = generateSlug(title);
      expect(slug).toBe("note-with-hyphens");
    });
  });

  describe("validateNoteData", () => {
    it("validates correct data", () => {
      const data = {
        title: "Valid Title",
        summary: "Valid Summary",
        content: "Valid Content",
      };
      const result = validateNoteData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("validates missing title", () => {
      const data = {
        summary: "Valid Summary",
        content: "Valid Content",
      };
      const result = validateNoteData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Title is required");
    });

    it("validates missing summary", () => {
      const data = {
        title: "Valid Title",
        content: "Valid Content",
      };
      const result = validateNoteData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Summary is required");
    });

    it("validates missing content", () => {
      const data = {
        title: "Valid Title",
        summary: "Valid Summary",
      };
      const result = validateNoteData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Content is required");
    });

    it("validates title length", () => {
      const data = {
        title: "a".repeat(201), // 201 characters
        summary: "Valid Summary",
        content: "Valid Content",
      };
      const result = validateNoteData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Title must be less than 200 characters");
    });

    it("validates summary length", () => {
      const data = {
        title: "Valid Title",
        summary: "a".repeat(501), // 501 characters
        content: "Valid Content",
      };
      const result = validateNoteData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Summary must be less than 500 characters"
      );
    });

    it("validates empty strings", () => {
      const data = {
        title: "   ",
        summary: "",
        content: "   ",
      };
      const result = validateNoteData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(3);
      expect(result.errors).toContain("Title is required");
      expect(result.errors).toContain("Summary is required");
      expect(result.errors).toContain("Content is required");
    });
  });
});
