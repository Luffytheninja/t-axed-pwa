# Antigravity Architecture

This document describes the technical architecture of the Antigravity ecosystem.

## System Overview

Antigravity is structured as a **Turborepo Monorepo** using **pnpm** as the package manager. This allows for rapid prototyping and high code reuse across multiple projects.

## Directory Structure

```mermaid
graph TD
    Root[Antigravity Monorepo]
    Apps[apps/]
    Pkgs[packages/]
    Docs[docs/]

    Root --> Apps
    Root --> Pkgs
    Root --> Docs

    Apps --> Payski
    Apps --> BookNGN
    Apps --> T-Axed
    Apps --> Polished

    Pkgs --> UI[@antigravity/ui]
    Pkgs --> Tokens[@antigravity/tokens]
    Pkgs --> DesignOS[design-os]

    UI --> Tokens
    Payski --> UI
    BookNGN --> UI
```

## Key Infrastructure

### 🎨 Design System

- **@antigravity/tokens**: The atomic layer. Hardcoded values (colors, spacing) extracted into JSON/TS.
- **@antigravity/ui**: The component layer. Built with React and Tailwind CSS, consuming tokens to ensure visual consistency.

### 🚀 Build System

- **Turborepo**: Manages build pipelines, caching, and task orchestration.
- **pnpm**: Fast, disk-efficient package management.

### 🤖 Agent Manager

- Orchestrates AI agents using **Spec-Driven Development**.
- Enforces protocols defined in `docs/PROTOCOL.md`.

## Tech Stack

- **Frameworks**: Next.js, React, React Three Fiber
- **Styling**: Tailwind CSS, Framer Motion
- **Language**: TypeScript
- **Deployment**: Vercel
