# Migration Guide: Converting Components to Use Configuration System

This guide walks you through updating existing ShipFree components to use the centralized JSON configuration system.

## Quick Overview

**Before**: Hardcoded values scattered throughout components
**After**: Centralized configuration in `config/site-config.json` accessed via utility functions

## Step-by-Step Migration

### Step 1: Identify Hardcoded Values

Look for these patterns in your components:
- Hardcoded text strings
- Color hex codes
- Image URLs
- External links
- Feature flags

### Step 2: Import Config Utilities

Add imports to your component:

```typescript
import {
  getHeroConfig,
  getEnabledFeatures,
  getEnabledTestimonials,
  getEnabledFAQs,
  getPricingConfig,
  getCompanyConfig,
  getBrandingConfig,
  isPageEnabled,
  getRoute
} from '@/lib/site-config';
```

### Step 3: Replace Hardcoded Values

#### Example 1: Hero Section

**Before:**
```typescript
export default function HeroSection() {
  return (
    <div>
      <h1>Ship your startup in days, not weeks</h1>
      <p>Tired of wasting time on setup instead of building?</p>
      <a href="https://github.com/idee8/shipfree">Get ShipFree</a>
    </div>
  );
}
```

**After:**
```typescript
import { getHeroConfig } from '@/lib/site-config';

export default function HeroSection() {
  const hero = getHeroConfig();
  
  return (
    <div>
      <h1>{hero.title}</h1>
      <p>{hero.description}</p>
      <a href={hero.cta.href}>{hero.cta.text}</a>
    </div>
  );
}
```

#### Example 2: Features with Enable/Disable

**Before:**
```typescript
const features = [
  { id: 1, title: "Auth", description: "..." },
  { id: 2, title: "Payments", description: "..." },
  { id: 3, title: "Email", description: "..." },
];

export default function Features() {
  return (
    <div>
      {features.map(f => <div key={f.id}>{f.title}</div>)}
    </div>
  );
}
```

**After:**
```typescript
import { getEnabledFeatures } from '@/lib/site-config';

export default function Features() {
  const features = getEnabledFeatures(); // Only returns enabled features
  
  return (
    <div>
      {features.map(f => <div key={f.id}>{f.title}</div>)}
    </div>
  );
}
```

#### Example 3: Testimonials

**Before:**
```typescript
const testimonials = [
  { name: "John", text: "Great!", avatar: "...", rating: 5 },
  { name: "Jane", text: "Awesome!", avatar: "...", rating: 5 },
];
```

**After:**
```typescript
import { getEnabledTestimonials } from '@/lib/site-config';

export default function Testimonials() {
  const testimonials = getEnabledTestimonials();
  
  return (
    <div>
      {testimonials.map(t => (
        <div key={t.id}>
          <p>{t.text}</p>
          <span>{t.name} - {t.role}</span>
          {t.rating && <span>Rating: {t.rating}/5</span>}
        </div>
      ))}
    </div>
  );
}
```

#### Example 4: FAQ Section

**Before:**
```typescript
const faqs = [
  { question: "Is it free?", answer: "Yes!" },
  { question: "How to start?", answer: "Clone the repo" },
];
```

**After:**
```typescript
import { getEnabledFAQs } from '@/lib/site-config';

export default function FAQ() {
  const faqs = getEnabledFAQs();
  
  return (
    <div>
      {faqs.map(faq => (
        <details key={faq.id}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
```

#### Example 5: Pricing Plans

**Before:**
```typescript
const plans = [
  {
    name: "Free",
    price: 0,
    features: ["Feature 1", "Feature 2"],
  },
];
```

**After:**
```typescript
import { getEnabledPricingPlans } from '@/lib/site-config';

export default function Pricing() {
  const { title, subtitle } = getPricingConfig();
  const plans = getEnabledPricingPlans();
  
  return (
    <div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      {plans.map(plan => (
        <div key={plan.id}>
          <h3>{plan.name}</h3>
          <p>${plan.price}/{plan.interval}</p>
          <ul>
            {plan.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
          <a href={plan.cta.href}>{plan.cta.text}</a>
        </div>
      ))}
    </div>
  );
}
```

#### Example 6: Navigation with Conditional Pages

