# AI Notes Hub

A modern web application for managing AI-generated notes, built with Next.js 15, TypeScript, Prisma, and Tailwind CSS.

## 🚀 Features

- **Note Management**: Create, view, and organize AI-generated notes
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Type Safety**: Full TypeScript support with Prisma ORM
- **Database**: PostgreSQL database with Prisma for robust data management
- **Error Monitoring**: Sentry integration for production error tracking
- **Docker Support**: Containerized deployment with optimized Dockerfile
- **AI Integration**: Ready for Anthropic AI SDK integration
- **Dev Container**: Complete VS Code development environment with extensions
- **CI/CD Pipeline**: Automated testing, linting, and building with GitHub Actions
- **Semantic Release**: Automated versioning, changelog generation, and GitHub releases
- **Discord Notifications**: Real-time build status notifications via Discord webhooks
- **Code Quality**: Prettier formatting and ESLint with TypeScript support
- **Testing**: Vitest testing framework for reliable code

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript 5
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS 4.1.14
- **AI**: Anthropic AI SDK 0.67.0
- **Monitoring**: Sentry 10.20.0 for error tracking
- **Runtime**: Node.js 24 (Alpine Linux in Docker)
- **Package Manager**: pnpm (with workspace support)
- **Testing**: Vitest 3.2.4
- **Code Quality**: Prettier 3.6.2, ESLint 9
- **CI/CD**: GitHub Actions

## 📋 Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Docker (optional, for containerized deployment)
- VS Code with Dev Containers extension (for dev container setup)

## 🚀 Getting Started

### Option 1: VS Code Dev Container (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-notes-hub
   ```

2. **Open in VS Code with Dev Containers**
   - Install the "Dev Containers" extension in VS Code
   - Open the project folder in VS Code
   - Click "Reopen in Container" when prompted
   - The dev container will automatically set up the environment

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Option 2: Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-notes-hub
   ```

2. **Install pnpm (if not already installed)**

   ```bash
   npm install -g pnpm
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/ai_notes_hub"
   ```

   **Optional**: Configure Sentry for error tracking:
   - Update `sentry.edge.config.ts` and `sentry.server.config.ts` with your Sentry DSN
   - Or set the DSN in environment variables and update the config files to use `process.env.SENTRY_DSN`

5. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Start the development server**

   ```bash
   pnpm dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Development Environment

### VS Code Dev Container Features

The project includes a complete development environment with:

- **Pre-configured Extensions**: Tailwind CSS, Prettier, TypeScript, Prisma, ESLint, Vitest Explorer, Docker
- **Auto-formatting**: Code formats automatically on save
- **Linting**: ESLint runs automatically with TypeScript support
- **Testing Integration**: Vitest test explorer and debugging support
- **Port Forwarding**: Automatic port 3000 forwarding for Next.js
- **Post-creation Setup**: Automatic dependency installation and database setup
- **Enhanced Editor Settings**: TypeScript auto-imports, consistent formatting, and testing configuration

### Development Tools

- **Prettier**: Consistent code formatting across the project
- **ESLint**: TypeScript-aware linting with Next.js rules
- **Vitest**: Fast testing framework for unit and integration tests
- **pnpm**: Fast, disk space efficient package manager
- **GitHub Actions**: Automated CI/CD pipeline with Discord notifications

### Docker Deployment

1. **Build the Docker image**

   ```bash
   docker build -t ai-notes-hub .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 ai-notes-hub
   ```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ai-notes-hub/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── sentry-example-api/  # Sentry example API endpoint
│   │   ├── sentry-example-page/     # Sentry example page
│   │   ├── global-error.tsx         # Global error handler with Sentry
│   │   ├── globals.css              # Global styles
│   │   ├── layout.tsx               # Root layout component
│   │   └── page.tsx                 # Home page component
│   ├── lib/
│   │   └── prisma.ts                # Prisma client configuration
│   ├── instrumentation.ts           # Sentry instrumentation setup
│   └── instrumentation-client.ts    # Client-side instrumentation
├── prisma/
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
├── sentry.edge.config.ts    # Sentry edge runtime configuration
├── sentry.server.config.ts  # Sentry server-side configuration
├── next.config.js           # Next.js and Sentry configuration
├── Dockerfile               # Docker configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## 🗄️ Database Schema

The application uses a simple Note model:

```prisma
model Note {
  id        Int      @id @default(autoincrement())
  title     String
  summary   String
  content   String
  createdAt DateTime @default(now())
}
```

## 🚀 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint with TypeScript support
- `pnpm test` - Run tests with Vitest

## 🐳 Docker Configuration

The Dockerfile is optimized for production deployment:

- **Base Image**: Node.js 24 Alpine Linux
- **Multi-stage Build**: Efficient layer caching
- **Prisma Integration**: Automatic client generation
- **Database Setup**: Automatic schema creation on startup
- **Environment Variables**: Configurable database URL

## 🔧 Environment Variables

| Variable                   | Description                          | Example                                    | Required |
| -------------------------- | ------------------------------------ | ------------------------------------------ | -------- |
| `DATABASE_URL`             | PostgreSQL database connection       | `postgresql://user:pass@localhost:5432/db` | Yes      |
| `SENTRY_DSN`               | Sentry error tracking DSN            | `https://your-dsn@sentry.io/project-id`    | No       |
| `SENTRY_AUTH_TOKEN`        | Sentry auth token for sourcemaps     | `your-sentry-auth-token`                   | No       |
| `.env.sentry-build-plugin` | Sentry build plugin configuration    | Auto-generated by Sentry wizard            | No       |
| `DISCORD_WEBHOOK_URL`      | Discord webhook for CI notifications | `https://discord.com/api/webhooks/...`     | No       |

