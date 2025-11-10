/**
 * Holiday MVP Generator - Type Definitions
 * Sistema completo para generar landing pages, planes de contenido y ejecución
 * para productos digitales de temporada.
 */

export type Currency = "MXN" | "USD" | "EUR";
export type Locale = "es-MX" | "es-ES" | "en-US";
export type ProductId = "adviento" | "recetario" | "plantillas" | "guia_ventas" | "kit_imprimible" | "taller_2026";

export interface PriceMap {
  MXN?: number;
  USD?: number;
  EUR?: number;
}

export interface ProductDefinition {
  id: ProductId;
  title: string;
  deliverables: string[];
  price_suggested: PriceMap;
  bundleable: boolean;
}

export interface GeneratorInput {
  brand_name: string;
  target_audience: string;
  tone_voice: string;
  primary_goal: string;
  currency: Currency;
  locale: Locale;
  sales_stack: string;
  email_stack: string;
  channels: string[];
  products_to_include: ProductId[];
  brand_constraints?: string;
  legal_notes?: string;
}

export interface CTA {
  label: string;
  href: string;
  note?: string;
}

export interface ValueProp {
  icon: string;
  title: string;
  desc: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  desc: string;
}

export interface Product {
  id: ProductId;
  title: string;
  bullets: string[];
  price: {
    currency: Currency;
    value: number;
    alt?: Partial<PriceMap>;
  };
  cta_buy: CTA;
  cta_try?: CTA;
  tags: string[];
}

export interface SKU {
  id: string;
  title: string;
  price: PriceMap;
  deliverables?: string[];
  includes?: ProductId[];
  cta: string;
}

export interface PricingTable {
  skus: SKU[];
  notes: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface Analytics {
  vercel: boolean;
  facebook_pixel: boolean;
  events: string[];
}

export interface Legal {
  privacy_url: string;
  terms_url: string;
}

export interface LandingSpec {
  brand: {
    name: string;
    tone: string;
    locale: Locale;
  };
  hero: {
    headline: string;
    subheadline: string;
    primary_cta: CTA;
    secondary_cta?: CTA;
  };
  value_props: ValueProp[];
  how_it_works: HowItWorksStep[];
  products: Product[];
  pricing_table: PricingTable;
  faq: FAQ[];
  social_proof: {
    testimonials: Testimonial[];
  };
  analytics: Analytics;
  legal: Legal;
}

export interface ContentPlanItem {
  product_id: ProductId;
  product_title: string;
  deliverables: string[];
  production_order: string[];
  generation_prompts: Record<string, string>;
  acceptance_criteria: string[];
  file_structure: string[];
  sample_examples: string[];
}

export interface ExecutionPlan {
  objective: string;
  success_metrics: {
    visits: number;
    leads: number;
    sales: number;
  };
  saturday_schedule: ScheduleBlock[];
  sunday_schedule: ScheduleBlock[];
  roles: string[];
  publication_checklist: string[];
  distribution_plan: DistributionAction[];
  experiments: ExperimentConfig;
}

export interface ScheduleBlock {
  time: string;
  duration: string;
  tasks: string[];
  owner: string;
}

export interface DistributionAction {
  channel: string;
  action: string;
  format: string;
  priority: "alta" | "media" | "baja";
}

export interface ExperimentConfig {
  thresholds: {
    go: { visits: number; leads: number; sales: number };
    maybe: { visits: number; leads: number; sales: number };
    kill: { visits: number; leads: number; sales: number };
  };
  ab_test: {
    variable: string;
    variant_a: string;
    variant_b: string;
    metric: string;
  };
}

export interface GeneratorOutput {
  landing_spec: LandingSpec;
  content_plan: ContentPlanItem[];
  execution_plan: ExecutionPlan;
  assumptions: string[];
}