**Before:**
```typescript
export function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/pricing">Pricing</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/docs">Docs</Link>
    </nav>
  );
}
```

**After:**
```typescript
import { isPageEnabled, getRoute } from '@/lib/site-config';

export function Nav() {
  return (
    <nav>
      <Link href={getRoute('home')}>Home</Link>
      {isPageEnabled('pricing') && (
        <Link href={getRoute('pricing')}>Pricing</Link>
      )}
      {isPageEnabled('blog') && (
        <Link href={getRoute('blog')}>Blog</Link>
      )}
      {isPageEnabled('docs') && (
        <Link href={getRoute('docs')}>Docs</Link>
      )}
    </nav>
  );
}
```

#### Example 7: Company Info in Footer

**Before:**
```typescript
export function Footer() {
  return (
    <footer>
      <p>© 2025 ShipFree</p>
      <a href="https://twitter.com/idee8agency">Twitter</a>
      <a href="https://github.com/idee8/shipfree">GitHub</a>
    </footer>
  );
}
```

**After:**
```typescript
import { getCompanyConfig, getFooterConfig } from '@/lib/site-config';

export function Footer() {
  const company = getCompanyConfig();
  const footer = getFooterConfig();
  
  return (
    <footer>
      <p>{footer.copyright}</p>
      {company.twitter && (
        <a href={`https://twitter.com/${company.twitter}`}>Twitter</a>
      )}
      {company.github && (
        <a href={`https://github.com/${company.github}`}>GitHub</a>
      )}
    </footer>
  );
}
```

#### Example 8: Using Branding Colors

**Before:**
```typescript
<button className="bg-[#FFBE1A] text-black">
  Click me
</button>
```

**After:**
```typescript
import { getBrandingConfig } from '@/lib/site-config';

export function Button() {
  const { colors } = getBrandingConfig();
  
  return (
    <button style={{ backgroundColor: colors.primary, color: colors.foreground }}>
      Click me
    </button>
  );
}

// Or with Tailwind (define colors in tailwind.config)
<button className="bg-primary text-foreground">
  Click me
</button>
```

## Step 4: Update Configuration File

After migrating components, update `config/site-config.json` with your content:

```json
{
  "content": {
    "hero": {
      "title": "Your Custom Title",
      "description": "Your custom description",
      "cta": {
        "text": "Get Started",
        "href": "/signup"
      }
    }
  }
}
```

## Step 5: Test Your Changes

1. Verify all content displays correctly
2. Test enabling/disabling features
3. Check that optional fields work when undefined
4. Validate TypeScript compilation: `npm run lint`

## Benefits After Migration

✅ **Single Source of Truth**: All content in one JSON file
✅ **Easy Updates**: Change content without touching code
✅ **Type Safety**: Full TypeScript support prevents errors
✅ **Feature Flags**: Enable/disable sections without code changes
✅ **Better Testing**: Components are decoupled from data
✅ **Faster Iterations**: Non-technical team members can update content

## Common Patterns

### Pattern 1: Optional Content

```typescript
{hero.secondaryCta && (
  <Link href={hero.secondaryCta.href}>
    {hero.secondaryCta.text}
  </Link>
)}
```

### Pattern 2: Filtering and Mapping

```typescript
const enabledItems = items.filter(item => item.enabled);
```

### Pattern 3: Checking Features

```typescript
import { isFeatureEnabled } from '@/lib/site-config';

if (isFeatureEnabled('authentication')) {
  // Show login button
}
```

## Troubleshooting

### Issue: TypeScript errors after migration

**Solution**: Ensure you're importing types correctly:
```typescript
import type { HeroConfig } from '@/types/site-config';
```

### Issue: Configuration not updating

**Solution**: Restart the dev server after changing JSON files:
```bash
npm run dev
```

### Issue: Missing fields in config

**Solution**: Check that all required fields are present in your JSON file. Refer to the types in `src/types/site-config.ts`.

## Next Steps

1. Migrate one component at a time
2. Test thoroughly after each migration
3. Update `config/site-config.json` with your custom content
4. Consider creating multiple config files for different environments

## Need Help?

- Check `examples/config-usage-examples.tsx` for more examples
- Read `CONFIG.md` for complete documentation
- Open an issue on GitHub if you encounter problems
