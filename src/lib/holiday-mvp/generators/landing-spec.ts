/**
 * Holiday MVP Generator - Landing Spec Generator
 * Genera especificaciones completas de landing pages
 */

import type {
  GeneratorInput,
  LandingSpec,
  Product,
  SKU,
  FAQ,
  ValueProp,
  HowItWorksStep,
  Currency,
} from "../types";
import { PRODUCT_CATALOG, calculateBundlePrice } from "../catalog";

/**
 * Genera la especificación completa de la landing page
 */
export function generateLandingSpec(input: GeneratorInput): LandingSpec {
  const assumptions: string[] = [];

  // Validar y usar defaults
  const tone = input.tone_voice || "profesional y cercano";
  const baseUrl = "https://tudominio.com"; // TODO: configurar

  if (!input.brand_constraints) {
    assumptions.push(
      "No se especificaron constraints de marca, usando paleta navideña estándar"
    );
  }

  return {
    brand: {
      name: input.brand_name,
      tone: tone,
      locale: input.locale,
    },
    hero: generateHero(input, baseUrl),
    value_props: generateValueProps(input),
    how_it_works: generateHowItWorks(input),
    products: generateProducts(input, baseUrl),
    pricing_table: generatePricingTable(input, baseUrl),
    faq: generateFAQ(input),
    social_proof: {
      testimonials: generateTestimonials(input),
    },
    analytics: {
      vercel: true,
      facebook_pixel: false,
      events: ["view_content", "begin_checkout", "purchase"],
    },
    legal: {
      privacy_url: `${baseUrl}/privacy-policy`,
      terms_url: `${baseUrl}/tos`,
    },
  };
}

function generateHero(input: GeneratorInput, baseUrl: string) {
  const isSales = input.primary_goal.includes("venta");
  const isLeads = input.primary_goal.includes("lead");

  const headlines: Record<string, string> = {
    default: `🎄 Cierra ${new Date().getFullYear()} con productos que tu audiencia amará`,
    sales: `Productos Navideños Listos para Vender Hoy`,
    leads: `Descarga Recursos Navideños para Crecer tu Negocio`,
  };

  const headline = isSales
    ? headlines.sales
    : isLeads
      ? headlines.leads
      : headlines.default;

  return {
    headline,
    subheadline: `${input.products_to_include.length} productos digitales diseñados para ${input.target_audience}. Descarga inmediata, uso ilimitado.`,
    primary_cta: {
      label: isSales ? "Ver Productos" : "Descargar Ahora",
      href: `${baseUrl}?utm_source=hero#pricing`,
      note: "checkout",
    },
    secondary_cta: {
      label: "Probar Demo Gratis",
      href: `${baseUrl}?utm_source=hero#demo`,
    },
  };
}

function generateValueProps(input: GeneratorInput): ValueProp[] {
  return [
    {
      icon: "🎁",
      title: "Descarga Inmediata",
      desc: "Acceso instantáneo tras la compra. Sin esperas, sin complicaciones.",
    },
    {
      icon: "⚡",
      title: "Listo para Usar",
      desc: "Plantillas y contenidos 100% editables. Personaliza en minutos.",
    },
    {
      icon: "💰",
      title: "Uso Comercial",
      desc: `Revende, regala o usa en tu negocio. Licencia ${input.legal_notes ? "especificada" : "flexible"}.`,
    },
    {
      icon: "🎯",
      title: "Especializado",
      desc: `Diseñado específicamente para ${input.target_audience} con expertise real.`,
    },
  ];
}

function generateHowItWorks(input: GeneratorInput): HowItWorksStep[] {
  const isSales = input.primary_goal.includes("venta");

  return [
    {
      step: "1",
      title: "Elige tu Producto",
      desc: `Selecciona entre ${input.products_to_include.length} productos o compra el bundle completo.`,
    },
    {
      step: "2",
      title: isSales ? "Paga Seguro" : "Regístrate",
      desc: isSales
        ? `Pago seguro con ${input.sales_stack}. ${input.currency} aceptado.`
        : `Déjanos tu email y recibe acceso inmediato.`,
    },
    {
      step: "3",
      title: "Descarga y Usa",
      desc: "Accede a tu dashboard, descarga todo y comienza a crear de inmediato.",
    },
  ];
}

function generateProducts(input: GeneratorInput, baseUrl: string): Product[] {
  return input.products_to_include.map((productId) => {
    const catalog = PRODUCT_CATALOG[productId];
    const price = catalog.price_suggested[input.currency] || 0;

    // Convertir price a otros currencies para mostrar
    const altPrices: Partial<Record<Currency, number>> = {};
    if (input.currency === "MXN" && catalog.price_suggested.USD) {
      altPrices.USD = catalog.price_suggested.USD;
    } else if (input.currency === "USD" && catalog.price_suggested.MXN) {
      altPrices.MXN = catalog.price_suggested.MXN;
    }

    return {
      id: productId,
      title: catalog.title,
      bullets: generateProductBullets(productId, catalog.deliverables),
      price: {
        currency: input.currency,
        value: price,
        alt: Object.keys(altPrices).length > 0 ? altPrices : undefined,
      },
      cta_buy: {
        label: "Comprar Ahora",
        href: `${baseUrl}/checkout?product=${productId}&utm_source=product_card`,
      },
      cta_try: {
        label: "Ver Demo",
        href: `${baseUrl}/demo/${productId}`,
      },
      tags: ["navidad", ...(catalog.bundleable ? ["bundleable"] : [])],
    };
  });
}

