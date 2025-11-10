This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

### Multi-Step Form with Persistent Storage

This project implements a multi-step onboarding form with the following features:

- **Persistent Data Storage**: User data is stored in localStorage using Zustand middleware, ensuring data persists across page refreshes and browser sessions
- **Form Validation**: Each step includes Zod schema validation with real-time error feedback
- **Step Navigation**: Users can navigate between steps with proper validation and data persistence
- **Progress Protection**: Users are automatically redirected to the appropriate step if they try to access a step without completing previous ones
- **Data Hydration**: Form fields are pre-filled with previously entered data when users return to a step

The onboarding flow consists of three steps:

1. Name entry (`/onboarding/name`)
2. Password setup (`/onboarding/password`)
3. Username and terms agreement (`/onboarding/username`)

### React 19 & Server Components Demo

This project includes a dedicated demo page showcasing the latest React 19 features:

- **useFormStatus** and **useOptimistic** hooks for enhanced form handling
- **Server Actions** for direct form submission to server functions
- **Server Components** that fetch data directly without useEffect
- **useActionState** hook for form state management
- **Zero Client JavaScript** for Server Components

Visit `/react19-demo` to see these features in action.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
