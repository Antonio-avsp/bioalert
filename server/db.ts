import { eq, desc, and, gte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  users,
  neighborhoods,
  floodReports,
  alerts,
  sensorData,
  sosRequests,
  type InsertUser,
  type InsertFloodReport,
  type InsertAlert,
  type InsertSensorData,
  type InsertSosRequest,
  type InsertNeighborhood,
} from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ───────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};

  if (user.name !== undefined) { values.name = user.name; updateSet.name = user.name; }
  if (user.email !== undefined) { values.email = user.email; updateSet.email = user.email; }
  if (user.loginMethod !== undefined) { values.loginMethod = user.loginMethod; updateSet.loginMethod = user.loginMethod; }
  if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }

  if (Object.keys(updateSet).length === 0) {
    updateSet.lastSignedIn = new Date();
  }

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function addUserPoints(userId: number, points: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ points: sql`${users.points} + ${points}` }).where(eq(users.id, userId));
}

// ─── Neighborhoods ───────────────────────────────────────────────────────────

export async function getAllNeighborhoods() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(neighborhoods).orderBy(desc(neighborhoods.riskLevel));
}

export async function getNeighborhoodById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(neighborhoods).where(eq(neighborhoods.id, id)).limit(1);
  return result[0];
}

export async function createNeighborhood(data: InsertNeighborhood) {
  const db = await getDb();
  if (!db) return;
  await db.insert(neighborhoods).values(data);
}

export async function updateNeighborhoodRisk(id: number, riskLevel: string, waterLevelCm: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(neighborhoods).set({ riskLevel: riskLevel as any, waterLevelCm }).where(eq(neighborhoods.id, id));
}

// ─── Flood Reports ───────────────────────────────────────────────────────────

export async function createFloodReport(data: InsertFloodReport) {
  const db = await getDb();
  if (!db) return;
  const result = await db.insert(floodReports).values(data);
  return result;
}

export async function getRecentReports(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(floodReports).orderBy(desc(floodReports.createdAt)).limit(limit);
}

export async function getReportsByNeighborhood(neighborhoodId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(floodReports)
    .where(eq(floodReports.neighborhoodId, neighborhoodId))
    .orderBy(desc(floodReports.createdAt));
}

export async function updateReportStatus(id: number, status: string, aiScore?: number) {
  const db = await getDb();
  if (!db) return;
  const updateData: Record<string, unknown> = { status };
  if (aiScore !== undefined) updateData.aiScore = aiScore;
  await db.update(floodReports).set(updateData as any).where(eq(floodReports.id, id));
}

// ─── Alerts ──────────────────────────────────────────────────────────────────

export async function createAlert(data: InsertAlert) {
  const db = await getDb();
  if (!db) return;
  await db.insert(alerts).values(data);
}

export async function getActiveAlerts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(alerts)
    .where(eq(alerts.isActive, true))
    .orderBy(desc(alerts.createdAt));
}

export async function deactivateAlert(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(alerts).set({ isActive: false }).where(eq(alerts.id, id));
}

// ─── Sensor Data ─────────────────────────────────────────────────────────────

export async function recordSensorData(data: InsertSensorData) {
  const db = await getDb();
  if (!db) return;
  await db.insert(sensorData).values(data);
}

export async function getLatestSensorData(sensorId: string, limit = 24) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(sensorData)
    .where(eq(sensorData.sensorId, sensorId))
    .orderBy(desc(sensorData.recordedAt))
    .limit(limit);
}

export async function getSensorDataByNeighborhood(neighborhoodId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(sensorData)
    .where(eq(sensorData.neighborhoodId, neighborhoodId))
    .orderBy(desc(sensorData.recordedAt))
    .limit(50);
}

// ─── SOS Requests ────────────────────────────────────────────────────────────

export async function createSosRequest(data: InsertSosRequest) {
  const db = await getDb();
  if (!db) return;
  await db.insert(sosRequests).values(data);
}

export async function getActiveSosRequests() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(sosRequests)
    .where(eq(sosRequests.status, "active"))
    .orderBy(desc(sosRequests.createdAt));
}

export async function updateSosStatus(id: number, status: string, respondedBy?: string) {
  const db = await getDb();
  if (!db) return;
  const updateData: Record<string, unknown> = { status };
  if (respondedBy) updateData.respondedBy = respondedBy;
  if (status === "resolved") updateData.resolvedAt = new Date();
  await db.update(sosRequests).set(updateData as any).where(eq(sosRequests.id, id));
}

// ─── Dashboard Stats ─────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const db = await getDb();
  if (!db) return {
    totalNeighborhoods: 0,
    activeAlerts: 0,
    totalReports: 0,
    activeSos: 0,
    criticalAreas: 0,
  };

  const [neighborhoodCount] = await db.select({ count: sql<number>`count(*)` }).from(neighborhoods);
  const [alertCount] = await db.select({ count: sql<number>`count(*)` }).from(alerts).where(eq(alerts.isActive, true));
  const [reportCount] = await db.select({ count: sql<number>`count(*)` }).from(floodReports);
  const [sosCount] = await db.select({ count: sql<number>`count(*)` }).from(sosRequests).where(eq(sosRequests.status, "active"));
  const [criticalCount] = await db.select({ count: sql<number>`count(*)` }).from(neighborhoods).where(eq(neighborhoods.riskLevel, "critical"));

  return {
    totalNeighborhoods: neighborhoodCount?.count ?? 0,
    activeAlerts: alertCount?.count ?? 0,
    totalReports: reportCount?.count ?? 0,
    activeSos: sosCount?.count ?? 0,
    criticalAreas: criticalCount?.count ?? 0,
  };
}
