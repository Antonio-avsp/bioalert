/**
 * MapSection - Mapa colaborativo de alagamentos em Recife
 * Usa Google Maps com pontos de risco simulados
 */
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, Droplets, AlertTriangle, Navigation, Layers, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapView } from "@/components/Map";

const riskLevels = [
  { level: "Seguro", color: "#22c55e", bgClass: "bg-green-500" },
  { level: "Atenção", color: "#eab308", bgClass: "bg-yellow-500" },
  { level: "Alerta", color: "#f97316", bgClass: "bg-orange-500" },
  { level: "Perigo", color: "#ef4444", bgClass: "bg-red-500" },
  { level: "Crítico", color: "#a855f7", bgClass: "bg-purple-500" },
];

const floodPoints = [
  { lat: -8.0476, lng: -34.8770, title: "Av. Agamenon Magalhães", risk: 3, reports: 12, waterLevel: "45cm" },
  { lat: -8.0631, lng: -34.8711, title: "Derby / Praça do Derby", risk: 2, reports: 8, waterLevel: "20cm" },
  { lat: -8.0539, lng: -34.8813, title: "Madalena / Rio Capibaribe", risk: 4, reports: 23, waterLevel: "80cm" },
  { lat: -8.0365, lng: -34.8716, title: "Espinheiro", risk: 1, reports: 3, waterLevel: "5cm" },
  { lat: -8.0722, lng: -34.8832, title: "Afogados", risk: 3, reports: 15, waterLevel: "55cm" },
  { lat: -8.0178, lng: -34.8553, title: "Casa Amarela", risk: 2, reports: 6, waterLevel: "15cm" },
  { lat: -8.0847, lng: -34.8889, title: "Pina / Boa Viagem", risk: 1, reports: 4, waterLevel: "8cm" },
  { lat: -8.0290, lng: -34.8910, title: "Várzea / UFPE", risk: 2, reports: 7, waterLevel: "25cm" },
];

