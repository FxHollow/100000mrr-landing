# 多阶段构建 Dockerfile for 情绪管理应用

# Stage 1: 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 复制 package 文件
COPY package*.json ./
COPY pnpm-lock.yaml ./

# 安装依赖（包括 devDependencies 用于 Prisma 生成）
RUN npm install --frozen-lockfile

# 复制 Prisma schema 并生成客户端
COPY prisma/ ./prisma/
RUN npx prisma generate

# 复制源代码
COPY src/ ./src/
COPY docs/ ./docs/

# Stage 2: 生产阶段
FROM node:20-alpine AS production

WORKDIR /app

# 安装生产依赖
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install --frozen-lockfile --only=production

# 复制生成的 Prisma 客户端和源代码
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/src ./src
COPY --from=builder /app/docs ./docs

# 创建非 root 用户运行应用
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# 创建日志目录
RUN mkdir -p /app/logs && chown -R nodejs:nodejs /app

USER nodejs

# 暴露端口
EXPOSE 3001

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

# 启动应用
CMD ["node", "src/index.js"]
