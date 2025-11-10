#!/usr/bin/env node

/**
 * Holiday MVP Generator - CLI Script
 * Genera artefactos desde la línea de comandos
 *
 * Uso:
 *   node scripts/generate-holiday-mvp.mjs
 *   node scripts/generate-holiday-mvp.mjs --brand="Mi Marca" --products=plantillas,adviento
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================
// Parse CLI Arguments
// ============================================================

const args = process.argv.slice(2);
const parsedArgs = {};

args.forEach((arg) => {
  const [key, value] = arg.replace("--", "").split("=");
  parsedArgs[key] = value;
});

// ============================================================
// Config (usa args o defaults)
// ============================================================

const config = {
  brand_name: parsedArgs.brand || "Demo Brand",
  target_audience: parsedArgs.audience || "emprendedores y creadores digitales",
  tone_voice: parsedArgs.tone || "profesional y festivo",
  primary_goal: parsedArgs.goal || "pre-ventas + 100 leads",
  currency: parsedArgs.currency || "MXN",
  locale: parsedArgs.locale || "es-MX",
  sales_stack: parsedArgs.sales || "Gumroad",
  email_stack: parsedArgs.email || "ConvertKit",
  channels: parsedArgs.channels
    ? parsedArgs.channels.split(",")
    : ["X", "IG", "LinkedIn"],
  products_to_include: parsedArgs.products
    ? parsedArgs.products.split(",")
    : ["plantillas", "adviento"],
  brand_constraints: parsedArgs.constraints || undefined,
  legal_notes: parsedArgs.legal || undefined,
};

console.log("🎄 Holiday MVP Generator - CLI\n");
console.log("📋 Configuración:");
console.log(`  Brand: ${config.brand_name}`);
console.log(`  Productos: ${config.products_to_include.join(", ")}`);
console.log(`  Objetivo: ${config.primary_goal}`);
console.log("");

// ============================================================
// Mock Generator (en producción, importarías de @/lib/holiday-mvp)
// ============================================================

// NOTA: Este es un mock simplificado para demostración
// En producción real, harías:
// import { generateHolidayMVP, exportArtifacts } from '../src/lib/holiday-mvp/index.ts';

function mockGenerate(input) {
  return {
    landing_spec: {
      brand: {
        name: input.brand_name,
        tone: input.tone_voice,
        locale: input.locale,
      },
      hero: {
        headline: `🎄 ${input.brand_name} - Productos Navideños ${new Date().getFullYear()}`,
        subheadline: `${input.products_to_include.length} productos diseñados para ${input.target_audience}`,
        primary_cta: {
          label: "Ver Productos",
          href: "#pricing",
        },
      },
      products: input.products_to_include.map((id) => ({
        id,
        title: id.charAt(0).toUpperCase() + id.slice(1),
        price: { currency: input.currency, value: 199 },
      })),
      // ... resto mock
    },
    content_plan: input.products_to_include.map((id) => ({
      product_id: id,
      product_title: id.charAt(0).toUpperCase() + id.slice(1),
      deliverables: ["Entregable 1", "Entregable 2"],
      production_order: ["Paso 1", "Paso 2"],
      generation_prompts: {
        prompt1: "Genera contenido para " + id,
      },
      acceptance_criteria: ["Criterio 1", "Criterio 2"],
      file_structure: [`${id}/`, `  └── content/`],
      sample_examples: ["Ejemplo 1"],
    })),
    execution_plan: {
      objective: input.primary_goal,
      success_metrics: { visits: 200, leads: 50, sales: 10 },
      saturday_schedule: [
        {
          time: "09:00 - 11:00",
          duration: "2h",
          tasks: ["Tarea 1", "Tarea 2"],
          owner: "PM",
        },
      ],
      sunday_schedule: [
        {
          time: "09:00 - 11:00",
          duration: "2h",
          tasks: ["Distribución"],
          owner: "Marketing",
        },
      ],
      roles: ["PM", "Content", "Frontend"],
      publication_checklist: ["Check 1", "Check 2"],
      distribution_plan: [
        {
          channel: "X",
          action: "Post de lanzamiento",
          format: "Thread",
          priority: "alta",
        },
      ],
      experiments: {
        thresholds: {
          go: { visits: 300, leads: 100, sales: 20 },
          maybe: { visits: 200, leads: 50, sales: 10 },
          kill: { visits: 100, leads: 25, sales: 3 },
        },
        ab_test: {
          variable: "Headline",
          variant_a: "Variante A",
          variant_b: "Variante B",
          metric: "CTR",
        },
      },
    },
    assumptions: [],
  };
}

function mockExport(output) {
  return {
    landing_spec_json: JSON.stringify(output.landing_spec, null, 2),
    content_plan_md: `# Content Plan\n\n${output.content_plan.map((p) => `## ${p.product_title}\n\n- ${p.deliverables.join("\n- ")}`).join("\n\n")}`,
    execution_plan_md: `# Execution Plan\n\n## Objetivo\n${output.execution_plan.objective}\n\n## Métricas\n- Visitas: ${output.execution_plan.success_metrics.visits}\n- Leads: ${output.execution_plan.success_metrics.leads}\n- Ventas: ${output.execution_plan.success_metrics.sales}`,
    assumptions_md: "# Assumptions\n\nNinguna suposición realizada.",
  };
}

// ============================================================
// Generate
// ============================================================

console.log("⏳ Generando artefactos...\n");

const output = mockGenerate(config);
const files = mockExport(output);

// ============================================================
// Save Files
// ============================================================

const outputDir = path.join(__dirname, "..", "output");

// Crear directorio si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const brandSlug = config.brand_name
  .toLowerCase()
  .replace(/\s+/g, "-")
  .replace(/[^a-z0-9-]/g, "");

const prefix = `${brandSlug}_${timestamp}`;

// Guardar archivos
const filesToSave = [
  {
    name: `${prefix}_landing_spec.json`,
    content: files.landing_spec_json,
  },
  {
    name: `${prefix}_content_plan.md`,
    content: files.content_plan_md,
  },
  {
    name: `${prefix}_execution_plan.md`,
    content: files.execution_plan_md,
  },
  {
    name: `${prefix}_assumptions.md`,
    content: files.assumptions_md,
  },
];

filesToSave.forEach((file) => {
  const filePath = path.join(outputDir, file.name);
  fs.writeFileSync(filePath, file.content, "utf8");
  console.log(`✅ Guardado: ${file.name}`);
});

// ============================================================
// Summary
// ============================================================

console.log("");
console.log("🎉 ¡Generación completada!");
console.log("");
console.log("📁 Archivos generados en:");
console.log(`   ${outputDir}`);
console.log("");
console.log("📊 Resumen:");
console.log(`   Productos: ${output.landing_spec.products.length}`);
console.log(`   Planes de contenido: ${output.content_plan.length}`);
console.log(
  `   Acciones de distribución: ${output.execution_plan.distribution_plan.length}`
);
console.log("");
console.log("🚀 Próximos pasos:");
console.log("   1. Revisa landing_spec.json y personaliza");
console.log("   2. Usa content_plan.md para generar contenido");
console.log("   3. Sigue execution_plan.md este fin de semana");
console.log("");
console.log("🎄 ¡Happy Holiday MVP Building! 🎁");
console.log("");

// ============================================================
// Usage Examples
// ============================================================

if (args.includes("--help")) {
  console.log("=== Ejemplos de Uso ===\n");
  console.log("Básico:");
  console.log("  node scripts/generate-holiday-mvp.mjs\n");
  console.log("Personalizado:");
  console.log(
    '  node scripts/generate-holiday-mvp.mjs --brand="Mi Marca" --products=plantillas,adviento --goal="500 ventas"\n'
  );
  console.log("Todas las opciones:");
  console.log("  --brand       Nombre de marca");
  console.log("  --products    Lista de productos (separados por coma)");
  console.log("  --audience    Audiencia objetivo");
  console.log("  --tone        Tono de voz");
  console.log("  --goal        Objetivo principal");
  console.log("  --currency    Moneda (MXN, USD, EUR)");
  console.log("  --locale      Locale (es-MX, es-ES, en-US)");
  console.log("  --sales       Stack de ventas");
  console.log("  --email       Stack de email");
  console.log("  --channels    Canales (separados por coma)");
  console.log("");
}
