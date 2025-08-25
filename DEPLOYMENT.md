# Deployment Guide

## Vercel Deployment (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit: Web3 Wallet Demo"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables (if any)
   - Deploy automatically

3. **Domain Configuration**:
   - Add custom domain in Vercel dashboard
   - Configure DNS settings

## Netlify Deployment

1. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18+

2. **Environment Variables**:
   - Set any required environment variables in Netlify dashboard

## Docker Deployment

1. **Create Dockerfile**:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run**:
   ```bash
   docker build -t web3-wallet-demo .
   docker run -p 3000:3000 web3-wallet-demo
   ```

## Production Checklist

- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Error tracking setup (Sentry)
- [ ] Analytics configured
- [ ] Performance monitoring
- [ ] SEO optimization
- [ ] Security headers configured

## Performance Optimization

1. **Bundle Analysis**:
   ```bash
   npm run analyze
   ```

2. **Lighthouse Audit**:
   - Run Lighthouse in Chrome DevTools
   - Optimize based on recommendations

3. **Monitoring**:
   - Set up Web Vitals monitoring
   - Configure performance alerts