function generateProductBullets(
  productId: string,
  deliverables: string[]
): string[] {
  const bullets: Record<string, string[]> = {
    adviento: [
      "24 retos diarios con versión fácil y avanzada",
      "3 días de demo gratuitos para probar",
      "Formato PDF + Notion editable",
    ],
    recetario: [
      "20 recetas mexicanas para 6 personas",
      "Costos aproximados y alternativas saludables",
      "Diseño imprimible y digital",
    ],
    plantillas: [
      "50 plantillas Canva: posts, stories y covers",
      "Guía de uso con mejores prácticas",
      "Espacios editables para logo y colores",
    ],
    guia_ventas: [
      "Mini-playbook de 12 páginas accionables",
      "3 checklists + calendario de 10 días",
      "KPI cheat-sheet incluido",
    ],
    kit_imprimible: [
      "20 páginas: etiquetas, tarjetas, juegos",
      "Listo para imprimir en casa",
      "Incluye bingo, sopa de letras y listas",
    ],
    taller_2026: [
      "Taller en vivo de 90 minutos",
      "Workbook digital + plantilla Notion",
      "Acceso a grabación por 30 días",
    ],
  };

  return bullets[productId] || deliverables;
}

function generatePricingTable(
  input: GeneratorInput,
  baseUrl: string
): {
  skus: SKU[];
  notes: string;
} {
  const skus: SKU[] = input.products_to_include.map((productId) => {
    const catalog = PRODUCT_CATALOG[productId];
    return {
      id: `sku_${productId}`,
      title: catalog.title,
      price: catalog.price_suggested,
      deliverables: catalog.deliverables,
      cta: `${baseUrl}/checkout?product=${productId}`,
    };
  });

  // Agregar bundle si hay productos bundleables
  const bundleableProducts = input.products_to_include.filter(
    (id) => PRODUCT_CATALOG[id].bundleable
  );

  if (bundleableProducts.length >= 2) {
    const bundlePrice = {
      MXN: calculateBundlePrice(bundleableProducts, "MXN", 20),
      USD: calculateBundlePrice(bundleableProducts, "USD", 20),
    };

    skus.push({
      id: "sku_bundle_navidad",
      title: "🎁 Bundle Navidad Completo",
      price: bundlePrice,
      includes: bundleableProducts,
      cta: `${baseUrl}/checkout?product=bundle`,
    });
  }

  return {
    skus,
    notes:
      input.legal_notes ||
      "Pago seguro. Descarga inmediata. Garantía de 7 días si no has descargado.",
  };
}

function generateFAQ(input: GeneratorInput): FAQ[] {
  const isSales = input.primary_goal.includes("venta");

  const baseFAQ: FAQ[] = [
    {
      q: "¿Cómo recibo los productos después de comprar?",
      a: `Tras completar tu pago en ${input.sales_stack}, recibirás un email con acceso a tu dashboard. Ahí encontrarás todos tus productos listos para descargar.`,
    },
    {
      q: "¿Puedo usar estos productos comercialmente?",
      a:
        input.legal_notes ||
        "Sí, todos los productos incluyen licencia de uso comercial. Puedes revenderlos, regalarlos o usarlos en tu negocio.",
    },
    {
      q: "¿Los precios incluyen impuestos?",
      a: `Los precios están en ${input.currency}. Dependiendo de tu ubicación, pueden aplicar impuestos locales que se mostrarán en el checkout.`,
    },
    {
      q: "¿Hay garantía de devolución?",
      a: "Sí, garantía de 7 días sin preguntas si aún no has descargado los archivos. Contáctanos para procesar tu reembolso.",
    },
  ];

  if (!isSales) {
    baseFAQ.unshift({
      q: "¿Es realmente gratis?",
      a: "Sí, algunos productos tienen versiones demo o acceso gratuito limitado. Regístrate con tu email para acceder.",
    });
  }

  return baseFAQ;
}

function generateTestimonials(input: GeneratorInput) {
  // Templates genéricos - en producción real estos vendrían de una DB
  return [
    {
      quote:
        "Exactamente lo que necesitaba para cerrar el año con contenido de calidad. ¡Súper recomendado!",
      author: "María G., Content Creator",
    },
    {
      quote: `Los productos de ${input.brand_name} me ahorraron semanas de trabajo. Calidad profesional lista para usar.`,
      author: "Carlos R., Emprendedor",
    },
  ];
}
