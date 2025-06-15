
# BudgetWise

BudgetWise is a modern, user-friendly web application for tracking personal finances, managing cash flow, and building savings. Quickly visualize your expenses and income, spot trends, and maintain control of your budget.

## Features

- **Intuitive analytics dashboard** for expense, income, and savings visualization
- **Easy entry system** for adding, viewing, and categorizing your transactions
- **Responsive, clean design** that works on desktop and mobile
- **User authentication** for secure access
- Powered by [Vite](https://vitejs.dev/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [shadcn/ui](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/), and [Supabase](https://supabase.com/)

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- npm (comes with Node.js)

### Installation

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
```

### Running the Development Server

```bash
npm run dev
```

Your app will be served at [http://localhost:5173](http://localhost:5173).

### Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

- `src/` – Main application source code
  - `components/` – UI and dashboard components
  - `pages/` – Top-level pages/routes
  - `hooks/` – Custom React hooks
  - `integrations/supabase/` – Supabase client and types
  - `utils/` – Utility functions
- `public/` – Static assets

## Environment Variables

Create a `.env` file as needed based on your Supabase project details:

```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

## Deployment

This application can be deployed to any modern static hosting platform and requires API access to a [Supabase](https://supabase.com/) backend. 

For details on how to configure hosting and environment variables, see the documentation for your chosen platform.

---

© 2025 BudgetWise. All rights reserved.
