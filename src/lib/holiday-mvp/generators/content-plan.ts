/**
 * Holiday MVP Generator - Content Plan Generator
 * Genera planes de contenido detallados con prompts accionables
 */

import type { GeneratorInput, ContentPlanItem, ProductId } from "../types";
import { PRODUCT_CATALOG } from "../catalog";

/**
 * Genera plan de contenidos completo para todos los productos seleccionados
 */
export function generateContentPlan(input: GeneratorInput): ContentPlanItem[] {
  return input.products_to_include.map((productId) =>
    generateProductContentPlan(productId, input)
  );
}

/**
 * Genera plan de contenido para un producto específico
 */
function generateProductContentPlan(
  productId: ProductId,
  input: GeneratorInput
): ContentPlanItem {
  const catalog = PRODUCT_CATALOG[productId];

  const generators: Record<
    ProductId,
    (input: GeneratorInput) => Omit<ContentPlanItem, "product_id" | "product_title">
  > = {
    adviento: generateAdvientoContent,
    recetario: generateRecetarioContent,
    plantillas: generatePlantillasContent,
    guia_ventas: generateGuiaVentasContent,
    kit_imprimible: generateKitImprimibleContent,
    taller_2026: generateTaller2026Content,
  };

  const content = generators[productId](input);

  return {
    product_id: productId,
    product_title: catalog.title,
    ...content,
  };
}

/**
 * ADVIENTO - Calendario de Adviento Digital
 */
function generateAdvientoContent(
  input: GeneratorInput
): Omit<ContentPlanItem, "product_id" | "product_title"> {
  return {
    deliverables: [
      "24 retos diarios (micro-actividades ≤60 palabras)",
      "Cada reto con versión normal y easy_variant",
      "3 días de demo (días 1, 2, 3) completamente desarrollados",
      "Diseño PDF descargable (Canva/Figma)",
      "Versión Notion editable con template",
    ],
    production_order: [
      "1. Brainstorm de 24 temas alineados a audiencia",
      "2. Redactar días 1-3 completos (demo)",
      "3. Redactar días 4-24 (sin spoilers mayores)",
      "4. Diseñar layout PDF con branding",
      "5. Crear template Notion con días bloqueados",
      "6. QA: verificar consistencia de tono y dificultad",
    ],
    generation_prompts: {
      brainstorm_temas: `Actúa como content strategist para ${input.target_audience}.
Genera 24 micro-retos navideños (uno por día de adviento) enfocados en ${input.primary_goal}.
Cada reto debe ser accionable en 10-15 minutos.
Tono: ${input.tone_voice}.
Formato: JSON array con estructura:
[
  {"dia": 1, "tema": "...", "categoria": "..."},
  ...
]
Categorías: mindset, acción_comercial, contenido, networking, aprendizaje, autocuidado.
`,
      redactar_reto: `Escribe el reto del día {DIA} para un calendario de adviento dirigido a ${input.target_audience}.

Tema: {TEMA}
Tono: ${input.tone_voice}

Formato de salida:
---
DÍA {DIA}: {TÍTULO_CORTO}
Reto: [descripción 40-60 palabras, accionable]
Por qué importa: [1 frase, beneficio claro]
Easy variant: [versión simplificada 20-30 palabras]
---

Ejemplo:
DÍA 1: Audita tu Bio
Reto: Revisa la bio de tu perfil principal. ¿Dice claramente qué haces y para quién? Reescríbela en 1 línea que un niño de 10 años entendería. Bonus: agrega un CTA claro.
Por qué importa: Tu bio es tu elevator pitch 24/7.
Easy variant: Lee tu bio en voz alta. Si no suena natural, cámbiala.
`,
      diseño_pdf: `Genera especificaciones de diseño para un PDF de Calendario de Adviento Digital.

Audiencia: ${input.target_audience}
Paleta: ${input.brand_constraints || "rojo navideño (#C41E3A), verde pino (#0F5C3C), dorado (#FFD700), blanco (#FFFFFF)"}
Formato: A4 vertical

Secciones necesarias:
- Portada con título y branding
- Página "Cómo usar este calendario"
- 24 páginas (1 por día) con estructura:
  * Número de día destacado
  * Título del reto
  * Descripción
  * Checkbox "Completado"
  * Espacio para notas
- Página final "¡Lo lograste!" con reflexión

Entrega: Lista de componentes visuales + medidas + fuentes sugeridas.
`,
    },
    acceptance_criteria: [
      "24 retos únicos, sin repetir conceptos",
      "Días 1-3 100% completos y pulidos (demo)",
      "Cada reto tiene versión normal + easy_variant",
      "Tono consistente en todos los textos",
      "PDF diseñado y exportable en alta calidad",
      "Template Notion funcional con días 4-24 bloqueados",
      "Tiempo estimado por reto: 10-15 min máximo",
    ],
    file_structure: [
      "adviento/",
      "  ├── content/",
      "  │   ├── dias_1-3_demo.md",
      "  │   ├── dias_4-24_completo.md",
      "  │   └── temas_brainstorm.json",
      "  ├── design/",
      "  │   ├── adviento_pdf_final.pdf",
      "  │   └── adviento_canva_link.txt",
      "  └── notion/",
      "      └── template_notion_url.txt",
    ],
    sample_examples: [
      `DÍA 1: Audita tu Bio
Reto: Revisa la bio de tu perfil principal. ¿Dice claramente qué haces y para quién? Reescríbela en 1 línea que un niño de 10 años entendería.
Por qué importa: Tu bio es tu elevator pitch 24/7.
Easy variant: Lee tu bio en voz alta. Si no suena natural, cámbiala.`,
      `DÍA 12: Comparte una Lección del Año
Reto: Publica 1 lección que aprendiste este año (profesional o personal). Sé vulnerable pero útil.
Por qué importa: La autenticidad genera conexión real.
Easy variant: Comparte una lección en 1 tweet/historia de IG.`,
    ],
  };
}

