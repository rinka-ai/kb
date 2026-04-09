FROM oven/bun:1.3.5

WORKDIR /app

COPY package.json bun.lock tsconfig.json biome.json ./
RUN bun install --frozen-lockfile --production

COPY . .
RUN bun run kb:refresh

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV KB_STATEFUL_SESSIONS=true
ENV KB_ENABLE_WRITES=false

EXPOSE 3000

CMD ["bun", "run", "kb:mcp:http"]
