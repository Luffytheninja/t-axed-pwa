# Antigravity Experiments - Protocol v2.0

**Last Updated:** February 4, 2026  
**Maintainer:** luffytheninja (ayomide.gunjob@gmail.com)

---

## Table of Contents

1. [Golden Rules](#1-golden-rules)
2. [Git Workflow Standards](#2-git-workflow-standards)
3. [Monorepo Architecture](#3-monorepo-architecture)
4. [Error Recovery](#4-error-recovery)
5. [Documentation Standards](#5-documentation-standards)
6. [Shared Design System](#6-shared-design-system)
7. [Asset & Content Strategy](#7-asset--content-strategy)
8. [AI-Agent Best Practices](#8-ai-agent-best-practices)
9. [Emergency Procedures](#9-emergency-procedures)
10. [Tooling & Environment](#10-tooling--environment)

---

## 1. Golden Rules

### Core Principles

- **Identity First**: EVERY new repository MUST have local git identity configured immediately after `git init`.
  ```bash
  git config user.name "luffytheninja"
  git config user.email "ayomide.gunjob@gmail.com"
  ```
- **Path Precision**: Agents operate from a scratchpad. ALWAYS use absolute paths or `git -C "absolute/path"` to avoid "not a git repository" errors.
- **Monorepo Structure**: Use `apps/` for deployable projects and `packages/` for shared code.
- **No Hallucinations**: Verify file existence before reading/editing. Verify tool outputs before assuming success.
- **Convention Over Configuration**: Follow established patterns. Don't create new approaches unless existing ones fail.

---

## 2. Git Workflow Standards

### 2.1 Initial Repository Setup

**Step-by-step initialization:**

```bash
# 1. Create project folder
mkdir "Project Name"
cd "Project Name"

# 2. Initialize git
git init

# 3. Configure identity (CRITICAL - Do this immediately)
git config user.name "luffytheninja"
git config user.email "ayomide.gunjob@gmail.com"

# 4. Verify configuration
git config user.name  # Should output: luffytheninja
git config user.email # Should output: ayomide.gunjob@gmail.com

# 5. Add remote
git remote add origin <repository-url>

# 6. Verify remote
git remote -v
```

**One-time global setup (optional but recommended):**

```bash
# Set global defaults to prevent identity errors
git config --global user.name "luffytheninja"
git config --global user.email "ayomide.gunjob@gmail.com"
```

### 2.2 Branch Strategy

**Main branches:**

- `main` - Production-ready code only (protected, requires PR)
- `develop` - Integration branch for features
- `feature/<name>` - Individual feature development
- `hotfix/<issue>` - Emergency production fixes

**Monorepo-specific branching:**

- App-specific features: `feature/payski-auth-flow`
- Cross-cutting features: `feature/ui-button-variants`
- Package updates: `feature/tokens-dark-mode`

**Branch naming conventions:**

```bash
# Features
feature/app-name-short-description
feature/payski-payment-integration
feature/ui-glassmorphic-cards

# Fixes
fix/app-name-issue-description
fix/purfection-mobile-nav
fix/ui-button-hover-state

# Hotfixes (production emergencies)
hotfix/critical-payment-bug
hotfix/security-patch
```

### 2.3 Conventional Commits (REQUIRED)

**Format:**

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc. (not CSS)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates

**Examples:**

```bash
# Feature commits
git commit -m "feat(payski): add expense categorization UI"
git commit -m "feat(ui): add Input component with validation states"

# Fix commits
git commit -m "fix(purfection): resolve mobile navigation overlay z-index"
git commit -m "fix(ui): correct button disabled state opacity"

# Documentation
git commit -m "docs(protocol): update git workflow section"
git commit -m "docs(payski): add API integration guide"

# Chores
git commit -m "chore(deps): upgrade react to 19.x"
git commit -m "chore(ui): remove unused component files"
```

**Breaking changes:**

```bash
# Add BREAKING CHANGE in footer
git commit -m "feat(ui)!: redesign Button API

BREAKING CHANGE: variant prop renamed to appearance.
Migration: Replace variant='primary' with appearance='primary'
"
```

**Why conventional commits?**

- Enables automated changelog generation
- Powers semantic versioning for packages
- Makes git history scannable and searchable
- Required for Changesets workflow

### 2.4 Committing & Pushing

**For single app changes:**

```bash
# Navigate to app directory
cd apps/payski

# Stage changes
git add .

# Commit with conventional format
git commit -m "feat(payski): add expense categorization"

# Push to feature branch
git push origin feature/payski-expenses
```

**For shared package changes:**

```bash
# Navigate to package
cd packages/ui

# Stage changes
git add .

# Create changeset for versioning
npx changeset
# Follow prompts: select package, change type (patch/minor/major), describe changes

# Commit (changeset creates the message)
git commit -m "feat(ui): add Input component with validation"

# Push
git push origin feature/ui-input-validation
```

**For monorepo root changes:**

```bash
# From repository root
git add .
git commit -m "chore: update turbo pipeline configuration"
git push origin feature/turbo-config-update
```

### 2.5 Pull Request Workflow

**Before creating PR:**

```bash
# 1. Ensure all changes are committed
git status  # Should show "nothing to commit, working tree clean"

# 2. Update from develop
git checkout develop
git pull origin develop
git checkout feature/your-feature-name
git rebase develop

# 3. Run quality checks
turbo build      # All apps must build
turbo typecheck  # No TypeScript errors
turbo lint       # No linting errors

# 4. Push to remote
git push origin feature/your-feature-name
```

**PR Checklist Template:**

```markdown
## Changes

- [ ] What was added/changed/fixed

## Testing

- [ ] All apps build successfully (`turbo build`)
- [ ] No TypeScript errors (`turbo typecheck`)
- [ ] No linting errors (`turbo lint`)
- [ ] Tested in local development

## Documentation

- [ ] README updated (if public API changed)
- [ ] Changeset added (if package updated)
- [ ] Comments added for complex logic

## Screenshots (if UI change)

[Add before/after screenshots]
```

### 2.6 Handling Agent Push Failures

**Problem:** AI agents cannot access GitHub credentials, causing `git push` to hang.

**Solution - Agent Protocol:**

1. **Agent stages and commits:**

   ```bash
   git add .
   git commit -m "feat(payski): implementation complete"
   ```

2. **Agent detects push will require authentication:**

   ```bash
   # Agent checks if credentials are available
   git config credential.helper
   # If empty or times out, proceed to step 3
   ```

3. **Agent generates "Safe Paste" block for user:**

   ```bash
   # ===== COPY AND PASTE THIS IN YOUR TERMINAL =====
   cd /absolute/path/to/antigravity-experiments/apps/payski
   git push origin feature/payski-payment-flow
   # =================================================
   ```

4. **Agent output message:**

   ```
   ✓ Changes committed locally
   ⚠ Push requires authentication

   Please run the command block above in your terminal to push changes.
   Your credentials are required for GitHub authentication.
   ```

**User action:**

- Copy the provided command block
- Paste in terminal
- Authenticate if prompted
- Confirm push succeeded

---

## 3. Monorepo Architecture

### 3.1 Directory Structure

```
antigravity-experiments/
├── apps/
│   ├── polished-purfection-site/   # Next.js - Campus luxury brand
│   ├── payski/                      # React - Financial management
│   ├── t-axed/                      # Next.js - Tax education
│   └── opn-wrld/                    # Next.js - Creative portfolio
├── packages/
│   ├── ui/                          # @antigravity/ui - Design system
│   │   ├── src/
│   │   │   ├── components/         # React components
│   │   │   ├── hooks/              # Shared hooks
│   │   │   └── styles/             # Global styles
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── tokens/                      # @antigravity/tokens - Design tokens
│   │   ├── src/
│   │   │   ├── core.json           # Reference tokens
│   │   │   ├── semantic.json       # System tokens
│   │   │   └── brands/             # Brand-specific overrides
│   │   │       ├── purfection.json
│   │   │       ├── payski.json
│   │   │       ├── taxed.json
│   │   │       └── opnwrld.json
│   │   └── build.js                # Style Dictionary config
│   ├── utils/                       # @antigravity/utils - Shared utilities
│   │   ├── src/
│   │   │   ├── formatting.ts       # Date, currency, etc.
│   │   │   ├── validation.ts       # Form validation
│   │   │   └── analytics.ts        # Analytics wrapper
│   │   └── package.json
│   └── tsconfig/                    # @antigravity/tsconfig - Shared configs
│       ├── base.json               # Common TypeScript config
│       ├── nextjs.json             # Next.js-specific
│       └── react.json              # React-specific
├── .changeset/                      # Version management
├── turbo.json                       # Build pipeline config
├── package.json                     # Root workspace
├── pnpm-workspace.yaml              # Workspace definition
└── README.md
```

### 3.2 Workspace Dependencies

**In app's package.json:**

```json
{
  "name": "payski",
  "version": "0.0.0",
  "dependencies": {
    "@antigravity/ui": "workspace:*",
    "@antigravity/tokens": "workspace:*",
    "@antigravity/utils": "workspace:*",
    "react": "^19.0.0",
    "stripe": "^14.0.0"
  },
  "devDependencies": {
    "@antigravity/tsconfig": "workspace:*"
  }
}
```

**In package's package.json:**

```json
{
  "name": "@antigravity/ui",
  "version": "1.2.3",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "dependencies": {
    "@antigravity/tokens": "workspace:*",
    "react": "^19.0.0",
    "class-variance-authority": "^0.7.0"
  }
}
```

**Critical rules:**

1. **Internal packages ALWAYS use `workspace:*`** (not hardcoded versions)
2. **Shared external deps** go in root `package.json` if used by 2+ apps
3. **App-specific deps** stay in the app's package.json
4. **Peer dependencies** in packages must match app requirements

### 3.3 Versioning Strategy

**For packages (ui, tokens, utils):**

- Use semantic versioning: `MAJOR.MINOR.PATCH`
  - `MAJOR`: Breaking changes (e.g., API redesign)
  - `MINOR`: New features (backward compatible)
  - `PATCH`: Bug fixes
- Manage via Changesets (never edit version manually)
- Example: `1.2.3` → `2.0.0` if breaking change

**Changeset workflow:**

```bash
# 1. Make changes to package
cd packages/ui
# ... edit files ...

# 2. Create changeset
npx changeset
# Select: @antigravity/ui
# Type: minor (if new feature)
# Summary: "Add Input component with validation"

# 3. Commit changeset file
git add .
git commit -m "feat(ui): add Input component"

# 4. On merge to main, CI runs:
npx changeset version  # Updates package.json versions
npx changeset publish  # Publishes to npm (if public)
```

**For apps (payski, purfection, etc.):**

- No version numbers needed (they're not published to npm)
- Use git tags for release tracking:
  ```bash
  git tag -a payski-v2.1.0 -m "Release: Payment flow redesign"
  git push origin payski-v2.1.0
  ```

### 3.4 Build Pipeline (turbo.json)

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"]
    }
  }
}
```

**Key concepts:**

- `^build`: Run dependencies' build tasks first
- `outputs`: Cache these directories for faster rebuilds
- `cache: false`: Never cache (used for dev servers)
- `persistent: true`: Keep running (dev servers don't exit)

**Common commands:**

```bash
# Run all apps in development mode
turbo dev

# Build everything (packages first, then apps)
turbo build

# Lint all code
turbo lint

# Type-check all TypeScript
turbo typecheck

# Run specific app
turbo dev --filter=payski

# Build specific package
turbo build --filter=@antigravity/ui
```

**Critical rule:**
When editing `packages/ui`, ALL apps consuming it must rebuild. Turbo handles this automatically via the `^build` dependency graph.

### 3.5 Package Import Patterns

**Correct imports:**

```typescript
// ✅ Import from workspace package
import { Button, Card } from '@antigravity/ui';
import { formatCurrency } from '@antigravity/utils';
import { colors } from '@antigravity/tokens';

// ✅ Import with named exports
import { Button } from '@antigravity/ui/components';
import { useAnalytics } from '@antigravity/utils/analytics';
```

**Incorrect imports:**

```typescript
// ❌ Relative path to package (breaks encapsulation)
import { Button } from '../../../packages/ui/src/components/Button';

// ❌ Direct node_modules import (won't resolve)
import { Button } from 'ui';

// ❌ Missing scope
import { Button } from 'antigravity-ui';
```

---

## 4. Error Recovery

### 4.1 Prevention Checklist

**Before ANY git operation, verify:**

```bash
# 1. Confirm we're in the right directory
pwd
# Expected output: /path/to/antigravity-experiments/apps/payski

# 2. Verify git identity is set
git config user.name
# Expected: luffytheninja

git config user.email
# Expected: ayomide.gunjob@gmail.com

# 3. Check repository status
git status
# Should NOT error with "not a git repository"

# 4. Verify remote exists (if pushing)
git remote -v
# Should show origin pointing to GitHub
```

### 4.2 Common Git Errors

#### Error: "Not a git repository"

**Cause:** Operating from parent directory or non-initialized folder

**Diagnosis:**

```bash
# Check if .git folder exists
ls -la | grep .git
```

**Fix Option 1 - Navigate to correct directory:**

```bash
cd apps/payski
git status  # Should now work
```

**Fix Option 2 - Use -C flag:**

```bash
# Run git command in specific directory
git -C apps/payski status
git -C apps/payski add .
git -C apps/payski commit -m "fix: resolve issue"
```

**Prevention:**
Always verify `pwd` before git operations, especially in AI agent workflows.

#### Error: "Author identity unknown"

**Cause:** Forgot to run config after `git init`

**Immediate fix:**

```bash
git config user.name "luffytheninja"
git config user.email "ayomide.gunjob@gmail.com"

# Retry the failed command
git commit -m "your message"
```

**Permanent fix (one-time global setup):**

```bash
git config --global user.name "luffytheninja"
git config --global user.email "ayomide.gunjob@gmail.com"
```

#### Error: "Failed to push: authentication required"

**Cause:** Agent cannot access GitHub credentials

**Solution (Agent workflow):**

```bash
# Agent stages and commits locally
git add .
git commit -m "feat: implementation complete"

# Agent generates paste block for user
echo "==== RUN IN YOUR TERMINAL ===="
echo "cd $(pwd)"
echo "git push origin $(git branch --show-current)"
echo "=============================="
```

**User action:**

1. Copy the command block
2. Run in terminal
3. Authenticate when prompted
4. Confirm push succeeded: `git log origin/branch-name`

#### Error: "Merge conflict detected"

**Cause:** Remote has changes not in local branch

**Fix:**

```bash
# Pull with rebase to avoid merge commits
git pull --rebase origin main

# If conflicts occur:
git status  # Shows conflicted files

# Manually resolve conflicts in each file
# Look for conflict markers:
# <<<<<<< HEAD
# Your changes
# =======
# Their changes
# >>>>>>> branch-name

# After resolving:
git add .
git rebase --continue
```

**Agent protocol for conflicts:**

1. Agent detects conflict markers in `git status`
2. Agent STOPS immediately (does NOT attempt auto-resolution)
3. Agent outputs:

   ```
   ⚠️ MERGE CONFLICT DETECTED

   Files with conflicts:
   - apps/payski/src/components/PaymentForm.tsx

   Manual intervention required. Run:
   git status

   Then resolve conflicts and run:
   git add .
   git rebase --continue
   ```

#### Error: "Your branch is behind 'origin/main'"

**Fix:**

```bash
# Pull latest changes
git pull origin main

# Or rebase to maintain clean history
git pull --rebase origin main
```

#### Error: "fatal: refusing to merge unrelated histories"

**Cause:** Trying to merge repos with no common ancestor

**Fix:**

```bash
# Allow unrelated histories (USE WITH CAUTION)
git pull origin main --allow-unrelated-histories

# Better approach: Start fresh
git clone <repository-url> new-folder
# Manually copy your work into the cloned repo
```

### 4.3 File Operation Errors

#### Error: "No such file or directory"

**Prevention (ALWAYS verify before reading):**

```bash
# Check if file exists
if [ -f "path/to/file.tsx" ]; then
  echo "File exists, proceeding..."
  cat path/to/file.tsx
else
  echo "File does not exist. Creating..."
  mkdir -p "path/to"
  touch "path/to/file.tsx"
fi
```

**Agent verification pattern:**

```bash
# Before reading any file
ls path/to/file.tsx 2>/dev/null && echo "exists" || echo "not found"

# Before editing
test -f path/to/file.tsx || echo "ERROR: File missing, cannot edit"
```

#### Error: "Permission denied"

**Cause:** Operating outside authorized workspace

**Diagnosis:**

```bash
# Check file permissions
ls -la path/to/file.tsx
# Look for: -rw-r--r-- (readable)
#      vs:  ---------- (no permissions)
```

**Fix:**

```bash
# Option 1: Change permissions (if you own the file)
chmod 644 path/to/file.tsx

# Option 2: Move to authorized workspace
cp restricted/file.tsx scratch/file.tsx
# Work in scratch/, then copy back when done
```

**Agent protocol:**

1. Identify the required file: `important-config.json`
2. Ask user: "File is in restricted location. Can you copy `important-config.json` to `scratch/` folder?"
3. Wait for user confirmation before proceeding
4. Never retry the same failing path >2 times without intervention

#### Error: "Command not found"

**Cause:** Required tool not installed or not in PATH

**Common missing tools:**

```bash
# Check if tool exists
which turbo  # Should output path, e.g., /usr/local/bin/turbo
which node   # Should output node path
which git    # Should output git path
```

**Fix:**

```bash
# Install missing tool
npm install -g turbo  # For turbo
brew install git      # For git (macOS)

# Or add to PATH
export PATH="/usr/local/bin:$PATH"
```

### 4.4 Build & Runtime Errors

#### Error: "Module not found: Can't resolve '@antigravity/ui'"

**Cause:** Workspace dependency not installed or linked incorrectly

**Fix:**

```bash
# From repository root
pnpm install  # or npm install

# Verify workspace link
ls node_modules/@antigravity/ui
# Should show symlink to packages/ui

# If missing, rebuild workspace
rm -rf node_modules
pnpm install
```

#### Error: "Type error: Cannot find module '@antigravity/ui' or its type declarations"

**Cause:** Package not built or TypeScript config incorrect

**Fix:**

```bash
# Build the package
turbo build --filter=@antigravity/ui

# Verify dist/ folder exists
ls packages/ui/dist
# Should contain: index.js, index.d.ts

# If still fails, check tsconfig.json includes workspace paths
```

#### Error: "EADDRINUSE: address already in use :::3000"

**Cause:** Port already occupied by another process

**Fix:**

```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

---

## 5. Documentation Standards

### 5.1 Repository Documentation

**Every repository MUST have:**

1. **README.md** (root level)

   ````markdown
   # Project Name

   One-sentence description.

   ## Quick Start

   ```bash
   git clone <repo-url>
   cd project-name
   npm install
   npm run dev
   ```
   ````

   ## Project Structure
   - `/src` - Source code
   - `/public` - Static assets

   ## Key Features
   - Feature 1
   - Feature 2

   ## Tech Stack
   - React 19
   - Next.js 15
   - Tailwind CSS

   ## Deployment

   Deployed at: https://...

   ```

   ```

2. **CONTRIBUTING.md** (if open to contributions)
3. **CHANGELOG.md** (auto-generated by Changesets)

### 5.2 Code Documentation

**Component documentation:**

````typescript
/**
 * Button component for primary user actions
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">
 *   Submit Payment
 * </Button>
 * ```
 *
 * @param variant - Visual style: primary, secondary, ghost
 * @param size - Size variant: sm, md, lg
 * @param isLoading - Shows loading spinner, disables interaction
 */
export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  // Implementation
}
````

**Utility function documentation:**

```typescript
/**
 * Formats a number as Nigerian Naira currency
 *
 * @param amount - The numeric amount to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string with ₦ symbol
 *
 * @example
 * formatNaira(1500) // "₦1,500.00"
 * formatNaira(1500.5, 0) // "₦1,501"
 */
export function formatNaira(amount: number, decimals = 2): string {
  // Implementation
}
```

### 5.3 Task Tracking

**Create `task.md` in agent working directory:**

```markdown
# Task: Payski Payment Flow Implementation

## Objective

Build end-to-end payment processing with Stripe

## Completed ✓

- [x] Created PaymentForm component
- [x] Integrated Stripe SDK
- [x] Added card validation

## In Progress 🔄

- [ ] Error handling for declined cards
- [ ] Loading states during processing

## Blocked 🚫

- [ ] Need Stripe test API keys from user
- [ ] Awaiting design approval for confirmation screen

## Notes

- Using Stripe Elements for PCI compliance
- Storing payment methods, not full card numbers
```

### 5.4 Changeset Documentation

**When creating a changeset:**

```bash
npx changeset

# Prompt: Which packages?
# Select: @antigravity/ui

# Prompt: What type of change?
# Select: minor (new feature)

# Prompt: Summary?
# Write: "Add Input component with validation states"

# This creates .changeset/random-name.md:
```

```markdown
---
'@antigravity/ui': minor
---

Add Input component with validation states

New component supports:

- Text, email, password, number types
- Error, success, and warning states
- Accessible labels and ARIA attributes
- Integration with React Hook Form

BREAKING: None
```

---

## 6. Shared Design System

### 6.1 Package Structure

**`@antigravity/ui` directory:**

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   ├── Input/
│   │   └── index.ts            # Central export
│   ├── hooks/
│   │   ├── useAnalytics.ts
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css
│   └── index.ts                # Main entry point
├── package.json
├── tsconfig.json
└── README.md
```

### 6.2 Component Development

**When creating a new component:**

1. **Identify if it's truly shared:**
   - Used by 2+ apps? → Build in `packages/ui`
   - App-specific? → Build in `apps/app-name/components`

2. **Follow component template:**

   ```typescript
   // packages/ui/src/components/Button/Button.tsx
   import { cva, type VariantProps } from 'class-variance-authority'

   const buttonVariants = cva(
     'inline-flex items-center justify-center rounded-lg font-medium transition-all',
     {
       variants: {
         variant: {
           primary: 'bg-gold-500 text-black hover:bg-gold-600',
           secondary: 'bg-gray-800 text-white hover:bg-gray-700',
           ghost: 'bg-transparent hover:bg-gray-100'
         },
         size: {
           sm: 'h-9 px-3 text-sm',
           md: 'h-11 px-4 text-base',
           lg: 'h-13 px-6 text-lg'
         }
       },
       defaultVariants: {
         variant: 'primary',
         size: 'md'
       }
     }
   )

   export interface ButtonProps
     extends React.ButtonHTMLAttributes<HTMLButtonElement>,
       VariantProps<typeof buttonVariants> {
     isLoading?: boolean
   }

   export function Button({
     variant,
     size,
     isLoading,
     className,
     children,
     ...props
   }: ButtonProps) {
     return (
       <button
         className={buttonVariants({ variant, size, className })}
         disabled={isLoading || props.disabled}
         {...props}
       >
         {isLoading ? <Spinner /> : children}
       </button>
     )
   }
   ```

3. **Export from index:**

   ```typescript
   // packages/ui/src/components/index.ts
   export * from './Button';
   export * from './Card';
   export * from './Input';

   // packages/ui/src/index.ts
   export * from './components';
   export * from './hooks';
   ```

4. **Create changeset:**
   ```bash
   npx changeset
   # Select @antigravity/ui, minor, describe the new component
   ```

### 6.3 Importing Components

**In apps:**

```typescript
// ✅ Correct: Import from package
import { Button, Card, Input } from '@antigravity/ui'

function PaymentForm() {
  return (
    <Card>
      <Input type="email" label="Email" />
      <Button variant="primary">Submit</Button>
    </Card>
  )
}
```

**Never do this:**

```typescript
// ❌ Wrong: Relative import to package
import { Button } from '../../../packages/ui/src/components/Button';

// ❌ Wrong: Direct file import
import { Button } from '@antigravity/ui/src/components/Button';

// ❌ Wrong: Missing scope
import { Button } from 'ui';
```

### 6.4 Design Token Usage

**Token hierarchy:**

```
Reference Tokens (core.json)
    ↓
System Tokens (semantic.json)
    ↓
Component Tokens (component CSS)
```

**Example token file:**

```json
// packages/tokens/src/core.json
{
  "color": {
    "gold": {
      "50": { "value": "#FFFBEB" },
      "500": { "value": "#D4AF37" },
      "900": { "value": "#705C1F" }
    },
    "gray": {
      "50": { "value": "#F9FAFB" },
      "900": { "value": "#0A0A0A" }
    }
  },
  "spacing": {
    "1": { "value": "0.25rem" },
    "2": { "value": "0.5rem" },
    "4": { "value": "1rem" }
  }
}

// packages/tokens/src/semantic.json
{
  "color": {
    "primary": { "value": "{color.gold.500}" },
    "background": { "value": "{color.gray.900}" },
    "text": { "value": "{color.gray.50}" }
  }
}
```

**Usage in components:**

```typescript
// ✅ Use semantic tokens
className="bg-primary text-background"

// ❌ Never hardcode colors
className="bg-[#D4AF37] text-[#0A0A0A]"

// ❌ Never use arbitrary values for brand colors
style={{ backgroundColor: '#D4AF37' }}
```

### 6.5 Contribution Workflow

**Adding a component to the design system:**

1. **Build locally in app first:**

   ```bash
   cd apps/payski
   # Create component in app to validate it works
   ```

2. **Extract to design system:**

   ```bash
   cd packages/ui
   # Move component to packages/ui/src/components
   # Remove app-specific logic
   # Make it generic and reusable
   ```

3. **Update exports:**

   ```typescript
   // packages/ui/src/components/index.ts
   export * from './NewComponent';
   ```

4. **Test in app:**

   ```bash
   # Rebuild package
   turbo build --filter=@antigravity/ui

   # Update app to import from package
   import { NewComponent } from '@antigravity/ui'
   ```

5. **Create changeset:**

   ```bash
   npx changeset
   # Document the new component
   ```

6. **Create PR with checklist:**
   - [ ] Component works in 2+ apps
   - [ ] Uses design tokens (no hardcoded values)
   - [ ] Has TypeScript types
   - [ ] Includes basic documentation
   - [ ] Passes accessibility checks

---

## 7. Asset & Content Strategy

### 7.1 Asset Verification Protocol

**Before creating image-dependent components, ALWAYS verify assets exist:**

```bash
# List all images in public folder
ls -R apps/payski/public/images/

# Verify specific asset
test -f apps/payski/public/images/logo.png && echo "✓ Logo exists" || echo "✗ Missing logo"

# Check multiple assets
for file in logo.png hero-banner.jpg icon-card.svg; do
  test -f "apps/payski/public/images/$file" && echo "✓ $file" || echo "✗ $file missing"
done
```

**Agent verification pattern:**

```bash
# Before coding image-dependent component
ASSETS_DIR="apps/payski/public/images"

# Verify directory exists
if [ ! -d "$ASSETS_DIR" ]; then
  echo "ERROR: Images directory missing"
  echo "Expected: $ASSETS_DIR"
  exit 1
fi

# List available assets
echo "Available images:"
ls -1 "$ASSETS_DIR"

# Verify required assets
REQUIRED_ASSETS=("logo.svg" "hero.jpg" "background.png")
for asset in "${REQUIRED_ASSETS[@]}"; do
  if [ ! -f "$ASSETS_DIR/$asset" ]; then
    echo "⚠️  Missing required asset: $asset"
  fi
done
```

### 7.2 Image Implementation Patterns

**❌ BAD: Hard-coded path, no fallback**

```tsx
<img src="/images/hero-banner.jpg" alt="Hero" />
```

**✅ GOOD: Environment-aware with fallback**

```tsx
<img
  src={
    process.env.NODE_ENV === 'production'
      ? '/images/hero-banner.jpg'
      : '/images/hero-banner-dev.jpg'
  }
  alt="Hero"
  onError={(e) => {
    e.currentTarget.src = '/images/fallback.jpg';
  }}
/>
```

**✅ BETTER: Next.js Image with optimization**

```tsx
import Image from 'next/image';

<Image
  src="/images/hero-banner.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>;
```

**✅ BEST: CSS background with gradient fallback**

```tsx
<div
  className="hero-section"
  style={{
    background: `
      linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)),
      url('/images/hero-banner.jpg')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#0A0A0A', // Fallback if image fails
  }}
/>
```

### 7.3 Content & Placeholder Rules

**Placeholder text policy:**

✅ **Allowed:**

- In `develop` branch during active development
- With clear TODOs: `{/* TODO: Replace with final copy */}`
- In feature branches (not merged to main)
- In design mockups/prototypes

❌ **Never allowed:**

- In `main` branch
- In production deployments
- Without TODO comments
- Lorem ipsum generators without context

**Pre-push verification:**

```bash
# Search for common placeholders
grep -r "Lorem ipsum" apps/ --include="*.tsx" --include="*.jsx"
grep -r "placeholder" apps/ --include="*.tsx" --include="*.jsx"
grep -r "TODO.*content" apps/ --include="*.tsx" --include="*.jsx"

# If found in files being pushed to main:
if git diff --name-only main | xargs grep -l "Lorem ipsum"; then
  echo "ERROR: Placeholder text detected in production files"
  exit 1
fi
```

**Agent protocol:**

```bash
# Before pushing to main
if [[ $(git branch --show-current) == "main" ]]; then
  # Scan for placeholders
  if grep -r "Lorem ipsum" apps/*/src; then
    echo "⚠️  BLOCKED: Lorem ipsum found in source files"
    echo "Remove placeholders before merging to main"
    exit 1
  fi
fi
```

### 7.4 Missing Asset Handling

**Decision tree when asset doesn't exist:**

1. **Check if it's critical:**
   - **Logo/branding**: Critical → Block progress, request from user
   - **Hero image**: Important → Use gradient fallback, note in TODO
   - **Decorative icon**: Optional → Skip gracefully or use emoji

2. **Document the requirement:**

   ```markdown
   ## Missing Assets (task.md)

   ### Critical (blocks deployment):

   - `/images/payski-logo.svg` - Header logo
   - `/images/credit-card-icons/*.png` - Payment form

   ### Nice-to-have (can use fallback):

   - `/images/testimonial-photos/*.jpg` - User photos (using initials avatar)
   - `/images/background-patterns/*.svg` - Decorative (using gradient)
   ```

3. **Ask user for guidance:**

   ```
   I need `payski-logo.svg` to complete the header. Should I:

   A) Use a text-based logo temporarily? (Quick, looks less polished)
   B) Wait for you to provide the file? (Delays this component)
   C) Generate a placeholder with initials "PS"? (Requires approval)

   Please respond with A, B, or C.
   ```

4. **Implement graceful fallback:**
   ```tsx
   // Text logo fallback
   function Logo() {
     const [imageError, setImageError] = useState(false);

     if (imageError) {
       return <div className="text-2xl font-bold text-gold-500">Payski</div>;
     }

     return (
       <Image
         src="/images/logo.svg"
         alt="Payski"
         width={120}
         height={40}
         onError={() => setImageError(true)}
       />
     );
   }
   ```

### 7.5 Asset Organization

**Recommended structure:**

```
apps/payski/public/
├── images/
│   ├── brand/
│   │   ├── logo.svg
│   │   ├── logo-dark.svg
│   │   └── favicon.png
│   ├── ui/
│   │   ├── icons/
│   │   │   ├── credit-card.svg
│   │   │   ├── bank.svg
│   │   │   └── wallet.svg
│   │   └── illustrations/
│   │       ├── empty-state.svg
│   │       └── error-state.svg
│   ├── marketing/
│   │   ├── hero-banner.jpg
│   │   ├── feature-1.png
│   │   └── testimonials/
│   │       ├── user-1.jpg
│   │       └── user-2.jpg
│   └── backgrounds/
│       ├── gradient-1.svg
│       └── pattern-1.svg
└── fonts/
    ├── inter-variable.woff2
    └── inter-variable.woff
```

**File naming conventions:**

- Lowercase with hyphens: `credit-card-icon.svg` (not `CreditCardIcon.svg`)
- Descriptive names: `hero-payski-dashboard.jpg` (not `image1.jpg`)
- Include size in filename if multiple versions: `logo-sm.svg`, `logo-lg.svg`

---

## 8. AI-Agent Best Practices

### 8.1 Context Management

**Token budget awareness:**

Before reading large files, ask:

- Do I need the whole file or just specific sections?
- Can I use `head` or `tail` for preview?
- Is there a smaller summary or index?

**Efficient file reading:**

```bash
# ❌ BAD: Read entire 2000-line file
cat src/app/page.tsx

# ✅ GOOD: Preview first
wc -l src/app/page.tsx  # Check line count first
head -n 50 src/app/page.tsx  # Read first 50 lines

# ✅ GOOD: Target specific sections
grep -A 10 "function PaymentForm" src/app/page.tsx  # Function + 10 lines
sed -n '100,150p' src/app/page.tsx  # Lines 100-150 only
```

**Diff previews:**

```bash
# ❌ BAD: Full diff of 500+ line file
git diff src/app/page.tsx

# ✅ GOOD: Summary first
git diff --stat src/app/page.tsx
# Output: src/app/page.tsx | 23 +++++----

# Then targeted diff if needed
git diff src/app/page.tsx | head -n 100
```

### 8.2 State Tracking

**For complex tasks, maintain a session log:**

```markdown
# Session: Payski Payment Flow Implementation

**Started:** 2026-02-04 10:30 AM
**Status:** In Progress

## Completed ✓

- [x] Created PaymentForm.tsx (10:45 AM)
  - File: apps/payski/src/components/PaymentForm.tsx
  - Lines: 120
- [x] Added Stripe integration (11:00 AM)
  - Package: stripe@14.0.0
  - Test key configured
- [x] Implemented card validation (11:15 AM)
  - Using Stripe Elements
  - Client-side validation working

## In Progress 🔄

- [ ] Error handling for declined cards
  - Started: 11:20 AM
  - Blocked by: Need error copy from user

## Blocked 🚫

- [ ] Payment confirmation email
  - Reason: Need SendGrid API key
  - Requested from user: 11:10 AM

## Next Steps

1. Complete error handling
2. Add loading states
3. Implement success redirect

## Files Modified

- apps/payski/src/components/PaymentForm.tsx
- apps/payski/package.json (added stripe)
- apps/payski/.env.local (added STRIPE_PUBLISHABLE_KEY)

## Questions for User

- What should happen when card is declined? (Retry? Show error?)
- Where should user redirect after successful payment?
```

**Update this log throughout the session:**

```bash
# Append to session log
echo "- [x] Added error handling (11:35 AM)" >> session-log.md

# Review at end of session
cat session-log.md
```

### 8.3 Hallucination Prevention

**File operation checklist:**

```bash
# ❌ NEVER assume file exists
vim src/components/NewComponent.tsx

# ✅ ALWAYS verify first
if [ -f "src/components/NewComponent.tsx" ]; then
  echo "File exists, opening..."
  cat src/components/NewComponent.tsx
else
  echo "File not found. Creating..."
  mkdir -p src/components
  touch src/components/NewComponent.tsx
fi
```

**Git operation checklist:**

```bash
# ❌ NEVER assume repo state
git push origin main

# ✅ ALWAYS check first
git remote -v  # Verify remote exists
# Output: origin  https://github.com/user/repo.git (fetch)

git status  # Check for uncommitted changes
# Output: On branch feature/payment-flow
#         Changes to be committed: ...

git branch --show-current  # Verify current branch
# Output: feature/payment-flow

# THEN push
git push origin feature/payment-flow
```

**Package installation checklist:**

```bash
# ❌ NEVER assume package is available
import { Button } from '@antigravity/ui'

# ✅ ALWAYS verify workspace link
ls -la node_modules/@antigravity/ui
# If missing:
pnpm install

# Verify it's a symlink to local package
readlink node_modules/@antigravity/ui
# Output: ../../packages/ui
```

**Before ANY operation, verify assumptions:**

1. Does the file/directory exist?
2. Are we in the correct directory?
3. Is the tool/command available?
4. Do we have the required permissions?

### 8.4 Multi-Step Task Protocol

**For complex implementations (3+ files or 30+ minutes of work):**

**1. Create spec first (`task-spec.md`):**

```markdown
# Task Specification: Payski Payment Flow

## Objective

Implement end-to-end Stripe payment processing

## Files to Create

- apps/payski/src/components/PaymentForm.tsx (new)
- apps/payski/src/lib/stripe-client.ts (new)
- apps/payski/src/app/api/payment/route.ts (new)

## Files to Modify

- apps/payski/package.json (add stripe dependency)
- apps/payski/.env.local (add API keys)

## Dependencies Needed

- stripe@14.0.0
- @stripe/stripe-js@2.0.0

## Expected Outcomes

- [ ] User can enter card details
- [ ] Payment processes via Stripe
- [ ] Success/error states displayed
- [ ] Redirect to confirmation page

## Testing Criteria

- [ ] Card validation works
- [ ] Declined cards show error
- [ ] Successful payment creates Stripe charge
- [ ] User redirects to /payment/success

## Estimated Time

2-3 hours
```

**2. Sequential execution:**

```bash
# Complete Step 1 fully before Step 2
echo "Step 1: Install dependencies"
cd apps/payski
pnpm add stripe @stripe/stripe-js
echo "✓ Step 1 complete"

# Verify before proceeding
echo "Step 2: Create Stripe client"
# ... create file ...
echo "✓ Step 2 complete"

# Continue pattern
```

**3. Checkpoint commits:**

```bash
# After each major step
git add .
git commit -m "checkpoint: completed payment form UI"

# Continue to next step
echo "Starting Step 3: API route implementation"
```

**4. Error handling:**

```bash
# If ANY step fails
if [ $? -ne 0 ]; then
  echo "❌ ERROR in Step 3"
  echo "Command failed: pnpm add stripe"
  echo "Stopping execution. Please resolve before continuing."
  exit 1
fi
```

**Agent stops immediately on errors, reports to user:**

```
⚠️  EXECUTION HALTED

Step 3 failed: Could not install stripe package

Error message:
  npm ERR! code ENETUNREACH
  npm ERR! network request failed

Possible causes:
- Network connection lost
- npm registry unavailable
- Firewall blocking request

Recommended action:
- Check internet connection
- Try again in a few minutes
- Or manually run: pnpm add stripe

Type "continue" when ready to retry Step 3.
```

### 8.5 Agent Communication Patterns

**Clear status updates:**

```
✓ Completed: Created PaymentForm component (145 lines)
⏳ In Progress: Adding Stripe integration...
⚠️  Waiting: Need API key from user
❌ Error: Failed to install package (see details above)
```

**Actionable prompts for user:**

```
I need your input to proceed:

Option A: Use Stripe test mode (I can provide test keys)
Option B: Use production mode (you provide live keys)
Option C: Mock the payment flow for now

Please respond with A, B, or C.
```

**Never:**

- Make assumptions without verifying
- Retry failing operations >2 times silently
- Proceed when blocked without user input
- Improvise solutions to critical errors

---

## 9. Emergency Procedures

### 9.1 Corrupted Repository

**Symptoms:**

- `fatal: not a git repository`
- `error: object file .git/objects/... is empty`
- `fatal: loose object ... is corrupt`

**Recovery steps:**

**1. Back up current work:**

```bash
# Create backup of entire directory
cp -r project-folder project-folder-backup-$(date +%Y%m%d-%H%M%S)

# Verify backup exists
ls -la project-folder-backup-*
```

**2. Try git repair:**

```bash
cd project-folder

# Verify and repair objects
git fsck --full --no-dangling

# If repair successful:
git status  # Should work now
```

**3. If repair fails, clone fresh:**

```bash
cd ..

# Clone from remote
git clone https://github.com/user/repo.git project-folder-fresh

# Restore uncommitted work from backup
cp -r project-folder-backup/src/* project-folder-fresh/src/

# Verify restoration
cd project-folder-fresh
git status  # Should show your uncommitted changes
```

**4. Last resort - extract commits:**

```bash
# If repository is completely corrupted but .git exists
cd project-folder-backup/.git/logs

# View commit history
cat HEAD

# Manually note commit SHAs, then:
cd ../../project-folder-fresh
git cherry-pick <commit-sha>  # For each commit
```

### 9.2 Accidental Main Branch Push

**Scenario:** You pushed broken code to `main` branch

**Immediate actions:**

**If <1 hour old and no one else has pulled:**

```bash
# 1. Revert the commit (safest)
git revert HEAD
git push origin main

# This creates a new commit that undoes changes
# History preserved, safe for collaboration
```

**If you're absolutely sure no one pulled (risky):**

```bash
# 2. Hard reset (destructive, use with caution)
git reset --hard HEAD~1
git push --force origin main

# ⚠️  WARNING: This rewrites history
# Only do this if you're the only developer
```

**For multiple bad commits:**

```bash
# Revert last 3 commits
git revert HEAD~2..HEAD
git push origin main

# Or reset to specific good commit
git reset --hard <good-commit-sha>
git push --force origin main
```

**Post-incident:**

```bash
# 1. Notify team (if applicable)
echo "⚠️  ALERT: Reverted broken push to main" >> INCIDENT-LOG.md
echo "Time: $(date)" >> INCIDENT-LOG.md
echo "Commits affected: $(git log --oneline -3)" >> INCIDENT-LOG.md

# 2. Add protection to prevent recurrence
git config branch.main.pushRemote origin
git config branch.main.merge refs/heads/main

# 3. Update your workflow to use PRs, not direct pushes
```

### 9.3 Lost Work Recovery

**Scenario:** Uncommitted changes disappeared (hard reset, checkout, etc.)

**Recovery methods:**

**1. Check reflog (git history of HEAD):**

```bash
# View recent HEAD movements
git reflog

# Output example:
# abc1234 HEAD@{0}: reset: moving to HEAD~1
# def5678 HEAD@{1}: commit: WIP payment form
# ghi9012 HEAD@{2}: commit: Add stripe integration

# Restore to previous state
git reset --hard HEAD@{1}  # Restores to "WIP payment form"
```

**2. Check git's lost and found:**

```bash
# Find dangling commits
git fsck --lost-found

# Output: dangling commit abc123...

# View dangling commit
git show abc123

# If it's your lost work, create branch from it
git branch recovery-branch abc123
git checkout recovery-branch
```

**3. Check system temp files (macOS/Linux):**

```bash
# Git sometimes writes to temp
ls -la /tmp | grep git

# Text editors create backups
ls -la ~/.vscode/Backups/  # VS Code
ls -la ~/.vim/backup/      # Vim

# macOS Time Machine (if enabled)
tmutil listbackups
```

**4. IDE recovery:**

```bash
# VS Code local history
ls ~/.vscode/History/

# JetBrains IDEs (WebStorm, IntelliJ)
ls ~/Library/Caches/JetBrains/*/LocalHistory/
```

### 9.4 Dependency Hell

**Scenario:** `npm install` fails, dependency conflicts, or version mismatches

**Diagnosis:**

```bash
# Check for lock file conflicts
ls -la | grep lock
# Should see: package-lock.json OR pnpm-lock.yaml (not both)

# Check Node version
node --version
# Should match .nvmrc or package.json engines field

# Check for peer dependency issues
npm ls  # or: pnpm ls
```

**Nuclear option (clean slate):**

```bash
# 1. Remove all installed packages
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules

# 2. Remove lock files
rm package-lock.json
rm pnpm-lock.yaml

# 3. Clear npm cache
npm cache clean --force
# or: pnpm store prune

# 4. Reinstall from scratch
pnpm install  # or: npm install

# 5. Rebuild packages
turbo build
```

**If still failing:**

```bash
# Check for platform-specific issues
npm config get platform
npm config get arch

# Try legacy peer deps (npm only)
npm install --legacy-peer-deps

# Or use exact versions (pnpm)
pnpm install --frozen-lockfile
```

### 9.5 Rollback Checklist

**Before ANY destructive operation (reset, force push, delete):**

**Pre-flight checks:**

```bash
# 1. Verify you're in correct branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

# If not what expected, STOP
if [ "$CURRENT_BRANCH" != "feature/my-branch" ]; then
  echo "❌ Wrong branch! Expected: feature/my-branch"
  exit 1
fi

# 2. Confirm no one else is working on this branch
git log --all --oneline --graph --decorate | grep "$CURRENT_BRANCH"

# 3. Create safety tag BEFORE destructive action
git tag -a "backup-$(date +%Y%m%d-%H%M%S)" -m "Safety backup before reset"

# 4. Verify tag was created
git tag -l "backup-*"

# NOW proceed with destructive operation
git reset --hard HEAD~1
```

**Get user approval for shared branches:**

```bash
# If branch is shared (main, develop)
if [[ "$CURRENT_BRANCH" == "main" || "$CURRENT_BRANCH" == "develop" ]]; then
  echo "⚠️  WARNING: This is a shared branch"
  echo "About to perform: git reset --hard"
  echo "This will rewrite history and affect other developers"
  echo ""
  read -p "Are you ABSOLUTELY sure? (type 'YES' to confirm): " CONFIRM

  if [ "$CONFIRM" != "YES" ]; then
    echo "Operation cancelled"
    exit 1
  fi
fi
```

**Recovery from bad rollback:**

```bash
# If you immediately realize rollback was wrong
git reflog  # Find the commit before rollback
git reset --hard HEAD@{1}  # Undo the rollback

# Or restore from safety tag
git reset --hard backup-20260204-103000
```

---

## 10. Tooling & Environment

### 10.1 Required Tools

**Verify all tools are installed:**

```bash
# Node.js (v20 or later)
node --version
# Expected: v20.x.x or higher

# Package manager (pnpm recommended)
pnpm --version
# Expected: 8.x.x or higher

# Git
git --version
# Expected: 2.x.x or higher

# Turbo
turbo --version
# Expected: 1.x.x or higher
```

**Installation (if missing):**

```bash
# Node.js (via nvm - recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# pnpm
npm install -g pnpm

# Turbo
pnpm install -g turbo
```

### 10.2 Workspace Access

**Authorized directories:**

- Project repository paths (when explicitly granted)
- `/scratch` - Shared temporary space

**Restricted directories:**

- System directories (`/usr`, `/bin`, etc.)
- User home directories (unless explicitly granted)
- Protected system files

**When encountering permission errors:**

**1. Identify the issue:**

```bash
# Attempt operation
ls /restricted/path
# Error: Permission denied

# Check permissions
ls -la /restricted/path
# Output: drwx------ (no read access)
```

**2. Agent protocol:**

```
⚠️  ACCESS DENIED

Cannot access: /restricted/path/important-file.json

Options:
A) Copy the file toauthorized location
B) Grant read permission to this path
C) Use alternative file in authorized location

Please choose A, B, or C, or provide the file another way.
```

**3. User provides access:**

```bash
# Option A: User copies file
cp /restricted/path/important-file.json /authorized/path/

# Option B: User grants permission
chmod +r /restricted/path/important-file.json

# Then agent can proceed
cat /authorized/path/important-file.json
```

**Never:**

- Retry the same failing path >2 times without intervention
- Attempt to elevate permissions automatically
- Assume access will be granted later and proceed blindly

### 10.3 Terminal Best Practices

**Command hygiene:**

```bash
# ✅ GOOD: Always show what you're doing
echo "Installing dependencies..."
pnpm install
echo "✓ Installation complete"

# ✅ GOOD: Check command success
pnpm install
if [ $? -eq 0 ]; then
  echo "✓ Success"
else
  echo "❌ Failed"
  exit 1
fi

# ✅ GOOD: Set timeout for long-running commands
timeout 30s pnpm install || echo "Command timed out after 30 seconds"
```

**Handling hung commands:**

```bash
# If command hangs for >10 seconds with no output:

# Option 1: Use timeout wrapper
timeout 10s git push origin main

# Option 2: Run in background and monitor
git push origin main &
PID=$!
sleep 10
kill -0 $PID 2>/dev/null && echo "Still running..." || echo "Completed"

# Option 3: Agent detects hang and stops
# After 10s of no output:
echo "⚠️  Command appears hung"
echo "Last attempted: git push origin main"
echo "Stopping execution. User intervention required."
```

### 10.4 Environment Variables

**Managing secrets and config:**

**DO NOT:**

```bash
# ❌ Never hardcode secrets in code
const STRIPE_KEY = "sk_live_abc123..."

# ❌ Never commit .env files to git
git add .env
git commit -m "Add env file"  # NEVER DO THIS
```

**DO:**

```bash
# ✅ Use environment variables
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY

# ✅ Use .env.example as template
# .env.example (committed to git)
STRIPE_SECRET_KEY=sk_test_...
DATABASE_URL=postgresql://...

# .env.local (NOT committed, in .gitignore)
STRIPE_SECRET_KEY=sk_live_actual_key_here
DATABASE_URL=postgresql://real_connection_string
```

**Verify .env is in .gitignore:**

```bash
# Check .gitignore
grep -E "^\.env" .gitignore

# If missing, add it
echo ".env.local" >> .gitignore
echo ".env*.local" >> .gitignore

# Verify .env won't be committed
git status --ignored | grep .env
```

**Agent protocol for secrets:**

```
I need a Stripe API key to proceed.

⚠️  NEVER share API keys in this chat (they could be logged)

Instead:
1. Create file: apps/payski/.env.local
2. Add line: STRIPE_SECRET_KEY=your_key_here
3. Verify .env.local is in .gitignore
4. Type "ready" when done

I will then proceed with the implementation.
```

---

## Appendix: Quick Reference

### A. Pre-Operation Checklists

**Before git init:**

- [ ] Directory created
- [ ] Navigated to correct path (`pwd` confirms)
- [ ] Ready to configure identity immediately after

**Before git commit:**

- [ ] Changes staged (`git add .`)
- [ ] Identity configured (`git config user.name` returns value)
- [ ] Commit message follows conventional format
- [ ] No secrets in staged files

**Before git push:**

- [ ] Committed locally
- [ ] Remote exists (`git remote -v` shows URL)
- [ ] On correct branch (`git branch --show-current`)
- [ ] No merge conflicts (`git status` clean)

**Before file creation:**

- [ ] Directory exists (`ls path/to/directory`)
- [ ] No naming conflicts (`ls path/to/file.tsx` returns "not found")
- [ ] Required imports available

**Before package installation:**

- [ ] In correct directory (`package.json` exists)
- [ ] Package manager available (`pnpm --version`)
- [ ] Internet connection (ping registry)

### B. Common Commands

**Monorepo operations:**

```bash
# Run all apps in dev mode
turbo dev

# Build everything
turbo build

# Build specific app
turbo build --filter=payski

# Run command in specific app
turbo dev --filter=@antigravity/ui
```

**Git operations:**

```bash
# Status check
git status

# Stage all changes
git add .

# Commit with message
git commit -m "feat(app): description"

# Push to remote
git push origin branch-name

# Create and switch to new branch
git checkout -b feature/new-feature

# Update from remote
git pull origin main
```

**File operations:**

```bash
# Verify file exists
test -f path/to/file && echo "exists" || echo "missing"

# Create directory if missing
mkdir -p path/to/directory

# Copy file
cp source.txt destination.txt

# Move file
mv old-path.txt new-path.txt
```

### C. Error Codes & Solutions

| Error                     | Cause                 | Solution                             |
| ------------------------- | --------------------- | ------------------------------------ |
| `not a git repository`    | Wrong directory       | `cd` to repo or use `git -C`         |
| `Author identity unknown` | No git config         | Run identity config commands         |
| `authentication required` | No credentials        | Generate "safe paste" for user       |
| `EADDRINUSE`              | Port in use           | Kill process or use different port   |
| `Module not found`        | Package not installed | Run `pnpm install`                   |
| `Permission denied`       | Access restricted     | Request file copy to authorized path |
| `merge conflict`          | Conflicting changes   | Manual resolution required           |

### D. Conventional Commit Types

| Type       | Usage            | Example                                      |
| ---------- | ---------------- | -------------------------------------------- |
| `feat`     | New feature      | `feat(payski): add payment form`             |
| `fix`      | Bug fix          | `fix(ui): resolve button hover state`        |
| `docs`     | Documentation    | `docs(readme): update installation steps`    |
| `style`    | Code formatting  | `style(ui): format with prettier`            |
| `refactor` | Code restructure | `refactor(utils): simplify validation logic` |
| `perf`     | Performance      | `perf(payski): optimize bundle size`         |
| `test`     | Tests            | `test(ui): add button component tests`       |
| `chore`    | Maintenance      | `chore(deps): upgrade react to 19`           |

### E. File Naming Conventions

**Components:**

- PascalCase: `PaymentForm.tsx`, `UserProfile.tsx`
- Index exports: `Button/index.ts`

**Utilities:**

- camelCase: `formatCurrency.ts`, `validateEmail.ts`

**Configuration:**

- kebab-case: `tailwind.config.js`, `next.config.js`

**Assets:**

- kebab-case: `hero-banner.jpg`, `credit-card-icon.svg`

---

## Version History

- **v2.0** (2026-02-04): Complete overhaul with modern workflow, AI-agent best practices, emergency procedures
- **v1.0** (2026-01-15): Initial protocol with basic git workflow and monorepo structure

---

## Feedback & Updates

This protocol is a living document. If you encounter:

- Procedures that don't work
- Missing edge cases
- Better approaches

Document them in an ADR (Architecture Decision Record) and update this protocol.

**Questions or suggestions:**
Contact: ayomide.gunjob@gmail.com

---

## 11. Monorepo Integrity Guards (V1.2+)

To ensure seamless operation within the Antigravity monorepo, follow these strict configuration rules:

### 11.1 Mandatory Configuration Files

Every monorepo root **MUST** contain:

- `pnpm-workspace.yaml`: Defining the `packages:` (apps/_ and packages/_).
- `package.json`: **MUST** have the `packageManager` field (e.g., `"packageManager": "pnpm@9.0.0"`).
- `turbo.json`: **MUST** use the v2 schema (use `"tasks"` key instead of the deprecated `"pipeline"`).

### 11.2 Toolchain Enforcement

- **pnpm ONLY**: Do not use `npm` or `yarn` within monorepo workspaces. Mixed lockfiles (`package-lock.json`) must be deleted immediately.
- **Root Context**: Always execute `pnpm` and `turbo` commands from the monorepo root. Use CLI filters (e.g., `--filter book-ngn`) instead of `cd`-ing into app folders for build tasks.

---

## 12. Environment Hygiene & Permission Standards (V1.3+)

To avoid systematic terminal hangs, permission denied errors, and path-length issues on Windows, follow these workspace standards:

### 12.1 Dedicated Dev Root

- **DO NOT** store active projects in `Desktop`, `Documents`, or `Downloads`. These are often synced by OneDrive and have restrictive user-profile permissions.
- **DO** use a dedicated root directory close to the drive letter, for example: `C:\antigravity\` or `C:\dev\`.
- **Naming Rule**: Use only alphanumeric characters and hyphens. **NO SPACES** (e.g., `Antigravity-Experiments` instead of `Antigravity Experiments`).

### 12.2 Path Length & Space Safety

- Windows has a default 260-character path limit. Nested monorepos (`apps/app/node_modules/...`) exceed this quickly.
- Running projects from a short root path (e.g., `C:\a\`) is the safest mitigation.

### 12.3 Permissions Recovery (Windows)

If you encounter "Permission Denied" or "Access is Denied" in the terminal, run this command from an **Administrator Terminal** to reset the project folder:

```powershell
# Take ownership and grant full control to the current user
icacls "C:\path\to\project" /grant "${env:USERNAME}:(OI)(CI)F" /T
```

### 12.4 Node/Package Manager hygiene

- **Global Installs**: Avoid `npm install -g`. Use `pnpm add -g` or `corepack` to manage versions.
- **Lockfile Integrity**: If the terminal hangs during `pnpm install`, delete `node_modules` and `pnpm-lock.yaml` and retry.
- **Process Cleanup**: If a port is blocked, use:
  ```powershell
  Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force
  ```
