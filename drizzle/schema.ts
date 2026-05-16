import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
  boolean,
  json,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  /** Gamification points */
  points: int("points").default(0).notNull(),
  /** User's primary neighborhood */
  neighborhood: varchar("neighborhood", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Neighborhoods / monitored areas
 */
export const neighborhoods = mysqlTable("neighborhoods", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 7 }).notNull(),
  longitude: decimal("longitude", { precision: 10, scale: 7 }).notNull(),
  /** Risk level: safe, attention, alert, danger, critical */
  riskLevel: mysqlEnum("riskLevel", [
    "safe",
    "attention",
    "alert",
    "danger",
    "critical",
  ])
    .default("safe")
    .notNull(),
  /** Current water level in cm */
  waterLevelCm: int("waterLevelCm").default(0).notNull(),
  /** Number of active reports */
  activeReports: int("activeReports").default(0).notNull(),
  /** Population in area */
  population: int("population").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Neighborhood = typeof neighborhoods.$inferSelect;
export type InsertNeighborhood = typeof neighborhoods.$inferInsert;

/**
 * Flood reports from community
 */
export const floodReports = mysqlTable("flood_reports", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  neighborhoodId: int("neighborhoodId"),
  /** Report description */
  description: text("description"),
  /** Estimated water level in cm */
  waterLevelCm: int("waterLevelCm").default(0),
  /** GPS coordinates */
  latitude: decimal("latitude", { precision: 10, scale: 7 }).notNull(),
  longitude: decimal("longitude", { precision: 10, scale: 7 }).notNull(),
  /** Photo URL from S3 */
  photoUrl: text("photoUrl"),
  /** Report status */
  status: mysqlEnum("status", ["pending", "validated", "rejected", "resolved"])
    .default("pending")
    .notNull(),
  /** AI validation score 0-100 */
  aiScore: int("aiScore"),
  /** Severity level */
  severity: mysqlEnum("severity", [
    "low",
    "medium",
    "high",
    "critical",
  ])
    .default("medium")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FloodReport = typeof floodReports.$inferSelect;
export type InsertFloodReport = typeof floodReports.$inferInsert;

/**
 * Alerts sent to users
 */
export const alerts = mysqlTable("alerts", {
  id: int("id").autoincrement().primaryKey(),
  /** Alert title */
  title: varchar("title", { length: 256 }).notNull(),
  /** Alert message body */
  message: text("message").notNull(),
  /** Alert type */
  type: mysqlEnum("type", ["rain", "flood", "evacuation", "info", "sos"])
    .default("info")
    .notNull(),
  /** Severity level */
  severity: mysqlEnum("severity", [
    "low",
    "medium",
    "high",
    "critical",
  ])
    .default("medium")
    .notNull(),
  /** Target neighborhood (null = citywide) */
  neighborhoodId: int("neighborhoodId"),
  /** Whether alert is active */
  isActive: boolean("isActive").default(true).notNull(),
  /** Channels sent through */
  channels: json("channels").$type<string[]>(),
  /** Who created the alert */
  createdBy: int("createdBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt"),
});

export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = typeof alerts.$inferInsert;

/**
 * Sensor data from IoT devices and cameras
 */
export const sensorData = mysqlTable("sensor_data", {
  id: int("id").autoincrement().primaryKey(),
  /** Sensor identifier */
  sensorId: varchar("sensorId", { length: 64 }).notNull(),
  /** Sensor type */
  sensorType: mysqlEnum("sensorType", [
    "water_level",
    "rain_gauge",
    "camera",
    "flow_meter",
  ]).notNull(),
  /** Neighborhood where sensor is located */
  neighborhoodId: int("neighborhoodId"),
  /** Measured value (water level in cm, rain in mm/h, etc.) */
  value: decimal("value", { precision: 10, scale: 2 }).notNull(),
  /** Unit of measurement */
  unit: varchar("unit", { length: 16 }).notNull(),
  /** GPS coordinates */
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  /** Camera frame analysis result */
  cameraAnalysis: json("cameraAnalysis").$type<{
    hasFlood: boolean;
    waterLevel: number;
    pedestriansWithUmbrella: number;
    vehiclesInWater: number;
    confidence: number;
  }>(),
  recordedAt: timestamp("recordedAt").defaultNow().notNull(),
});

export type SensorData = typeof sensorData.$inferSelect;
export type InsertSensorData = typeof sensorData.$inferInsert;

/**
 * SOS emergency requests
 */
export const sosRequests = mysqlTable("sos_requests", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  /** GPS coordinates */
  latitude: decimal("latitude", { precision: 10, scale: 7 }).notNull(),
  longitude: decimal("longitude", { precision: 10, scale: 7 }).notNull(),
  /** Description of emergency */
  description: text("description"),
  /** Number of people needing help */
  peopleCount: int("peopleCount").default(1),
  /** Status of the request */
  status: mysqlEnum("status", [
    "active",
    "responding",
    "resolved",
    "cancelled",
  ])
    .default("active")
    .notNull(),
  /** Responding team/entity */
  respondedBy: varchar("respondedBy", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  resolvedAt: timestamp("resolvedAt"),
});

export type SosRequest = typeof sosRequests.$inferSelect;
export type InsertSosRequest = typeof sosRequests.$inferInsert;