/**
 * RECETARIO - Recetario Navideño (ebook)
 */
function generateRecetarioContent(
  input: GeneratorInput
): Omit<ContentPlanItem, "product_id" | "product_title"> {
  return {
    deliverables: [
      "20 recetas navideñas mexicanas",
      "Cada receta: ingredientes (gramos/piezas), pasos, costo MXN aprox",
      "Alternativa saludable por receta (swap inteligente)",
      "Fotografía o ilustración por receta",
      "Índice + intro + tips generales",
    ],
    production_order: [
      "1. Seleccionar 20 recetas (balancear dulce/salado, dificultad)",
      "2. Redactar 5 recetas completas (testeo de formato)",
      "3. Redactar recetas 6-20",
      "4. Agregar swaps saludables y costos",
      "5. Diseñar layout ebook",
      "6. Agregar imágenes (stock o AI-generated)",
      "7. QA: verificar medidas, tiempos, costos",
    ],
    generation_prompts: {
      seleccion_recetas: `Actúa como chef especializado en cocina mexicana navideña.
Lista 20 recetas para un ebook dirigido a ${input.target_audience}.
Criterios:
- 60% tradicionales MX, 40% fusión moderna
- Balance: 10 dulces, 7 saladas, 3 bebidas
- Rango dificultad: 8 fáciles, 8 medias, 4 avanzadas
- Rendimiento: todas para 6 personas
- Ingredientes disponibles en supermercado MX promedio

Formato salida: JSON con [{"nombre": "...", "tipo": "dulce|salado|bebida", "dificultad": "..."}]
`,
      redactar_receta: `Redacta una receta de {NOMBRE_RECETA} para ebook navideño mexicano.

Audiencia: ${input.target_audience}
Rendimiento: 6 personas
Tono: ${input.tone_voice}

Estructura obligatoria:
---
## {NOMBRE_RECETA}
**Dificultad:** {Fácil|Media|Avanzada} | **Tiempo:** {X min prep + Y min cocción}

### Ingredientes
[Lista con cantidades exactas en gramos/piezas/tazas]
Costo aproximado: ${input.currency} {MONTO} (supermercado promedio, ${input.locale})

### Preparación
[5-7 pasos numerados, claros y concisos]

### Tip del Chef
[1-2 líneas con consejo profesional]

### Swap Saludable
[Alternativa para reducir calorías/azúcar sin perder sabor]
---

Ejemplo (Ponche Navideño):
Ingredientes:
- 3 litros de agua
- 300g de tejocotes
- 200g de guayabas
- 150g de caña de azúcar...
Costo aprox: MXN $120

Swap Saludable: Sustituye el piloncillo por stevia líquida (reduce 40% de azúcar).
`,
      diseño_ebook: `Especificaciones de diseño para ebook "Recetario Navideño".

Formato: PDF A5 (148x210mm) horizontal o vertical
Páginas estimadas: 50-60 (portada + índice + 20 recetas + cierre)
Paleta: ${input.brand_constraints || "rojo cálido, verde natural, crema"}
Tipografía: Sans-serif limpia para instrucciones, serif para títulos

Componentes:
1. Portada con foto hero de mesa navideña
2. Índice visual con miniaturas
3. Template página de receta:
   - Header con nombre + dificultad + tiempos
   - Columna izq: ingredientes en box
   - Columna der: pasos numerados
   - Footer: tip + swap saludable
4. Página final: recursos extra (conversiones, glosario)

Estilo fotográfico: natural light, top-down, ingredientes visibles.
`,
    },
    acceptance_criteria: [
      "20 recetas únicas y testeables",
      "Ingredientes en medidas exactas (no 'al gusto')",
      "Costos actualizados a 2024-2025",
      "Cada receta tiene swap saludable útil",
      "Tiempos de prep y cocción realistas",
      "Diseño profesional, fácil de seguir mientras cocinas",
      "PDF optimizado para impresión y pantalla",
    ],
    file_structure: [
      "recetario/",
      "  ├── content/",
      "  │   ├── recetas_1-5.md",
      "  │   ├── recetas_6-20.md",
      "  │   ├── intro_y_tips.md",
      "  │   └── seleccion_recetas.json",
      "  ├── design/",
      "  │   ├── recetario_final.pdf",
      "  │   └── recetario_canva_link.txt",
      "  └── images/",
      "      └── [20 imágenes, nombradas por receta]",
    ],
    sample_examples: [
      `## Ponche Navideño Tradicional
**Dificultad:** Fácil | **Tiempo:** 10 min prep + 40 min cocción

### Ingredientes
- 3 litros de agua
- 300g de tejocotes
- 200g de guayabas
- 150g de caña de azúcar...

[Ver prompt completo arriba para ejemplo extendido]`,
    ],
  };
}

