/**
 * Holiday MVP Generator - Demo Page
 * Playground interactivo para generar artefactos
 */

import { Metadata } from "next";
import HolidayMVPGenerator from "@/components/holiday-mvp-generator";

export const metadata: Metadata = {
  title: "Holiday MVP Generator | TemplateShip",
  description:
    "Genera landing pages, planes de contenido y ejecución para productos digitales navideños en segundos.",
};

export default function HolidayMVPPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <HolidayMVPGenerator />
    </div>
  );
}
