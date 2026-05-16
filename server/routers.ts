import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import superjson from "superjson";
import * as db from "./db";

/**
 * tRPC initialization
 */
const t = initTRPC.create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * BIOALERT API Router
 */
export const appRouter = router({
  // ─── Neighborhoods ───────────────────────────────────────────────────────
  neighborhoods: router({
    list: publicProcedure.query(async () => {
      return db.getAllNeighborhoods();
    }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getNeighborhoodById(input.id);
      }),

    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          latitude: z.string(),
          longitude: z.string(),
          riskLevel: z.enum(["safe", "attention", "alert", "danger", "critical"]).default("safe"),
          waterLevelCm: z.number().default(0),
          population: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await db.createNeighborhood(input as any);
        return { success: true };
      }),

    updateRisk: publicProcedure
      .input(
        z.object({
          id: z.number(),
          riskLevel: z.enum(["safe", "attention", "alert", "danger", "critical"]),
          waterLevelCm: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateNeighborhoodRisk(input.id, input.riskLevel, input.waterLevelCm);
        return { success: true };
      }),
  }),

  // ─── Flood Reports ─────────────────────────────────────────────────────────
  reports: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().default(50) }).optional())
      .query(async ({ input }) => {
        return db.getRecentReports(input?.limit ?? 50);
      }),

    byNeighborhood: publicProcedure
      .input(z.object({ neighborhoodId: z.number() }))
      .query(async ({ input }) => {
        return db.getReportsByNeighborhood(input.neighborhoodId);
      }),

    create: publicProcedure
      .input(
        z.object({
          userId: z.number(),
          neighborhoodId: z.number().optional(),
          description: z.string().optional(),
          waterLevelCm: z.number().default(0),
          latitude: z.string(),
          longitude: z.string(),
          photoUrl: z.string().optional(),
          severity: z.enum(["low", "medium", "high", "critical"]).default("medium"),
        })
      )
      .mutation(async ({ input }) => {
        await db.createFloodReport(input as any);
        // Award points for reporting
        await db.addUserPoints(input.userId, 10);
        return { success: true, pointsEarned: 10 };
      }),

    updateStatus: publicProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["pending", "validated", "rejected", "resolved"]),
          aiScore: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateReportStatus(input.id, input.status, input.aiScore);
        return { success: true };
      }),
  }),

  // ─── Alerts ────────────────────────────────────────────────────────────────
  alerts: router({
    active: publicProcedure.query(async () => {
      return db.getActiveAlerts();
    }),

    create: publicProcedure
      .input(
        z.object({
          title: z.string().min(1),
          message: z.string().min(1),
          type: z.enum(["rain", "flood", "evacuation", "info", "sos"]).default("info"),
          severity: z.enum(["low", "medium", "high", "critical"]).default("medium"),
          neighborhoodId: z.number().optional(),
          channels: z.array(z.string()).optional(),
          createdBy: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await db.createAlert(input as any);
        return { success: true };
      }),

    deactivate: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deactivateAlert(input.id);
        return { success: true };
      }),
  }),

  // ─── Sensor Data ───────────────────────────────────────────────────────────
  sensors: router({
    record: publicProcedure
      .input(
        z.object({
          sensorId: z.string(),
          sensorType: z.enum(["water_level", "rain_gauge", "camera", "flow_meter"]),
          neighborhoodId: z.number().optional(),
          value: z.string(),
          unit: z.string(),
          latitude: z.string().optional(),
          longitude: z.string().optional(),
          cameraAnalysis: z
            .object({
              hasFlood: z.boolean(),
              waterLevel: z.number(),
              pedestriansWithUmbrella: z.number(),
              vehiclesInWater: z.number(),
              confidence: z.number(),
            })
            .optional(),
        })
      )
      .mutation(async ({ input }) => {
        await db.recordSensorData(input as any);
        return { success: true };
      }),

    latest: publicProcedure
      .input(z.object({ sensorId: z.string(), limit: z.number().default(24) }))
      .query(async ({ input }) => {
        return db.getLatestSensorData(input.sensorId, input.limit);
      }),

    byNeighborhood: publicProcedure
      .input(z.object({ neighborhoodId: z.number() }))
      .query(async ({ input }) => {
        return db.getSensorDataByNeighborhood(input.neighborhoodId);
      }),
  }),

  // ─── SOS ───────────────────────────────────────────────────────────────────
  sos: router({
    active: publicProcedure.query(async () => {
      return db.getActiveSosRequests();
    }),

    create: publicProcedure
      .input(
        z.object({
          userId: z.number(),
          latitude: z.string(),
          longitude: z.string(),
          description: z.string().optional(),
          peopleCount: z.number().default(1),
        })
      )
      .mutation(async ({ input }) => {
        await db.createSosRequest(input as any);
        return { success: true };
      }),

    updateStatus: publicProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["active", "responding", "resolved", "cancelled"]),
          respondedBy: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateSosStatus(input.id, input.status, input.respondedBy);
        return { success: true };
      }),
  }),

  // ─── Dashboard ─────────────────────────────────────────────────────────────
  dashboard: router({
    stats: publicProcedure.query(async () => {
      return db.getDashboardStats();
    }),
  }),
});

export type AppRouter = typeof appRouter;