/**
 * PLANTILLAS - Pack de Plantillas Navideñas (Canva)
 */
function generatePlantillasContent(
  input: GeneratorInput
): Omit<ContentPlanItem, "product_id" | "product_title"> {
  return {
    deliverables: [
      "50 plantillas Canva: 20 posts 1:1, 20 stories 9:16, 10 covers reels",
      "Guía de uso PDF (mejores prácticas, cómo personalizar)",
      "Paleta de colores navideña sugerida",
      "50 captions cortos (≤90 caracteres) como inspiración",
    ],
    production_order: [
      "1. Definir 10 categorías de contenido (ej: ofertas, tips, quotes)",
      "2. Diseñar 5 posts + 5 stories + 2 covers (prototipos)",
      "3. Producir restantes 35 plantillas variando colores/layouts",
      "4. Redactar 50 captions cortos",
      "5. Crear guía de uso con screenshots",
      "6. Empaquetar: links Canva + guía PDF",
    ],
    generation_prompts: {
      categorias_contenido: `Lista 10 categorías de contenido navideño para ${input.target_audience}.
Ejemplos: ofertas especiales, tips útiles, quotes inspiracionales, behind-the-scenes, testimonials, countdown, FAQs, storytelling, CTA directos, celebración de logros.
Asegura balance entre promocional (40%) y valor puro (60%).`,
      diseñar_plantilla: `Especificaciones para plantilla Canva {TIPO} - Categoría: {CATEGORIA}

Tipo: {Post 1:1 (1080x1080) | Story 9:16 (1080x1920) | Cover Reel (1080x1920)}
Audiencia: ${input.target_audience}
Tono visual: ${input.tone_voice} + festivo navideño
Paleta base: ${input.brand_constraints || "rojo (#C41E3A), verde (#0F5C3C), dorado (#FFD700), blanco (#FEFEFE)"}

Componentes obligatorios:
- Espacio para logo marca (esquina superior, 100x100px)
- Headline {tamaño según tipo}
- Body text editable (2-3 líneas)
- Elemento visual navideño sutil (no abrumar)
- CTA o footer con handle/web

Restricciones:
- Fuentes: máximo 2 por plantilla
- Contraste alto (legible en móvil)
- Espacios editables claramente marcados

Entrega: Descripción de layout + paleta + fuentes + elementos visuales.
`,
      caption_corto: `Genera {N} captions cortos (≤90 caracteres) para contenido navideño.

Audiencia: ${input.target_audience}
Tono: ${input.tone_voice}
Objetivo: ${input.primary_goal}

Formato:
1. {Caption con emoji inicial} #{hashtag}
2. ...

Ejemplos:
1. 🎁 Última semana de ofertas. No te quedes fuera. #NavidadDigital
2. ✨ Este año sí cierras bien. Aquí te ayudamos. #Emprendedores
3. 🎄 3 días para el launch. ¿Listos? #TeamCreativo
`,
      guia_uso: `Redacta guía de uso (2 páginas) para pack de 50 plantillas Canva.

Secciones:
1. Bienvenida: qué incluye el pack
2. Cómo acceder: enlace Canva, permisos
3. Cómo personalizar:
   - Cambiar colores de marca
   - Subir logo
   - Editar textos
   - Exportar (PNG vs MP4 para reels)
4. Mejores prácticas:
   - Consistencia visual
   - Frecuencia de publicación sugerida
   - Adaptación por plataforma (IG vs LinkedIn)
5. Inspiración de captions (remitir a lista)
6. Soporte: email o comunidad

Tono: claro, paso a paso, screenshots donde sea posible.
`,
    },
    acceptance_criteria: [
      "50 plantillas funcionales en Canva",
      "Todas editables (no plantillas bloqueadas)",
      "Espacios para logo/marca claramente marcados",
      "Balance de layouts: no repetitivo",
      "Guía PDF con screenshots reales",
      "50 captions inspiracionales incluidos",
      "Testing en mobile (legibilidad)",
    ],
    file_structure: [
      "plantillas/",
      "  ├── canva_links/",
      "  │   ├── posts_1x1_links.txt (20 links)",
      "  │   ├── stories_9x16_links.txt (20 links)",
      "  │   └── covers_reels_links.txt (10 links)",
      "  ├── captions/",
      "  │   └── 50_captions_cortos.md",
      "  ├── guia/",
      "  │   ├── guia_uso.pdf",
      "  │   └── guia_uso.md (source)",
      "  └── paleta/",
      "      └── paleta_colores.png",
    ],
    sample_examples: [
      `PLANTILLA: Post 1:1 - Oferta Especial
Layout: Fondo degradado rojo-dorado, headline centrado, precio en círculo destacado, footer con CTA.
Texto editable: [NOMBRE OFERTA] | [% DESCUENTO] | [FECHA LÍMITE]
Caption sugerido: 🎁 Última semana de ofertas. No te quedes fuera. #NavidadDigital`,
      `PLANTILLA: Story 9:16 - Countdown
Layout: Vertical, número grande arriba (días restantes), texto motivacional centro, swipe-up/link abajo.
Animación sugerida: fade-in del número.
Caption sugerido: ⏰ Solo quedan 3 días. ¿Ya tienes tu plan? #FinDeAño`,
    ],
  };
}

