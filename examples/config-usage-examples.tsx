/**
 * Example: Updating a Component to Use the Configuration System
 * 
 * This file demonstrates how to migrate existing components to use the
 * centralized configuration system instead of hardcoded values.
 */

// BEFORE: Component with hardcoded values
// =======================================
/*
export default function OldHeroSection() {
  return (
    <div>
      <h1>Ship your startup in days, not weeks</h1>
      <p>Tired of wasting time on setup instead of building?</p>
      <a href="https://github.com/idee8/shipfree">
        Get ShipFree
      </a>
    </div>
  );
}
*/

// AFTER: Component using centralized configuration
// =================================================
import { getHeroConfig } from '@/lib/site-config';
import Link from 'next/link';

export default function NewHeroSection() {
  // Load configuration from the centralized config file
  const hero = getHeroConfig();
  
  return (
    <div>
      <h1>{hero.title}</h1>
      <p>{hero.description}</p>
      <Link href={hero.cta.href}>
        {hero.cta.text}
      </Link>
      
      {/* Optional: Social proof section */}
      {hero.socialProof && (
        <div>
          <div>
            {hero.socialProof.avatars.map((avatar, idx) => (
              <img key={idx} src={avatar} alt={`User ${idx + 1}`} />
            ))}
          </div>
          <p>{hero.socialProof.text}</p>
        </div>
      )}
    </div>
  );
}

// MORE EXAMPLES
// =============

// Example 1: Using enabled features only
// ---------------------------------------
import { getEnabledFeatures } from '@/lib/site-config';

export function FeaturesSection() {
  const features = getEnabledFeatures();
  
  return (
    <div>
      {features.map((feature) => (
        <div key={feature.id}>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

// Example 2: Conditional page rendering
// --------------------------------------
import { isPageEnabled } from '@/lib/site-config';

export function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      {isPageEnabled('pricing') && <Link href="/pricing">Pricing</Link>}
      {isPageEnabled('blog') && <Link href="/blog">Blog</Link>}
      {isPageEnabled('docs') && <Link href="/docs">Docs</Link>}
    </nav>
  );
}

// Example 3: Using SEO configuration
// -----------------------------------
import { getSEOConfig } from '@/lib/site-config';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const seo = getSEOConfig('home');
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : [],
      type: seo.ogType as any,
    },
    twitter: {
      card: seo.twitterCard as any,
      site: seo.twitterHandle ? `@${seo.twitterHandle}` : undefined,
    },
  };
}

// Example 4: Using branding colors
// ---------------------------------
import { getBrandingConfig } from '@/lib/site-config';

export function ThemedButton() {
  const branding = getBrandingConfig();
  
  return (
    <button
      style={{
        backgroundColor: branding.colors.primary,
        color: branding.colors.foreground,
      }}
    >
      Click me
    </button>
  );
}

// Example 5: Filtering enabled items
// -----------------------------------
import { getEnabledTestimonials, getEnabledFAQs } from '@/lib/site-config';

export function TestimonialsSection() {
  const testimonials = getEnabledTestimonials();
  
  return (
    <div>
      {testimonials.map((testimonial) => (
        <div key={testimonial.id}>
          <p>{testimonial.text}</p>
          <span>{testimonial.name} - {testimonial.role}</span>
        </div>
      ))}
    </div>
  );
}

export function FAQSection() {
  const faqs = getEnabledFAQs();
  
  return (
    <div>
      {faqs.map((faq) => (
        <details key={faq.id}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

// Example 6: Using company info
// ------------------------------
import { getCompanyConfig } from '@/lib/site-config';

export function Footer() {
  const company = getCompanyConfig();
  
  return (
    <footer>
      <p>&copy; 2025 {company.name}</p>
      {company.twitter && (
        <a href={`https://x.com/${company.twitter}`}>
          Twitter
        </a>
      )}
      {company.github && (
        <a href={`https://github.com/${company.github}`}>
          GitHub
        </a>
      )}
    </footer>
  );
}

// KEY BENEFITS OF THIS APPROACH
// ==============================
// 1. ✅ Single source of truth - all content in one JSON file
// 2. ✅ Easy to customize - no code changes needed
// 3. ✅ Type-safe - full TypeScript support
// 4. ✅ Filterable - easily show/hide items with enabled flags
// 5. ✅ Testable - components are decoupled from data
// 6. ✅ Maintainable - content changes don't touch component code
// 7. ✅ Scalable - add new sections without modifying components
