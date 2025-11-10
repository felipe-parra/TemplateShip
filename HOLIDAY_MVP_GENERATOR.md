# 🎄 Holiday MVP Generator

Sistema completo para generar **landing pages**, **planes de contenido** y **planes de ejecución** para productos digitales de temporada en minutos.

## 📋 ¿Qué es esto?

El **Holiday MVP Generator** es una herramienta diseñada para emprendedores, creadores y equipos pequeños que quieren validar productos digitales navideños en 48-72 horas. Genera automáticamente:

1. **`landing_spec.json`** - Especificación completa de landing page (héroe, pricing, FAQ, CTAs, etc.)
2. **`content_plan.md`** - Plan detallado de contenidos por producto con prompts listos para usar
3. **`execution_plan.md`** - Cronograma de fin de semana con tareas, métricas y distribución

---

## 🚀 Quick Start

### Opción 1: UI Web (Recomendado)

1. Navega a `/holiday-mvp` en tu navegador
2. Completa el formulario con tu marca y productos
3. Haz clic en "Generar Holiday MVP"
4. Descarga los 3 archivos generados

### Opción 2: API

```bash
curl -X POST http://localhost:3000/api/holiday-mvp/generate \
  -H "Content-Type: application/json" \
  -d '{
    "brand_name": "Xilo Labs",
    "target_audience": "emprendedores y creadores en MX",
    "tone_voice": "profesional y festivo",
    "primary_goal": "pre-ventas + 200 leads",
    "currency": "MXN",
    "locale": "es-MX",
    "sales_stack": "Gumroad",
    "email_stack": "ConvertKit",
    "channels": ["X", "IG", "LinkedIn"],
    "products_to_include": ["plantillas", "adviento", "guia_ventas"]
  }'
```

### Opción 3: Programáticamente

```typescript
import { quickGenerate, exportArtifacts } from "@/lib/holiday-mvp";

// Generación rápida
const output = quickGenerate("Mi Marca", ["plantillas", "adviento"]);

// Exportar archivos
const files = exportArtifacts(output);

console.log(files.landing_spec_json);
console.log(files.content_plan_md);
console.log(files.execution_plan_md);
```

---

## 📦 Catálogo de Productos

El generador incluye 6 productos navideños pre-configurados:

| ID               | Producto                             | Precio MXN | Precio USD | Bundleable |
| ---------------- | ------------------------------------ | ---------- | ---------- | ---------- |
| `adviento`       | Calendario de Adviento Digital       | $129       | $7         | ✅         |
| `recetario`      | Recetario Navideño (ebook)           | $159       | $9         | ✅         |
| `plantillas`     | Pack de Plantillas Navideñas (Canva) | $219       | $12        | ✅         |
| `guia_ventas`    | Guía: Cerrar el Año con Más Ventas   | $279       | $15        | ✅         |
| `kit_imprimible` | Kit Imprimible de Navidad            | $109       | $6         | ✅         |
| `taller_2026`    | Taller en Vivo: Planea tu 2026       | $349       | $19        | ❌         |

---

## 🎯 Entradas (Inputs)

### Requeridos

- **`brand_name`** (string): Nombre de tu marca
- **`products_to_include`** (array): IDs de productos a incluir (mínimo 1)

### Opcionales (con defaults)

```typescript
{
  target_audience: "emprendedores y creadores digitales",
  tone_voice: "profesional y cercano",
  primary_goal: "pre-ventas + 100 leads",
  currency: "MXN",
  locale: "es-MX",
  sales_stack: "Gumroad",
  email_stack: "ConvertKit",
  channels: ["X", "IG", "LinkedIn"],
  brand_constraints: undefined,
  legal_notes: undefined
}
```

---

## 📤 Salidas (Outputs)

### 1. `landing_spec.json`

Especificación completa de landing page lista para hidratación en Next.js/React:

```json
{
  "brand": {
    "name": "Xilo Labs",
    "tone": "profesional y festivo",
    "locale": "es-MX"
  },
  "hero": {
    "headline": "🎄 Cierra 2024 con productos que tu audiencia amará",
    "subheadline": "3 productos digitales diseñados para emprendedores...",
    "primary_cta": {
      "label": "Ver Productos",
      "href": "https://tudominio.com?utm_source=hero#pricing"
    }
  },
  "products": [...],
  "pricing_table": {...},
  "faq": [...],
  // ... más secciones
}
```

**Uso en Next.js:**

```tsx
import landingSpec from "./landing_spec.json";

export default function LandingPage() {
  return (
    <>
      <Hero {...landingSpec.hero} />
      <Products products={landingSpec.products} />
      <PricingTable {...landingSpec.pricing_table} />
      <FAQ faqs={landingSpec.faq} />
    </>
  );
}
```

