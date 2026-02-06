# Design Principles

**Version**: 1.0.0  
**Last Updated**: February 6, 2026

The Antigravity Design System is built on four core principles that guide every decision—from the smallest icon to the largest architectural choice.

---

## 1. Warm Tech

> **Blend precision with humanity**

Technology should feel approachable, not intimidating. We marry the precision of iOS's design language with the warmth of Airbnb's human-centered approach.

### In Practice
- **Typography**: Use system fonts for familiarity, but with generous spacing for readability
- **Color**: Coral accents (#FF5A5F) soften the typically cold tech palette
- **Motion**: Smooth, spring-based animations feel natural rather than mechanical
- **Language**: Technical accuracy without jargon (e.g., "Your booking is ready" not "Transaction ID: 12345")

### Example
```tsx
// ❌ Cold Tech
<Button variant="primary">Execute Transaction</Button>

// ✅ Warm Tech  
<Button variant="primary">Book Your Stay</Button>
```

---

## 2. Clarity Over Cleverness

> **Function first, delight second**

Users come to Antigravity apps to accomplish tasks, not to admire our design. Prioritize clarity and usability over aesthetic novelty.

### In Practice
- **Navigation**: Obvious paths over hidden gestures
- **Labels**: Descriptive over cute (e.g., "Save" not "Stash It!")
- **Hierarchy**: Clear visual weight guides the eye to primary actions
- **Feedback**: Immediate, unambiguous confirmation of user actions

### Example
```tsx
// ❌ Clever but Confusing
<IconButton icon="mystery-symbol" tooltip="Do the thing" />

// ✅ Clear and Functional
<Button icon={<SaveIcon />}>Save Draft</Button>
```

---

## 3. Progressive Disclosure

> **Reveal complexity gradually**

Don't overwhelm users with all options at once. Surface advanced features only when needed, keeping the primary path clear.

### In Practice
- **Forms**: Show 3-5 fields initially, expand for advanced options
- **Settings**: Organize in tiers (Basic → Advanced → Expert)
- **Errors**: Show summary first, details on demand
- **Dashboards**: Default to most-used widgets, allow customization

### Example
```tsx
// ✅ Progressive Disclosure
<FormField label="Destination" required />
<FormField label="Check-in" required />
<FormField label="Check-out" required />
<Accordion title="Advanced Filters">
  <FormField label="Price Range" />
  <FormField label="Amenities" />
</Accordion>
```

---

## 4. Local-First

> **Nigeria-first, world-aware**

Design for the Nigerian context by default, then adapt globally. This means considering connectivity, payment methods, and cultural norms.

### In Practice
- **Performance**: Optimize for 3G networks, progressive loading
- **Payments**: USSD, bank transfers, and cash as first-class options
- **Localization**: Naira (₦) by default, multi-currency support
- **Accessibility**: Works on low-end devices, respects data costs

### Example
```tsx
// ✅ Local-First Payment Options
<PaymentMethod>
  <Option icon={<USSDIcon />}>Pay via USSD</Option>
  <Option icon={<BankIcon />}>Bank Transfer</Option>
  <Option icon={<CardIcon />}>Debit Card</Option>
  <Option icon={<CashIcon />}>Pay on Arrival</Option>
</PaymentMethod>
```

---

## Applying the Principles

When faced with a design decision, ask:

1. **Warm Tech**: Does this feel human, or robotic?
2. **Clarity Over Cleverness**: Is this immediately understandable?
3. **Progressive Disclosure**: Are we showing only what's needed now?
4. **Local-First**: Does this work in Lagos on a budget Android device?

If any answer is "no," revisit the design.

---

## Related Documentation

- [Content Guidelines](./CONTENT_GUIDELINES.md) - How we write
- [Governance](./GOVERNANCE.md) - How we maintain the system
- [Architecture](../ARCHITECTURE.md) - How the system is structured
