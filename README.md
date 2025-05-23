# ApexFeed

ApexFeed is a modern, SEO-optimized blogging platform built with [Next.js](https://nextjs.org). It features authentication, user profiles, blog creation, and advanced SEO tools.

## Getting Started

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Base URL for the application
NEXT_PUBLIC_BASE_URL=https://apexfeed.vercel.app

# Authentication (NextAuth.js)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key

# Database (MongoDB)
MONGODB_URI=your-mongodb-connection-string

# Google OAuth (if using Google authentication)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Google Search Console Verification
GOOGLE_SITE_VERIFICATION=your-google-site-verification-code

# Optional: Image Upload (if using cloud storage)
# CLOUDINARY_CLOUD_NAME=your-cloud-name
# CLOUDINARY_API_KEY=your-api-key
# CLOUDINARY_API_SECRET=your-api-secret
```

## Production Deployment

For production on Vercel:
1. Go to your project settings in Vercel
2. Add all environment variables above
3. Set `NEXT_PUBLIC_BASE_URL` to your production domain

## SEO Features

- **Automatic Sitemap Generation**: Uses `next-sitemap` for sitemap.xml
- **Robots.txt**: Auto-generated
- **Metadata**: Configured for search engines
- **Open Graph & Twitter Cards**: Social sharing optimized
- **Google Site Verification**: Ready for Search Console

### SEO Setup

1. Sitemap is generated at build time
2. Edit `next-sitemap.config.js` to customize
3. Add your Google verification code to `.env.local`
4. Edit metadata in `src/app/layout.js` as needed

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

## Deploy on Vercel

Deploy easily with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more info.