/**
 * GUÍA VENTAS - Guía: Cerrar el Año con Más Ventas
 */
function generateGuiaVentasContent(
  input: GeneratorInput
): Omit<ContentPlanItem, "product_id" | "product_title"> {
  return {
    deliverables: [
      "Mini-playbook de 12 páginas (PDF)",
      "3 checklists accionables (pre-launch, launch, post-launch)",
      "Calendario de 10 días para ejecución",
      "KPI cheat-sheet (métricas clave a trackear)",
    ],
    production_order: [
      "1. Outline de 12 páginas (estructura + títulos)",
      "2. Redactar páginas 1-6 (contexto + estrategia)",
      "3. Redactar páginas 7-12 (tácticas + checklist integrado)",
      "4. Crear 3 checklists standalone",
      "5. Diseñar calendario visual de 10 días",
      "6. Crear KPI cheat-sheet (1 página)",
      "7. Diseño final PDF con branding",
    ],
    generation_prompts: {
      outline_playbook: `Crea outline de mini-playbook "Cerrar el Año con Más Ventas" (12 páginas).

Audiencia: ${input.target_audience}
Objetivo: ${input.primary_goal}
Tono: ${input.tone_voice}

Estructura sugerida:
Pág 1: Portada
Pág 2: Por qué fin de año es clave (contexto + psicología compra)
Pág 3-4: Framework de 3 pilares (oferta, audiencia, ejecución)
Pág 5-6: Pilar 1 - Diseña tu oferta irresistible
Pág 7-8: Pilar 2 - Calienta tu audiencia
Pág 9-10: Pilar 3 - Ejecuta con momentum
Pág 11: Checklist integrado + calendario 10 días
Pág 12: KPI cheat-sheet + cierre

Cada página: 1 concepto clave + 2-3 bullets accionables.
`,
      redactar_pagina: `Redacta contenido para página {N} del playbook.

Título: {TÍTULO_PÁGINA}
Concepto clave: {CONCEPTO}
Audiencia: ${input.target_audience}

Formato:
---
## {TÍTULO}

{Introducción del concepto en 2-3 líneas}

### Accionables
- {Punto 1 con táctica específica}
- {Punto 2 con ejemplo real}
- {Punto 3 con métrica de éxito}

### Ejemplo Rápido
{Mini caso de estudio o aplicación práctica en 40-60 palabras}

---

Longitud total: ~200 palabras por página (legible en 2 min).
`,
      checklist_prelaunch: `Genera checklist PRE-LAUNCH para campaña de ventas fin de año.

Audiencia: ${input.target_audience}
Canales: ${input.channels.join(", ")}
Stack: ${input.sales_stack} + ${input.email_stack}

Categorías:
□ Oferta & Pricing (4-5 items)
□ Infraestructura Técnica (3-4 items)
□ Contenido & Creativos (4-5 items)
□ Audiencia & Segmentación (2-3 items)

Formato:
□ {Task específico} — Owner: {Rol} — Deadline: {D-X días}

Ejemplo:
□ Validar checkout funcional en mobile — Owner: Tech — Deadline: D-7
□ Subir 3 posts teaser a redes — Owner: Content — Deadline: D-5
`,
      calendario_10_dias: `Diseña calendario visual de ejecución de 10 días para lanzamiento fin de año.

Objetivo: ${input.primary_goal}
Canales: ${input.channels.join(", ")}

Por cada día (D-10 a D-0 / Launch):
- Fecha ejemplo (ajustable)
- Tarea principal del día (1 frase)
- Canal prioritario
- KPI a monitorear

Formato: Tabla Markdown o especificaciones para diseño visual.

Ejemplo:
| Día | Fecha (ej) | Tarea Principal | Canal | KPI |
|-----|------------|-----------------|-------|-----|
| D-10 | 15 Dic | Teaser inicial + lista de espera | Email + X | Registros |
| D-7  | 18 Dic | Webinar o live previo | IG Live | Asistencia |
| ...  | ... | ... | ... | ... |
| D-0  | 25 Dic | LAUNCH oficial + email blast | All | Ventas |
`,
      kpi_cheatsheet: `Crea KPI cheat-sheet (1 página) para campaña de ventas digitales.

Objetivo: ${input.primary_goal}
Stack: ${input.sales_stack}

Secciones:
1. KPIs de Tráfico: Visitas, Fuentes, Bounce Rate
2. KPIs de Conversión: Leads, Add-to-cart, Checkout started, Purchase
3. KPIs de Revenue: Ventas totales, AOV (ticket promedio), LTV proyectado
4. KPIs de Engagement: Email open rate, CTR, social engagement
5. Umbrales Éxito (GO/MAYBE/KILL) — 3 niveles por KPI

Formato: Tabla visual con columnas [Métrica | Cómo medirla | Umbral Éxito].
`,
    },
    acceptance_criteria: [
      "Playbook de exactamente 12 páginas (no más)",
      "Contenido accionable, no teórico",
      "3 checklists completos y distintos entre sí",
      "Calendario de 10 días con fechas ejemplo ajustables",
      "KPI cheat-sheet cabe en 1 página imprimible",
      "Diseño profesional y cohesivo",
      "Tono alineado a audiencia (no genérico)",
    ],
    file_structure: [
      "guia_ventas/",
      "  ├── content/",
      "  │   ├── outline_playbook.md",
      "  │   ├── paginas_1-6.md",
      "  │   ├── paginas_7-12.md",
      "  │   ├── checklist_prelaunch.md",
      "  │   ├── checklist_launch.md",
      "  │   ├── checklist_postlaunch.md",
      "  │   ├── calendario_10dias.md",
      "  │   └── kpi_cheatsheet.md",
      "  └── design/",
      "      ├── guia_ventas_final.pdf",
      "      └── guia_canva_link.txt",
    ],
    sample_examples: [
      `## Página 5: Diseña tu Oferta Irresistible

Una oferta no es solo "producto + precio". Es la percepción de valor que genera urgencia.

### Accionables
- Define tu core offer + 2 bonuses de alto valor percibido, bajo costo entrega
- Establece deadline real (no fake scarcity): fin de año ES una deadline natural
- Crea 3 tiers: básico, pro, VIP — deja que tu audiencia elija

### Ejemplo Rápido
María vendía curso de IG a $99. Agregó bonus "30 captions listos" + "Plantillas Stories" + precio especial $79 hasta 31 Dic. Resultado: 3x conversión vs. precio regular.
`,
    ],
  };
}

