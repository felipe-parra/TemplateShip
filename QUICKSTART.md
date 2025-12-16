# ShipFree Configuration System - Quick Start Guide

## 🎉 What is the Configuration System?

The ShipFree Configuration System allows you to customize **every aspect** of your site through a single JSON file—without touching any code!

## 🚀 Quick Start

### 1. Edit the Configuration

Open `config/site-config.json` and customize:

```json
{
  "company": {
    "name": "YourCompany",
    "domain": "https://yourcompany.com"
  },
  "branding": {
    "colors": {
      "primary": "#YOUR_COLOR"
    }
  },
  "content": {
    "hero": {
      "title": "Your Custom Title",
      "description": "Your custom description"
    }
  }
}
```

### 2. Validate Your Changes

```bash
npm run validate-config
```

### 3. Run Your Site

```bash
npm run dev
```

That's it! Your changes are live.

## 📚 What Can You Customize?

### ✅ Company Information
- Name, domain, description
- Contact email, social media links
- Mailgun email configuration

### ✅ SEO & Metadata
- Global SEO settings
- Per-page meta tags
- Open Graph images
- Twitter cards

### ✅ Branding
- Color scheme (primary, secondary, accent, etc.)
- Font families
- Logo images

### ✅ Content
- **Hero Section**: Title, description, CTA, social proof
- **Features**: List of features with enable/disable flags
- **Pricing**: Plans with features and CTAs
- **Testimonials**: Customer reviews with ratings
- **FAQ**: Questions and answers
- **CTA**: Call-to-action section
- **Footer**: Links, copyright, social media

### ✅ Pages & Routes
- Enable/disable entire pages
- Customize URL paths
- Control section ordering on pages

### ✅ Features
- Authentication providers (Google, GitHub, Magic Link)
- Payment providers (Stripe, LemonSqueezy)
- Email service configuration
- Analytics setup
- Blog and docs enable/disable

### ✅ Projects & Products
- Portfolio projects
- Product offerings
- Feature flags for visibility

## 💡 Common Customizations

### Change Site Title and Description

```json
{
  "company": {
    "name": "MyStartup",
    "description": "Building amazing products"
  },
  "content": {
    "hero": {
      "title": "Build Faster, Ship Smarter",
      "description": "Your custom hero description"
    }
  }
}
```

### Update Color Scheme

```json
{
  "branding": {
    "colors": {
      "primary": "#6366F1",
      "secondary": "#1E293B",
      "accent": "#F59E0B"
    }
  }
}
```

### Add a New Feature

```json
{
  "content": {
    "features": [
      {
        "id": "my-new-feature",
        "title": "Amazing Feature",
        "description": "This feature is awesome!",
        "icon": "Star",
        "enabled": true
      }
    ]
  }
}
```

### Hide a Page

```json
{
  "pages": {
    "blog": {
      "enabled": false
    }
  }
}
```

### Add a Pricing Plan

```json
{
  "content": {
    "pricing": {
      "plans": [
        {
          "id": "pro",
          "name": "Pro Plan",
          "price": 49,
          "currency": "USD",
          "interval": "month",
          "features": ["Feature 1", "Feature 2"],
          "cta": {
            "text": "Get Started",
            "href": "/signup"
          },
          "popular": true,
          "enabled": true
        }
      ]
    }
  }
}
```

## 🔍 Validation

Always validate your configuration after making changes:

```bash
npm run validate-config
```

This checks:
- ✅ JSON syntax is valid
- ✅ All required fields are present
- ✅ IDs are unique
- ✅ Configuration structure is correct

## 📖 Full Documentation

- **[CONFIG.md](CONFIG.md)** - Complete configuration reference
- **[MIGRATION.md](MIGRATION.md)** - Guide for updating components
- **[examples/config-usage-examples.tsx](examples/config-usage-examples.tsx)** - Code examples

## 🎨 Example Configurations

See `config/site-config.example.json` for a complete custom configuration example.

## 🛠️ Using Config in Code

Components automatically use the configuration:

```typescript
import { getHeroConfig, getEnabledFeatures } from '@/lib/site-config';

export function HeroSection() {
  const hero = getHeroConfig();
  
  return (
    <div>
      <h1>{hero.title}</h1>
      <p>{hero.description}</p>
    </div>
  );
}
```

## ⚡ Benefits

1. **No Code Changes** - Customize everything via JSON
2. **Type-Safe** - Full TypeScript support
3. **Validated** - Automatic validation prevents errors
4. **Flexible** - Enable/disable features with flags
5. **Maintainable** - Single source of truth
6. **Fast** - Quick iterations without rebuilds

## 🆘 Need Help?

- Check the [CONFIG.md](CONFIG.md) documentation
- See [examples/config-usage-examples.tsx](examples/config-usage-examples.tsx)
- Read the [MIGRATION.md](MIGRATION.md) guide
- Open an issue on GitHub

## 🎯 Key Files

- `config/site-config.json` - Main configuration file (edit this!)
- `src/types/site-config.ts` - TypeScript type definitions
- `src/lib/site-config.ts` - Utility functions
- `scripts/validate-config.js` - Validation script

## ✨ Pro Tips

1. **Always validate** after editing the config
2. **Use unique IDs** for all items (features, FAQs, etc.)
3. **Start simple** - customize one section at a time
4. **Test changes** - run `npm run dev` to see your changes
5. **Back up your config** before major changes

---

**Ready to customize your ShipFree site?** Edit `config/site-config.json` and run `npm run validate-config`! 🚀
