# My Headless Shop

## Overview
A headless e-commerce storefront built with Next.js 16 and Shopify Storefront API. This app provides a modern shopping experience with product browsing, search, cart functionality, and checkout through Shopify.

## Project Architecture
- **Framework**: Next.js 16.0.7 with Turbopack
- **Styling**: Tailwind CSS 4 with Typography plugin
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API**: Shopify Storefront GraphQL API

### Directory Structure
```
app/           # Next.js App Router pages and layouts
components/    # Reusable React components
lib/           # Utility functions and Shopify API client
```

## Required Environment Variables
This project requires Shopify API credentials to function:
- `SHOPIFY_STORE_DOMAIN` - Your Shopify store domain (e.g., `your-store.myshopify.com`)
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` - Storefront API access token

## Development
- Run: `npm run dev -- -p 5000 -H 0.0.0.0`
- Build: `npm run build`
- Start: `npm run start`

## Deployment
Configured for autoscale deployment with:
- Build command: `npm run build`
- Start command: `npm run start -- -p 5000 -H 0.0.0.0`

## Recent Changes
- 2025-12-29: Initial Replit environment setup
  - Configured Next.js dev server on port 5000
  - Set up deployment configuration