/**
 * KIT IMPRIMIBLE - Kit Imprimible de Navidad
 */
function generateKitImprimibleContent(
  input: GeneratorInput
): Omit<ContentPlanItem, "product_id" | "product_title"> {
  return {
    deliverables: [
      "PDF de 20 páginas imprimibles",
      "Contenido: etiquetas regalos, tarjetas, bingo, sopa de letras, listas",
      "Versión a color + versión B/N (coloreable)",
      "Página de instrucciones de uso",
    ],
    production_order: [
      "1. Seleccionar 5 categorías de imprimibles (ver prompt)",
      "2. Diseñar layout de cada categoría (prototipos)",
      "3. Producir 20 páginas variadas",
      "4. Crear versión B/N para colorear",
      "5. Agregar página de instrucciones",
      "6. QA: imprimir test en papel carta",
    ],
    generation_prompts: {
      categorias_imprimibles: `Lista 5 categorías de imprimibles navideños para ${input.target_audience}.

Distribución sugerida:
- 6 páginas: Etiquetas para regalos (varios diseños, recortables)
- 4 páginas: Tarjetas navideñas (doblables, con mensaje interior)
- 3 páginas: Juegos (bingo, sopa de letras, crucigrama)
- 5 páginas: Listas útiles (regalos, compras, menú cena, propósitos 2026)
- 2 páginas: Decoración (banderines, toppers, etc.)

Cada categoría debe ser funcional y usable en casa.
`,
      diseñar_etiquetas: `Diseña página de etiquetas para regalos (formato carta 8.5x11").

Especificaciones:
- 6-8 etiquetas por hoja
- Formas: círculos, rectángulos, etiquetas colgantes
- Texto editable: "Para: ___ De: ___"
- Diseños variados: clásico, moderno, minimalista
- Líneas de corte claramente marcadas
- Paleta: ${input.brand_constraints || "rojo, verde, dorado, plateado"}

Versión color + versión B/N (para colorear).

Entrega: Specs de layout + medidas + elementos visuales por etiqueta.
`,
      juego_bingo: `Crea tablero de Bingo Navideño para juego familiar.

Temática: tradiciones navideñas mexicanas
Cuadrícula: 5x5 (24 casillas + 1 centro "FREE")
Casillas ejemplo:
- "Romper piñata"
- "Comer tamales"
- "Cantar villancicos"
- "Ver luces navideñas"
- "Ponche caliente"
...

Genera 24 actividades únicas, mezclando tradiciones MX y universales.
Incluye 2 tableros distintos para que no todos tengan el mismo.

Formato: PDF imprimible, marcadores recortables incluidos.
`,
      lista_compras: `Diseña lista de compras navideñas imprimible.

Categorías:
- Despensa (ingredientes ponche, cena, postres)
- Decoración (luces, esferas, nacimiento)
- Regalos (por persona, con presupuesto)
- Otros (pilas, papel regalo, tarjetas)

Formato: Tabla con columnas:
| Item | Cantidad | Comprado ✓ | Costo Aprox |

Diseño: limpio, checkboxes grandes, espacio para notas.
Cabe en 1 página carta.
`,
    },
    acceptance_criteria: [
      "20 páginas imprimibles en papel carta (8.5x11\")",
      "Alta calidad (300dpi) para impresión casera",
      "Versión color + versión B/N para colorear",
      "Instrucciones de uso claras (1 página)",
      "Testing real: imprimir y validar usabilidad",
      "Balance entre decorativo y funcional",
    ],
    file_structure: [
      "kit_imprimible/",
      "  ├── imprimibles_color.pdf (20 págs)",
      "  ├── imprimibles_bn_colorear.pdf (20 págs)",
      "  ├── instrucciones_uso.pdf (1 pág)",
      "  └── source/",
      "      └── [archivos fuente Canva/Figma]",
    ],
    sample_examples: [
      `Página 3: Etiquetas Regalos (8 diseños variados)
- 4 etiquetas redondas (Ø 2")
- 4 etiquetas rectangulares (2"x3")
Texto: "Para: ___ De: ___" + elemento decorativo (estrella, árbol, reno, copo nieve)
Colores: rojo (#C41E3A), verde (#0F5C3C), dorado (#FFD700)`,
    ],
  };
}

