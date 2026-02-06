# Antigravity Ecosystem 🚀

A high-performance monorepo for premium digital products, powered by **Warm Tech** and **Agentic Orchestration**.

## 🌌 Overview

Antigravity is a strategic workspace designed for the solo creator. It leverages a shared design system and automated workflows to build, deploy, and maintain a diverse portfolio of fintech, luxury, and 3D experiential products.

## 🛠️ Ecosystem Structure

- **[apps](./apps)**: 11+ production apps including Payski, T-Axed, and Book-NGN.
- **[packages](./packages)**: The engine room. Shared UI components, design tokens, and framework logic.
- **[docs](./docs)**: Centralized strategy, protocols, and design philosophy.

## 🚀 Quick Start

Ensure you have **pnpm** installed:

```bash
# Install dependencies
pnpm install

# Run all apps in development mode
pnpm dev

# Build the entire universe
pnpm build
```

## 📜 Key Documents

- [**Design Philosophy**](./docs/DESIGN_PHILOSOPHY.md): The "Dark. Glossy. Intentional." aesthetic.
- [**Agent Protocol**](./docs/PROTOCOL.md): Rules for AI-agent orchestration.
- [**Ecosystem Strategy**](./docs/ECOSYSTEM_STRATEGY.md): Roadmap and success metrics.
- [**Vercel Deployment**](./docs/VERCEL_DEPLOYMENT.md): Guide for standalone and monorepo builds.

## 🏛️ Architecture

```mermaid
graph LR
    subgraph Packages
        T[@antigravity/tokens] --> U[@antigravity/ui]
    end
    subgraph Applications
        U --> P[Payski]
        U --> B[Book-NGN]
        U --> T2[T-Axed]
    end
```

## 👤 Maintainer

- **luffytheninja** (ayomide.gunjob@gmail.com)

---

> "The value is not in manual labor—it is in design taste and strategic planning."
