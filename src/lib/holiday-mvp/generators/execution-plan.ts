/**
 * Holiday MVP Generator - Execution Plan Generator
 * Genera plan de ejecución de fin de semana con cronograma y métricas
 */

import type {
  GeneratorInput,
  ExecutionPlan,
  ScheduleBlock,
  DistributionAction,
} from "../types";

/**
 * Genera plan de ejecución completo para fin de semana
 */
export function generateExecutionPlan(input: GeneratorInput): ExecutionPlan {
  const isHighVolume =
    input.primary_goal.includes("200") || input.primary_goal.includes("100");

  return {
    objective: generateObjective(input),
    success_metrics: generateSuccessMetrics(input, isHighVolume),
    saturday_schedule: generateSaturdaySchedule(input),
    sunday_schedule: generateSundaySchedule(input),
    roles: generateRoles(),
    publication_checklist: generatePublicationChecklist(input),
    distribution_plan: generateDistributionPlan(input),
    experiments: generateExperiments(input, isHighVolume),
  };
}

function generateObjective(input: GeneratorInput): string {
  const productsCount = input.products_to_include.length;
  const isSales = input.primary_goal.includes("venta");
  const isLeads = input.primary_goal.includes("lead");

  if (isSales && isLeads) {
    return `Lanzar ${productsCount} productos digitales navideños con landing funcional, captar ${input.primary_goal} durante el fin de semana. Validar tracción antes de inversión mayor en ads.`;
  } else if (isSales) {
    return `Validar ventas de ${productsCount} productos navideños con MVP ligero. Objetivo: ${input.primary_goal} orgánico + comunidades en 48-72h.`;
  } else {
    return `Captar ${input.primary_goal} con oferta de valor clara (${productsCount} productos) y validar interés antes de construir producto completo.`;
  }
}

function generateSuccessMetrics(input: GeneratorInput, isHighVolume: boolean) {
  // Umbrales base según objetivo
  const baseVisits = isHighVolume ? 500 : 200;
  const baseLeads = isHighVolume ? 200 : 50;
  const baseSales = input.primary_goal.includes("venta") ? 10 : 5;

  return {
    visits: baseVisits,
    leads: baseLeads,
    sales: baseSales,
  };
}

function generateSaturdaySchedule(input: GeneratorInput): ScheduleBlock[] {
  const schedule: ScheduleBlock[] = [
    {
      time: "09:00 - 11:00",
      duration: "2h",
      tasks: [
        "Finalizar oferta y pricing de productos",
        "Redactar copys principales (hero, value props, FAQ)",
        `Validar integración ${input.sales_stack} + ${input.email_stack}`,
        "Crear 3 prototipos de productos (demo/preview)",
      ],
      owner: "PM + Content",
    },
    {
      time: "11:00 - 13:00",
      duration: "2h",
      tasks: [
        "Implementar landing page (componentes base)",
        "Integrar pricing table con CTAs funcionales",
        "Configurar analytics (Vercel/Plausible + eventos)",
        "Setup checkout flow básico",
      ],
      owner: "Frontend",
    },
    {
      time: "13:00 - 14:00",
      duration: "1h",
      tasks: ["🍽️ Break + almuerzo", "Review de progreso (quick standup)"],
      owner: "Todos",
    },
    {
      time: "14:00 - 16:00",
      duration: "2h",
      tasks: [
        "Diseñar creativos para redes (5 posts, 3 stories)",
        `Redactar 10 captions para ${input.channels.join(", ")}`,
        "Crear video/reel corto de 30 seg (opcional)",
        "Preparar assets para distribución",
      ],
      owner: "Content + Design",
    },
    {
      time: "16:00 - 18:00",
      duration: "2h",
      tasks: [
        "Completar integración de productos",
        "Testing end-to-end (checkout + email confirmación)",
        "Optimizar mobile (responsive check)",
        "Deploy a producción (staging primero)",
      ],
      owner: "Frontend + QA",
    },
    {
      time: "18:00 - 19:00",
      duration: "1h",
      tasks: [
        "QA final: todos los CTAs funcionando",
        "Verificar UTMs en todos los enlaces",
        "Agendar posts para domingo (mañana)",
        "Retro del día + ajustes para domingo",
      ],
      owner: "Todos",
    },
  ];

  return schedule;
}