/**
 * TALLER 2026 - Taller en Vivo: Planea tu 2026 con Propósito
 */
function generateTaller2026Content(
  input: GeneratorInput
): Omit<ContentPlanItem, "product_id" | "product_title"> {
  return {
    deliverables: [
      "Temario detallado de taller 90 min",
      "Slides/presentación (15-20 slides)",
      "Workbook digital simple (PDF 8-10 págs)",
      "Template Notion para metas 2026",
      "Email de seguimiento post-taller",
    ],
    production_order: [
      "1. Definir temario de 90 min (bloques + timings)",
      "2. Crear outline de slides",
      "3. Redactar contenido de slides (15-20)",
      "4. Diseñar workbook (ejercicios prácticos)",
      "5. Crear template Notion (metas + tracking)",
      "6. Redactar email de seguimiento",
      "7. QA: ensayar taller completo",
    ],
    generation_prompts: {
      temario_90min: `Diseña temario de taller en vivo "Planea tu 2026 con Propósito" (90 min).

Audiencia: ${input.target_audience}
Objetivo: Que salgan con plan accionable de Q1 2026
Tono: ${input.tone_voice}

Estructura sugerida:
[0-10 min] Bienvenida + contexto (por qué planear importa)
[10-30 min] Bloque 1: Reflexión 2024 (ejercicio guiado: wins, lecciones, patrones)
[30-55 min] Bloque 2: Visión 2026 (ejercicio: año ideal, pilares, metas SMART)
[55-75 min] Bloque 3: Plan Q1 (elegir 1-3 metas, desglosar en acciones, calendario)
[75-85 min] Bloque 4: Accountability (sistema de tracking, cómo no abandonar)
[85-90 min] Q&A + cierre (próximos pasos, recursos)

Por cada bloque: timing + objetivo + actividad/ejercicio.
`,
      outline_slides: `Crea outline de presentación (15-20 slides) para taller 90 min.

Reglas:
- 1 slide ≈ 4-5 min de contenido
- Intercalar teoría (40%) y ejercicios (60%)
- Slides de ejercicio claramente marcados con timer
- No saturar de texto (máx 5 bullets por slide)

Formato:
Slide {N}: {Título} — Timing: {X-Y min}
Contenido: {Resumen breve}
Tipo: {Teoría | Ejercicio | Transición}

Ejemplo:
Slide 3: Tu Año en 3 Palabras — Timing: 10-15 min
Contenido: Ejercicio guiado — pedir a asistentes resumir su 2024 en 3 palabras clave. Compartir en chat.
Tipo: Ejercicio
`,
      workbook_contenido: `Redacta workbook digital (8-10 págs PDF) para taller "Planea tu 2026".

Estructura:
Pág 1: Portada + bienvenida
Pág 2: Ejercicio 1 — Reflexión 2024 (preguntas guiadas)
Pág 3: Ejercicio 2 — Mi año ideal 2026 (visualización)
Pág 4-5: Ejercicio 3 — Metas SMART Q1 (template por meta)
Pág 6: Ejercicio 4 — Calendario 90 días (visual semanal)
Pág 7: Sistema de accountability (tracker simple)
Pág 8: Recursos + próximos pasos

Cada ejercicio: instrucciones claras + espacio para escribir/dibujar.

Tono: ${input.tone_voice}, motivacional pero realista.
`,
      template_notion: `Especificaciones para template Notion "Mis Metas 2026".

Estructura de página:
1. Header: Título "Mis Metas 2026" + cita inspiracional
2. Sección "Visión del Año" (texto libre)
3. Database "Metas 2026":
   - Propiedades: Nombre, Área (trabajo/salud/finanzas/personal), Status (🟢🟡🔴), Deadline, Prioridad
   - Vistas: Kanban por Status, Calendar por Deadline, Table completa
4. Sección "Plan Q1" (sub-tareas por meta)
5. Sección "Check-ins Mensuales" (toggle list por mes)
6. Sección "Recursos" (links útiles)

Instrucciones de duplicado incluidas.
`,
      email_seguimiento: `Redacta email de seguimiento post-taller (enviar 24h después).

Audiencia: Asistentes al taller "Planea tu 2026"
Objetivo: Reforzar aprendizajes, entregar recursos, invitar a acción

Estructura:
---
Asunto: [Nombre], aquí están tus recursos del taller 🎯

Hola [Nombre],

[Párrafo 1: Agradecimiento + recap de taller]

[Párrafo 2: Link a grabación + workbook + template Notion]

[Párrafo 3: Challenge de 7 días — completar ejercicio X y compartir en comunidad]

[Párrafo 4: Invitación a siguiente paso (comunidad, producto, etc.)]

[Firma + PS con tip rápido]
---

Tono: ${input.tone_voice}, cálido pero con CTA claro.
Longitud: 200-300 palabras.
`,
    },
    acceptance_criteria: [
      "Temario de 90 min con timings realistas",
      "15-20 slides diseñados (Canva/Google Slides)",
      "Workbook PDF funcional con ejercicios claros",
      "Template Notion duplicable y fácil de usar",
      "Email de seguimiento redactado",
      "Taller ensayado (timing verificado)",
      "Acceso a grabación configurado (30 días)",
    ],
    file_structure: [
      "taller_2026/",
      "  ├── temario_90min.md",
      "  ├── slides/",
      "  │   ├── presentacion_taller.pdf",
      "  │   └── slides_canva_link.txt",
      "  ├── workbook/",
      "  │   ├── workbook_planea2026.pdf",
      "  │   └── workbook_source.md",
      "  ├── notion/",
      "  │   └── template_metas2026_url.txt",
      "  └── email/",
      "      └── email_seguimiento.md",
    ],
    sample_examples: [
      `BLOQUE 2: Visión 2026 (30-55 min)

Slide 7: Tu Año Ideal en 1 Párrafo
Ejercicio: Escribe cómo se vería tu año ideal 2026 si todo saliera bien. No censures. Solo imagina.
Timer: 5 min escritura individual.

Slide 8: Identifica tus 3 Pilares
Teoría: De tu párrafo anterior, extrae 3 áreas clave (ej: salud, negocio, relaciones).
Ejercicio: Nómbralas. Estas serán tus guías.

[Continúa con siguiente slide...]`,
    ],
  };
}