**Note**: Sentry DSN is currently configured in `sentry.edge.config.ts` and `sentry.server.config.ts`. For production deployments, consider moving the DSN to environment variables for better security.

## 🎨 UI Components

The application features a clean, modern interface:

- **Responsive Design**: Works on desktop and mobile
- **Tailwind CSS**: Utility-first CSS framework
- **Geist Fonts**: Modern typography
- **Dynamic Rendering**: Server-side rendering with dynamic data

## 🔄 Development Workflow

1. **Database Changes**: Update `prisma/schema.prisma` and run `npx prisma db push`
2. **Type Generation**: Run `npx prisma generate` after schema changes
3. **Code Quality**: Use `pnpm lint` to check code quality
4. **Testing**: Use `pnpm test` to run tests with Vitest
5. **Code Formatting**: Prettier is configured to format on save in VS Code
6. **Commit Messages**: Use conventional commit format (see Semantic Release section below)
7. **CI/CD**: GitHub Actions automatically runs lint, test, and build on every push/PR with Discord notifications
8. **Releases**: Semantic release automatically creates versions and releases when pushed to main

## 🔔 Discord Notifications

The CI/CD pipeline includes Discord webhook integration for real-time build notifications:

### Features

- **Build Status Alerts**: Automatic notifications for successful and failed builds
- **Rich Embeds**: Color-coded messages with build details
- **Repository Context**: Shows repository name, branch, and actor information
- **Real-time Updates**: Instant notifications on every push and pull request

### Setup

1. **Create a Discord Webhook**:
   - Go to your Discord server settings
   - Navigate to Integrations → Webhooks
   - Create a new webhook and copy the URL

2. **Add to GitHub Secrets**:
   - Go to your repository settings on GitHub
   - Navigate to Secrets and variables → Actions
   - Add a new secret named `DISCORD_WEBHOOK_URL` with your webhook URL

3. **Test the Integration**:
   - Push a commit to trigger the CI pipeline
   - Check your Discord channel for the notification

## 📦 Semantic Release & Versioning

