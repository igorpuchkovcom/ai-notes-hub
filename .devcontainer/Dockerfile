# Use Node.js 24 Alpine as base image
FROM node:24-alpine

# Install additional system dependencies
RUN apk add --no-cache \
    git \
    bash \
    curl \
    openssh-client \
    ca-certificates

# Set working directory
WORKDIR /workspace

# Create a non-root user
RUN addgroup -g 1000 node && \
    adduser -u 1000 -G node -s /bin/bash -D node

# Install global npm packages
RUN npm install -g \
    prisma \
    @prisma/client \
    typescript \
    ts-node

# Switch to non-root user
USER node

# Set environment variables
ENV NODE_ENV=development
ENV DATABASE_URL="file:./dev.db"

# Expose port 3000
EXPOSE 3000

# Default command
CMD ["bash"]