function generateSundaySchedule(input: GeneratorInput): ScheduleBlock[] {
  const schedule: ScheduleBlock[] = [
    {
      time: "09:00 - 11:00",
      duration: "2h",
      tasks: [
        "Redactar playbook/guía (si aplica a productos)",
        "Completar bundle offer con descuento",
        "Crear FAQ extendido basado en objeciones comunes",
        "Preparar email de bienvenida post-compra",
      ],
      owner: "Content + PM",
    },
    {
      time: "11:00 - 13:00",
      duration: "2h",
      tasks: [
        "Distribución FASE 1: Posts orgánicos en redes",
        `Publicar en ${input.channels.join(", ")}`,
        "Enviar 10 DMs personalizados a early adopters",
        "Post en 2 comunidades relevantes (no spam)",
      ],
      owner: "Marketing Ops",
    },
    {
      time: "13:00 - 14:00",
      duration: "1h",
      tasks: ["🍽️ Break + almuerzo", "Monitoreo de métricas tempranas"],
      owner: "Todos",
    },
    {
      time: "14:00 - 16:00",
      duration: "2h",
      tasks: [
        "Distribución FASE 2: Engagement activo",
        "Responder comentarios y DMs en tiempo real",
        "Repostear testimonios tempranos (si hay)",
        "Ajustar copys según feedback inicial",
      ],
      owner: "Marketing Ops + Content",
    },
    {
      time: "16:00 - 18:00",
      duration: "2h",
      tasks: [
        "Análisis de métricas (visits, leads, sales)",
        "Identificar bottlenecks (dónde se cae la gente)",
        "Implementar ajustes rápidos (A/B headline si aplica)",
        "Preparar assets para semana siguiente",
      ],
      owner: "PM + Marketing Ops",
    },
    {
      time: "18:00 - 19:00",
      duration: "1h",
      tasks: [
        "Retro del fin de semana: qué funcionó, qué no",
        "Decisión GO/MAYBE/KILL según métricas",
        "Planear siguientes pasos (semana 1 post-launch)",
        "Documentar aprendizajes clave",
      ],
      owner: "Todos",
    },
  ];

  return schedule;
}

function generateRoles(): string[] {
  return [
    "**PM (Product Manager)**: Define oferta, pricing, coordina equipo, toma decisión GO/KILL",
    "**Content**: Redacta copys, crea creativos, genera contenido de productos",
    "**Frontend**: Implementa landing, integra checkout, deploy y testing técnico",
    "**Marketing Ops**: Distribuye contenido, gestiona canales, analiza métricas",
    "**Nota**: Puede ser 1 persona haciendo todos los roles (solopreneur) o equipo pequeño",
  ];
}

function generatePublicationChecklist(input: GeneratorInput): string[] {
  return [
    `☐ Dominio configurado y SSL activo`,
    `☐ Landing page deployada en producción (Vercel/Netlify)`,
    `☐ Checkout ${input.sales_stack} funcional en mobile y desktop`,
    `☐ Email de confirmación ${input.email_stack} configurado`,
    `☐ Analytics instalado (Vercel Analytics / Plausible) con eventos custom`,
    `☐ Todos los CTAs tienen UTMs correctos (?utm_source=X&utm_medium=Y)`,
    `☐ Links de descarga/entrega preparados (Gumroad/Notion/Drive)`,
    `☐ FAQ completo con respuestas a objeciones`,
    `☐ Políticas de privacidad y términos enlazados`,
    `☐ 3 demos/previews de productos accesibles sin pago`,
    `☐ Creativos para redes agendados/listos (5 posts, 3 stories)`,
    `☐ Lista de 10 contactos para outreach directo preparada`,
    `☐ Backup de toda la configuración (env vars, keys, accesos)`,
  ];
}