The project uses [semantic-release](https://github.com/semantic-release/semantic-release) for automated version management and package publishing.

### How It Works

- **Automatic Versioning**: Version numbers are automatically determined based on commit messages
- **Changelog Generation**: CHANGELOG.md is automatically updated with release notes
- **GitHub Releases**: Releases are automatically created on GitHub
- **Sentry Integration**: Release notifications are sent to Sentry for error tracking

### Conventional Commits

All commit messages **must** follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Commit Types

- `feat:` - A new feature (triggers minor version bump, e.g., 1.0.0 → 1.1.0)
- `fix:` - A bug fix (triggers patch version bump, e.g., 1.0.0 → 1.0.1)
- `docs:` - Documentation changes only
- `style:` - Code style changes (formatting, semicolons, etc.)
- `refactor:` - Code refactoring without feature changes
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks, dependency updates
- `ci:` - CI/CD configuration changes
- `build:` - Build system changes

#### Breaking Changes

To trigger a major version bump (e.g., 1.0.0 → 2.0.0), include `BREAKING CHANGE:` in the commit footer or use `!` after the type:

```bash
feat!: remove deprecated API endpoint

BREAKING CHANGE: The /old-api endpoint has been removed. Use /new-api instead.
```

#### Examples

```bash
# Feature (minor version bump)
feat(notes): add ability to archive notes

# Bug fix (patch version bump)
fix(api): resolve database connection timeout

# Documentation (no version bump)
docs: update installation instructions

# Breaking change (major version bump)
feat!: redesign authentication system

BREAKING CHANGE: JWT tokens now require RS256 algorithm
```

### Release Process

1. **Commit with Conventional Format**: Push commits to the main branch using conventional commit messages
2. **Automatic Analysis**: Semantic release analyzes commits to determine the version bump
3. **Version Update**: Updates version in package.json
4. **Changelog Generation**: Creates/updates CHANGELOG.md with release notes
5. **Git Tag**: Creates a git tag for the new version
6. **GitHub Release**: Publishes a release on GitHub with release notes
7. **Sentry Notification**: Notifies Sentry about the new release for error tracking

### Configuration Files

- `.releaserc.json` - Semantic release configuration
- `.github/workflows/кelease.yml` - Release workflow that runs on main branch pushes

### GitHub Secrets Required

- `GITHUB_TOKEN` - Automatically provided by GitHub Actions
- `SENTRY_AUTH_TOKEN` - Required for Sentry release notifications (optional)

## 📊 Error Monitoring with Sentry

The application includes full Sentry integration for error tracking and performance monitoring:

### Configuration Files

- `sentry.server.config.ts` - Server-side error tracking
- `sentry.edge.config.ts` - Edge runtime error tracking
- `src/instrumentation.ts` - Main instrumentation setup
- `src/app/global-error.tsx` - Global error boundary

### Features

- **Automatic Error Capture**: Errors are automatically captured and sent to Sentry
- **Performance Monitoring**: Track application performance and slow endpoints
- **User Context**: Captures user information with errors (when enabled)
- **Source Maps**: Automatic upload to Sentry for better stack traces
- **Custom Monitoring Route**: Uses `/monitoring` tunnel to bypass ad-blockers

### Testing Sentry Integration

Visit `/sentry-example-page` to test error tracking, or make a request to `/api/sentry-example-api/route` to test API error tracking.

### Configuration for Production

1. **Update Sentry DSN**: Replace the DSN in `sentry.*.config.ts` files with your production DSN
2. **Set Auth Token**: Add `SENTRY_AUTH_TOKEN` to environment variables for source map uploads
3. **Adjust Sample Rates**: Modify `tracesSampleRate` in config files (currently set to 1 for development)
4. **Review PII Settings**: Consider disabling `sendDefaultPii` for production if privacy is a concern

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker

1. Build the image: `docker build -t ai-notes-hub .`
2. Run the container: `docker run -p 3000:3000 ai-notes-hub`

### Other Platforms

The application can be deployed to any platform that supports Node.js:

- Railway
- Render
- DigitalOcean App Platform
- AWS ECS/Fargate

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/) format:
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

**Note**: All commits must follow the Conventional Commits specification for semantic release to work properly. See the [Semantic Release & Versioning](#-semantic-release--versioning) section for details.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure `DATABASE_URL` is set correctly with PostgreSQL connection string
   - Verify PostgreSQL server is running and accessible
   - Check database credentials and permissions
   - Run `npx prisma generate` and `npx prisma db push`

2. **Build Failures**
   - Clear `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

3. **Docker Build Issues**
   - Ensure Docker is running
   - Check Dockerfile syntax
   - Verify all files are copied correctly

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Prisma documentation](https://www.prisma.io/docs)
- Open an issue in this repository

---

Built with ❤️ using Next.js, TypeScript, and Prisma
