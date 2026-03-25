# Landing Page - Quick Deploy Guide

## 3 分钟上线指南

---

## 方式 1: GitHub Pages (推荐，免费)

### 步骤

**1. 创建 GitHub 仓库**
```
访问：https://github.com/new
仓库名：100000mrr-landing
设为公开（Public）
```

**2. 运行部署脚本**
```bash
cd /Users/zcfx/Desktop/AIworkspace/OPC/100000/landing-page
chmod +x deploy.sh
./deploy.sh github
```

**3. 启用 GitHub Pages**
```
进入仓库 → Settings → Pages
Source: Deploy from a branch
Branch: main, Folder: / (root)
点击 Save
```

**4. 访问网站**
```
https://yourusername.github.io/100000mrr-landing/
```

### 自定义域名（可选）

1. 在仓库根目录创建 `CNAME` 文件
2. 内容写你的域名：`100000mrr.com`
3. 在域名注册商处添加 CNAME 记录

---

## 方式 2: Vercel (最快，自动 HTTPS)

### 步骤

**1. 安装 Vercel CLI**
```bash
npm install -g vercel
```

**2. 部署**
```bash
cd /Users/zcfx/Desktop/AIworkspace/OPC/100000/landing-page
vercel --prod
```

**3. 完成**
- 跟随命令行提示登录
- 自动获得 HTTPS 链接
- 全球 CDN 加速

**获得链接示例：**
```
https://100000mrr-landing.vercel.app/
```

---

## 方式 3: Netlify (拖拽上线)

### 步骤

**1. 访问 Netlify Drop**
```
https://app.netlify.com/drop
```

**2. 拖拽文件夹**
```
把 landing-page 文件夹拖到上传区域
```

**3. 完成**
```
立即获得链接，无需配置
```

**获得链接示例：**
```
https://yoursite.netlify.app/
```

---

## 方式 4: 国内托管（访问更快）

### 阿里云 OSS

**1. 创建 OSS Bucket**
```
登录阿里云控制台 → OSS
创建 Bucket，选择就近地域
```

**2. 上传文件**
```
进入 Bucket → 文件管理
上传 index.html
```

**3. 配置静态网站**
```
基础设置 → 静态页面
首页：index.html
```

**4. 获得访问链接**
```
https://your-bucket.oss-cn-hangzhou.aliyuncs.com/index.html
```

### 腾讯云 COS

类似阿里云 OSS 流程。

**注意：** 国内托管需要 ICP 备案才能用自定义域名。

---

## 部署后检查清单

### 功能测试
- [ ] 页面在手机和桌面正常显示
- [ ] 所有链接可点击
- [ ] CTA 按钮正常工作
- [ ] 联系信息正确

### 性能测试
- [ ] 页面加载时间 < 3 秒
- [ ] 图片已压缩（如有）
- [ ] 移动端响应式正常

### 分析设置
- [ ] Google Analytics 已添加（如需要）
- [ ] 百度统计已添加（国内访问）
- [ ] 设置转化追踪

---

## analytics 配置

### Google Analytics 4

在 `index.html` 的 `</head>` 前添加：

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

替换 `GA_MEASUREMENT_ID` 为你的追踪 ID。

### 百度统计

在 `index.html` 的 `</head>` 前添加：

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

替换 `YOUR_BAIDU_ID` 为你的百度统计 ID。

---

## 快速开始命令

```bash
# 进入目录
cd /Users/zcfx/Desktop/AIworkspace/OPC/100000/landing-page

# 方式 1: GitHub Pages
./deploy.sh github

# 方式 2: Vercel
./deploy.sh vercel

# 方式 3: 全部部署
./deploy.sh all
```

---

## 常见问题

### Q: GitHub Pages 在国内访问慢？
**A:** 可以考虑 Vercel（有全球 CDN）或国内 OSS/COS 托管。

### Q: 自定义域名需要备案吗？
**A:** 使用国内服务器（阿里云、腾讯云）需要 ICP 备案。GitHub Pages/Vercel 不需要。

### Q: 怎么更新页面内容？
**A:** 修改 index.html，然后 git push 或重新 vercel --prod。

### Q: 怎么查看访问数据？
**A:** 安装 Google Analytics 或百度统计，在对应平台查看。

---

*Created: 2026-03-28*
*Owner: CMO - 100000MRR*
