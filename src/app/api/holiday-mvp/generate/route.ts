/**
 * API Route: POST /api/holiday-mvp/generate
 * Genera artefactos completos del Holiday MVP Generator
 */

import { NextRequest, NextResponse } from "next/server";
import {
  validateAndNormalizeInput,
  generateHolidayMVP,
  exportArtifacts,
} from "@/lib/holiday-mvp";
import type { GeneratorInput } from "@/lib/holiday-mvp";

export async function POST(request: NextRequest) {
  try {
    // Parse input
    const body = await request.json();

    // Validar y normalizar
    const validation = validateAndNormalizeInput(
      body as Partial<GeneratorInput>
    );

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Generar artefactos
    const output = generateHolidayMVP(validation.input!);
    const files = exportArtifacts(output);

    // Retornar
    return NextResponse.json({
      success: true,
      data: {
        landing_spec: output.landing_spec,
        content_plan: output.content_plan,
        execution_plan: output.execution_plan,
        assumptions: output.assumptions,
      },
      files: {
        landing_spec_json: files.landing_spec_json,
        content_plan_md: files.content_plan_md,
        execution_plan_md: files.execution_plan_md,
        assumptions_md: files.assumptions_md,
      },
    });
  } catch (error) {
    console.error("[Holiday MVP Generator] Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Error interno al generar artefactos",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// GET para obtener configuración/defaults
export async function GET() {
  return NextResponse.json({
    success: true,
    config: {
      supported_currencies: ["MXN", "USD", "EUR"],
      supported_locales: ["es-MX", "es-ES", "en-US"],
      available_products: [
        "adviento",
        "recetario",
        "plantillas",
        "guia_ventas",
        "kit_imprimible",
        "taller_2026",
      ],
      defaults: {
        currency: "MXN",
        locale: "es-MX",
        tone_voice: "profesional y cercano",
        sales_stack: "Gumroad",
        email_stack: "ConvertKit",
        channels: ["X", "IG", "LinkedIn"],
      },
    },
  });
}
