# Headless Shopify Storefront

A high-performance, modern e-commerce application built with **Next.js 15 (App Router)** and the **Shopify Storefront API**.

**Live Demo:** [https://headless-shopify-store-mocha.vercel.app/](https://headless-shopify-store-mocha.vercel.app/)

## 🚀 About The Project

This project is a "Technical Minimalist" e-commerce experience designed to bridge the gap between static site performance and dynamic commerce functionality. Unlike standard Shopify themes, this headless architecture decouples the frontend from the backend, allowing for:

-   **Instant Page Loads:** Leveraging React Server Components (RSC) to render content on the edge.
-   **URL-Driven State:** Every filter, search query, and variant selection is shareable via URL.
-   **Pixel-Perfect Design:** A custom design system built from scratch with Tailwind CSS v4.

The goal was to build a production-grade storefront that mimics the feel of premium technical brands (like Arc'teryx or Vercel) while maintaining a perfect Lighthouse score.

## ✨ Key Features

### 🛍️ Commerce Engine
-   **Headless Cart:** A robust Cart Drawer powered by React Context and `localStorage` persistence. It handles optimistic UI updates for a snappy feel.
-   **Variant Selection:** URL-based variant toggles (Size/Color). Deep-linking allows users to share a specific configuration (e.g., `?size=154cm&color=Teal`).
-   **Real-time Stock:** Product pages automatically disable buttons for out-of-stock variants.
-   **Smart Checkout:** Seamless redirection to Shopify's secure checkout environment.

### 🎨 UI/UX & Design System
-   **Technical Minimalist Aesthetic:** A design language centered on `Inter` (sans) for UI and `Roboto Mono` for technical data (prices, specs).
-   **Bento Grid Layouts:** Dynamic product galleries that adapt based on the number of images available.
-   **Micro-Interactions:** Tactile "tap" effects on buttons and smooth layout transitions using **Framer Motion**.
-   **Staggered Animations:** Product grids load sequentially for a premium "app-like" feel.

### 🔍 Search & Discovery
-   **Full-Text Search:** Functional search bar integrated into the navbar.
-   **Sorting & Filtering:** Server-side sorting (Price High/Low, Date) compatible with caching.
-   **Collections:** Dynamic collection pages with "All Products" fallback logic.
-   **Recommendations:** "You Might Also Like" section fetching related products via Shopify's recommendation algorithm.

### ⚡ Performance & SEO
-   **JSON-LD Structured Data:** Automatic injection of `Product` and `Offer` schema for Google Rich Snippets.
-   **Dynamic Metadata:** Programmatic generation of SEO titles and Open Graph images (`/og` route) based on product data.
-   **Image Optimization:** Extensive use of `next/image` with `sizes` attributes to prevent layout shifts (CLS).
-   **Server Actions:** Type-safe data fetching that keeps API keys secure on the server.

## 🛠️ Tech Stack

-   **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Components)
-   **Language:** TypeScript (Strict Mode)
-   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (CSS Variables, @theme)
-   **Animation:** [Framer Motion](https://www.framer.com/motion/)
-   **Backend:** Shopify Storefront API (GraphQL)
-   **Linting:** [Biome.js](https://biomejs.dev/) (Fast Rust-based linter)
-   **Deployment:** Vercel

## 📸 Technical Highlights

### Dynamic Open Graph Images
The project features an API route (`src/app/og/route.tsx`) that generates social media cards on the fly.
* **Endpoint:** `/og?title=Product%20Name&subtitle=$500`
* **Result:** A branded image is generated at runtime for every single product page, improving social sharing conversion.

### The "Client Island" Architecture
To maintain performance, interactivity is isolated to specific "Islands":
* `page.tsx` (Server): Fetches data, renders HTML, handles SEO.
* `ProductGrid.tsx` (Client): Hydrates only the interactive grid to handle animations.
* `VariantSelector.tsx` (Client): Manages URL state updates without refreshing the page.

## 📦 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/headless-shopify-store.git](https://github.com/yourusername/headless-shopify-store.git)
    cd my-headless-shop
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory:
    ```env
    SHOPIFY_STORE_DOMAIN="your-store.myshopify.com"
    SHOPIFY_STOREFRONT_ACCESS_TOKEN="your-public-access-token"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

© 2025 Headless Storefront. Built with Next.js and Shopify.