export default function MapSection() {
  const [selectedPoint, setSelectedPoint] = useState<typeof floodPoints[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState<number | null>(null);

  const handleMapReady = useCallback((map: google.maps.Map) => {
    // Center on Recife
    map.setCenter({ lat: -8.0476, lng: -34.8770 });
    map.setZoom(13);
    map.setOptions({
      styles: [
        { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#6b7280" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#2d2d44" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e4429" }] },
        { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3b8256" }] },
        { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#1a3a2a" }] },
      ],
    });

    // Add flood markers
    floodPoints.forEach((point) => {
      const riskColor = riskLevels[point.risk].color;

      const marker = new google.maps.Marker({
        position: { lat: point.lat, lng: point.lng },
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10 + point.risk * 3,
          fillColor: riskColor,
          fillOpacity: 0.7,
          strokeColor: riskColor,
          strokeWeight: 2,
        },
        title: point.title,
      });

      // Pulse effect circle
      new google.maps.Circle({
        map,
        center: { lat: point.lat, lng: point.lng },
        radius: 200 + point.risk * 100,
        fillColor: riskColor,
        fillOpacity: 0.08,
        strokeColor: riskColor,
        strokeWeight: 1,
        strokeOpacity: 0.3,
      });

      marker.addListener("click", () => {
        setSelectedPoint(point);
      });
    });
  }, []);

  const filteredPoints = activeFilter !== null
    ? floodPoints.filter((p) => p.risk === activeFilter)
    : floodPoints;

  return (
    <section id="mapa" className="relative py-16 lg:py-24">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-6 bg-[oklch(0.45_0.15_150)] rounded-full" />
            <span className="text-sm font-medium text-[oklch(0.55_0.15_150)] uppercase tracking-wider">
              Monitoramento em Tempo Real
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Mapa Colaborativo de Alagamentos
          </h2>
          <p className="text-[oklch(0.65_0.01_250)] max-w-xl">
            Visualize pontos de alagamento reportados pela comunidade e sensores urbanos em Recife.
          </p>
        </motion.div>

        {/* Map + Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
          {/* Map Container */}
          <motion.div
            className="relative rounded-xl overflow-hidden border border-[oklch(0.28_0.015_250)] h-[500px] lg:h-[600px]"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <MapView onMapReady={handleMapReady} />

            {/* Map Overlay Controls */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto">
                <div className="flex items-center gap-1.5 px-3 py-2 bg-[oklch(0.13_0.015_250/0.9)] backdrop-blur-md rounded-lg border border-[oklch(0.28_0.015_250)]">
                  <Search className="w-3.5 h-3.5 text-[oklch(0.55_0.01_250)]" />
                  <input
                    type="text"
                    placeholder="Buscar bairro..."
                    className="bg-transparent text-sm text-white placeholder:text-[oklch(0.45_0.01_250)] outline-none w-36"
                  />
                </div>
              </div>
              <div className="flex gap-1.5 pointer-events-auto">
                <button className="p-2 bg-[oklch(0.13_0.015_250/0.9)] backdrop-blur-md rounded-lg border border-[oklch(0.28_0.015_250)] text-[oklch(0.65_0.01_250)] hover:text-white transition-colors">
                  <Layers className="w-4 h-4" />
                </button>
                <button className="p-2 bg-[oklch(0.13_0.015_250/0.9)] backdrop-blur-md rounded-lg border border-[oklch(0.28_0.015_250)] text-[oklch(0.65_0.01_250)] hover:text-white transition-colors">
                  <Navigation className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Risk Legend */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-[oklch(0.13_0.015_250/0.9)] backdrop-blur-md rounded-lg border border-[oklch(0.28_0.015_250)]">
              {riskLevels.map((r, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFilter(activeFilter === i ? null : i)}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all ${
                    activeFilter === i ? "bg-white/10 ring-1 ring-white/20" : "hover:bg-white/5"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${r.bgClass}`} />
                  <span className="text-[oklch(0.75_0.01_250)] hidden sm:inline">{r.level}</span>
                </button>
              ))}
            </div>

            {/* Selected Point Info */}
            {selectedPoint && (
              <motion.div
                className="absolute bottom-4 right-4 w-64 p-4 bg-[oklch(0.15_0.015_250/0.95)] backdrop-blur-xl rounded-xl border border-[oklch(0.28_0.015_250)] shadow-2xl"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white leading-tight">{selectedPoint.title}</h4>
                  <button
                    onClick={() => setSelectedPoint(null)}
                    className="text-[oklch(0.5_0.01_250)] hover:text-white text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    className="text-[10px] px-1.5 py-0.5"
                    style={{ backgroundColor: riskLevels[selectedPoint.risk].color, color: selectedPoint.risk > 2 ? "white" : "black" }}
                  >
                    {riskLevels[selectedPoint.risk].level}
                  </Badge>
                  <span className="text-xs text-[oklch(0.55_0.01_250)]">{selectedPoint.reports} reports</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 text-[oklch(0.65_0.01_250)]">
                    <Droplets className="w-3 h-3" />
                    <span>Nível: {selectedPoint.waterLevel}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Sidebar - Alert Feed */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-white">Alertas Recentes</h3>
              <span className="text-xs text-[oklch(0.55_0.15_150)]">
                {filteredPoints.length} ocorrências
              </span>
            </div>

            <div className="flex flex-col gap-2 max-h-[560px] overflow-y-auto pr-1">
              {filteredPoints.map((point, i) => (
                <motion.button
                  key={i}
                  className="text-left p-3 rounded-lg bg-[oklch(0.17_0.015_250)] border border-[oklch(0.25_0.015_250)] hover:border-[oklch(0.35_0.015_250)] transition-all duration-200 group"
                  onClick={() => setSelectedPoint(point)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: riskLevels[point.risk].color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate group-hover:text-[oklch(0.55_0.15_150)] transition-colors">
                        {point.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-[oklch(0.55_0.01_250)]">
                          <Droplets className="w-3 h-3 inline mr-0.5" />
                          {point.waterLevel}
                        </span>
                        <span className="text-xs text-[oklch(0.55_0.01_250)]">
                          <MapPin className="w-3 h-3 inline mr-0.5" />
                          {point.reports} reports
                        </span>
                      </div>
                    </div>
                    <Badge
                      className="text-[10px] px-1.5 py-0.5 shrink-0"
                      style={{ backgroundColor: riskLevels[point.risk].color, color: point.risk > 2 ? "white" : "black" }}
                    >
                      {riskLevels[point.risk].level}
                    </Badge>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* SOS Button */}
            <Button
              className="mt-auto bg-[oklch(0.55_0.22_25)] hover:bg-[oklch(0.50_0.22_25)] text-white gap-2 h-12 text-sm font-semibold shadow-lg shadow-[oklch(0.55_0.22_25/0.3)] active:scale-[0.97] transition-transform duration-150"
              onClick={() => {
                import("sonner").then(({ toast }) =>
                  toast.error("Alerta SOS enviado! Equipes de emergência notificadas.", {
                    duration: 5000,
                  })
                );
              }}
            >
              <AlertTriangle className="w-4.5 h-4.5" />
              Botão SOS — Emergência
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
