"use client";

/**
 * Holiday MVP Generator - UI Component
 * Formulario interactivo para generar artefactos
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { GeneratorInput } from "@/lib/holiday-mvp";

const PRODUCTS = [
  { id: "adviento", name: "Calendario de Adviento Digital", price: "MXN $129" },
  { id: "recetario", name: "Recetario Navideño (ebook)", price: "MXN $159" },
  { id: "plantillas", name: "Pack de Plantillas Navideñas", price: "MXN $219" },
  {
    id: "guia_ventas",
    name: "Guía: Cerrar el Año con Más Ventas",
    price: "MXN $279",
  },
  {
    id: "kit_imprimible",
    name: "Kit Imprimible de Navidad",
    price: "MXN $109",
  },
  { id: "taller_2026", name: "Taller: Planea tu 2026", price: "MXN $349" },
] as const;

const CHANNELS = [
  "X",
  "Twitter",
  "IG",
  "Instagram",
  "LinkedIn",
  "Comunidades",
  "Email",
];

export default function HolidayMVPGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  // Form state
  const [brandName, setBrandName] = useState("Xilo Labs");
  const [targetAudience, setTargetAudience] = useState(
    "emprendedores y creadores en MX"
  );
  const [toneVoice, setToneVoice] = useState("profesional y festivo");
  const [primaryGoal, setPrimaryGoal] = useState("pre-ventas + 200 leads");
  const [currency, setCurrency] = useState<"MXN" | "USD" | "EUR">("MXN");
  const [locale, setLocale] = useState<"es-MX" | "es-ES" | "en-US">("es-MX");
  const [salesStack, setSalesStack] = useState("Gumroad");
  const [emailStack, setEmailStack] = useState("ConvertKit");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    "X",
    "IG",
    "LinkedIn",
  ]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    "plantillas",
    "adviento",
  ]);
  const [brandConstraints, setBrandConstraints] = useState("");
  const [legalNotes, setLegalNotes] = useState("");

  const toggleChannel = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((p) => p !== productId)
        : [...prev, productId]
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const input: Partial<GeneratorInput> = {
        brand_name: brandName,
        target_audience: targetAudience,
        tone_voice: toneVoice,
        primary_goal: primaryGoal,
        currency,
        locale,
        sales_stack: salesStack,
        email_stack: emailStack,
        channels: selectedChannels,
        products_to_include: selectedProducts as any,
        brand_constraints: brandConstraints || undefined,
        legal_notes: legalNotes || undefined,
      };

      const response = await fetch("/api/holiday-mvp/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.errors?.join(", ") || data.error || "Error desconocido"
        );
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">🎄 Holiday MVP Generator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Genera landing page, planes de contenido y ejecución en segundos
        </p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Brand Name */}
          <div className="space-y-2">
            <Label htmlFor="brand_name">Nombre de Marca *</Label>
            <Input
              id="brand_name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Xilo Labs"
            />
          </div>

          {/* Target Audience */}
          <div className="space-y-2">
            <Label htmlFor="target_audience">Audiencia Objetivo</Label>
            <Input
              id="target_audience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="emprendedores y creadores"
            />
          </div>

          {/* Tone Voice */}
          <div className="space-y-2">
            <Label htmlFor="tone_voice">Tono de Voz</Label>
            <Input
              id="tone_voice"
              value={toneVoice}
              onChange={(e) => setToneVoice(e.target.value)}
              placeholder="profesional y festivo"
            />
          </div>

          {/* Primary Goal */}
          <div className="space-y-2">
            <Label htmlFor="primary_goal">Objetivo Principal</Label>
            <Input
              id="primary_goal"
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              placeholder="pre-ventas + 200 leads"
            />
          </div>

          {/* Currency */}
          <div className="space-y-2">
            <Label htmlFor="currency">Moneda</Label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700"
            >
              <option value="MXN">MXN</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          {/* Locale */}
          <div className="space-y-2">
            <Label htmlFor="locale">Locale</Label>
            <select
              id="locale"
              value={locale}
              onChange={(e) => setLocale(e.target.value as any)}
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700"
            >
              <option value="es-MX">es-MX</option>
              <option value="es-ES">es-ES</option>
              <option value="en-US">en-US</option>
            </select>
          </div>

          {/* Sales Stack */}
          <div className="space-y-2">
            <Label htmlFor="sales_stack">Stack de Ventas</Label>
            <Input
              id="sales_stack"
              value={salesStack}
              onChange={(e) => setSalesStack(e.target.value)}
              placeholder="Gumroad"
            />
          </div>

          {/* Email Stack */}
          <div className="space-y-2">
            <Label htmlFor="email_stack">Stack de Email</Label>
            <Input
              id="email_stack"
              value={emailStack}
              onChange={(e) => setEmailStack(e.target.value)}
              placeholder="ConvertKit"
            />
          </div>
        </div>

        {/* Channels */}
        <div className="space-y-2">
          <Label>Canales de Distribución</Label>
          <div className="flex flex-wrap gap-2">
            {CHANNELS.map((channel) => (
              <button
                key={channel}
                onClick={() => toggleChannel(channel)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedChannels.includes(channel)
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {channel}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="space-y-2">
          <Label>Productos a Incluir *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PRODUCTS.map((product) => (
              <button
                key={product.id}
                onClick={() => toggleProduct(product.id)}
                className={`p-4 rounded-md text-left transition-all ${
                  selectedProducts.includes(product.id)
                    ? "bg-green-600 text-white ring-2 ring-green-400"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
                }`}
              >
                <div className="font-medium">{product.name}</div>
                <div className="text-sm opacity-80">{product.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Brand Constraints */}
        <div className="space-y-2">
          <Label htmlFor="brand_constraints">
            Constraints de Marca (opcional)
          </Label>
          <Input
            id="brand_constraints"
            value={brandConstraints}
            onChange={(e) => setBrandConstraints(e.target.value)}
            placeholder="usar paleta rojo/verde sobrios; evitar claims exagerados"
          />
        </div>

        {/* Legal Notes */}
        <div className="space-y-2">
          <Label htmlFor="legal_notes">Notas Legales (opcional)</Label>
          <Input
            id="legal_notes"
            value={legalNotes}
            onChange={(e) => setLegalNotes(e.target.value)}
            placeholder="facturación disponible; 7 días reembolso"
          />
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={loading || !brandName || selectedProducts.length === 0}
          className="w-full py-6 text-lg"
        >
          {loading ? "Generando..." : "🎁 Generar Holiday MVP"}
        </Button>

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold">✅ Artefactos Generados</h2>

          {/* Assumptions */}
          {result.data.assumptions.length > 0 && (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
              <h3 className="font-medium mb-2">⚠️ Suposiciones:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {result.data.assumptions.map(
                  (assumption: string, i: number) => (
                    <li key={i}>{assumption}</li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Download Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() =>
                downloadFile(
                  result.files.landing_spec_json,
                  "landing_spec.json"
                )
              }
              variant="outline"
              className="w-full"
            >
              📄 Descargar landing_spec.json
            </Button>
            <Button
              onClick={() =>
                downloadFile(result.files.content_plan_md, "content_plan.md")
              }
              variant="outline"
              className="w-full"
            >
              📝 Descargar content_plan.md
            </Button>
            <Button
              onClick={() =>
                downloadFile(
                  result.files.execution_plan_md,
                  "execution_plan.md"
                )
              }
              variant="outline"
              className="w-full"
            >
              📅 Descargar execution_plan.md
            </Button>
          </div>

          {/* Preview Landing Spec */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Landing Spec Preview</h3>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-auto max-h-96">
              <pre className="text-xs">{result.files.landing_spec_json}</pre>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <div className="text-2xl font-bold">
                {result.data.landing_spec.products.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Productos
              </div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md">
              <div className="text-2xl font-bold">
                {result.data.content_plan.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Planes de Contenido
              </div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-md">
              <div className="text-2xl font-bold">
                {result.data.execution_plan.distribution_plan.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Acciones de Distribución
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
