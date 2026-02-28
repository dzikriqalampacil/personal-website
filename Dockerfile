FROM node:18-bookworm-slim AS deps

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18-bookworm-slim AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-bookworm-slim AS runner

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends alsa-utils pulseaudio-utils \
  && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV PORT=3005
ENV BELL_SCRIPT_PATH=/app/scripts/ring-bell.sh

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/next.config.js ./next.config.js

RUN chmod +x /app/scripts/ring-bell.sh

USER node

EXPOSE 3005

CMD ["sh", "-c", "npm run start -- -p ${PORT:-3005}"]