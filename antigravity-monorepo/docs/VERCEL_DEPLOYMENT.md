# Vercel Deployment Patterns & Troubleshooting

This document outlines common deployment patterns, configurations, and fixes for projects within the Antigravity ecosystem.

## 1. Monorepo Deployment Strategy

When deploying an app from a Turborepo monorepo, use the following settings on Vercel:

- **Framework Preset**: Next.js (or Vite/React depending on the app)
- **Root Directory**: `apps/[app-name]` (e.g., `apps/book-ngn`)
- **Build Command**: `cd ../.. && npx turbo run build --filter=[app-name]`
- **Output Directory**: `.next` (for Next.js) or `dist` (for Vite)
- **Install Command**: `pnpm install` (ensure `pnpm-workspace.yaml` exists at the root)

## 2. Common Workspace Dependency Issues

### The Problem

Workspace dependencies like `"@antigravity/ui": "workspace:*"` work locally but often fail on Vercel if the monorepo structure isn't perfectly mirrored or if the app is being deployed in a standalone manner.

### The Fix (Standalone Deployment)

If deploying an app as a standalone repository (outside the monorepo):

1. **Localize Tokens**: Create a local `lib/tokens.ts` (copy from `@antigravity/tokens`).
2. **Component Consolidation**: Move required components from `@antigravity/ui` into the app's `components/` directory.
3. **Clean package.json**: Remove any `workspace:*` dependencies.
4. **Tailwind Paths**: Update `tailwind.config.ts` to only scan internal paths.

## 3. Deployment Troubleshooting

### Build Error: "Module not found"

- **Cause**: Case-sensitive filenames or missing workspace dependencies.
- **Fix**: Verify filename casing (Linux/Vercel is case-sensitive). Ensure all dependencies are listed in `package.json`.

### Build Error: "Metadata themeColor is deprecated"

- **Cause**: Using `themeColor` in the `metadata` export in Next.js 14+.
- **Fix**: Move `themeColor` to an independent `viewport` export in `layout.tsx`.

## 4. Faster Iterations

- **Vercel Preview**: Always use preview deployments to verify changes before merging to `main`.
- **Pre-Push Build**: Run `npm run build` locally before pushing to catch 90% of deployment errors early.
- **Ignore Files**: Use `.vercelignore` to exclude large, unneeded assets from the upload.
