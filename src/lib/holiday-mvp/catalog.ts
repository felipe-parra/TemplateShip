/**
 * Holiday MVP Generator - Product Catalog
 * Catálogo oficial de productos navideños con precios y deliverables
 */

import type { ProductDefinition, ProductId } from "./types";

export const PRODUCT_CATALOG: Record<ProductId, ProductDefinition> = {
  adviento: {
    id: "adviento",
    title: "Calendario de Adviento Digital",
    deliverables: ["PDF/Notion con 24 días (3 días abiertos de demo)"],
    price_suggested: { MXN: 129, USD: 7 },
    bundleable: true,
  },
  recetario: {
    id: "recetario",
    title: "Recetario Navideño (ebook)",
    deliverables: ["Ebook 20 recetas MX (costos aprox, swaps saludables)"],
    price_suggested: { MXN: 159, USD: 9 },
    bundleable: true,
  },
  plantillas: {
    id: "plantillas",
    title: "Pack de Plantillas Navideñas (Canva)",
    deliverables: [
      "50 plantillas: 20 post 1:1, 20 stories 9:16, 10 covers reels + guía",
    ],
    price_suggested: { MXN: 219, USD: 12 },
    bundleable: true,
  },
  guia_ventas: {
    id: "guia_ventas",
    title: "Guía: Cerrar el Año con Más Ventas",
    deliverables: ["Mini-playbook 12 págs + 3 checklists + calendario 10 días"],
    price_suggested: { MXN: 279, USD: 15 },
    bundleable: true,
  },
  kit_imprimible: {
    id: "kit_imprimible",
    title: "Kit Imprimible de Navidad",
    deliverables: ["PDF 20 págs: etiquetas, tarjetas, bingo/sopa, listas"],
    price_suggested: { MXN: 109, USD: 6 },
    bundleable: true,
  },
  taller_2026: {
    id: "taller_2026",
    title: "Taller en Vivo: Planea tu 2026 con Propósito",
    deliverables: ["Temario 90 min, workbook simple, plantilla Notion metas"],
    price_suggested: { MXN: 349, USD: 19 },
    bundleable: false,
  },
};

/**
 * Valida que un product_id exista en el catálogo
 */
export function isValidProductId(id: string): id is ProductId {
  return id in PRODUCT_CATALOG;
}

/**
 * Obtiene todos los productos bundleables
 */
export function getBundleableProducts(): ProductDefinition[] {
  return Object.values(PRODUCT_CATALOG).filter((p) => p.bundleable);
}

/**
 * Calcula precio de bundle con descuento
 */
export function calculateBundlePrice(
  products: ProductId[],
  currency: "MXN" | "USD",
  discountPercent: number = 20
): number {
  const total = products.reduce((sum, id) => {
    const price = PRODUCT_CATALOG[id].price_suggested[currency] || 0;
    return sum + price;
  }, 0);

  return Math.round(total * (1 - discountPercent / 100));
}
