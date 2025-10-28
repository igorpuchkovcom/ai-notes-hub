import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/prisma";
import { generateNote, validateAIResponse } from "@/lib/ai";
import {
  CreateNoteInputSchema,
  AIResponseSchema,
  GenerateNoteResponse,
} from "@/types/ai";

export async function POST(
  request: NextRequest
): Promise<NextResponse<GenerateNoteResponse>> {
  try {
    // 1️⃣. Validate input
    const body = await request.json();
    const validationResult = CreateNoteInputSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: `Validation error: ${validationResult.error.issues.map((e) => e.message).join(", ")}`,
        },
        { status: 400 }
      );
    }

    const { topic } = validationResult.data;

    // 2️⃣. Generate note using AI
    const aiResponse = await generateNote(topic);

    // 3️⃣. Validate AI response
    if (!validateAIResponse(aiResponse)) {
      throw new Error("Invalid AI response structure");
    }

    const validationResult2 = AIResponseSchema.safeParse(aiResponse);

    if (!validationResult2.success) {
      throw new Error("AI response validation failed");
    }

    const { title, summary, content } = validationResult2.data;

    // 5️⃣. Save to DB
    const note = await prisma.note.create({
      data: {
        title,
        summary,
        content,
      },
    });

    // 6️⃣. Return to client
    return NextResponse.json(
      {
        success: true,
        data: note,
      },
      { status: 201 }
    );
  } catch (error) {
    // Log error to Sentry
    Sentry.captureException(error, {
      tags: {
        endpoint: "/api/generate",
        operation: "generate_note",
      },
      extra: {
        requestBody: await request.json().catch(() => null),
      },
    });

    console.error("Error generating note:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate note. Please try again.",
      },
      { status: 500 }
    );
  }
}
