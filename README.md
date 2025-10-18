# AI Notes Hub

A modern web application for managing AI-generated notes, built with Next.js 15, TypeScript, Prisma, and Tailwind CSS.

## 🚀 Features

- **Note Management**: Create, view, and organize AI-generated notes
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Type Safety**: Full TypeScript support with Prisma ORM
- **Database**: SQLite database with Prisma for easy development
- **Docker Support**: Containerized deployment with optimized Dockerfile
- **AI Integration**: Ready for Anthropic AI SDK integration

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript 5
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS 4.1.14
- **AI**: Anthropic AI SDK 0.67.0
- **Runtime**: Node.js 24 (Alpine Linux in Docker)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional, for containerized deployment)

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-notes-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

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
│   ├── schema.prisma        # Database schema
│   └── dev.db              # SQLite database file
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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🐳 Docker Configuration

The Dockerfile is optimized for production deployment:

- **Base Image**: Node.js 24 Alpine Linux
- **Multi-stage Build**: Efficient layer caching
- **Prisma Integration**: Automatic client generation
- **Database Setup**: Automatic schema creation on startup
- **Environment Variables**: Configurable database URL

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | SQLite database file path | `file:./dev.db` |

## 🎨 UI Components

The application features a clean, modern interface:

- **Responsive Design**: Works on desktop and mobile
- **Tailwind CSS**: Utility-first CSS framework
- **Geist Fonts**: Modern typography
- **Dynamic Rendering**: Server-side rendering with dynamic data

## 🔄 Development Workflow

1. **Database Changes**: Update `prisma/schema.prisma` and run `npx prisma db push`
2. **Type Generation**: Run `npx prisma generate` after schema changes
3. **Code Quality**: Use `npm run lint` to check code quality
4. **Testing**: Add tests in a `__tests__` directory (recommended)

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
   - Ensure `DATABASE_URL` is set correctly
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