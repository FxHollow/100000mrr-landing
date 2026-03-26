# Landing Page Quick Start

## 快速部署指南 (5 分钟上线)

---

## 第一步：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写以下信息:
   - **Repository name**: `100000mrr-landing`
   - **Description**: 100000MRR Landing Page
   - **Visibility**: Public ✓ (公开，免费 Pages)
   - **不要** 勾选 "Add README"
3. 点击 "Create repository"

---

## 第二步：推送代码

在终端运行以下命令:

```bash
# 进入 landing-page 目录
cd /Users/zcfx/Desktop/AIworkspace/OPC/100000/landing-page

# 添加远程仓库 (替换 YOUR_GITHUB_USERNAME)
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/100000mrr-landing.git

# 推送到 GitHub
git push -u origin main
```

---

## 第三步：启用 GitHub Pages

1. 进入刚创建的 GitHub 仓库
2. 点击 **Settings** → **Pages**
3. **Source**: Deploy from a branch
4. **Branch**: main → **/(root)** (选 root)
5. 点击 **Save**

---

## 第四步：等待上线

- GitHub Pages 通常在 1-2 分钟内上线
- 访问链接：`https://YOUR_GITHUB_USERNAME.github.io/100000mrr-landing/`

---

## 上线后待办事项

### 1. 更新联系方式

在 `index.html` 中搜索 `TODO`，替换:

```html
<!-- 替换为你的微信号 -->
<a href="https://wechat.com" class="cta-button">Add Us on WeChat</a>

<!-- 替换为你的邮箱 -->
Or email us: hello@100000mrr.com
```

### 2. 添加百度统计

1. 访问 https://tongji.baidu.com/ 注册账号
2. 创建网站获取统计代码
3. 替换 `index.html` 中的 `YOUR_BAIDU_ID`

### 3. 验证页面

- [ ] 手机打开链接，检查显示正常
- [ ] 桌面打开链接，检查显示正常
- [ ] 点击所有链接和按钮
- [ ] 检查联系信息正确

---

## 需要帮助？

遇到问题可以查看完整部署文档：`README-DEPLOY.md`

---

*Created: 2026-03-26 | Frontend Engineer - 100000MRR*
