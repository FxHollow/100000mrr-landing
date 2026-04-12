// 认证服务

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');
const { AppError } = require('../middleware/error');

// JWT 配置
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

/**
 * 用户注册
 */
async function register({ email, password, name, phone }) {
  // 检查邮箱是否已存在
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw new AppError('CONFLICT', '该邮箱已被注册', 409);
  }

  // 密码哈希
  const hashedPassword = await bcrypt.hash(password, 12);

  // 创建用户
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      phone,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  // 生成 token
  const tokens = generateTokens(user.id);

  return { user, tokens };
}

/**
 * 用户登录
 */
async function login({ email, password }) {
  // 查找用户
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError('UNAUTHORIZED', '邮箱或密码错误', 401);
  }

  // 验证密码
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError('UNAUTHORIZED', '邮箱或密码错误', 401);
  }

  // 更新最后登录时间
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  // 生成 token
  const tokens = generateTokens(user.id);

  // 返回用户信息（不含密码）
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, tokens };
}

/**
 * 刷新 token
 */
async function refreshToken(refreshToken) {
  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);

    if (decoded.type !== 'refresh') {
      throw new AppError('INVALID_TOKEN', '无效的 token 类型', 401);
    }

    // 验证用户是否存在
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      throw new AppError('UNAUTHORIZED', '用户不存在', 401);
    }

    // 生成新 token
    const tokens = generateTokens(user.id);

    return { tokens };
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new AppError('TOKEN_EXPIRED', 'Refresh token 已过期', 401);
    }
    throw new AppError('INVALID_TOKEN', '无效的 refresh token', 401);
  }
}

/**
 * 获取用户信息
 */
async function getProfile(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
      phone: true,
      gender: true,
      age: true,
      occupation: true,
      relationshipStatus: true,
      role: true,
      createdAt: true,
      lastLoginAt: true,
    },
  });

  if (!user) {
    throw new AppError('NOT_FOUND', '用户不存在', 404);
  }

  return user;
}

/**
 * 更新用户信息
 */
async function updateProfile(userId, data) {
  const allowedFields = ['name', 'avatar', 'phone', 'gender', 'age', 'occupation', 'relationshipStatus'];
  const updateData = {};

  for (const key of allowedFields) {
    if (data[key] !== undefined) {
      updateData[key] = data[key];
    }
  }

  return prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
      phone: true,
      gender: true,
      age: true,
      occupation: true,
      relationshipStatus: true,
    },
  });
}

/**
 * 生成 access 和 refresh token
 */
function generateTokens(userId) {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign({ userId, type: 'refresh' }, JWT_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });

  return {
    accessToken,
    refreshToken,
    expiresIn: JWT_EXPIRES_IN,
  };
}

module.exports = {
  register,
  login,
  refreshToken,
  getProfile,
  updateProfile,
};
