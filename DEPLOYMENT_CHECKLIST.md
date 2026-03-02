# Deployment Checklist for Template Routes

## Routes That Should Work After Deployment

- ✅ `/fractional` → Shows https://fractional.waiboom.com in iframe
- ✅ `/hvac` → Shows https://hvac.waiboom.com in iframe
- ✅ `/lawncare` → Shows https://lawncare.waiboom.com in iframe
- ✅ `/moving` → Shows https://moving.waiboom.com in iframe

## Deployment Steps for Vercel

1. **Clear Vercel Cache**
   - Go to your Vercel project settings
   - Navigate to "Deployments"
   - Click "..." menu on latest deployment
   - Select "Redeploy" and check "Use existing Build Cache" to OFF

2. **Environment Variables**
   - Ensure all environment variables from `.env.local` are set in Vercel dashboard

3. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Verify After Deployment**
   - Test each route: `/fractional`, `/hvac`, `/lawncare`, `/moving`
   - Check browser console for CSP errors
   - Verify iframes load correctly

## Troubleshooting

If routes show 404:
1. Check Vercel build logs for errors
2. Verify all page files exist in `app/[route]/page.tsx`
3. Clear Vercel cache and redeploy
4. Check if CSP headers are blocking iframes

## Files Modified
- `app/fractional/page.tsx` - Added metadata
- `app/hvac/page.tsx` - Added metadata
- `app/lawncare/page.tsx` - Added metadata
- `app/moving/page.tsx` - Added metadata
- `next.config.mjs` - Updated CSP headers for waiboom.com domains
- `vercel.json` - Added build configuration
