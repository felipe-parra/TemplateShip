# ⚡ ShipFree

Hi there! 👋

ShipFree is a free alternative to ShipFast, designed to simplify and optimize your shipping process. It’s built using modern web technologies like Next.js, Supabase, Stripe, LemonSqueezy, and Mailgun.

## Features

- **🎨 JSON Configuration System** - Customize everything via a single JSON file
- SEO Optimisation
- User authentication with Supabase
- Stripe and LemonSqueezy integration
- Email notifications via Mailgun
- Modern UI built with Next.js and TailwindCSS
- **🎄 Holiday MVP Generator** - Generate complete landing pages, content plans, and execution plans for seasonal digital products

## 🎄 Holiday MVP Generator

A powerful tool to generate complete marketing assets for seasonal digital products in minutes:

- **Landing Page Specs** (JSON) - Hero, pricing, FAQs, CTAs ready for Next.js
- **Content Plans** (Markdown) - Detailed deliverables with ready-to-use prompts
- **Execution Plans** (Markdown) - Weekend schedule with metrics and A/B tests

### Quick Start

```bash
# Via UI
Open http://localhost:3000/holiday-mvp

# Via CLI
node scripts/generate-holiday-mvp.mjs --brand="Your Brand" --products=plantillas,adviento
```

📚 **Full Documentation**: See [HOLIDAY_MVP_GENERATOR.md](HOLIDAY_MVP_GENERATOR.md) for detailed usage, examples, and customization.

## 🎨 JSON Configuration System

Customize your entire site through a single JSON configuration file - no code changes needed!

```json
{
  "company": {
    "name": "YourStartup",
    "domain": "https://yourstartup.com"
  },
  "branding": {
    "colors": {
      "primary": "#FFBE1A"
    }
  },
  "content": {
    "hero": {
      "title": "Your Custom Title"
    }
  }
}
```

📚 **Configuration Guide**: See [CONFIG.md](CONFIG.md) for complete documentation on customizing:
- Company info and branding
- SEO metadata for all pages
- Content (hero, features, pricing, testimonials, FAQs)
- Colors, fonts, and images
- Routes and page visibility
- Projects and products

## Docs

For full documentation, visit: [ShipFree Docs](https://shipfree.idee8.agency/docs)

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Contributing

For people who want to contribute, please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

---

Cooked for you with ❤️ by [Idee8](https://idee8.agency)