### 2. `content_plan.md`

Plan de contenido por producto con:

- **Entregables** (lista exacta con cantidades, formatos)
- **Orden de producción** (1→N con dependencias)
- **Prompts de generación** (listos para copiar/pegar en Claude/GPT)
- **Criterios de aceptación** (DoD medible)
- **Estructura de archivos** (nombres y organización)
- **Ejemplos de muestra** (referencias visuales)

**Ejemplo:**

```markdown
## Calendario de Adviento Digital

### Entregables

- 24 retos diarios (micro-actividades ≤60 palabras)
- Cada reto con versión normal y easy_variant
- 3 días de demo (días 1, 2, 3) completamente desarrollados
- Diseño PDF descargable (Canva/Figma)
- Versión Notion editable con template

### Prompts de Generación

#### Brainstorm Temas
```

Actúa como content strategist para emprendedores.
Genera 24 micro-retos navideños...
[Prompt completo listo para usar]

```

```

### 3. `execution_plan.md`

Plan de ejecución de fin de semana con:

- **Objetivo y métricas** (visitas, leads, ventas)
- **Cronograma Sábado** (bloques de 2h con tareas y owners)
- **Cronograma Domingo** (distribución y análisis)
- **Roles** (PM, Content, Frontend, Marketing Ops)
- **Checklist de publicación** (13 puntos de verificación)
- **Plan de distribución** (acciones por canal con prioridad)
- **Métricas & Experimentos** (umbrales GO/MAYBE/KILL + A/B test)

**Ejemplo:**

```markdown
## 📅 Cronograma Sábado

### 09:00 - 11:00 (2h) — PM + Content

- Finalizar oferta y pricing de productos
- Redactar copys principales (hero, value props, FAQ)
- Validar integración Gumroad + ConvertKit
- Crear 3 prototipos de productos (demo/preview)

### 11:00 - 13:00 (2h) — Frontend

- Implementar landing page (componentes base)
- Integrar pricing table con CTAs funcionales
  ...
```

---

## 🧪 Uso Avanzado

### Validación Personalizada

```typescript
import { validateAndNormalizeInput } from "@/lib/holiday-mvp";

const validation = validateAndNormalizeInput({
  brand_name: "Mi Marca",
  products_to_include: ["plantillas"],
  // ... otros campos
});

if (!validation.valid) {
  console.error(validation.errors);
} else {
  const normalizedInput = validation.input;
  // ... usar input normalizado
}
```

### Generadores Individuales

```typescript
import {
  generateLandingSpec,
  generateContentPlan,
  generateExecutionPlan,
} from "@/lib/holiday-mvp";

const input = {
  /* ... */
};

const landingSpec = generateLandingSpec(input);
const contentPlan = generateContentPlan(input);
const executionPlan = generateExecutionPlan(input);
```

### Cálculo de Bundle Pricing

```typescript
import { calculateBundlePrice } from "@/lib/holiday-mvp";

const bundlePrice = calculateBundlePrice(
  ["plantillas", "adviento", "guia_ventas"],
  "MXN",
  20 // 20% descuento
);

console.log(bundlePrice); // MXN $502 (vs $627 individual)
```

---

## 🎨 Arquitectura

```
src/lib/holiday-mvp/
├── types.ts                      # TypeScript type definitions
├── catalog.ts                    # Product catalog + utils
├── generator.ts                  # Main orchestrator
├── generators/
│   ├── landing-spec.ts           # Landing page generator
│   ├── content-plan.ts           # Content plan generator
│   └── execution-plan.ts         # Execution plan generator
└── index.ts                      # Public exports

src/app/
├── api/holiday-mvp/generate/
│   └── route.ts                  # API endpoint
└── holiday-mvp/
    └── page.tsx                  # UI playground

src/components/
└── holiday-mvp-generator.tsx     # UI component
```

---

## 🔧 Personalización

### Agregar un Nuevo Producto

1. Edita `src/lib/holiday-mvp/catalog.ts`:

```typescript
export const PRODUCT_CATALOG = {
  // ... productos existentes
  mi_producto: {
    id: "mi_producto",
    title: "Mi Producto Navideño",
    deliverables: ["Entregable 1", "Entregable 2"],
    price_suggested: { MXN: 199, USD: 11 },
    bundleable: true,
  },
};
```

2. Agrega generador de contenido en `src/lib/holiday-mvp/generators/content-plan.ts`:

