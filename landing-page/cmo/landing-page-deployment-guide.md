# Landing Page 部署指南 (B2C 版)

**产品**: AI 技能提升计划
**状态**: Ready to Deploy
**最后更新**: 2026-03-26

---

## 一、部署前检查清单

### 待 CEO 提供信息

| 项目 | 状态 | 用途 |
|------|------|------|
| 微信咨询账号 | 🔴 待提供 | Landing Page 联系方式 |
| 收款码图片 | 🔴 待提供 | 课程支付 |
| 百度统计 ID | ⚪ 可选 | 流量分析 |

### 技术检查

- [ ] `landing-page/index.html` 存在
- [ ] 所有链接和 CTA 按钮正确
- [ ] 移动端响应式测试通过
- [ ] 桌面端显示正常
- [ ] 图片资源加载正常

---

## 二、部署选项

### 选项 1: GitHub Pages (推荐)

**优点**: 免费、快速、与现有 repo 集成
**缺点**: 自定义域名需额外配置

#### 部署步骤

```bash
# 1. 确保在正确的分支
git checkout main

# 2. 创建 gh-pages 分支
git worktree add dist gh-pages

# 3. 复制 landing page 到 dist 目录
cp landing-page/index.html dist/

# 4. 进入 dist 目录提交
cd dist
git add index.html
git commit -m "Deploy landing page"
git push origin gh-pages

# 5. 清理
cd ..
git worktree remove dist
```

**访问 URL**: `https://fxhollow.github.io/100000mrr-landing/`

#### GitHub 设置

1. 访问 https://github.com/FxHollow/100000mrr-landing/settings/pages
2. Source 选择 `gh-pages` branch
3. 保存后等待 2-5 分钟
4. 访问生成的 URL

---

### 选项 2: Vercel

**优点**: 自动 HTTPS、自定义域名、分析功能
**缺点**: 需创建 Vercel 账号

#### 部署步骤

1. 访问 https://vercel.com/new
2. 导入 GitHub repo: `FxHollow/100000mrr-landing`
3. Root Directory 设置为 `landing-page`
4. 点击 Deploy

#### Vercel 配置

```json
{
  "version": 2,
  "builds": [
    { "src": "landing-page/index.html", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/", "dest": "landing-page/index.html" }
  ]
}
```

**访问 URL**: `https://100000mrr-landing.vercel.app/`

---

### 选项 3: Netlify

**优点**: 拖拽部署、表单功能
**缺点**: 需创建 Netlify 账号

#### 部署步骤

1. 访问 https://app.netlify.com/drop
2. 拖拽 `landing-page` 文件夹到上传区域
3. 等待部署完成

**访问 URL**: `https://[random-name].netlify.app/`

---

## 三、部署后检查

### 功能检查

| 检查项 | 状态 | 备注 |
|--------|------|------|
| 页面加载正常 | [ ] | |
| 移动端显示正常 | [ ] | |
| 所有链接可点击 | [ ] | |
| 微信联系方式显示 | [ ] | |
| CTA 按钮正常 | [ ] | |

### 性能检查

| 检查项 | 目标 | 实际 |
|--------|------|------|
| 首屏加载 | < 3s | |
| 移动端适配 | 通过 | |
| 图片优化 | 已压缩 | |

---

## 四、Analytics 配置

### 百度统计 (推荐国内访问)

```html
<!-- 在 </head> 前添加 -->
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?[你的统计 ID]";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
</script>
```

### Google Analytics 4

```html
<!-- 在 </head> 前添加 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=[你的测量 ID]"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '[你的测量 ID]');
</script>
```

---

## 五、自定义域名 (可选)

### DNS 配置

| 类型 | 名称 | 内容 |
|------|------|------|
| CNAME | www | [your-domain].vercel.app |
| A | @ | 76.76.21.21 |

### 平台设置

- **Vercel**: Settings → Domains → Add Domain
- **Netlify**: Domain Settings → Add Custom Domain
- **GitHub Pages**: Settings → Pages → Custom Domain

---

## 六、问题排查

### 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 页面 404 | 分支错误 | 确认 gh-pages 分支存在 |
| 样式不加载 | 路径错误 | 使用相对路径 |
| 移动端显示异常 | 视口设置 | 检查 meta viewport |
| 中文乱码 | 编码问题 | 确保 UTF-8 |

### 回滚方案

```bash
# Git 回滚
git revert HEAD

# Vercel 回滚
vercel rollback [部署 URL]
```

---

## 七、部署命令速查

### 一键部署到 GitHub Pages

```bash
# 从 landing-page 目录执行
npx gh-pages -d .
```

### 部署到 Vercel (CLI)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

---

## 八、联系方式更新

### Landing Page 中需要更新的位置

```html
<!-- 1. Hero 区域 CTA -->
<a href="weixin://dl/chat?[微信号]" class="cta-button">
  立即咨询
</a>

<!-- 2. FAQ 区域 -->
<p>微信咨询：<strong>[微信号]</strong></p>

<!-- 3. 底部联系 -->
<p>联系我们：[微信号]</p>
```

---

**创建日期**: 2026-03-26
**CMO**: 100000MRR
**状态**: 待 CEO 提供微信 ID 后执行部署
