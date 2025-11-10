/**
 * Holiday MVP Generator - Main Orchestrator
 * Punto de entrada principal para generar todos los artefactos
 */

import type { GeneratorInput, GeneratorOutput } from "./types";
import { generateLandingSpec } from "./generators/landing-spec";
import {
  generateContentPlan,
  contentPlanToMarkdown,
} from "./generators/content-plan";
import {
  generateExecutionPlan,
  executionPlanToMarkdown,
} from "./generators/execution-plan";

/**
 * Valida y normaliza el input del generador
 */
export function validateAndNormalizeInput(input: Partial<GeneratorInput>): {
  valid: boolean;
  input?: GeneratorInput;
  errors?: string[];
} {
  const errors: string[] = [];

  // Campos requeridos
  if (!input.brand_name) {
    errors.push("brand_name es requerido");
  }
  if (!input.products_to_include || input.products_to_include.length === 0) {
    errors.push("Debe seleccionar al menos 1 producto");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Aplicar defaults
  const normalized: GeneratorInput = {
    brand_name: input.brand_name!,
    target_audience:
      input.target_audience || "emprendedores y creadores digitales",
    tone_voice: input.tone_voice || "profesional y cercano",
    primary_goal: input.primary_goal || "pre-ventas + captar 100 leads",
    currency: input.currency || "MXN",
    locale: input.locale || "es-MX",
    sales_stack: input.sales_stack || "Gumroad",
    email_stack: input.email_stack || "ConvertKit",
    channels: input.channels || ["X", "IG", "LinkedIn"],
    products_to_include: input.products_to_include!,
    brand_constraints: input.brand_constraints,
    legal_notes: input.legal_notes,
  };

  return { valid: true, input: normalized };
}

/**
 * Genera todos los artefactos del Holiday MVP Generator
 */
export function generateHolidayMVP(input: GeneratorInput): GeneratorOutput {
  const assumptions: string[] = [];

  // Documentar suposiciones
  if (!input.brand_constraints) {
    assumptions.push(
      "No se especificaron constraints de marca. Usando paleta navideña estándar (rojo #C41E3A, verde #0F5C3C, dorado #FFD700)."
    );
  }

  if (!input.legal_notes) {
    assumptions.push(
      "No se especificaron notas legales. Usando política estándar: garantía 7 días si no descargado, uso comercial permitido."
    );
  }

  if (input.channels.length === 0) {
    assumptions.push(
      "No se especificaron canales de distribución. Usando X, IG, LinkedIn por defecto."
    );
    input.channels = ["X", "IG", "LinkedIn"];
  }

  // Generar artefactos
  const landing_spec = generateLandingSpec(input);
  const content_plan = generateContentPlan(input);
  const execution_plan = generateExecutionPlan(input);

  return {
    landing_spec,
    content_plan,
    execution_plan,
    assumptions,
  };
}

/**
 * Exporta los artefactos en formato JSON + Markdown
 */
export function exportArtifacts(output: GeneratorOutput): {
  landing_spec_json: string;
  content_plan_md: string;
  execution_plan_md: string;
  assumptions_md: string;
} {
  // Landing spec como JSON limpio
  const landing_spec_json = JSON.stringify(output.landing_spec, null, 2);

  // Content plan como Markdown
  const content_plan_md = contentPlanToMarkdown(output.content_plan);

  // Execution plan como Markdown
  const execution_plan_md = executionPlanToMarkdown(output.execution_plan);

  // Assumptions
  let assumptions_md = `# Suposiciones del Generador\n\n`;
  if (output.assumptions.length === 0) {
    assumptions_md += `*No se hicieron suposiciones. Todos los parámetros fueron proporcionados.*\n`;
  } else {
    output.assumptions.forEach((assumption, i) => {
      assumptions_md += `${i + 1}. ${assumption}\n`;
    });
  }

  return {
    landing_spec_json,
    content_plan_md,
    execution_plan_md,
    assumptions_md,
  };
}

/**
 * Quick-start: Genera con inputs mínimos
 */
export function quickGenerate(
  brandName: string,
  products: Array<
    | "adviento"
    | "recetario"
    | "plantillas"
    | "guia_ventas"
    | "kit_imprimible"
    | "taller_2026"
  >
): GeneratorOutput {
  const input: GeneratorInput = {
    brand_name: brandName,
    target_audience: "emprendedores y creadores digitales",
    tone_voice: "profesional y festivo",
    primary_goal: "pre-ventas + 100 leads",
    currency: "MXN",
    locale: "es-MX",
    sales_stack: "Gumroad",
    email_stack: "ConvertKit",
    channels: ["X", "IG", "LinkedIn"],
    products_to_include: products,
  };

  return generateHolidayMVP(input);
}
