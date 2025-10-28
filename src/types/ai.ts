import { z } from 'zod';

// Input validation schema for the generate endpoint
export const CreateNoteInputSchema = z.object({
  topic: z.string().min(1, 'Topic is required').max(200, 'Topic must be less than 200 characters'),
});

// AI Response validation schema
export const AIResponseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  summary: z.string().min(1, 'Summary is required'),
  content: z.string().min(1, 'Content is required'),
});

// TypeScript types derived from Zod schemas
export type CreateNoteInput = z.infer<typeof CreateNoteInputSchema>;
export type AIResponse = z.infer<typeof AIResponseSchema>;

// API Response types
export interface GenerateNoteResponse {
  success: boolean;
  data?: {
    id: number;
    title: string;
    summary: string;
    content: string;
    createdAt: Date;
  };
  error?: string;
}

// OpenAI API types
export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIRequest {
  model: string;
  messages: OpenAIMessage[];
  temperature?: number;
  max_tokens?: number;
}
