# Governance

**Version**: 1.0.0  
**Last Updated**: February 6, 2026

The Antigravity Design System is a **living document**—it evolves as our products and team grow. This document defines how we maintain quality and consistency.

---

## Ownership

### Core Team

**Design System Lead**: You (luffytheninja)  
**Supporting Team**: AI agents (Antigravity)

**Responsibilities**:
- Review and approve component proposals
- Maintain design token library
- Ensure accessibility compliance
- Publish versioned releases

### Contributors

Anyone in the Antigravity ecosystem can propose changes via:
1. GitHub issues (for bugs or feature requests)
2. Pull requests (for code contributions)
3. Discussions (for strategic questions)

---

## Versioning

We follow **Semantic Versioning** (SemVer) for all packages:

```
MAJOR.MINOR.PATCH

Example: 2.5.3
  │   │   └─ Patch: Bug fixes (backward compatible)
  │   └───── Minor: New features (backward compatible)  
  └───────── Major: Breaking changes
```

### What Triggers Each Version Type?

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Bug fix (no API change) | **Patch** (2.5.3 → 2.5.4) | Fix Button hover state |
| New component | **Minor** (2.5.3 → 2.6.0) | Add Toast component |
| New token | **Minor** (2.5.3 → 2.6.0) | Add `--color-violet-500` |
| Rename prop | **Major** (2.5.3 → 3.0.0) | `color` → `variant` |
| Remove component | **Major** (2.5.3 → 3.0.0) | Delete deprecated `OldButton` |
| Change token value | **Minor** (2.5.3 → 2.6.0) | Adjust `--spacing-4` from 16px → 18px |

---

## Proposal Process

### 1. Create a Proposal

**For New Components**:
```markdown
## Component Name
Avatar

## Problem It Solves
Users need to see profile pictures in consistent sizes across apps.

## Variants
- Small (32px), Medium (48px), Large (64px)
- With badge indicator (online/offline)
- Fallback to initials if no image

## Accessibility Notes
- Alt text required for images
- Fallback initials use sufficient contrast

## Example Usage
<Avatar 
  src="/user.jpg" 
  alt="John Doe" 
  size="md" 
  status="online" 
/>
```

**For Token Changes**:
```markdown
## Token Change
Add --color-success-dark

## Rationale
Current success colors fail WCAG AA on dark backgrounds.

## Proposed Value
#047857 (dark green, passes contrast)

## Impact
- Minor version bump
- Update Button success variant
```

### 2. Review & Feedback

- Post proposal as GitHub Discussion
- Core team reviews within **3 business days**
- Feedback provided as inline comments
- Approval requires: Design Lead + 1 technical reviewer

### 3. Implementation

- Contributor creates pull request
- PR must include:
  - Component code
  - TypeScript types
  - Tests (unit + visual regression)
  - Storybook documentation
  - Accessibility audit
- Automated checks run (linting, tests, accessibility)

### 4. Merge & Release

- Once approved, PR merged to `main`
- Version bump according to SemVer
- Changelog auto-generated
- Published to npm (`@antigravity/ui`, `@antigravity/tokens`)

---

## Deprecation Policy

When removing or significantly changing a component:

### Phase 1: Mark as Deprecated (3 months)
```tsx
/**
 * @deprecated Use NewButton instead. Will be removed in v4.0.0.
 */
export const OldButton = () => {
  console.warn('OldButton is deprecated. Use NewButton instead.');
  // ... existing code
};
```

### Phase 2: Migration Guide (3 months)
Publish migration documentation:
```markdown
## Migrating from OldButton to NewButton

### Before
<OldButton color="primary">Click</OldButton>

### After  
<NewButton variant="primary">Click</NewButton>

### Breaking Changes
- `color` prop renamed to `variant`
- Removed `rounded` prop (use `variant="pill"` instead)
```

### Phase 3: Removal (at next major version)
- Delete deprecated component
- Bump major version (e.g., 3.x.x → 4.0.0)
- Update changelog

**Total Deprecation Timeline**: 6 months minimum

---

## Component Checklist

Before a component is production-ready, it must have:

### Code Quality
- [ ] TypeScript definitions
- [ ] Unit tests (>80% coverage)
- [ ] Visual regression tests
- [ ] Accessible keyboard navigation
- [ ] WCAG AA contrast compliance
- [ ] Screen reader tested

### Documentation
- [ ] Storybook story with all variants
- [ ] Usage examples (React)
- [ ] Props table (auto-generated from TypeScript)
- [ ] Do's and Don'ts section
- [ ] Accessibility notes

### Design Tokens
- [ ] Uses only design system tokens (no hard-coded values)
- [ ] Supports dark mode
- [ ] Respects `prefers-reduced-motion`
- [ ] Responsive (mobile-first)

---

## Quality Gates

### Automated (CI/CD)

Every pull request must pass:

1. **Linting**: ESLint + Prettier
2. **Type Checking**: TypeScript strict mode
3. **Unit Tests**: Jest (>80% coverage)
4. **Visual Regression**: Chromatic (no unintended changes)
5. **Accessibility**: axe automated checks
6. **Bundle Size**: No increase >5% without justification

### Manual Review

Core team checks:

1. **Design Consistency**: Matches existing patterns
2. **Code Quality**: Readable, maintainable
3. **Documentation**: Clear and complete
4. **Accessibility**: Manually tested with screen reader
5. **Performance**: No janky animations or slow renders

---

## Emergency Hot Fixes

For critical bugs (security, broken builds):

1. **Create fix** on hotfix branch (`hotfix/button-crash`)
2. **Fast-track review** (same day if possible)
3. **Bump patch version** (e.g., 2.5.3 → 2.5.4)
4. **Publish immediately**
5. **Backport to stable branches** if needed

---

## Communication

### Changelog

Auto-generated from commit messages using [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(Button): add loading state
fix(Input): prevent double submission
BREAKING CHANGE: rename Input `type` prop to `variant`
```

### Release Notes

For major/minor releases, manually write:
- Summary of changes
- Migration guide (if breaking)
- Contributors list
- Links to documentation

---

## Metrics & Success

We track design system health through:

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Adoption** | >80% of apps use design system | Monthly audit |
| **Consistency** | <5 custom components per app | Code analysis |
| **Accessibility** | 100% WCAG AA compliance | Automated + manual tests |
| **Performance** | <50kb bundle size (gzipped) | Bundlephobia |
| **Satisfaction** | >4.0/5 developer happiness | Quarterly survey |

---

## Related Documentation

- [Contributing Guide](../CONTRIBUTING.md) - How to contribute code
- [Design Principles](./DESIGN_PRINCIPLES.md) - Our philosophy
- [Content Guidelines](./CONTENT_GUIDELINES.md) - How we write
