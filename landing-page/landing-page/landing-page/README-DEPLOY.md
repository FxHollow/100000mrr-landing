# Landing Page Deployment - Step-by-Step Guide

## 3 分钟部署指南

---

## 方式 1: GitHub Pages (推荐 - 完全免费)

### 前置条件
- GitHub 账号
- 已安装 git

### Step 1: 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名：`100000mrr-landing`
3. 设为 **Public** (公开)
4. **不要** 勾选 "Add README"
5. 点击 "Create repository"

### Step 2: 推送代码

在终端运行以下命令：

```bash
# 进入 landing-page 目录
cd /Users/zcfx/Desktop/AIworkspace/OPC/100000/landing-page

# 添加远程仓库 (替换 YOUR_GITHUB_USERNAME)
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/100000mrr-landing.git

# 推送到 GitHub
git push -u origin main
```

### Step 3: 启用 GitHub Pages

1. 进入刚创建的仓库
2. 点击 **Settings** → **Pages**
3. **Source**: Deploy from a branch
4. **Branch**: main → **/(root)**
5. 点击 **Save**

### Step 4: 等待部署

- GitHub Pages 通常在 1-2 分钟内上线
- 访问链接：`https://YOUR_GITHUB_USERNAME.github.io/100000mrr-landing/`

### Step 5: 测试

- [ ] 手机打开链接，检查显示正常
- [ ] 桌面打开链接，检查显示正常
- [ ] 点击所有链接和按钮
- [ ] 检查联系信息正确

---

## 方式 2: Vercel (更快 - 自动 HTTPS)

### 前置条件
- Vercel 账号 (可用 GitHub 登录)
- 已安装 Node.js

### Step 1: 安装 Vercel CLI

```bash
npm install -g vercel
```

### Step 2: 登录 Vercel

```bash
vercel login
```

选择用 GitHub 账号登录

### Step 3: 部署

```bash
cd /Users/zcfx/Desktop/AIworkspace/OPC/100000/landing-page
vercel --prod
```

### Step 4: 完成

- 跟随提示操作 (一般直接回车即可)
- 获得链接如：`https://100000mrr-landing.vercel.app`
- 自动 HTTPS，全球 CDN 加速

---

## 方式 3: Netlify (最简单 - 拖拽上线)

### Step 1: 访问 Netlify Drop

https://app.netlify.com/drop

### Step 2: 拖拽文件夹

把整个 `landing-page` 文件夹拖到上传区域

### Step 3: 完成

- 立即获得链接
- 无需命令行
- 自动 HTTPS

---

## 部署后配置

### 添加 Analytics (可选)

在 `index.html` 的 `</head>` 标签前添加:

#### Google Analytics 4
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

替换 `GA_MEASUREMENT_ID` 为你的追踪 ID.

#### 百度统计
```html
<!-- 百度统计 -->
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?YOUR_BAIDU_ID";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
</script>
```

替换 `YOUR_BAIDU_ID` 为你的百度统计 ID.

### 更新联系方式

在 `index.html` 中找到并更新:

```html
<!-- 搜索 "hello@100000mrr.com" 或 "Add Us on WeChat" -->
<a href="https://wechat.com" class="cta-button">Add Us on WeChat</a>
<p style="margin-top: 20px; font-size: 0.9rem; opacity: 0.8;">
    Or email us: hello@100000mrr.com
</p>
```

替换为你的实际联系方式.

---

## 部署检查清单

部署完成后逐项检查:

- [ ] 链接在手机和桌面都正常显示
- [ ] 所有链接可点击
- [ ] CTA 按钮正常工作
- [ ] 联系信息正确
- [ ] 页面加载时间 < 3 秒
- [ ] Analytics 代码已添加 (如需要)
- [ ] 准备了短链接用于分享 (可选)

---

## 常见问题

### Q: GitHub Pages 在国内访问慢？
**A:** 可以考虑 Vercel (有全球 CDN) 或国内 OSS/COS 托管.

### Q: 自定义域名需要备案吗？
**A:** 使用 GitHub Pages/Vercel 不需要 ICP 备案。用国内服务器 (阿里云、腾讯云) 才需要.

### Q: 怎么更新页面内容？
**A:**
- GitHub Pages: 修改后 `git push`
- Vercel: 修改后 `vercel --prod`
- Netlify: 重新拖拽文件夹

### Q: 怎么查看访问数据？
**A:** 安装 Google Analytics 或百度统计后，在对应平台后台查看.

---

## 分享链接优化

### 短链接服务

对于微信分享，可以用短链接服务让 URL 更美观:

- **Bitly**: bitly.com
- **TinyURL**: tinyurl.com
- **新浪短链**: (需要 API 接入)

### 二维码生成

生成 landing page 的二维码方便线下分享:

- 草料二维码：cli.im
- 联图二维码：www.liantu.com

---

## 需要帮助？

遇到问题可以：
1. 检查部署平台的文档
2. 查看浏览器控制台错误信息
3. 联系技术支持

---

*Created: 2026-03-26*
*CMO - 100000MRR*
*Version: 1.0*
