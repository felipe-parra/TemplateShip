/**
 * Holiday MVP Generator
 * Sistema completo para generar landing pages, planes de contenido y ejecución
 * para productos digitales de temporada.
 *
 * @example
 * ```typescript
 * import { quickGenerate, exportArtifacts } from '@/lib/holiday-mvp';
 *
 * const output = quickGenerate("Mi Marca", ["plantillas", "adviento"]);
 * const files = exportArtifacts(output);
 *
 * console.log(files.landing_spec_json);
 * console.log(files.content_plan_md);
 * console.log(files.execution_plan_md);
 * ```
 */

// Main generator
export {
  generateHolidayMVP,
  quickGenerate,
  validateAndNormalizeInput,
  exportArtifacts,
} from "./generator";

// Types
export type {
  GeneratorInput,
  GeneratorOutput,
  LandingSpec,
  ContentPlanItem,
  ExecutionPlan,
  ProductId,
  Currency,
  Locale,
} from "./types";

// Catalog
export {
  PRODUCT_CATALOG,
  isValidProductId,
  getBundleableProducts,
  calculateBundlePrice,
} from "./catalog";

// Individual generators (for advanced usage)
export { generateLandingSpec } from "./generators/landing-spec";
export {
  generateContentPlan,
  contentPlanToMarkdown,
} from "./generators/content-plan";
export {
  generateExecutionPlan,
  executionPlanToMarkdown,
} from "./generators/execution-plan";
