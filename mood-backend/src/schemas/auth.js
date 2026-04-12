// 认证相关 Zod Schema

const { z } = require('zod');

// 注册 schema
const RegisterSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z
    .string()
    .min(8, '密码至少需要 8 位')
    .regex(/[A-Z]/, '密码需包含大写字母')
    .regex(/[a-z]/, '密码需包含小写字母')
    .regex(/[0-9]/, '密码需包含数字'),
  name: z.string().min(1, '请输入姓名').max(50, '姓名不能超过 50 字符'),
  phone: z.string().optional(),
});

// 登录 schema
const LoginSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string(),
});

// 刷新 token schema
const RefreshTokenSchema = z.object({
  refreshToken: z.string(),
});

// 更新用户信息 schema
const UpdateProfileSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  avatar: z.string().url('头像必须是有效的 URL').optional(),
  phone: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']).optional(),
  age: z.number().min(18).max(120).optional(),
  occupation: z.string().optional(),
  relationshipStatus: z.enum([
    'SINGLE',
    'DATING',
    'ENGAGED',
    'MARRIED',
    'DIVORCED',
    'WIDOWED',
    'COMPLICATED',
  ]).optional(),
});

// URL 参数 schema
const UserIdParamsSchema = z.object({
  id: z.string().uuid('无效的用户 ID'),
});

module.exports = {
  RegisterSchema,
  LoginSchema,
  RefreshTokenSchema,
  UpdateProfileSchema,
  UserIdParamsSchema,
};
