/**
 * Holiday MVP Generator - Examples
 * Ejemplos de uso en diferentes escenarios
 */

import {
  quickGenerate,
  generateHolidayMVP,
  exportArtifacts,
  type GeneratorInput,
} from "@/lib/holiday-mvp";

// ============================================================
// EJEMPLO 1: Quick Generate (Más simple)
// ============================================================

console.log("=== EJEMPLO 1: Quick Generate ===\n");

const example1 = quickGenerate("Xilo Labs", ["plantillas", "adviento"]);

console.log("✅ Generado para Xilo Labs");
console.log(`📦 Productos: ${example1.landing_spec.products.length}`);
console.log(`📝 Planes de contenido: ${example1.content_plan.length}`);
console.log(
  `📢 Acciones de distribución: ${example1.execution_plan.distribution_plan.length}`
);

// Exportar archivos
const files1 = exportArtifacts(example1);
console.log("\n📁 Archivos generados:");
console.log("  - landing_spec.json");
console.log("  - content_plan.md");
console.log("  - execution_plan.md");

// ============================================================
// EJEMPLO 2: Configuración Completa (Más control)
// ============================================================

console.log("\n\n=== EJEMPLO 2: Configuración Completa ===\n");

const input2: GeneratorInput = {
  brand_name: "DigitalBiz México",
  target_audience: "emprendedores mexicanos con negocio digital",
  tone_voice: "cercano, motivacional y ejecutivo",
  primary_goal: "500 leads calificados + 100 ventas",
  currency: "MXN",
  locale: "es-MX",
  sales_stack: "LemonSqueezy",
  email_stack: "Beehiiv",
  channels: ["X", "IG", "LinkedIn", "Email", "Comunidades"],
  products_to_include: ["plantillas", "guia_ventas", "adviento"],
  brand_constraints:
    "Usar solo colores rojo (#C41E3A) y verde oscuro (#0F5C3C). Evitar claims exagerados. Tono profesional pero accesible.",
  legal_notes:
    "Facturación automática disponible. Política de reembolso: 7 días si no se ha descargado el producto. Uso comercial ilimitado incluido.",
};

const example2 = generateHolidayMVP(input2);

console.log("✅ Generado para DigitalBiz México");
console.log("\n📊 Métricas de éxito (72h):");
console.log(
  `  Visitas objetivo: ${example2.execution_plan.success_metrics.visits}`
);
console.log(
  `  Leads objetivo: ${example2.execution_plan.success_metrics.leads}`
);
console.log(
  `  Ventas objetivo: ${example2.execution_plan.success_metrics.sales}`
);

console.log("\n⚠️ Suposiciones:");
if (example2.assumptions.length === 0) {
  console.log("  Ninguna (todos los parámetros proporcionados)");
} else {
  example2.assumptions.forEach((assumption, i) => {
    console.log(`  ${i + 1}. ${assumption}`);
  });
}

// ============================================================
// EJEMPLO 3: Caso de Uso - Agencia para Cliente
// ============================================================

console.log("\n\n=== EJEMPLO 3: Agencia para Cliente ===\n");

const input3: GeneratorInput = {
  brand_name: "CorporateClient Inc.",
  target_audience: "profesionales corporativos 30-45 años, nivel gerencial",
  tone_voice: "ejecutivo, confiable, sin jerga",
  primary_goal: "captar 1000 leads B2B + validar interés en taller premium",
  currency: "USD",
  locale: "en-US",
  sales_stack: "Stripe Checkout",
  email_stack: "Mailchimp",
  channels: ["LinkedIn", "Email"],
  products_to_include: ["guia_ventas", "taller_2026"],
  brand_constraints:
    "Paleta corporativa: azul (#003366), gris (#CCCCCC), blanco. Sin emojis. Diseño minimalista.",
  legal_notes:
    "No refunds after access. Single-user license. Enterprise licenses available separately.",
};

const example3 = generateHolidayMVP(input3);

console.log("✅ Generado para CorporateClient Inc.");
console.log(`\n🎯 Objetivo: ${example3.execution_plan.objective}`);

console.log("\n📅 Cronograma Sábado (primeros 2 bloques):");
example3.execution_plan.saturday_schedule.slice(0, 2).forEach((block) => {
  console.log(`\n  ${block.time} (${block.duration}) — ${block.owner}`);
  block.tasks.forEach((task) => {
    console.log(`    - ${task}`);
  });
});

// ============================================================
// EJEMPLO 4: Solopreneur con Presupuesto Limitado
// ============================================================

console.log("\n\n=== EJEMPLO 4: Solopreneur (1 producto) ===\n");

const example4 = quickGenerate("MiEmprendimiento", ["kit_imprimible"]);

console.log("✅ Generado para MiEmprendimiento");
console.log(`📦 Producto: ${example4.landing_spec.products[0].title}`);
console.log(
  `💰 Precio: ${example4.landing_spec.products[0].price.currency} $${example4.landing_spec.products[0].price.value}`
);

