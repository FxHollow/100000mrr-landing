# 情绪管理应用 - 部署指南

**版本**: 1.0.0  
**创建日期**: 2026-04-12  
**目标环境**: 阿里云 ECS

---

## 1. 前置条件

### 1.1 阿里云资源

| 资源 | 配置 | 预估费用 |
|------|------|----------|
| ECS | 2 核 4G Ubuntu 22.04 | ¥120/月 |
| RDS PostgreSQL | 2 核 4G 100GB | ¥280/月 |
| Redis | 主从版 2GB | ¥60/月 |
| 域名 | .com 域名 | ¥55/年 |
| SSL 证书 | 免费版（Let's Encrypt） | ¥0 |

### 1.2 软件要求

- Docker 20+
- Docker Compose 2+
- Node.js 20+（本地开发）

---

## 2. 本地开发部署

### 2.1 快速启动

```bash
cd mood-backend

# 复制环境变量
cp .env.example .env

# 启动所有服务（PostgreSQL + Redis + App）
docker-compose up -d

# 运行数据库迁移
docker-compose exec app npx prisma migrate deploy

# 查看日志
docker-compose logs -f app

# 访问健康检查
curl http://localhost:3001/health
```

### 2.2 访问服务

| 服务 | 地址 |
|------|------|
| API | http://localhost:3001 |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |

---

## 3. 阿里云生产部署

### 3.1 ECS 服务器初始化

```bash
# 1. SSH 登录服务器
ssh root@your-ecs-ip

# 2. 更新系统
apt update && apt upgrade -y

# 3. 安装 Docker
curl -fsSL https://get.docker.com | sh

# 4. 安装 Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 5. 创建应用目录
mkdir -p /opt/mood-backend
cd /opt/mood-backend
```

### 3.2 配置环境变量

```bash
# 复制并编辑 .env 文件
cp .env.example .env
nano .env

# 必须配置的变量:
# - DATABASE_URL (阿里云 RDS 连接串)
# - REDIS_PASSWORD
# - JWT_SECRET (随机 32 位字符串)
# - ANTHROPIC_API_KEY
# - WECHAT_APPID, WECHAT_APP_SECRET
# - ALIYUN_ACCESS_KEY, ALIYUN_SECRET
```

### 3.3 配置 SSL 证书

```bash
# 使用 Let's Encrypt 免费证书
apt install certbot -y

# 生成证书（需要域名指向 ECS IP）
certbot certonly --standalone -d your-domain.com

# 复制证书到 nginx 目录
cp /etc/letsencrypt/live/your-domain.com/fullchain.pem /opt/mood-backend/nginx/ssl/
cp /etc/letsencrypt/live/your-domain.com/privkey.pem /opt/mood-backend/nginx/ssl/

# 设置权限
chmod 600 /opt/mood-backend/nginx/ssl/*.pem
```

### 3.4 部署应用

```bash
# 方式 1: 使用部署脚本
chmod +x deploy.sh
./deploy.sh deploy

# 方式 2: 手动部署
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# 运行数据库迁移
docker-compose -f docker-compose.prod.yml run --rm app npx prisma migrate deploy

# 查看日志
docker-compose -f docker-compose.prod.yml logs -f
```

---

## 4. GitHub Actions CI/CD

### 4.1 配置 Secrets

在 GitHub 仓库设置中添加以下 Secrets：

| Secret | 描述 |
|--------|------|
| `ECS_HOST` | ECS 服务器 IP |
| `ECS_USER` | SSH 用户名（通常 root） |
| `ECS_SSH_KEY` | SSH 私钥 |
| `APP_DOMAIN` | 应用域名 |

### 4.2 触发部署

```bash
# 推送到 main 分支自动触发
git push origin main

# 或手动触发
# GitHub Actions -> Deploy to Production -> Run workflow
```

---

## 5. 运维命令

### 5.1 常用 Docker 命令

```bash
# 查看服务状态
docker-compose ps

# 重启服务
docker-compose restart

# 停止服务
docker-compose down

# 查看日志
docker-compose logs -f app

# 进入容器
docker-compose exec app sh

# 运行数据库迁移
docker-compose exec app npx prisma migrate deploy

# 查看数据库
docker-compose exec psql -U mood_user -d mood_app
```

### 5.2 日志管理

```bash
# 查看最近 100 行日志
docker-compose logs --tail=100 app

# 实时查看日志
docker-compose logs -f app

# 查看错误日志
docker-compose logs app | grep ERROR
```

### 5.3 数据库备份

```bash
# 备份数据库
docker-compose exec postgres pg_dump -U mood_user mood_app > backup.sql

# 恢复数据库
docker-compose exec -T postgres psql -U mood_user mood_app < backup.sql
```

---

## 6. 监控和告警

### 6.1 健康检查

```bash
# API 健康检查
curl https://your-domain.com/health

# 预期响应:
# {"success":true,"data":{"status":"healthy",...}}
```

### 6.2 阿里云监控

- **云监控**: 配置 CPU、内存、磁盘告警
- **应用监控**: 集成 Sentry 进行错误追踪
- **日志服务**: 配置 SLS 日志收集

### 6.3 告警配置

| 指标 | 阈值 | 告警方式 |
|------|------|----------|
| CPU 使用率 | >80% | 短信 + 邮件 |
| 内存使用率 | >85% | 短信 + 邮件 |
| 磁盘使用率 | >90% | 短信 + 邮件 |
| API 错误率 | >5% | 邮件 |

---

## 7. 故障排查

### 7.1 常见问题

**问题 1: 服务无法启动**
```bash
# 检查日志
docker-compose logs app

# 检查环境变量
docker-compose exec app env

# 检查数据库连接
docker-compose exec app npx prisma db pull
```

**问题 2: 数据库连接失败**
```bash
# 测试 RDS 连接
docker-compose exec app pg_isready -h your-rds-host -p 5432

# 检查 RDS 白名单（确保 ECS IP 在白名单中）
```

**问题 3: 内存不足**
```bash
# 查看内存使用
free -h

# 清理未使用容器
docker system prune -a -f
```

### 7.2 紧急回滚

```bash
# 回滚到上一个镜像版本
docker-compose -f docker-compose.prod.yml pull
docker tag ghcr.io/your-repo/mood-backend:previous ghcr.io/your-repo/mood-backend:latest
docker-compose -f docker-compose.prod.yml up -d --force-recreate
```

---

## 8. 成本估算

| 项目 | 月费用 | 年费用 |
|------|--------|--------|
| ECS 2C4G | ¥120 | ¥1,440 |
| RDS PostgreSQL | ¥280 | ¥3,360 |
| Redis 2GB | ¥60 | ¥720 |
| 域名 | - | ¥55 |
| SSL 证书 | ¥0 | ¥0 |
| **合计** | **¥460** | **¥5,575** |

---

## 9. 安全检查清单

- [ ] 修改默认数据库密码
- [ ] 配置 RDS 白名单（仅 ECS IP）
- [ ] 配置 Redis 密码
- [ ] 生成随机 JWT_SECRET
- [ ] 启用 HTTPS（强制）
- [ ] 配置 Nginx 限流
- [ ] 定期更新系统包
- [ ] 定期备份数据库
- [ ] 配置 SSH 密钥登录（禁用密码）

---

*创建日期：2026-04-12*  
*后端工程师 - 100000MRR*
