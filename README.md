# AI Notes Hub

A modern web application for managing AI-generated notes, built with Next.js 15, TypeScript, Prisma, and Tailwind CSS.

## 🚀 Features

- **Note Management**: Create, view, and organize AI-generated notes
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Type Safety**: Full TypeScript support with Prisma ORM
- **Database**: PostgreSQL database with Prisma for robust data management
- **Docker Support**: Containerized deployment with optimized Dockerfile
- **AI Integration**: Ready for Anthropic AI SDK integration
- **Dev Container**: Complete VS Code development environment with extensions
- **CI/CD Pipeline**: Automated testing, linting, and building with GitHub Actions
- **Code Quality**: Prettier formatting and ESLint with TypeScript support
- **Testing**: Vitest testing framework for reliable code

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript 5
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS 4.1.14
- **AI**: Anthropic AI SDK 0.67.0
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

- **Pre-configured Extensions**: Tailwind CSS, Prettier, TypeScript, Prisma, ESLint
- **Auto-formatting**: Code formats automatically on save
- **Linting**: ESLint runs automatically with TypeScript support
- **Port Forwarding**: Automatic port 3000 forwarding for Next.js
- **Post-creation Setup**: Automatic dependency installation and database setup

### Development Tools

- **Prettier**: Consistent code formatting across the project
- **ESLint**: TypeScript-aware linting with Next.js rules
- **Vitest**: Fast testing framework for unit and integration tests
- **pnpm**: Fast, disk space efficient package manager
- **GitHub Actions**: Automated CI/CD pipeline

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
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Home page component
│   └── lib/
│       └── prisma.ts        # Prisma client configuration
├── prisma/
│   └── schema.prisma        # Database schema
├── public/                 # Static assets
├── Dockerfile             # Docker configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
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

| Variable       | Description                    | Example                                    |
| -------------- | ------------------------------ | ------------------------------------------ |
| `DATABASE_URL` | PostgreSQL database connection | `postgresql://user:pass@localhost:5432/db` |

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
6. **CI/CD**: GitHub Actions automatically runs lint, test, and build on every push/PR

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
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

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
