const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/index.js']

const doc = {
  info: {
    title: '100000MRR API - B2C Platform',
    description: `
# 100000MRR Backend API

B2C 在线教育平台后端 API

## 认证说明

所有需要认证的端点都需要在请求头中携带 JWT token:
\`\`\`
Authorization: Bearer <your_jwt_token>
\`\`\`

## 角色权限

- **USER**: 普通用户，可以浏览课程、购买课程、学习
- **ADMIN**: 管理员，可以管理课程、用户
- **SUPER_ADMIN**: 超级管理员，拥有所有权限

## 响应格式

### 成功响应
\`\`\`json
{
  "success": true,
  "data": { },
  "meta": { }
}
\`\`\`

### 错误响应
\`\`\`json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": [ ]
  }
}
\`\`\`
    `,
    version: '0.1.0'
  },
  host: 'localhost:3000',
  basePath: '/api/v1',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'JWT Authentication. Format: Bearer <token>'
    }
  },
  tags: [
    {
      name: 'System',
      description: 'System health and info endpoints'
    },
    {
      name: 'Authentication',
      description: 'User registration, login, token management'
    },
    {
      name: 'User Management',
      description: 'Admin-only user CRUD operations'
    },
    {
      name: 'Course Management',
      description: 'Course browsing, enrollment, and administration'
    }
  ],
  definitions: {
    User: {
      id: 'uuid-here',
      email: 'user@example.com',
      name: 'John Doe',
      role: 'USER',
      createdAt: '2026-03-26T00:00:00.000Z',
      updatedAt: '2026-03-26T00:00:00.000Z'
    },
    Course: {
      id: 'uuid-here',
      title: 'AI 技能提升计划',
      slug: 'ai-skills-bootcamp',
      description: '30 天掌握 AI 工具，让工作效率翻倍',
      price: '299.00',
      originalPrice: '599.00',
      thumbnail: 'https://example.com/image.jpg',
      status: 'PUBLISHED'
    },
    Enrollment: {
      id: 'enrollment-uuid',
      userId: 'user-uuid',
      courseId: 'course-uuid',
      status: 'ACTIVE',
      createdAt: '2026-03-26T00:00:00.000Z'
    },
    RegisterRequest: {
      email: 'user@example.com',
      password: 'securepassword123',
      name: 'John Doe'
    },
    LoginRequest: {
      email: 'user@example.com',
      password: 'securepassword123'
    },
    AuthResponse: {
      user: {
        id: 'uuid-here',
        email: 'user@example.com',
        name: 'John Doe',
        role: 'USER'
      },
      token: 'eyJhbGc...',
      refreshToken: 'eyJhbGc...'
    }
  }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger spec generated successfully!')
})
