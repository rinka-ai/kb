FROM oven/bun:1.3.5 AS base

LABEL org.opencontainers.image.source="https://github.com/rinka-ai/kb"
LABEL org.opencontainers.image.description="Markdown-first AI research knowledge base with MCP access"

WORKDIR /app

FROM base AS deps

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM base AS runtime

COPY --from=deps /app/node_modules ./node_modules
COPY package.json bun.lock tsconfig.json ./
COPY --chown=bun:bun bin ./bin
COPY --chown=bun:bun src ./src
COPY --chown=bun:bun raw ./raw
COPY --chown=bun:bun wiki ./wiki

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV KB_CACHE_DIR=/home/bun/.cache/ai-research-kb
ENV KB_STATEFUL_SESSIONS=false
ENV KB_ENABLE_WRITES=false

RUN mkdir -p /home/bun/.cache/ai-research-kb && chown -R bun:bun /home/bun/.cache

USER bun

RUN bun run kb:refresh

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["bun", "-e", "const res = await fetch('http://127.0.0.1:3000/health'); if (!res.ok) process.exit(1);"]

CMD ["bun", "run", "kb:mcp:http"]
