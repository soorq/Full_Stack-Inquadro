# 🧑‍💻 Development
FROM node:18-alpine AS dev

# Add missing shared libraries
RUN apk add --no-cache libc6-compat

# Create app folder
WORKDIR /app

# Set environment to development
ENV NODE_ENV dev

# Copy source code into app folder
COPY . .

# Ensure correct ownership
RUN chown -R node:node /app

# Install dependencies
USER node
RUN yarn install --frozen-lockfile

# Build the application
RUN yarn run build

# 🏡 Production Build
FROM node:18-alpine AS build

# Add missing shared libraries
RUN apk add --no-cache libc6-compat

# Create app folder
WORKDIR /app

# Set environment to production
ENV NODE_ENV production

# Copy dependencies from development stage
COPY --from=dev /app/node_modules ./node_modules

# Copy source code
COPY . .

# Generate the production build
RUN yarn build

# Install only the production dependencies and clean cache
RUN yarn install --production --frozen-lockfile && yarn cache clean

# 🏠 Production Server
FROM node:18-alpine AS prod

# Add missing shared libraries
RUN apk add --no-cache libc6-compat

# Create app folder
WORKDIR /app

# Set environment to production
ENV NODE_ENV production

# Copy only the necessary files
COPY --from=build /app/dist dist
COPY --from=build /app/node_modules node_modules

# Ensure correct ownership
RUN chown -R node:node /app

# Set Docker as a non-root user
USER node

CMD ["node", "dist/main.js"]
