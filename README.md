# Bun Svelte PWA

A TypeScript monorepo template for building Progressive Web Apps (PWA) with Svelte and Bun runtime.

## Features

- 🚀 **Bun Runtime** - Fast JavaScript runtime with built-in package manager
- 📦 **Monorepo Structure** - Organized with workspaces pattern
- 🎯 **TypeScript** - Full TypeScript support across all modules
- ⚡ **Svelte** - Reactive and efficient UI framework
- 📱 **PWA Support** - Offline-first with service workers and manifest
- 🔧 **Vite** - Lightning-fast build tool and dev server
- 🎨 **Tailwind CSS** - Utility-first CSS framework for styling
- 🧪 **Playwright** - End-to-end testing for web apps
- 🎨 **Modern Stack** - Latest versions of all dependencies

## Project Structure

```
bun-svelte-pwa/
├── modules/              # Workspace modules
│   ├── app/             # Main Svelte PWA application
│   │   ├── public/      # Static assets
│   │   ├── src/         # Source code
│   │   │   ├── assets/  # Images, icons, etc.
│   │   │   ├── lib/     # Reusable components
│   │   │   ├── App.svelte
│   │   │   └── main.ts
│   │   ├── tests/       # Playwright tests
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.js
│   │   └── playwright.config.ts
│   └── shared/          # Shared utilities library
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
├── package.json         # Root package with workspace config
└── tsconfig.json        # Root TypeScript config
```

## Prerequisites

- [Bun](https://bun.sh) >= 1.0.0 (or Node.js >= 18)
- npm >= 9.0.0

## Getting Started

1. **Install dependencies:**

```bash
npm install
```

2. **Start development server:**

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`

3. **Build for production:**

```bash
npm run build
```

4. **Preview production build:**

```bash
npm run preview
```

5. **Run tests:**

```bash
npm test
```

## Workspace Commands

The monorepo uses npm workspaces to manage multiple packages:

- `npm run dev` - Start development server for the app module
- `npm run build` - Build the app module for production
- `npm run preview` - Preview the production build
- `npm test` - Run Playwright tests
- `npm run test:ui` - Run tests in UI mode
- `npm run type-check` - Run TypeScript type checking across all modules
- `npm run clean` - Clean build artifacts from all modules

## Adding New Modules

To add a new module to the monorepo:

1. Create a new directory under `modules/`:

```bash
mkdir modules/your-module
```

2. Initialize a new package:

```bash
cd modules/your-module
npm init
```

3. The module will automatically be included in the workspace.

## Tailwind CSS

The template uses Tailwind CSS for styling:

- **Configuration**: `modules/app/tailwind.config.js`
- **Vite Plugin**: Uses `@tailwindcss/vite` for optimal integration
- **Usage**: Use Tailwind utility classes directly in your Svelte components

Example:
```svelte
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click me
</button>
```

## Testing with Playwright

Playwright is configured for end-to-end testing:

- **Configuration**: `modules/app/playwright.config.ts`
- **Tests Location**: `modules/app/tests/`
- **Run Tests**: `npm test`
- **UI Mode**: `npm run test:ui`
- **Headed Mode**: `npm run test:headed`

Example test:
```typescript
import { test, expect } from '@playwright/test';

test('counter increments', async ({ page }) => {
  await page.goto('/');
  const button = page.getByRole('button', { name: /count is/i });
  await button.click();
  await expect(button).toHaveText('count is 1');
});
```

## PWA Features

The template includes PWA support out of the box:

- **Service Worker** - Automatic caching and offline support
- **Web Manifest** - Install prompt and app-like experience
- **Icons** - Multiple sizes for different devices
- **Offline Mode** - Works without internet connection

To customize the PWA:

1. Edit the manifest in `modules/app/vite.config.ts`
2. Replace icons in `modules/app/public/`
3. Adjust caching strategies in the Workbox configuration

## TypeScript

All modules are configured with TypeScript:

- Strict mode enabled
- Modern ES2022 target
- Full type checking across the workspace
- Svelte component type definitions

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT