# Content Guidelines

**Version**: 1.0.0  
**Last Updated**: February 6, 2026

These guidelines ensure consistency in how we communicate across all Antigravity products.

---

## Voice & Tone

### Our Voice (Constant)
**Professional but approachable** — We're experts who don't take ourselves too seriously.

- **Clear**: Short sentences, simple words
- **Warm**: Use "you" and "we", avoid corporate speak
- **Confident**: State facts directly, no hedging ("may," "might")
- **Respectful**: Never condescending, assume user intelligence

### Our Tone (Variable)

Adjust tone based on context using this matrix:

| Context | Tone | Example |
|---------|------|---------|
| **Success** | Celebratory | "🎉 Booking confirmed! We'll see you on March 15." |
| **Error (user)** | Helpful, never blaming | "We need a few more details to complete your booking." |
| **Error (system)** | Apologetic, transparent | "Our servers are taking a breather. Try again in a moment." |
| **Onboarding** | Enthusiastic, guiding | "Let's get you set up! This will only take 2 minutes." |
| **Confirmation** | Reassuring | "Your payment is secure. We'll email you a receipt." |
| **Empty State** | Encouraging | "Nothing here yet. Ready to add your first project?" |

---

## Terminology

Use consistent language across all products:

### Preferred Terms

| ✅ Use This | ❌ Not This | Context |
|------------|-------------|---------|
| **Book** | Reserve, Schedule | Hotel/service bookings |
| **Dashboard** | Home, Main Page | User's control center |
| **Sign In / Sign Out** | Login / Logout | Authentication |
| **Settings** | Preferences, Options | Configuration |
| **Delete** | Remove, Erase | Permanent actions |
| **Archive** | Hide, Remove | Reversible actions |
| **Save** | Submit, Send | Form completion |
| **Cancel** | Abort, Stop | Undo action |

### Nigeria-Specific Terms

| Term | Usage | Example |
|------|-------|---------|
| **Naira (₦)** | Always symbol first | "₦25,000" not "25,000 Naira" |
| **Mobile Money** | Not "Digital Wallet" | "Pay via Mobile Money" |
| **USSD** | Explain on first use | "USSD (e.g., \*123#)" |
| **Bank Transfer** | Preferred over "Wire Transfer" | "Pay via Bank Transfer" |

---

## Writing Style

### Buttons & CTAs

**Format**: `[Verb] + [Noun]` (action-oriented)

✅ **Good Examples**:
- "Book Now"
- "Save Changes"
- "Download Receipt"
- "Contact Support"

❌ **Poor Examples**:
- "Click Here" (not descriptive)
- "OK" (vague)
- "Submit" (generic)

### Headings

- **Use sentence case**: "Get started in minutes" not "Get Started In Minutes"
- **Be specific**: "Choose your payment method" not "Next step"
- **Front-load keywords**: "Payment failed" not "Oops! Something went wrong"

### Microcopy

Keep helper text under 15 words:

```tsx
// ✅ Concise
<Input 
  label="Phone Number" 
  hint="We'll send a confirmation SMS"
/>

// ❌ Too wordy
<Input 
  label="Phone Number" 
  hint="Please provide your phone number so that we can send you a text message to confirm your booking"
/>
```

---

## Error Messages

Follow this 3-part formula:

1. **What happened** (state the problem clearly)
2. **Why it happened** (if helpful and non-technical)
3. **How to fix it** (actionable next step)

### Examples

```tsx
// ❌ Unhelpful
"Error 422: Validation failed"

// ✅ Helpful
"We couldn't process your card.
Check the card number and expiry date, then try again."
```

```tsx
// ❌ Blaming user
"You entered an invalid email address"

// ✅ Empathetic
"This email address doesn't look quite right.
Try the format: name@example.com"
```

### System Errors

Be transparent but not technical:

```tsx
// ❌ Too technical
"Database connection timeout (ERR_DB_503)"

// ✅ User-friendly
"Our servers are running slow right now.
Please wait a moment and try again."
```

---

## Accessibility

### Alt Text

- **Decorative images**: Use empty alt (`alt=""`)
- **Functional images**: Describe the action (`alt="Close dialog"`)
- **Informative images**: Describe the content (`alt="Bar chart showing revenue growth"`)

### Form Labels

- **Always visible**: Never rely on placeholder text alone
- **Clear and specific**: "Email address" not "Email"
- **Required indicators**: Use `(required)` not just `*`

---

## Formatting

### Numbers

| Type | Format | Example |
|------|--------|---------|
| **Currency (NGN)** | ₦X,XXX | ₦25,000 |
| **Currency (USD)** | $X,XXX.XX | $250.00 |
| **Phone** | +234 XXX XXX XXXX | +234 803 123 4567 |
| **Date** | DD MMM YYYY | 15 Mar 2026 |
| **Time** | 12-hour with am/pm | 2:30 pm |
| **Percentages** | XX% | 25% (no space) |

### Lists

- **Use bullets** for unordered items
- **Use numbers** for sequential steps
- **Capitalize first word** only
- **No periods** unless full sentences

---

## Examples by Component

### Toast Notifications

```tsx
// Success
"Booking confirmed!"

// Error
"Payment declined. Try a different card."

// Info
"Your session expires in 5 minutes."

// Warning
"Unsaved changes will be lost."
```

### Empty States

```tsx
// Dashboard with no data
"No bookings yet. Ready to explore?"

// Search with no results
"No matches for 'luxury villa'. Try different keywords."

// Filtered list with no results
"No results with these filters. Try adjusting your criteria."
```

---

## Related Documentation

- [Design Principles](./DESIGN_PRINCIPLES.md) - Why we design
- [Governance](./GOVERNANCE.md) - How we maintain consistency
