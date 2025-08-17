# Vercel Deployment Guide

This guide will help you deploy your music player application to Vercel.

## Prerequisites

- [Vercel CLI](https://vercel.com/cli) installed
- [Git](https://git-scm.com/) installed
- [Node.js](https://nodejs.org/) (version 18 or higher)

## Quick Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables**
   Add these environment variables in Vercel:
   ```
   VITE_SONG_SERVICE_URL=https://your-song-service-url.vercel.app
   VITE_USER_SERVICE_URL=https://your-user-service-url.vercel.app
   VITE_ADMIN_SERVICE_URL=https://your-admin-service-url.vercel.app
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

4. **Follow the prompts**
   - Link to existing project or create new
   - Set root directory to `frontend`
   - Confirm build settings

## Environment Variables

Create a `.env.production` file in the `frontend` directory:

```env
VITE_SONG_SERVICE_URL=https://your-song-service-url.vercel.app
VITE_USER_SERVICE_URL=https://your-user-service-url.vercel.app
VITE_ADMIN_SERVICE_URL=https://your-admin-service-url.vercel.app
```

## Backend Services Deployment

### Song Service
```bash
cd song-service
vercel
```

### User Service
```bash
cd user-service
vercel
```

### Admin Service
```bash
cd admin-service
vercel
```

## Custom Domains

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Troubleshooting

### Build Errors
- Ensure all dependencies are in `package.json`
- Check that build script runs locally: `npm run build`
- Verify Node.js version compatibility

### Environment Variables
- Ensure all `VITE_*` variables are set in Vercel
- Check that variables are accessible in production build

### CORS Issues
- Update backend services to allow your Vercel domain
- Check that API endpoints are correctly configured

## Performance Optimization

1. **Enable Vercel Analytics**
   - Go to project settings
   - Enable "Vercel Analytics"

2. **Enable Edge Functions** (if needed)
   - Configure in `vercel.json`
   - Use for API routes

3. **Image Optimization**
   - Use Vercel's image optimization
   - Configure in `next.config.js` or similar

## Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Function Logs**: Check serverless function execution
- **Build Logs**: Monitor deployment builds

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vercel Support](https://vercel.com/support)

## Notes

- The frontend is configured to build from the `frontend` directory
- Static assets are served from the `dist` folder
- API routes can be added in the `api` directory
- Environment variables must be prefixed with `VITE_` to be accessible in the frontend
