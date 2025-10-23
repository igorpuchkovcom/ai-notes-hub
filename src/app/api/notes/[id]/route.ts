import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const note = await prisma.note.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const body = await request.json();
    const { title, summary, content } = body;

    const note = await prisma.note.update({
      where: { id: parseInt(params.id) },
      data: {
        title,
        summary,
        content,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    await prisma.note.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}
