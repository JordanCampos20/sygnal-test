⬅️ [Back to the main README](../README.md)
---

# 📦 Sygnal - Front

**Sygnal Front End** is a web application built with [Next.js](https://nextjs.org/) that consumes the orders API and provides a modern, responsive interface for order management. It uses the **App Router**, **TailwindCSS** for styling, and a modular architecture based on reusable components and custom hooks.

---

## 📁 Folder Structure

```bash
src/
│
├── app/                     # Route structure using App Router
│   ├── favicon.ico          # Browser tab icon
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Default layout component
│   └── page.tsx             # Main page (Home)
│
├── components/              # Reusable UI components
│   ├── order-filter.tsx     # Order filtering UI
│   ├── order-new.tsx        # Component to create a new order
│   ├── order-stats.tsx      # Order statistics display
│   └── order-table.tsx      # Order list table
│
├── hooks/                   # Custom React hooks
│   └── use-orders.ts        # Hook to manage state and API calls related to orders
│
├── lib/                     # Utility functions and external integrations
│   ├── api.ts               # API client functions
│   └── date-utils.ts        # Date formatting and manipulation helpers
│
└── types/                   # Shared TypeScript types
    └── order.ts             # Types related to orders
```

## ✅ Installed Packages

| Package | Description |
|--------|-----------|
| `lucide-react` | A customizable set of SVG icons based on Feather Icons, ideal for modern React interfaces. |
| `next-themes` | A theme manager (dark/light mode) for Next.js apps with automatic system detection and localStorage persistence. |
| `tailwindcss` | A utility-first CSS framework for rapidly building custom, responsive UIs. |

---

## 🧪 Running the Project

To start the project with hot reload during development, run the following command in your terminal:

```bash
npm run dev
```