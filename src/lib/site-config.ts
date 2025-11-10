import { SiteConfig } from '@/types/site-config';
import siteConfigData from '../../config/site-config.json';

/**
 * Get the complete site configuration
 * @returns The site configuration object
 */
export function getSiteConfig(): SiteConfig {
  return siteConfigData as SiteConfig;
}

/**
 * Get company configuration
 */
export function getCompanyConfig() {
  return getSiteConfig().company;
}

/**
 * Get SEO configuration for a specific page or global
 * @param page - Optional page identifier (e.g., 'home', 'pricing')
 */
export function getSEOConfig(page?: string) {
  const config = getSiteConfig().seo;
  if (page && config.pages[page]) {
    // Merge global and page-specific SEO
    return {
      ...config.global,
      ...config.pages[page],
    };
  }
  return config.global;
}

/**
 * Get branding configuration
 */
export function getBrandingConfig() {
  return getSiteConfig().branding;
}

/**
 * Get content configuration
 */
export function getContentConfig() {
  return getSiteConfig().content;
}

/**
 * Get hero configuration
 */
export function getHeroConfig() {
  return getSiteConfig().content.hero;
}

/**
 * Get enabled features
 */
export function getEnabledFeatures() {
  return getSiteConfig().content.features.filter(f => f.enabled);
}

/**
 * Get pricing configuration
 */
export function getPricingConfig() {
  return getSiteConfig().content.pricing;
}

/**
 * Get enabled pricing plans
 */
export function getEnabledPricingPlans() {
  return getSiteConfig().content.pricing.plans.filter(p => p.enabled);
}

/**
 * Get enabled testimonials
 */
export function getEnabledTestimonials() {
  return getSiteConfig().content.testimonials.filter(t => t.enabled);
}

/**
 * Get enabled FAQs
 */
export function getEnabledFAQs() {
  return getSiteConfig().content.faq.filter(f => f.enabled);
}

/**
 * Get CTA configuration
 */
export function getCTAConfig() {
  return getSiteConfig().content.cta;
}

/**
 * Get footer configuration
 */
export function getFooterConfig() {
  return getSiteConfig().content.footer;
}

/**
 * Get page configuration
 * @param page - Page identifier
 */
export function getPageConfig(page: string) {
  return getSiteConfig().pages[page];
}

/**
 * Check if a page is enabled
 * @param page - Page identifier
 */
export function isPageEnabled(page: string): boolean {
  const pageConfig = getSiteConfig().pages[page];
  return pageConfig?.enabled ?? false;
}

/**
 * Get enabled sections for a page
 * @param page - Page identifier
 */
export function getEnabledSections(page: string) {
  const pageConfig = getSiteConfig().pages[page];
  if (!pageConfig?.sections) return [];
  
  return pageConfig.sections
    .filter(s => s.enabled)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/**
 * Get route configuration
 */
export function getRoutes() {
  return getSiteConfig().routes;
}

/**
 * Get route path for a specific page
 * @param page - Page identifier
 */
export function getRoute(page: string): string {
  return getSiteConfig().routes[page] ?? '/';
}

/**
 * Get features configuration
 */
export function getFeaturesConfig() {
  return getSiteConfig().features;
}

/**
 * Check if a feature is enabled
 * @param feature - Feature identifier
 */
export function isFeatureEnabled(feature: string): boolean {
  const features = getSiteConfig().features;
  return (features as any)[feature]?.enabled ?? false;
}

/**
 * Get enabled projects
 */
export function getEnabledProjects() {
  return getSiteConfig().projects.filter(p => p.enabled);
}

/**
 * Get featured projects
 */
export function getFeaturedProjects() {
  return getSiteConfig().projects.filter(p => p.enabled && p.featured);
}

/**
 * Get enabled products
 */
export function getEnabledProducts() {
  return getSiteConfig().products.filter(p => p.enabled);
}

/**
 * Get featured products
 */
export function getFeaturedProducts() {
  return getSiteConfig().products.filter(p => p.enabled && p.featured);
}

/**
 * Get mailgun configuration (backward compatibility)
 */
export function getMailgunConfig() {
  return getSiteConfig().company.mailgun;
}
