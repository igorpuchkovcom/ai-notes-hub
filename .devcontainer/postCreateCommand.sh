#!/bin/bash

# Exit on any error
set -e

echo "🚀 Setting up AI Notes Hub development environment..."

# Install dependencies
echo "📦 Installing npm dependencies..."
npm install

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Set up database
echo "🗃️ Setting up database..."
npx prisma db push

echo "✅ Development environment setup complete!"
echo "🎉 You can now run 'npm run dev' to start the development server"
