# Site Configuration Guide

ShipFree uses a centralized JSON configuration system that allows you to customize all aspects of your application without changing code. This guide explains how to use and customize the configuration.

## Configuration File

The main configuration file is located at: `config/site-config.json`

## Configuration Structure

### Company Information

Configure your company details:

```json
{
  "company": {
    "name": "ShipFree",
    "domain": "https://shipfree.idee8.agency",
    "description": "Your company description",
    "tagline": "Your tagline",
    "email": "hi@idee8.agency",
    "twitter": "idee8agency",
    "github": "idee8/shipfree",
    "discord": "",
    "linkedin": "",
    "mailgun": {
      "subdomain": "mg",
      "fromNoReply": "ShipFree <noreply@ag.shipfree.com>",
      "fromAdmin": "Idee8 at ShipFree <idee8@ag.shipfree.com>",
      "supportEmail": "idee8@mg.shipfree.com",
      "forwardRepliesTo": "shipfree@gmail.com"
    }
  }
}
```

### SEO Configuration

Configure SEO metadata for your entire site and individual pages:

```json
{
  "seo": {
    "global": {
      "title": "ShipFree - Open Source SaaS Boilerplate",
      "description": "Your description",
      "keywords": ["saas", "boilerplate", "open source"],
      "ogImage": "/og-image.png",
      "ogType": "website",
      "twitterCard": "summary_large_image",
      "twitterHandle": "idee8agency"
    },
    "pages": {
      "home": {
        "title": "ShipFree - Ship your startup in days",
        "description": "Page-specific description"
      }
    }
  }
}
```

### Branding

Customize colors, fonts, and logo:

```json
{
  "branding": {
    "colors": {
      "primary": "#FFBE1A",
      "secondary": "#212121",
      "accent": "#CFCFCF",
      "background": "#0F0F0F",
      "foreground": "#FFFFFF"
    },
    "fonts": {
      "heading": "Bricolage Grotesque",
      "body": "Bricolage Grotesque"
    },
    "logo": {
      "light": "/logo-light.svg",
      "dark": "/logo-dark.svg",
      "alt": "ShipFree Logo",
      "width": 150,
      "height": 40
    }
  }
}
```

### Content

Configure all content for your site:

#### Hero Section

```json
{
  "content": {
    "hero": {
      "title": "Ship your startup in days, not weeks",
      "subtitle": "⚡ ShipFree",
      "description": "Your hero description",
      "cta": {
        "text": "Get ShipFree",
        "href": "https://github.com/idee8/shipfree",
        "icon": "Zap"
      },
      "socialProof": {
        "avatars": ["https://example.com/avatar1.jpg"],
        "text": "Join 1,000+ developers"
      }
    }
  }
}
```

#### Features

```json
{
  "content": {
    "features": [
      {
        "id": "nextjs",
        "title": "NextJS Boilerplate",
        "description": "Built with Next.js 15",
        "icon": "Zap",
        "enabled": true
      }
    ]
  }
}
```

#### Pricing

```json
{
  "content": {
    "pricing": {
      "title": "Save hours of repetitive code",
      "subtitle": "100% Free Forever!",
      "plans": [
        {
          "id": "free",
          "name": "Community Edition",
          "description": "Everything you need",
          "price": 0,
          "currency": "USD",
          "features": ["Feature 1", "Feature 2"],
          "cta": {
            "text": "Get Started",
            "href": "/signup"
          },
          "enabled": true
        }
      ]
    }
  }
}
```

#### Testimonials

```json
{
  "content": {
    "testimonials": [
      {
        "id": "jack",
        "name": "Jack F.",
        "role": "Maker",
        "text": "Great product!",
        "avatar": "https://example.com/avatar.jpg",
        "rating": 5,
        "enabled": true
      }
    ]
  }
}
```

#### FAQ

