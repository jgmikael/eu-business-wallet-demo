# Deployment Guide - EU Business Wallet Demo

## Quick Deploy to GitHub Pages

### Prerequisites
- Repository: `jgmikael/eu-business-wallet-demo`
- Branch: `main`
- GitHub Pages enabled (Settings → Pages → Source: GitHub Actions or Deploy from a branch)

### Method 1: Automatic Deployment (Recommended)

GitHub Pages will automatically build and deploy from the `out` directory after pushing.

```bash
# 1. Build the application
npm run build

# 2. Verify the build
ls -lh out/

# 3. Commit and push
git add -A
git commit -m "feat: Complete 6 interactive enhancements"
git push origin main

# 4. Wait 1-2 minutes for GitHub Pages to deploy
# Live at: https://jgmikael.github.io/eu-business-wallet-demo/
```

### Method 2: Manual GitHub Pages Setup

If GitHub Pages is not configured yet:

1. **Enable GitHub Pages:**
   - Go to: https://github.com/jgmikael/eu-business-wallet-demo/settings/pages
   - Source: "Deploy from a branch"
   - Branch: `main`
   - Folder: `/` (root) or `/docs` (if you copy `out/` to `docs/`)
   - Click "Save"

2. **Option A - Deploy from `/out` (requires branch setup):**
   ```bash
   # Create gh-pages branch from out directory
   npm run build
   git checkout --orphan gh-pages
   git --work-tree out add --all
   git --work-tree out commit -m "Deploy to GitHub Pages"
   git push origin gh-pages --force
   git checkout main
   ```

3. **Option B - Deploy from `/docs` (simpler):**
   ```bash
   npm run build
   rm -rf docs/
   cp -r out/ docs/
   git add docs/
   git commit -m "Deploy: Copy static export to docs/"
   git push origin main
   ```

### Method 3: GitHub Actions (CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

Then:
```bash
git add .github/workflows/deploy.yml
git commit -m "ci: Add GitHub Pages deployment workflow"
git push origin main
```

---

## Local Development

### Run Development Server
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Build for Production
```bash
npm run build
# Static export in /out directory
```

### Test Production Build Locally
```bash
npm run build
npx serve out
# Open http://localhost:3000
```

---

## Environment Variables

The app uses `NODE_ENV` to determine `basePath`:

- **Development:** `basePath = ''` (empty)
- **Production:** `basePath = '/eu-business-wallet-demo'` (GitHub Pages subdirectory)

This is configured in `next.config.js`:

```javascript
basePath: process.env.NODE_ENV === 'production' ? '/eu-business-wallet-demo' : ''
```

If deploying to a custom domain (e.g., `ebw-demo.example.com`), change to:
```javascript
basePath: ''
```

---

## Troubleshooting

### Issue: 404 on GitHub Pages

**Cause:** Incorrect basePath or GitHub Pages not enabled

**Solution:**
1. Verify `next.config.js` has correct `basePath`
2. Check GitHub Pages settings (Settings → Pages)
3. Ensure `out/` directory was pushed
4. Wait 1-2 minutes after push for deployment

### Issue: CSS/JS not loading

**Cause:** Incorrect asset paths

**Solution:**
1. Verify `basePath` in `next.config.js` matches repository name
2. Check `images.unoptimized: true` is set
3. Rebuild with `npm run build`

### Issue: Language selector not persisting

**Cause:** localStorage not available or CORS issues

**Solution:**
1. Test in incognito mode (localStorage may be blocked)
2. Check browser console for errors
3. Verify served over HTTPS (GitHub Pages provides HTTPS)

### Issue: Build fails with TypeScript errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules/ .next/
npm install
npm run build
```

---

## Performance Optimization

Current bundle sizes are excellent:
- **First Load JS:** ~87.5 kB (gzipped)
- **Largest page:** /protocols (93.9 kB)
- **Smallest page:** /trust (87.6 kB)

If you need to optimize further:

1. **Code splitting:** Already automatic with Next.js
2. **Image optimization:** Currently unoptimized (static export limitation)
3. **Font optimization:** Use `next/font` if adding custom fonts
4. **Lazy loading:** Add dynamic imports for heavy components

---

## Security Considerations

- No server-side code (static export)
- No API keys or secrets (all client-side)
- No user data collection
- Safe for public deployment
- HTTPS provided by GitHub Pages

---

## Monitoring

### Check Build Status
```bash
npm run build 2>&1 | grep "✓\|✗\|Error"
```

### Check Bundle Sizes
```bash
npm run build | grep "First Load JS"
```

### Verify All Pages Generated
```bash
ls -1 out/*.html
# Should show: 404.html, architecture.html, governance.html, index.html, 
# payloads.html, protocols.html, scenarios.html, semantic.html, trust.html
```

---

## Rollback Procedure

If deployment fails:

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or force push previous working commit
git reset --hard <commit-hash>
git push origin main --force

# GitHub Pages will redeploy automatically
```

---

## Custom Domain (Optional)

To use a custom domain (e.g., `ebw-demo.yourcompany.com`):

1. **Update `next.config.js`:**
   ```javascript
   basePath: ''  // Remove subdirectory path
   ```

2. **Add CNAME file to `/public/CNAME`:**
   ```
   ebw-demo.yourcompany.com
   ```

3. **Configure DNS:**
   - Add CNAME record: `ebw-demo` → `jgmikael.github.io`
   - Or A records to GitHub Pages IPs

4. **Update GitHub Pages settings:**
   - Settings → Pages → Custom domain: `ebw-demo.yourcompany.com`
   - Check "Enforce HTTPS"

5. **Rebuild and deploy:**
   ```bash
   npm run build
   git add -A
   git commit -m "config: Add custom domain support"
   git push origin main
   ```

---

**Deployment Complete! 🚀**

Live at: https://jgmikael.github.io/eu-business-wallet-demo/
