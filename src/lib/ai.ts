import OpenAI from "openai";
import { AIResponse, OpenAIMessage } from "@/types/ai";

// Initialize OpenAI client lazily
let openaiInstance: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openaiInstance) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY environment variable is required");
    }
    openaiInstance = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiInstance;
}

/**
 * Generate a note using OpenAI
 */
export async function generateNote(topic: string): Promise<AIResponse> {
  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: `You are an AI assistant that creates comprehensive, well-structured notes on any given topic. 

Your task is to generate educational content that includes:
1. A clear, descriptive title
2. A concise summary (2-3 sentences)
3. Detailed, well-organized content with proper structure

Guidelines:
- Write in a clear, educational tone
- Use proper markdown formatting for structure
- Include relevant examples when appropriate
- Make the content engaging and informative
- Ensure the content is accurate and well-researched
- Use headings, bullet points, and other formatting to improve readability

Return your response as a JSON object with the following structure:
{
  "title": "Clear and descriptive title",
  "summary": "Brief 2-3 sentence summary",
  "content": "Detailed content with proper markdown formatting"
}`,
    },
    {
      role: "user",
      content: `Please create a comprehensive note about: ${topic}`,
    },
  ];

  const openai = getOpenAI();
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.7,
    max_tokens: 2000,
  });

  const response = completion.choices[0]?.message?.content;

  if (!response) {
    throw new Error("No response from OpenAI");
  }

  // Try to parse as JSON first
  try {
    return JSON.parse(response);
  } catch {
    // If JSON parsing fails, create a structured response from the content
    const lines = response.split("\n");
    const title =
      lines.find((line) => line.startsWith("# "))?.replace("# ", "") ||
      `Notes on ${topic}`;

    // Extract summary (first paragraph after title)
    const titleIndex = lines.findIndex((line) => line.startsWith("# "));
    const summaryStart = titleIndex + 1;
    const summaryEnd = lines.findIndex(
      (line, index) =>
        index > summaryStart &&
        line.trim() === "" &&
        lines[index + 1]?.trim() !== ""
    );

    const summary =
      summaryEnd > summaryStart
        ? lines.slice(summaryStart, summaryEnd).join(" ").trim()
        : `Comprehensive notes about ${topic}`;

    return {
      title,
      summary,
      content: response,
    };
  }
}

/**
 * Validate AI response structure
 */
export function validateAIResponse(response: unknown): response is AIResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "title" in response &&
    "summary" in response &&
    "content" in response &&
    typeof (response as Record<string, unknown>).title === "string" &&
    (response as Record<string, unknown>).title !== "" &&
    typeof (response as Record<string, unknown>).summary === "string" &&
    (response as Record<string, unknown>).summary !== "" &&
    typeof (response as Record<string, unknown>).content === "string" &&
    (response as Record<string, unknown>).content !== ""
  );
}