function generateDistributionPlan(input: GeneratorInput): DistributionAction[] {
  const channelMap: Record<
    string,
    { action: string; format: string; priority: "alta" | "media" | "baja" }[]
  > = {
    X: [
      {
        action:
          "Hilo de lanzamiento (8-10 tweets) con propuesta de valor + link",
        format: "Thread con imágenes",
        priority: "alta",
      },
      {
        action: "3 tweets individuales (espaciados 4h) con distintos ángulos",
        format: "Tweet simple + imagen",
        priority: "media",
      },
    ],
    Twitter: [
      {
        action:
          "Hilo de lanzamiento (8-10 tweets) con propuesta de valor + link",
        format: "Thread con imágenes",
        priority: "alta",
      },
    ],
    IG: [
      {
        action:
          "Carrusel (10 slides) explicando productos + precio + CTA en bio",
        format: "Carrusel 1:1",
        priority: "alta",
      },
      {
        action: "3 stories con sticker de link y countdown",
        format: "Story 9:16",
        priority: "alta",
      },
      {
        action: "Reel corto (30 seg) mostrando preview de productos",
        format: "Reel vertical",
        priority: "media",
      },
    ],
    Instagram: [
      {
        action:
          "Carrusel (10 slides) explicando productos + precio + CTA en bio",
        format: "Carrusel 1:1",
        priority: "alta",
      },
    ],
    LinkedIn: [
      {
        action:
          "Post largo (1200 chars) con storytelling + link en comentarios",
        format: "Post + PDF preview",
        priority: "alta",
      },
      {
        action: "Carrusel profesional (8 slides) con insights + oferta",
        format: "Document post",
        priority: "media",
      },
    ],
    Comunidades: [
      {
        action: "Post en 2 comunidades relevantes (no spam, dar valor primero)",
        format: "Post contextualizado",
        priority: "media",
      },
    ],
    Communities: [
      {
        action: "Post en 2 comunidades relevantes (no spam, dar valor primero)",
        format: "Post contextualizado",
        priority: "media",
      },
    ],
    Email: [
      {
        action: "Email a lista existente (si hay) anunciando lanzamiento",
        format: "Email HTML",
        priority: "alta",
      },
    ],
  };

  const actions: DistributionAction[] = [];

  input.channels.forEach((channel) => {
    const channelActions =
      channelMap[channel] || channelMap[channel.toLowerCase()];
    if (channelActions) {
      channelActions.forEach((action) => {
        actions.push({
          channel,
          ...action,
        });
      });
    }
  });

  // Acción universal de outreach directo
  actions.push({
    channel: "Outreach Directo",
    action: "10 DMs personalizados a potenciales early adopters",
    format: "Mensaje 1:1",
    priority: "alta",
  });

  return actions;
}

function generateExperiments(input: GeneratorInput, isHighVolume: boolean) {
  const baseVisits = isHighVolume ? 500 : 200;
  const baseLeads = isHighVolume ? 200 : 50;
  const baseSales = input.primary_goal.includes("venta") ? 10 : 5;

  return {
    thresholds: {
      go: {
        visits: Math.round(baseVisits * 1.5),
        leads: Math.round(baseLeads * 1.5),
        sales: Math.round(baseSales * 2),
      },
      maybe: {
        visits: baseVisits,
        leads: baseLeads,
        sales: baseSales,
      },
      kill: {
        visits: Math.round(baseVisits * 0.5),
        leads: Math.round(baseLeads * 0.5),
        sales: Math.round(baseSales * 0.3),
      },
    },
    ab_test: {
      variable: "Headline Hero",
      variant_a: "Productos Navideños Listos para Vender Hoy",
      variant_b: `🎄 Cierra ${new Date().getFullYear()} con Productos que Tu Audiencia Amará`,
      metric: "CTR a pricing section",
    },
  };
}

/**
 * Exporta el plan de ejecución como Markdown formateado
 */