/**
 * Exporta el contenido como Markdown formateado
 */
export function contentPlanToMarkdown(items: ContentPlanItem[]): string {
  let markdown = `# Plan de Contenidos - Holiday MVP\n\n`;
  markdown += `*Generado automáticamente por Holiday MVP Generator*\n\n`;
  markdown += `---\n\n`;

  items.forEach((item, index) => {
    markdown += `## ${index + 1}. ${item.product_title}\n\n`;

    markdown += `### Entregables\n\n`;
    item.deliverables.forEach((d) => {
      markdown += `- ${d}\n`;
    });
    markdown += `\n`;

    markdown += `### Orden de Producción\n\n`;
    item.production_order.forEach((step) => {
      markdown += `${step}\n`;
    });
    markdown += `\n`;

    markdown += `### Prompts de Generación\n\n`;
    Object.entries(item.generation_prompts).forEach(([key, prompt]) => {
      markdown += `#### ${key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}\n\n`;
      markdown += `\`\`\`\n${prompt.trim()}\n\`\`\`\n\n`;
    });

    markdown += `### Criterios de Aceptación\n\n`;
    item.acceptance_criteria.forEach((criteria) => {
      markdown += `- ✅ ${criteria}\n`;
    });
    markdown += `\n`;

    markdown += `### Estructura de Archivos\n\n`;
    markdown += `\`\`\`\n${item.file_structure.join("\n")}\n\`\`\`\n\n`;

    markdown += `### Ejemplos de Muestra\n\n`;
    item.sample_examples.forEach((example) => {
      markdown += `\`\`\`\n${example}\n\`\`\`\n\n`;
    });

    markdown += `---\n\n`;
  });

  return markdown;
}
