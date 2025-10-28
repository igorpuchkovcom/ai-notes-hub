# AI Notes Hub - API Documentation

## Overview

The AI Notes Hub provides RESTful APIs for managing notes and generating AI-powered content.

## Endpoints

### 1. Generate AI Note

**POST** `/api/generate`

Generates a comprehensive note on any topic using OpenAI's GPT-4o-mini model.

#### Request Body

```json
{
  "topic": "artificial intelligence"
}
```

#### Request Parameters

| Parameter | Type   | Required | Description                               |
| --------- | ------ | -------- | ----------------------------------------- |
| `topic`   | string | Yes      | The topic for the note (1-200 characters) |

#### Response

**Success (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Understanding Artificial Intelligence",
    "summary": "A comprehensive overview of AI concepts, applications, and future implications.",
    "content": "# Understanding Artificial Intelligence\n\nArtificial Intelligence (AI) is...",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error (400 Bad Request):**

```json
{
  "success": false,
  "error": "Validation error: Topic is required"
}
```

**Error (500 Internal Server Error):**

```json
{
  "success": false,
  "error": "Failed to generate note. Please try again."
}
```

### 2. Get All Notes

**GET** `/api/notes`

Retrieves all notes in descending order by creation date.

#### Response

```json
[
  {
    "id": 1,
    "title": "Understanding Artificial Intelligence",
    "summary": "A comprehensive overview of AI concepts...",
    "content": "# Understanding Artificial Intelligence\n\n...",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### 3. Create Note

**POST** `/api/notes`

Creates a new note manually.

#### Request Body

```json
{
  "title": "My Custom Note",
  "summary": "A brief summary of the note",
  "content": "# My Custom Note\n\nThis is the content..."
}
```

#### Response

**Success (201 Created):**

```json
{
  "id": 1,
  "title": "My Custom Note",
  "summary": "A brief summary of the note",
  "content": "# My Custom Note\n\nThis is the content...",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ai_notes_hub"

# OpenAI API Key (required for AI note generation)
OPENAI_API_KEY="your_openai_api_key_here"

# Sentry (optional, for error tracking)
SENTRY_DSN="your_sentry_dsn_here"
```

## Usage Examples

### Generate a note about machine learning

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "machine learning"}'
```

### Generate a note about React hooks

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "React hooks"}'
```

### Get all notes

```bash
curl http://localhost:3000/api/notes
```

## Error Handling

The API includes comprehensive error handling:

- **Validation errors**: Input validation using Zod schemas
- **AI service errors**: Graceful handling of OpenAI API failures
- **Database errors**: Proper error responses for database operations
- **Sentry integration**: Automatic error logging and monitoring

## Rate Limiting

Currently, there are no rate limits implemented. Consider adding rate limiting for production use.

## Security

- Input validation prevents malicious input
- Environment variables keep API keys secure
- Error messages don't expose sensitive information