console.log("\n📝 Entregables del content plan:");
example4.content_plan[0].deliverables.forEach((deliverable, i) => {
  console.log(`  ${i + 1}. ${deliverable}`);
});

console.log("\n✅ Criterios de aceptación:");
example4.content_plan[0].acceptance_criteria.slice(0, 3).forEach((criteria) => {
  console.log(`  ✓ ${criteria}`);
});

// ============================================================
// EJEMPLO 5: Bundle Completo (Máximo Revenue)
// ============================================================

console.log("\n\n=== EJEMPLO 5: Bundle Navideño Completo ===\n");

const input5: GeneratorInput = {
  brand_name: "HolidayHub",
  target_audience: "creadores de contenido, influencers, coaches",
  tone_voice: "festivo, inspiracional, energético",
  primary_goal: "500 ventas de bundle completo + 2000 leads",
  currency: "MXN",
  locale: "es-MX",
  sales_stack: "Gumroad",
  email_stack: "ConvertKit",
  channels: ["IG", "X", "LinkedIn", "Email", "Comunidades"],
  products_to_include: [
    "adviento",
    "recetario",
    "plantillas",
    "guia_ventas",
    "kit_imprimible",
  ], // Todos los bundleables
};

const example5 = generateHolidayMVP(input5);

console.log("✅ Generado para HolidayHub");
console.log(
  `\n🎁 Bundle incluye ${example5.landing_spec.products.length} productos:`
);
example5.landing_spec.products.forEach((product) => {
  console.log(
    `  - ${product.title} (${product.price.currency} $${product.price.value})`
  );
});

// Buscar SKU del bundle
const bundleSKU = example5.landing_spec.pricing_table.skus.find((sku) =>
  sku.id.includes("bundle")
);
if (bundleSKU) {
  console.log(`\n💰 Precio Bundle: MXN $${bundleSKU.price.MXN}`);
  console.log(
    `   (Ahorro vs. compra individual: ${calculateSavings(example5.landing_spec.products, bundleSKU.price.MXN!)}%)`
  );
}

console.log("\n📢 Canales de distribución:");
example5.execution_plan.distribution_plan
  .filter((action) => action.priority === "alta")
  .forEach((action) => {
    console.log(`  🔥 ${action.channel}: ${action.action}`);
  });

// ============================================================
// EJEMPLO 6: Experimentación A/B
// ============================================================

console.log("\n\n=== EJEMPLO 6: Setup A/B Testing ===\n");

const example6 = quickGenerate("ExperimentLab", ["plantillas"]);

console.log("✅ Generado para ExperimentLab");
console.log("\n🧪 Experimento A/B configurado:");
console.log(
  `  Variable: ${example6.execution_plan.experiments.ab_test.variable}`
);
console.log(
  `  Variante A: "${example6.execution_plan.experiments.ab_test.variant_a}"`
);
console.log(
  `  Variante B: "${example6.execution_plan.experiments.ab_test.variant_b}"`
);
console.log(`  Métrica: ${example6.execution_plan.experiments.ab_test.metric}`);

console.log("\n📊 Umbrales de decisión:");
console.log(
  `  🟢 GO: ${example6.execution_plan.experiments.thresholds.go.visits} visitas, ${example6.execution_plan.experiments.thresholds.go.leads} leads, ${example6.execution_plan.experiments.thresholds.go.sales} ventas`
);
console.log(
  `  🟡 MAYBE: ${example6.execution_plan.experiments.thresholds.maybe.visits} visitas, ${example6.execution_plan.experiments.thresholds.maybe.leads} leads, ${example6.execution_plan.experiments.thresholds.maybe.sales} ventas`
);
console.log(
  `  🔴 KILL: <${example6.execution_plan.experiments.thresholds.kill.visits} visitas, <${example6.execution_plan.experiments.thresholds.kill.leads} leads, <${example6.execution_plan.experiments.thresholds.kill.sales} ventas`
);

// ============================================================
// UTILITY: Calcular savings del bundle
// ============================================================

function calculateSavings(
  products: Array<{ price: { value: number } }>,
  bundlePrice: number
): number {
  const total = products.reduce((sum, p) => sum + p.price.value, 0);
  const savings = ((total - bundlePrice) / total) * 100;
  return Math.round(savings);
}

// ============================================================
// EXPORTAR EJEMPLO COMPLETO
// ============================================================

console.log("\n\n=== Para exportar archivos en tu aplicación ===\n");
console.log(`
import { exportArtifacts } from '@/lib/holiday-mvp';
import fs from 'fs';

const output = generateHolidayMVP(input);
const files = exportArtifacts(output);

// Guardar archivos
fs.writeFileSync('landing_spec.json', files.landing_spec_json);
fs.writeFileSync('content_plan.md', files.content_plan_md);
fs.writeFileSync('execution_plan.md', files.execution_plan_md);

console.log('✅ Archivos guardados!');
`);

console.log("\n🎄 ¡Happy Holiday MVP Building! 🎁\n");
