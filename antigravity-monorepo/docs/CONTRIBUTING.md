# Contributing to Antigravity

Welcome! This guide outlines how to contribute to the Antigravity ecosystem.

## Workspace Structure

- `apps/`: Deployable applications (Next.js, Vite, etc.)
- `packages/`: Shared libraries and design system components
- `docs/`: Centralized documentation

## Adding a New Project

### Adding an App

1. Create a new directory in `apps/`.
2. Initialize with your preferred framework (e.g., `npx create-next-app`).
3. Add workspace dependencies to `@antigravity/ui` or `@antigravity/tokens` if needed.
4. Update `docs/PROJECTS.md`.

### Adding a Package

1. Create a new directory in `packages/`.
2. Follow the scope naming convention: `@antigravity/[package-name]`.

## Development Workflow

### Git Identity

Always ensure your local git identity is set to:

```bash
git config user.name "luffytheninja"
git config user.email "ayomide.gunjob@gmail.com"
```

### Commit Conventions

We use **Conventional Commits**:

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation updates
- `style`: Visual/CSS changes
- `refactor`: Code cleanup

### Build & Dev

- Use `pnpm dev` at the root to run development servers.
- Use `pnpm build` at the root to verify build integrity via Turborepo.

## Quality Standards

- **Warm Tech**: Follow the design philosophy in `docs/DESIGN_PHILOSOPHY.md`.
- **Accessibility**: Ensure WCAG AA compliance.
- **Spec-Driven**: Always define tasks in a `task.md` or similar before starting execution.
