FROM oven/bun:latest

WORKDIR /server
COPY . .

RUN bun install

EXPOSE 3000
CMD ["bun", "index.ts"]