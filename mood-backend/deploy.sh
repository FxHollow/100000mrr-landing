#!/bin/bash

# 情绪管理应用 - 部署脚本
# 用于阿里云 ECS 服务器

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 配置变量
APP_NAME="mood-app"
APP_DIR="/opt/mood-backend"
DOCKER_COMPOSE_FILE="docker-compose.prod.yml"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}情绪管理应用 - 部署脚本${NC}"
echo -e "${GREEN}========================================${NC}"

# 检查是否以 root 运行
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}请使用 sudo 运行此脚本${NC}"
  exit 1
fi

# 1. 检查 Docker 是否安装
check_docker() {
  if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Docker 未安装，开始安装...${NC}"
    curl -fsSL https://get.docker.com | sh
  else
    echo -e "${GREEN}✓ Docker 已安装$(docker --version)${NC}"
  fi

  if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}Docker Compose 未安装，开始安装...${NC}"
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
  else
    echo -e "${GREEN}✓ Docker Compose 已安装$(docker-compose --version)${NC}"
  fi
}

# 2. 创建应用目录
create_app_dir() {
  echo -e "${YELLOW}创建应用目录...${NC}"
  mkdir -p $APP_DIR
  mkdir -p $APP_DIR/logs
  mkdir -p $APP_DIR/nginx/ssl
}

# 3. 检查环境变量文件
check_env() {
  if [ ! -f "$APP_DIR/.env" ]; then
    echo -e "${YELLOW}创建 .env 文件...${NC}"
    cat > $APP_DIR/.env << 'EOF'
# 生产环境配置

# 数据库配置（阿里云 RDS）
DATABASE_URL=postgresql://user:password@rm-xxx.mysql.rds.aliyuncs.com:5432/mood_app

# Redis 配置
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# JWT 配置（请生成随机密钥）
JWT_SECRET=generate-a-secure-random-string-at-least-32-characters
JWT_REFRESH_SECRET=generate-another-secure-random-string

# AI 配置
ANTHROPIC_API_KEY=sk-ant-...

# 微信配置
WECHAT_APPID=wx...
WECHAT_APP_SECRET=...

# 阿里云短信配置
ALIYUN_ACCESS_KEY=...
ALIYUN_SECRET=...

# 数据库配置（本地 PostgreSQL）
DB_USER=mood_user
DB_PASSWORD=mood_password
EOF
    echo -e "${RED}⚠️  请编辑 $APP_DIR/.env 文件配置实际参数${NC}"
  else
    echo -e "${GREEN}✓ .env 文件已存在${NC}"
  fi
}

# 4. 部署应用
deploy() {
  echo -e "${YELLOW}拉取最新代码...${NC}"
  cd $APP_DIR

  # 如果是 git 部署
  if [ -d ".git" ]; then
    git pull origin main
  fi

  echo -e "${YELLOW}构建并启动服务...${NC}"
  docker-compose -f $DOCKER_COMPOSE_FILE build --no-cache
  docker-compose -f $DOCKER_COMPOSE_FILE up -d

  # 等待服务启动
  echo -e "${YELLOW}等待服务启动...${NC}"
  sleep 10

  # 检查健康状态
  if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ 部署成功！服务健康检查通过${NC}"
  else
    echo -e "${RED}⚠️  服务健康检查失败，请检查日志${NC}"
    docker-compose -f $DOCKER_COMPOSE_FILE logs app
  fi
}

# 5. 运行数据库迁移
run_migrations() {
  echo -e "${YELLOW}运行数据库迁移...${NC}"
  docker-compose -f $DOCKER_COMPOSE_FILE run --rm app npx prisma migrate deploy
}

# 6. 查看日志
logs() {
  echo -e "${YELLOW}查看应用日志...${NC}"
  docker-compose -f $DOCKER_COMPOSE_FILE logs -f app
}

# 主菜单
show_menu() {
  echo ""
  echo "请选择操作:"
  echo "1) 首次部署 (检查环境 + 部署)"
  echo "2) 更新部署 (拉取代码 + 重启)"
  echo "3) 运行数据库迁移"
  echo "4) 查看日志"
  echo "5) 重启服务"
  echo "6) 停止服务"
  echo "0) 退出"
  echo ""
  read -p "请输入选项 [0-6]: " choice

  case $choice in
    1)
      check_docker
      create_app_dir
      check_env
      deploy
      run_migrations
      ;;
    2)
      deploy
      ;;
    3)
      run_migrations
      ;;
    4)
      logs
      ;;
    5)
      docker-compose -f $DOCKER_COMPOSE_FILE restart
      echo -e "${GREEN}✓ 服务已重启${NC}"
      ;;
    6)
      docker-compose -f $DOCKER_COMPOSE_FILE down
      echo -e "${GREEN}✓ 服务已停止${NC}"
      ;;
    0)
      exit 0
      ;;
    *)
      echo -e "${RED}无效选项${NC}"
      ;;
  esac
}

# 如果有命令行参数则直接执行
case $1 in
  deploy)
    check_docker
    create_app_dir
    check_env
    deploy
    run_migrations
    ;;
  migrate)
    run_migrations
    ;;
  logs)
    logs
    ;;
  restart)
    docker-compose -f $DOCKER_COMPOSE_FILE restart
    ;;
  stop)
    docker-compose -f $DOCKER_COMPOSE_FILE down
    ;;
  *)
    show_menu
    ;;
esac