```json
{
  "content": {
    "faq": [
      {
        "id": "free",
        "question": "Is this really free?",
        "answer": "Yes! ShipFree is open-source",
        "enabled": true
      }
    ]
  }
}
```

### Pages Configuration

Enable/disable pages and configure sections:

```json
{
  "pages": {
    "home": {
      "enabled": true,
      "sections": [
        {
          "id": "navbar",
          "component": "Navbar",
          "enabled": true,
          "order": 0
        },
        {
          "id": "hero",
          "component": "HeroSection",
          "enabled": true,
          "order": 1
        }
      ]
    },
    "pricing": {
      "enabled": true
    },
    "blog": {
      "enabled": false
    }
  }
}
```

### Routes Configuration

Customize route paths:

```json
{
  "routes": {
    "home": "/",
    "pricing": "/#pricing",
    "dashboard": "/dashboard",
    "login": "/login",
    "docs": "/docs"
  }
}
```

### Features Configuration

Enable/disable application features:

```json
{
  "features": {
    "authentication": {
      "enabled": true,
      "providers": {
        "google": true,
        "github": false,
        "magicLink": true
      }
    },
    "payments": {
      "enabled": true,
      "providers": {
        "stripe": true,
        "lemonSqueezy": true
      }
    },
    "email": {
      "enabled": true,
      "provider": "mailgun"
    }
  }
}
```

### Projects & Products

Configure your portfolio projects and products:

```json
{
  "projects": [
    {
      "id": "shipfree",
      "name": "ShipFree",
      "description": "Open source SaaS boilerplate",
      "image": "/projects/shipfree.png",
      "url": "https://shipfree.idee8.agency",
      "github": "https://github.com/idee8/shipfree",
      "tags": ["saas", "boilerplate"],
      "featured": true,
      "enabled": true
    }
  ],
  "products": [
    {
      "id": "shipfree-pro",
      "name": "ShipFree Pro",
      "description": "Advanced features",
      "price": 0,
      "currency": "USD",
      "features": ["Feature 1", "Feature 2"],
      "enabled": false
    }
  ]
}
```

## Using the Configuration in Code

Import the configuration utilities in your components:

```typescript
import {
  getSiteConfig,
  getCompanyConfig,
  getSEOConfig,
  getHeroConfig,
  getEnabledFeatures,
  getEnabledTestimonials,
  getEnabledFAQs,
  isPageEnabled,
  getRoute
} from '@/lib/site-config';

// Get company info
const company = getCompanyConfig();
console.log(company.name); // "ShipFree"

// Get SEO for a specific page
const homeSEO = getSEOConfig('home');

// Get enabled features only
const features = getEnabledFeatures();

// Check if a page is enabled
if (isPageEnabled('blog')) {
  // Show blog
}

// Get route path
const dashboardPath = getRoute('dashboard'); // "/dashboard"
```

## Best Practices

1. **Always use the config utilities** instead of importing the JSON directly
2. **Use the `enabled` flag** to turn features on/off without deleting configuration
3. **Keep IDs unique** for items in arrays (features, testimonials, FAQs, etc.)
4. **Test after changes** - invalid JSON will break your site
5. **Use environment variables** for sensitive data (API keys, secrets)
6. **Version control** your config changes carefully

## TypeScript Support

All configuration has full TypeScript support. Import types from:

```typescript
import type { SiteConfig, CompanyConfig, SEOConfig } from '@/types/site-config';
```

## Validation

The configuration is type-checked at build time. Invalid configurations will cause TypeScript errors.

## Migration Guide

If you're migrating from hardcoded values:

1. Move all hardcoded content to `config/site-config.json`
2. Update components to use config utilities
3. Test thoroughly to ensure all content displays correctly
4. Remove old hardcoded values

## Examples

See the default `config/site-config.json` for a complete example configuration.

## Support

For questions or issues with configuration:
- Check the GitHub repository: https://github.com/idee8/shipfree
- Join our Discord community
- Open an issue on GitHub
