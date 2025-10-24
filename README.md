# AI Notes Hub

A modern web application for managing AI-generated notes, built with Next.js 15, TypeScript, Prisma, and Tailwind CSS.

> Deployed version: ****

![Build](https://github.com/igorpuchkovcom/ai-notes-hub/actions/workflows/ci.yml/badge.svg)
![Version](https://img.shields.io/github/v/release/igorpuchkovcom/ai-notes-hub?display_name=tag&sort=semver)
![Last commit](https://img.shields.io/github/last-commit/igorpuchkovcom/ai-notes-hub)

## 🚀 Features

- **Note Management**: Create, view, and organize AI-generated notes
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Type Safety**: Full TypeScript support with Prisma ORM
- **Database**: PostgreSQL database with Prisma for robust data management
- **Error Monitoring**: Sentry integration for production error tracking
- **Docker Support**: Containerized deployment with optimized Dockerfile
- **AI Integration**: Ready for Anthropic AI SDK integration
- **Dev Container**: Complete VS Code development environment
- **CI/CD Pipeline**: Automated testing, linting, building, and semantic releases

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript 5
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS 4.1.14
- **AI**: Anthropic AI SDK 0.67.0
- **Monitoring**: Sentry 10.20.0
- **Runtime**: Node.js 24
- **Package Manager**: pnpm
- **Testing**: Vitest 3.2.4

## 🚀 Getting Started

### VS Code Dev Container (Recommended)

1. Clone the repository
2. Install "Dev Containers" extension in VS Code
3. Open project and click "Reopen in Container"
4. Run `pnpm dev`
5. Navigate to [http://localhost:3000](http://localhost:3000)

### Local Development

```bash
# Clone and navigate
git clone <repository-url>
cd ai-notes-hub

# Install pnpm if needed
npm install -g pnpm

# Install dependencies
pnpm install

# Set up environment variables
# Create .env file with:
DATABASE_URL="postgresql://username:password@localhost:5432/ai_notes_hub"

# Set up database
npx prisma generate
npx prisma db push

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ai-notes-hub/
├── src/
│   ├── app/
│   │   ├── api/                     # API routes
│   │   ├── global-error.tsx         # Global error handler with Sentry
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Home page
│   ├── lib/
│   │   └── prisma.ts                # Prisma client
│   └── instrumentation.ts           # Sentry instrumentation
├── prisma/
│   └── schema.prisma                # Database schema
├── sentry.*.config.ts               # Sentry configuration
├── Dockerfile                       # Docker configuration
└── package.json                     # Dependencies and scripts
```

## 🗄️ Database Schema

```prisma
model Note {
  id        Int      @id @default(autoincrement())
  title     String
  summary   String
  content   String
  createdAt DateTime @default(now())
}
```

## 🔧 Environment Variables

| Variable            | Description                      | Example                                    | Required |
| ------------------- | -------------------------------- | ------------------------------------------ | -------- |
| `DATABASE_URL`      | PostgreSQL database connection   | `postgresql://user:pass@localhost:5432/db` | Yes      |
| `SENTRY_DSN`        | Sentry error tracking DSN        | `https://your-dsn@sentry.io/project-id`    | No       |
| `SENTRY_AUTH_TOKEN` | Sentry auth token for sourcemaps | `your-sentry-auth-token`                   | No       |

## 📜 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests with Vitest

## 🐳 Docker Deployment

```bash
# Build the image
docker build -t ai-notes-hub .

# Run the container
docker run -p 3000:3000 ai-notes-hub
```

The Dockerfile uses Node.js 24 Alpine with multi-stage build for optimal production deployment.

## 🚀 Deployment Options

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Other Platforms

Compatible with Railway, Render, DigitalOcean App Platform, AWS ECS/Fargate, or any Node.js hosting.

## 📊 Error Monitoring

Sentry is configured for error tracking across server, edge, and client runtimes. Test the integration at `/sentry-example-page`. Update DSN in `sentry.*.config.ts` for production use.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit using conventional commits format (required for semantic release)
4. Push to the branch and open a Pull Request

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

## 📝 License

MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

**Database Connection Error**: Verify `DATABASE_URL` is correct, PostgreSQL is running, and run `npx prisma generate && npx prisma db push`

**Build Failures**: Clear `.next` directory and reinstall dependencies

**Docker Issues**: Ensure Docker is running and check Dockerfile syntax

For more help, check [Next.js docs](https://nextjs.org/docs) or [Prisma docs](https://www.prisma.io/docs).

---

Built with ❤️ using Next.js, TypeScript, and Prisma

> Deployed version: ****
> Last deploy: **2025-10-24 04:48 UTC**

📦 [Changelog](https://github.com/igorpuchkovcom/ai-notes-hub/releases)

![Build](https://github.com/igorpuchkovcom/ai-notes-hub/actions/workflows/ci.yml/badge.svg)
![Version](https://img.shields.io/github/v/release/igorpuchkovcom/ai-notes-hub?display_name=tag&sort=semver)
![Deployment](https://img.shields.io/website?url=https%3A%2F%2Fai-notes-hub.vercel.app)
![Last commit](https://img.shields.io/github/last-commit/igorpuchkovcom/ai-notes-hub)
