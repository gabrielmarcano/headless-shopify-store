import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA", 
        surface: "#FFFFFF",    
        border: "#E5E7EB",     
        
        heading: "#111827",    
        body: "#4B5563",       
        
        accent: "#2563EB",     
        "accent-hover": "#1D4ED8",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-roboto-mono)"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;