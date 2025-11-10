#!/usr/bin/env node

/**
 * Configuration System Validation Script
 * 
 * This script validates that the configuration system is set up correctly
 * and all utilities work as expected.
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating ShipFree Configuration System...\n');

let errors = 0;
let warnings = 0;
let passed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (e) {
    console.error(`❌ ${name}`);
    console.error(`   Error: ${e.message}`);
    errors++;
  }
}

function warn(name, message) {
  console.warn(`⚠️  ${name}`);
  console.warn(`   Warning: ${message}`);
  warnings++;
}

// Test 1: Config file exists
test('Config file exists', () => {
  const configPath = path.join(__dirname, '../config/site-config.json');
  if (!fs.existsSync(configPath)) {
    throw new Error('config/site-config.json not found');
  }
});

// Test 2: Config is valid JSON
let config;
test('Config is valid JSON', () => {
  const configPath = path.join(__dirname, '../config/site-config.json');
  const content = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(content);
});

// Test 3: Required top-level keys exist
test('Required top-level keys exist', () => {
  const requiredKeys = ['company', 'seo', 'branding', 'content', 'pages', 'routes', 'features', 'projects', 'products'];
  requiredKeys.forEach(key => {
    if (!config[key]) {
      throw new Error(`Missing required key: ${key}`);
    }
  });
});

// Test 4: Company configuration is valid
test('Company configuration is valid', () => {
  const { company } = config;
  if (!company.name) throw new Error('company.name is required');
  if (!company.domain) throw new Error('company.domain is required');
  if (!company.email) throw new Error('company.email is required');
});

// Test 5: SEO configuration is valid
test('SEO configuration is valid', () => {
  const { seo } = config;
  if (!seo.global) throw new Error('seo.global is required');
  if (!seo.global.title) throw new Error('seo.global.title is required');
  if (!seo.global.description) throw new Error('seo.global.description is required');
  if (!seo.pages) throw new Error('seo.pages is required');
});

// Test 6: Branding configuration is valid
test('Branding configuration is valid', () => {
  const { branding } = config;
  if (!branding.colors) throw new Error('branding.colors is required');
  if (!branding.colors.primary) throw new Error('branding.colors.primary is required');
  if (!branding.fonts) throw new Error('branding.fonts is required');
  if (!branding.logo) throw new Error('branding.logo is required');
});

// Test 7: Content configuration is valid
test('Content configuration is valid', () => {
  const { content } = config;
  if (!content.hero) throw new Error('content.hero is required');
  if (!content.features) throw new Error('content.features is required');
  if (!content.pricing) throw new Error('content.pricing is required');
  if (!content.testimonials) throw new Error('content.testimonials is required');
  if (!content.faq) throw new Error('content.faq is required');
  if (!content.cta) throw new Error('content.cta is required');
  if (!content.footer) throw new Error('content.footer is required');
});

// Test 8: Hero configuration is complete
test('Hero configuration is complete', () => {
  const { hero } = config.content;
  if (!hero.title) throw new Error('hero.title is required');
  if (!hero.description) throw new Error('hero.description is required');
  if (!hero.cta) throw new Error('hero.cta is required');
  if (!hero.cta.text) throw new Error('hero.cta.text is required');
  if (!hero.cta.href) throw new Error('hero.cta.href is required');
});

// Test 9: Features have required fields
test('Features have required fields', () => {
  config.content.features.forEach((feature, idx) => {
    if (!feature.id) throw new Error(`Feature ${idx} missing id`);
    if (!feature.title) throw new Error(`Feature ${idx} missing title`);
    if (!feature.description) throw new Error(`Feature ${idx} missing description`);
    if (feature.enabled === undefined) throw new Error(`Feature ${idx} missing enabled flag`);
  });
});

// Test 10: Pricing configuration is valid
test('Pricing configuration is valid', () => {
  const { pricing } = config.content;
  if (!pricing.plans || pricing.plans.length === 0) {
    throw new Error('At least one pricing plan is required');
  }
  pricing.plans.forEach((plan, idx) => {
    if (!plan.id) throw new Error(`Plan ${idx} missing id`);
    if (!plan.name) throw new Error(`Plan ${idx} missing name`);
    if (plan.price === undefined) throw new Error(`Plan ${idx} missing price`);
    if (!plan.cta) throw new Error(`Plan ${idx} missing cta`);
    if (plan.enabled === undefined) throw new Error(`Plan ${idx} missing enabled flag`);
  });
});

// Test 11: Testimonials have required fields
test('Testimonials have required fields', () => {
  config.content.testimonials.forEach((testimonial, idx) => {
    if (!testimonial.id) throw new Error(`Testimonial ${idx} missing id`);
    if (!testimonial.name) throw new Error(`Testimonial ${idx} missing name`);
    if (!testimonial.text) throw new Error(`Testimonial ${idx} missing text`);
    if (testimonial.enabled === undefined) throw new Error(`Testimonial ${idx} missing enabled flag`);
  });
});

// Test 12: FAQs have required fields
test('FAQs have required fields', () => {
  config.content.faq.forEach((faq, idx) => {
    if (!faq.id) throw new Error(`FAQ ${idx} missing id`);
    if (!faq.question) throw new Error(`FAQ ${idx} missing question`);
    if (!faq.answer) throw new Error(`FAQ ${idx} missing answer`);
    if (faq.enabled === undefined) throw new Error(`FAQ ${idx} missing enabled flag`);
  });
});

// Test 13: Pages configuration is valid
test('Pages configuration is valid', () => {
  const { pages } = config;
  const requiredPages = ['home', 'pricing', 'dashboard'];
  requiredPages.forEach(page => {
    if (!pages[page]) throw new Error(`Missing required page: ${page}`);
    if (pages[page].enabled === undefined) {
      throw new Error(`Page ${page} missing enabled flag`);
    }
  });
});

// Test 14: Routes configuration is valid
test('Routes configuration is valid', () => {
  const { routes } = config;
  const requiredRoutes = ['home', 'pricing', 'dashboard', 'login'];
  requiredRoutes.forEach(route => {
    if (!routes[route]) throw new Error(`Missing required route: ${route}`);
  });
});

// Test 15: Features configuration is valid
test('Features configuration is valid', () => {
  const { features } = config;
  if (!features.authentication) throw new Error('features.authentication is required');
  if (!features.payments) throw new Error('features.payments is required');
  if (!features.email) throw new Error('features.email is required');
});

// Test 16: Check for unique IDs
test('All IDs are unique', () => {
  const allIds = [
    ...config.content.features.map(f => f.id),
    ...config.content.testimonials.map(t => t.id),
    ...config.content.faq.map(f => f.id),
    ...config.content.pricing.plans.map(p => p.id),
    ...config.projects.map(p => p.id),
    ...config.products.map(p => p.id),
  ];
  
  const uniqueIds = new Set(allIds);
  if (allIds.length !== uniqueIds.size) {
    throw new Error('Duplicate IDs found in configuration');
  }
});

// Test 17: Example config exists
test('Example config file exists', () => {
  const examplePath = path.join(__dirname, '../config/site-config.example.json');
  if (!fs.existsSync(examplePath)) {
    throw new Error('config/site-config.example.json not found');
  }
});

// Test 18: Type definitions exist
test('Type definitions exist', () => {
  const typesPath = path.join(__dirname, '../src/types/site-config.ts');
  if (!fs.existsSync(typesPath)) {
    throw new Error('src/types/site-config.ts not found');
  }
});

// Test 19: Config utilities exist
test('Config utilities exist', () => {
  const utilsPath = path.join(__dirname, '../src/lib/site-config.ts');
  if (!fs.existsSync(utilsPath)) {
    throw new Error('src/lib/site-config.ts not found');
  }
});

// Test 20: Documentation exists
test('Documentation exists', () => {
  const configDocPath = path.join(__dirname, '../CONFIG.md');
  const migrationDocPath = path.join(__dirname, '../MIGRATION.md');
  
  if (!fs.existsSync(configDocPath)) {
    throw new Error('CONFIG.md not found');
  }
  if (!fs.existsSync(migrationDocPath)) {
    throw new Error('MIGRATION.md not found');
  }
});

// Warnings for optional but recommended fields
if (config.company.twitter || config.company.github) {
  passed++;
  console.log('✅ Social media links configured');
} else {
  warn('Social media links', 'Consider adding twitter or github links');
}

if (config.content.hero.socialProof) {
  passed++;
  console.log('✅ Social proof configured in hero');
} else {
  warn('Social proof', 'Consider adding social proof to hero section');
}

// Summary
console.log('\n' + '='.repeat(50));
console.log(`✅ Passed: ${passed}`);
if (warnings > 0) console.log(`⚠️  Warnings: ${warnings}`);
if (errors > 0) console.log(`❌ Errors: ${errors}`);
console.log('='.repeat(50));

if (errors > 0) {
  console.error('\n❌ Configuration validation failed!');
  process.exit(1);
} else if (warnings > 0) {
  console.log('\n⚠️  Configuration validation passed with warnings');
  process.exit(0);
} else {
  console.log('\n✅ Configuration validation passed!');
  console.log('\n🎉 Your configuration system is ready to use!');
  console.log('\nNext steps:');
  console.log('1. Read CONFIG.md for usage documentation');
  console.log('2. See examples/config-usage-examples.tsx for code examples');
  console.log('3. Check MIGRATION.md for migrating existing components');
  console.log('4. Customize config/site-config.json for your project');
  process.exit(0);
}