```typescript
function generateMiProductoContent(input: GeneratorInput): ContentPlanItem {
  return {
    deliverables: [...],
    production_order: [...],
    generation_prompts: {...},
    acceptance_criteria: [...],
    file_structure: [...],
    sample_examples: [...],
  };
}
```

### Modificar Paleta de Colores

Edita `brand_constraints` en el input:

```typescript
{
  brand_constraints: "usar paleta rojo (#FF0000), verde (#00FF00), dorado (#FFD700)";
}
```

### Ajustar Métricas de Éxito

Los umbrales se calculan automáticamente basados en `primary_goal`. Para personalizar:

```typescript
// En src/lib/holiday-mvp/generators/execution-plan.ts
function generateSuccessMetrics(input: GeneratorInput) {
  return {
    visits: 1000, // Custom
    leads: 300, // Custom
    sales: 50, // Custom
  };
}
```

---

## 🧷 Rúbrica de Calidad

El generador cumple con:

- ✅ **Claridad**: Copys utilitarios, títulos ≤10 palabras
- ✅ **Coherencia**: Pricing consistente entre `products` y `pricing_table`
- ✅ **Accionabilidad**: Cada deliverable tiene prompt, formato y DoD
- ✅ **Medibilidad**: KPIs y eventos definidos, A/B test propuesto
- ✅ **Portabilidad**: JSON válido, listo para hidratar frontend
- ✅ **Sin ambigüedad**: Suposiciones documentadas automáticamente

---

## 📊 Métricas de Éxito (Ejemplo)

Basado en `primary_goal: "pre-ventas + 200 leads"`:

| Escenario | Visitas | Leads | Ventas | Decisión                     |
| --------- | ------- | ----- | ------ | ---------------------------- |
| 🟢 GO     | 750+    | 300+  | 20+    | Invertir en ads, escalar     |
| 🟡 MAYBE  | 500+    | 200+  | 10+    | Iterar copys, nuevos canales |
| 🔴 KILL   | <250    | <100  | <3     | Pivotar oferta o audiencia   |

---

## 🎯 Casos de Uso

### 1. Solopreneur Validando Idea

```typescript
const output = quickGenerate("MiMarca", ["adviento"]);
// Descarga content_plan.md
// Usa prompts para generar contenido con ChatGPT
// Implementa landing básica en Carrd/Framer
// Distribuye en 2 redes sociales
```

### 2. Equipo Pequeño Lanzando Bundle

```typescript
const output = generateHolidayMVP({
  brand_name: "TeamXYZ",
  products_to_include: ["plantillas", "guia_ventas", "kit_imprimible"],
  primary_goal: "500 leads + 50 ventas",
  channels: ["X", "IG", "LinkedIn", "Email"],
});

// PM: usa execution_plan.md para coordinar
// Content: usa content_plan.md para producir assets
// Dev: usa landing_spec.json para implementar
```

### 3. Agencia Generando para Cliente

```typescript
const output = generateHolidayMVP({
  brand_name: "ClienteCorp",
  target_audience: "profesionales 30-45 años",
  tone_voice: "ejecutivo y confiable",
  currency: "USD",
  locale: "en-US",
  brand_constraints: "usar solo azul corporativo (#003366) y gris (#CCCCCC)",
  legal_notes: "Sin reembolsos. Licencia de uso limitada a 1 sitio web.",
  products_to_include: ["guia_ventas", "taller_2026"],
});
```

---

## 🛠️ Stack Técnico

- **Next.js 15** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** + **shadcn/ui**
- **API Routes** (serverless)
- **No dependencies externas** (generación pura en TypeScript)

---

## 📝 Roadmap Futuro

- [ ] Exportar landing como HTML estático
- [ ] Integración con Figma API para diseños
- [ ] Templates de email para campañas
- [ ] Dashboard de tracking de métricas
- [ ] Generación de creativos con IA (imágenes)
- [ ] Multi-idioma (inglés, portugués)
- [ ] Productos B2B (no solo B2C)

---

## 🤝 Contribuciones

1. Fork el repo
2. Crea branch: `git checkout -b feature/mi-feature`
3. Commit: `git commit -m 'feat: agregar nueva feature'`
4. Push: `git push origin feature/mi-feature`
5. Abre PR

---

## 📄 Licencia

MIT License - Ver [LICENSE.md](./LICENSE.md)

---

## 🎉 Créditos

Creado por [TemplateShip](https://github.com/felipe-parra/TemplateShip)

Basado en el mega-prompt "Holiday MVP Generator" diseñado para validación rápida de productos digitales.

---

**¿Preguntas?** Abre un issue en GitHub o contáctanos en Twitter/X.

🎄 ¡Felices lanzamientos navideños! 🎁
