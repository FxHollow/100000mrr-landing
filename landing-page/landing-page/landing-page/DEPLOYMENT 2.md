# Deployment Guide - Landing Page

## Quick Deploy Options

### Option 1: GitHub Pages (Recommended - Free)

**Steps:**
1. Create a new GitHub repository: `100000mrr-landing`
2. Push `landing-page/index.html` to the repository
3. Go to Settings → Pages
4. Select branch: `main`, Folder: `/ (root)`
5. Your site will be live at: `https://yourusername.github.io/100000mrr-landing`

**Commands:**
```bash
cd /Users/zcfx/Desktop/AIworkspace/OPC/100000/landing-page
git init
git add index.html
git commit -m "Initial landing page"
git branch -M main
git remote add origin git@github.com:yourusername/100000mrr-landing.git
git push -u origin main
```

**Custom Domain (Optional):**
- Add CNAME file with your domain
- Configure DNS at your domain registrar

---

### Option 2: Vercel (Free - Fast)

**Steps:**
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in the landing-page folder
3. Follow prompts to deploy
4. Get instant HTTPS URL

**Commands:**
```bash
npm i -g vercel
cd /Users/zcfx/Desktop/AIworkspace/OPC/100000/landing-page
vercel --prod
```

**Benefits:**
- Automatic HTTPS
- Global CDN
- Custom domain support
- Analytics included

---

### Option 3: Netlify (Free - Drag & Drop)

**Steps:**
1. Go to netlify.com
2. Drag and drop the `landing-page` folder
3. Get instant URL: `yoursite.netlify.app`

**Benefits:**
- No command line needed
- Form handling built-in
- Easy custom domain setup

---

### Option 4: Domestic Hosting (China - Faster)

For better performance in China:

#### 阿里云 OSS + CDN
1. Create OSS bucket in Aliyun console
2. Upload index.html
3. Configure static website hosting
4. Add CDN for acceleration

#### 腾讯云 COS
1. Create COS bucket
2. Upload files
3. Enable static website

**Note:** Requires ICP filing for custom domains

---

## Post-Deployment Checklist

- [ ] Verify page loads correctly
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Test CTA buttons
- [ ] Set up Google Analytics (optional)
- [ ] Set up WeChat analytics (optional)
- [ ] Add favicon
- [ ] Test page speed (target: <3s load)

---

## URL Shortening for Sharing

For WeChat sharing, create a short, memorable URL:

1. Use custom domain: `100000mrr.com` → looks professional
2. Or use bit.ly/China equivalent for temporary links

---

## Contact Form Integration (Optional)

To capture leads directly:

### Formspree (Easy)
```html
<form action="https://formspree.io/f/your-form-id" method="POST">
  <input type="email" name="email" placeholder="Your email">
  <textarea name="message" placeholder="Your message"></textarea>
  <button type="submit">Send</button>
</form>
```

### 金数据 (Chinese alternative)
- More compliant for China
- WeChat integration
- https://jinshuju.net

---

*Created: 2026-03-26*
*Owner: CMO*
