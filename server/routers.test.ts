import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";

// Mock the database module
vi.mock("./db", () => ({
  getAllNeighborhoods: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Madalena",
      latitude: "-8.0539",
      longitude: "-34.9010",
      riskLevel: "critical",
      waterLevelCm: 80,
      activeReports: 23,
      population: 45000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Afogados",
      latitude: "-8.0700",
      longitude: "-34.8900",
      riskLevel: "danger",
      waterLevelCm: 55,
      activeReports: 15,
      population: 38000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getNeighborhoodById: vi.fn().mockResolvedValue({
    id: 1,
    name: "Madalena",
    latitude: "-8.0539",
    longitude: "-34.9010",
    riskLevel: "critical",
    waterLevelCm: 80,
    activeReports: 23,
  }),
  createNeighborhood: vi.fn().mockResolvedValue(undefined),
  updateNeighborhoodRisk: vi.fn().mockResolvedValue(undefined),
  getRecentReports: vi.fn().mockResolvedValue([
    {
      id: 1,
      userId: 1,
      neighborhoodId: 1,
      description: "Rua alagada",
      waterLevelCm: 30,
      latitude: "-8.0539",
      longitude: "-34.9010",
      status: "validated",
      severity: "high",
      createdAt: new Date(),
    },
  ]),
  getReportsByNeighborhood: vi.fn().mockResolvedValue([]),
  createFloodReport: vi.fn().mockResolvedValue(undefined),
  updateReportStatus: vi.fn().mockResolvedValue(undefined),
  addUserPoints: vi.fn().mockResolvedValue(undefined),
  getActiveAlerts: vi.fn().mockResolvedValue([
    {
      id: 1,
      title: "Alerta de Chuva Forte",
      message: "Previsão de chuva intensa nas próximas 2 horas",
      type: "rain",
      severity: "high",
      isActive: true,
      createdAt: new Date(),
    },
  ]),
  createAlert: vi.fn().mockResolvedValue(undefined),
  deactivateAlert: vi.fn().mockResolvedValue(undefined),
  recordSensorData: vi.fn().mockResolvedValue(undefined),
  getLatestSensorData: vi.fn().mockResolvedValue([]),
  getSensorDataByNeighborhood: vi.fn().mockResolvedValue([]),
  createSosRequest: vi.fn().mockResolvedValue(undefined),
  getActiveSosRequests: vi.fn().mockResolvedValue([]),
  updateSosStatus: vi.fn().mockResolvedValue(undefined),
  getDashboardStats: vi.fn().mockResolvedValue({
    totalNeighborhoods: 94,
    activeAlerts: 5,
    totalReports: 847,
    activeSos: 2,
    criticalAreas: 3,
  }),
}));

describe("BIOALERT API Router", () => {
  const caller = appRouter.createCaller({});

  describe("neighborhoods", () => {
    it("lists all neighborhoods", async () => {
      const result = await caller.neighborhoods.list();
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("Madalena");
      expect(result[0].riskLevel).toBe("critical");
    });

    it("gets a neighborhood by id", async () => {
      const result = await caller.neighborhoods.getById({ id: 1 });
      expect(result).toBeDefined();
      expect(result?.name).toBe("Madalena");
    });

    it("creates a neighborhood", async () => {
      const result = await caller.neighborhoods.create({
        name: "Boa Viagem",
        latitude: "-8.1200",
        longitude: "-34.9000",
        riskLevel: "safe",
        waterLevelCm: 0,
      });
      expect(result.success).toBe(true);
    });

    it("updates neighborhood risk level", async () => {
      const result = await caller.neighborhoods.updateRisk({
        id: 1,
        riskLevel: "danger",
        waterLevelCm: 45,
      });
      expect(result.success).toBe(true);
    });
  });

  describe("reports", () => {
    it("lists recent reports", async () => {
      const result = await caller.reports.list();
      expect(result).toHaveLength(1);
      expect(result[0].description).toBe("Rua alagada");
    });

    it("creates a flood report and awards points", async () => {
      const result = await caller.reports.create({
        userId: 1,
        latitude: "-8.0539",
        longitude: "-34.9010",
        description: "Alagamento na Av. Agamenon",
        waterLevelCm: 40,
        severity: "high",
      });
      expect(result.success).toBe(true);
      expect(result.pointsEarned).toBe(10);
    });

    it("updates report status", async () => {
      const result = await caller.reports.updateStatus({
        id: 1,
        status: "validated",
        aiScore: 85,
      });
      expect(result.success).toBe(true);
    });
  });

  describe("alerts", () => {
    it("lists active alerts", async () => {
      const result = await caller.alerts.active();
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Alerta de Chuva Forte");
    });

    it("creates an alert", async () => {
      const result = await caller.alerts.create({
        title: "Evacuação Madalena",
        message: "Nível do rio subindo rapidamente. Evacuem a área.",
        type: "evacuation",
        severity: "critical",
        channels: ["whatsapp", "sms", "push"],
      });
      expect(result.success).toBe(true);
    });

    it("deactivates an alert", async () => {
      const result = await caller.alerts.deactivate({ id: 1 });
      expect(result.success).toBe(true);
    });
  });

  describe("sensors", () => {
    it("records sensor data", async () => {
      const result = await caller.sensors.record({
        sensorId: "WL-001",
        sensorType: "water_level",
        neighborhoodId: 1,
        value: "45.5",
        unit: "cm",
        latitude: "-8.0539",
        longitude: "-34.9010",
      });
      expect(result.success).toBe(true);
    });

    it("records camera analysis data", async () => {
      const result = await caller.sensors.record({
        sensorId: "CAM-001",
        sensorType: "camera",
        neighborhoodId: 1,
        value: "1",
        unit: "detection",
        cameraAnalysis: {
          hasFlood: true,
          waterLevel: 30,
          pedestriansWithUmbrella: 5,
          vehiclesInWater: 2,
          confidence: 0.94,
        },
      });
      expect(result.success).toBe(true);
    });
  });

  describe("sos", () => {
    it("creates an SOS request", async () => {
      const result = await caller.sos.create({
        userId: 1,
        latitude: "-8.0539",
        longitude: "-34.9010",
        description: "Família presa no segundo andar",
        peopleCount: 4,
      });
      expect(result.success).toBe(true);
    });

    it("updates SOS status", async () => {
      const result = await caller.sos.updateStatus({
        id: 1,
        status: "responding",
        respondedBy: "Corpo de Bombeiros",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("dashboard", () => {
    it("returns dashboard statistics", async () => {
      const result = await caller.dashboard.stats();
      expect(result.totalNeighborhoods).toBe(94);
      expect(result.activeAlerts).toBe(5);
      expect(result.totalReports).toBe(847);
      expect(result.activeSos).toBe(2);
      expect(result.criticalAreas).toBe(3);
    });
  });
});
