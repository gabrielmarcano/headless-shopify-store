# My Headless Shop

## Overview
A headless e-commerce storefront built with Next.js 16 and Shopify Storefront API. This app provides a modern shopping experience with product browsing, search, cart functionality, and checkout through Shopify.

## Project Status
✅ **Production Ready** - All components configured and tested

## Project Architecture
- **Framework**: Next.js 16.0.7 with Turbopack
- **Styling**: Tailwind CSS 4 with Typography plugin
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API**: Shopify Storefront GraphQL API
- **Deployment**: Configured for Replit autoscale

### Directory Structure
```
app/           # Next.js App Router pages and layouts
components/    # Reusable React components
lib/           # Utility functions and Shopify API client
```

## Configuration

### Environment Variables (Required)
The app uses Shopify API credentials from Replit Secrets:
- `SHOPIFY_STORE_DOMAIN` - Your Shopify store domain
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` - Storefront API access token

### Next.js Config
- Dev server bound to `0.0.0.0:5000` for Replit preview access
- `allowedDevOrigins: ["*"]` configured for cross-origin development
- Remote image optimization for Shopify CDN and Unsplash

## Development Commands
- **Dev**: `npm run dev -- -p 5000 -H 0.0.0.0`
- **Build**: `npm run build`
- **Production Start**: `npm run start`

## Deployment Configuration
- **Type**: Autoscale (serverless)
- **Build**: `npm run build`
- **Start**: `npm run start -- -p 5000 -H 0.0.0.0`
- **Ready**: Click "Publish" in the Replit UI to deploy

## Recent Changes
- 2025-12-29: Replit Environment Setup Complete
  - ✅ Configured Next.js dev server on port 5000
  - ✅ Set up Shopify API environment variables
  - ✅ Verified product loading and storefront functionality
  - ✅ Deployment configuration ready