export function executionPlanToMarkdown(plan: ExecutionPlan): string {
  let md = `# Plan de Ejecución - Fin de Semana Holiday MVP\n\n`;
  md += `*Generado automáticamente por Holiday MVP Generator*\n\n`;
  md += `---\n\n`;

  // Objetivo
  md += `## 🎯 Objetivo del Fin de Semana\n\n`;
  md += `${plan.objective}\n\n`;

  // Métricas de Éxito
  md += `### Definición de Éxito (48-72h)\n\n`;
  md += `| Métrica | Objetivo |\n`;
  md += `|---------|----------|\n`;
  md += `| Visitas | ${plan.success_metrics.visits}+ |\n`;
  md += `| Leads | ${plan.success_metrics.leads}+ |\n`;
  md += `| Ventas | ${plan.success_metrics.sales}+ |\n\n`;

  // Cronograma Sábado
  md += `## 📅 Cronograma Sábado\n\n`;
  plan.saturday_schedule.forEach((block) => {
    md += `### ${block.time} (${block.duration}) — ${block.owner}\n\n`;
    block.tasks.forEach((task) => {
      md += `- ${task}\n`;
    });
    md += `\n`;
  });

  // Cronograma Domingo
  md += `## 📅 Cronograma Domingo\n\n`;
  plan.sunday_schedule.forEach((block) => {
    md += `### ${block.time} (${block.duration}) — ${block.owner}\n\n`;
    block.tasks.forEach((task) => {
      md += `- ${task}\n`;
    });
    md += `\n`;
  });

  // Roles
  md += `## 👥 Roles y Responsabilidades\n\n`;
  plan.roles.forEach((role) => {
    md += `${role}\n\n`;
  });

  // Checklist de Publicación
  md += `## ✅ Checklist de Publicación\n\n`;
  md += `Verifica TODOS estos puntos antes de distribuir:\n\n`;
  plan.publication_checklist.forEach((item) => {
    md += `${item}\n`;
  });
  md += `\n`;

  // Plan de Distribución
  md += `## 📢 Plan de Distribución (2 horas)\n\n`;
  md += `### Acciones por Canal\n\n`;

  const byPriority = {
    alta: plan.distribution_plan.filter((a) => a.priority === "alta"),
    media: plan.distribution_plan.filter((a) => a.priority === "media"),
    baja: plan.distribution_plan.filter((a) => a.priority === "baja"),
  };

  Object.entries(byPriority).forEach(([priority, actions]) => {
    if (actions.length > 0) {
      md += `#### Prioridad ${priority.charAt(0).toUpperCase() + priority.slice(1)}\n\n`;
      actions.forEach((action) => {
        md += `**${action.channel}**\n`;
        md += `- Acción: ${action.action}\n`;
        md += `- Formato: ${action.format}\n\n`;
      });
    }
  });

  // Métricas y Experimentos
  md += `## 📊 Métricas & Experimentos\n\n`;
  md += `### Umbrales de Decisión (72h post-launch)\n\n`;
  md += `| Escenario | Visitas | Leads | Ventas | Decisión |\n`;
  md += `|-----------|---------|-------|--------|----------|\n`;
  md += `| 🟢 GO | ${plan.experiments.thresholds.go.visits}+ | ${plan.experiments.thresholds.go.leads}+ | ${plan.experiments.thresholds.go.sales}+ | Invertir en ads, escalar |\n`;
  md += `| 🟡 MAYBE | ${plan.experiments.thresholds.maybe.visits}+ | ${plan.experiments.thresholds.maybe.leads}+ | ${plan.experiments.thresholds.maybe.sales}+ | Iterar copys, probar nuevos canales |\n`;
  md += `| 🔴 KILL | <${plan.experiments.thresholds.kill.visits} | <${plan.experiments.thresholds.kill.leads} | <${plan.experiments.thresholds.kill.sales} | Pivotar oferta o audiencia |\n\n`;

  md += `### Experimento A/B Mínimo\n\n`;
  md += `**Variable:** ${plan.experiments.ab_test.variable}\n\n`;
  md += `- **Variante A:** ${plan.experiments.ab_test.variant_a}\n`;
  md += `- **Variante B:** ${plan.experiments.ab_test.variant_b}\n`;
  md += `- **Métrica:** ${plan.experiments.ab_test.metric}\n\n`;
  md += `**Implementación:** Cambiar headline a las 24h si variante A tiene <2% CTR.\n\n`;

  md += `---\n\n`;
  md += `**Próximos pasos:** Documentar aprendizajes, iterar según feedback, preparar semana 1 post-launch.\n`;

  return md;
}
