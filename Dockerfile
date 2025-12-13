# ----------------------------------------------------------------------
# 1. Builder Stage: Used to install dependencies and build the application
# ----------------------------------------------------------------------
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to take advantage of Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the source code
COPY . .

# Run the Vite build command
# This creates the 'dist' directory with the compiled files (The Vite default)
# We use the standard 'build' script defined in your package.json
RUN npm run build

# ----------------------------------------------------------------------
# 2. Runner Stage: The final, minimal image for production deployment
# ----------------------------------------------------------------------
# Use a smaller, production-ready Node.js image
# Note: Since the final artifact is static files, a dedicated web server
# (like Caddy or Nginx) is often better, but we'll stick to a minimal
# Node environment to use the 'vite preview' or a similar server.
FROM node:20-alpine AS runner

# Set environment variables for production
ENV NODE_ENV=production
# Set the default port where the server will listen (Coolify will use this)
ENV PORT=4000

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage:
# 1. production dependencies (node_modules) - *only if needed for 'preview'*
# 2. dist folder (the compiled Vite output)
# 3. public folder (static assets)
# Note: For Vite, you primarily need the 'dist' folder and the 'preview' script.

# Copy the built application from the 'dist' folder
COPY --from=builder /app/dist ./dist

# We will run the app using 'vite preview' as defined in your package.json,
# so we need the node_modules and package.json to run the script.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port (must match ENV PORT, though 'vite preview' uses 4004 in your script)
# Setting the environment variable PORT=4000 will override the default in the 'preview' script
EXPOSE ${PORT}

# The command to start the Vite server in production preview mode
# We use the 'preview' script which is configured to serve on 0.0.0.0:4004
# Note: The ENV PORT=4000 might be ignored by the script.
# If Coolify relies on 4000, you should update your package.json script to:
# "preview": "vite preview --host 0.0.0.0 --port=$PORT"
CMD ["npm", "run", "preview"]
