// Comprehensive site configuration types for TemplateShip

export interface SiteConfig {
  company: CompanyConfig;
  seo: SEOConfig;
  branding: BrandingConfig;
  content: ContentConfig;
  pages: PagesConfig;
  routes: RoutesConfig;
  features: FeaturesConfig;
  projects: ProjectConfig[];
  products: ProductConfig[];
}

export interface CompanyConfig {
  name: string;
  domain: string;
  description: string;
  tagline?: string;
  email: string;
  twitter?: string;
  github?: string;
  discord?: string;
  linkedin?: string;
  mailgun?: MailgunConfig;
}

export interface MailgunConfig {
  subdomain: string;
  fromNoReply: string;
  fromAdmin: string;
  supportEmail?: string;
  forwardRepliesTo?: string;
}

export interface SEOConfig {
  global: SEOMetadata;
  pages: {
    home?: SEOMetadata;
    pricing?: SEOMetadata;
    dashboard?: SEOMetadata;
    docs?: SEOMetadata;
    [key: string]: SEOMetadata | undefined;
  };
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterHandle?: string;
  canonicalUrl?: string;
}

export interface BrandingConfig {
  colors: ColorConfig;
  fonts: FontConfig;
  logo: LogoConfig;
}

export interface ColorConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  card: string;
  [key: string]: string;
}

export interface FontConfig {
  heading: string;
  body: string;
  mono?: string;
}

export interface LogoConfig {
  light: string;
  dark?: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ContentConfig {
  hero: HeroConfig;
  features: FeatureItem[];
  pricing: PricingConfig;
  testimonials: TestimonialItem[];
  faq: FAQItem[];
  cta: CTAConfig;
  footer: FooterConfig;
}

export interface HeroConfig {
  title: string;
  subtitle: string;
  description: string;
  cta: {
    text: string;
    href: string;
    icon?: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  images?: {
    hero?: string;
    background?: string;
  };
  stats?: {
    label: string;
    value: string;
  }[];
  socialProof?: {
    avatars: string[];
    text: string;
  };
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  enabled: boolean;
}

export interface PricingConfig {
  title: string;
  subtitle: string;
  plans: PricingPlan[];
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval?: string;
  features: string[];
  cta: {
    text: string;
    href: string;
  };
  popular?: boolean;
  enabled: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar?: string;
  rating?: number;
  enabled: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  enabled: boolean;
}

export interface CTAConfig {
  title: string;
  description: string;
  cta: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
}

export interface FooterConfig {
  tagline: string;
  copyright: string;
  links: {
    title: string;
    items: {
      label: string;
      href: string;
    }[];
  }[];
  social?: {
    twitter?: string;
    github?: string;
    discord?: string;
    linkedin?: string;
  };
}

export interface PagesConfig {
  home: PageConfig;
  pricing: PageConfig;
  dashboard: PageConfig;
  docs: PageConfig;
  blog: PageConfig;
  privacyPolicy: PageConfig;
  termsOfService: PageConfig;
  [key: string]: PageConfig;
}

export interface PageConfig {
  enabled: boolean;
  title?: string;
  description?: string;
  sections?: SectionConfig[];
}

export interface SectionConfig {
  id: string;
  component: string;
  enabled: boolean;
  order?: number;
  props?: Record<string, unknown>;
}

export interface RoutesConfig {
  home: string;
  pricing: string;
  dashboard: string;
  login: string;
  register: string;
  docs: string;
  blog: string;
  privacyPolicy: string;
  termsOfService: string;
  [key: string]: string;
}

export interface FeaturesConfig {
  authentication: {
    enabled: boolean;
    providers: {
      google: boolean;
      github: boolean;
      magicLink: boolean;
    };
  };
  payments: {
    enabled: boolean;
    providers: {
      stripe: boolean;
      lemonSqueezy: boolean;
    };
  };
  email: {
    enabled: boolean;
    provider: 'mailgun' | 'sendgrid' | 'resend';
  };
  analytics: {
    enabled: boolean;
    provider?: string;
  };
  blog: {
    enabled: boolean;
  };
  docs: {
    enabled: boolean;
  };
}

export interface ProjectConfig {
  id: string;
  name: string;
  description: string;
  image?: string;
  url?: string;
  github?: string;
  tags?: string[];
  featured?: boolean;
  enabled: boolean;
}

export interface ProductConfig {
  id: string;
  name: string;
  description: string;
  price?: number;
  currency?: string;
  image?: string;
  features?: string[];
  cta?: {
    text: string;
    href: string;
  };
  stripeProductId?: string;
  lemonSqueezyProductId?: string;
  featured?: boolean;
  enabled: boolean;
}
