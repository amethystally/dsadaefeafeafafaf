# Troubleshooting Deployment Issues

If you're experiencing issues with deploying the TikTok Email Region Fetcher, this guide will help you resolve common problems.

## 404 Errors

### Problem: Getting 404 errors when accessing the site

This is usually caused by one of these issues:

1. **API routes not working on static hosting**: If you're using a static hosting platform (like GitHub Pages), the Next.js API routes won't work.

   **Solution**: Make sure you've set `STATIC_EXPORT=true` when building the project. This will enable the client-side fallback.

2. **Incorrect build output**: The build output might not be configured correctly.

   **Solution**: Check that you're uploading the contents of the `out` directory after running `npm run build`.

3. **Missing redirects**: Some static hosts need configuration for client-side routing.

   **Solution**: Add a redirect rule to redirect all requests to `index.html`. For Netlify, use the provided `netlify.toml` file.

## Blank Page / Loading Forever

### Problem: The page loads but stays blank or keeps showing the loading spinner

This usually happens when:

1. **JavaScript errors**: There might be JavaScript errors preventing the app from rendering.

   **Solution**: Open your browser's developer console (F12) to check for errors.

2. **API detection failing**: The app might be stuck trying to detect if API routes are available.

   **Solution**: Try using the standalone HTML version in `public/index-static.html` instead.

## API Routes Not Working

### Problem: The app loads but can't fetch data from the API

This can happen when:

1. **CORS issues**: The API might be blocked by CORS policies.

   **Solution**: Make sure you're accessing the site from the correct domain.

2. **Server-side functions not supported**: Some hosting platforms don't support server-side functions.

   **Solution**: Use the static version of the app by setting `STATIC_EXPORT=true`.

## Specific Platform Issues

### GitHub Pages

- Make sure to include a `.nojekyll` file in the root of your repository to prevent GitHub from processing the site with Jekyll.
- Set the publishing source to the correct branch in your repository settings.

### Netlify

- Make sure your `netlify.toml` file includes the correct redirects.
- Check that the build command and publish directory are set correctly.

### Vercel

- Vercel should work out of the box with the default settings.
- If you're having issues, check that you haven't enabled any special configurations that might interfere with the Next.js app.

## Still Having Issues?

If you're still experiencing problems after trying these solutions:

1. Check the browser console for specific error messages
2. Try deploying the standalone HTML version from `public/index-static.html`
3. Open an issue on the GitHub repository with details about your problem

