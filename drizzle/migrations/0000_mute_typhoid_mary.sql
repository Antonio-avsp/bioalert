CREATE TABLE `alerts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`message` text NOT NULL,
	`type` enum('rain','flood','evacuation','info','sos') NOT NULL DEFAULT 'info',
	`severity` enum('low','medium','high','critical') NOT NULL DEFAULT 'medium',
	`neighborhoodId` int,
	`isActive` boolean NOT NULL DEFAULT true,
	`channels` json,
	`createdBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`expiresAt` timestamp,
	CONSTRAINT `alerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `flood_reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`neighborhoodId` int,
	`description` text,
	`waterLevelCm` int DEFAULT 0,
	`latitude` decimal(10,7) NOT NULL,
	`longitude` decimal(10,7) NOT NULL,
	`photoUrl` text,
	`status` enum('pending','validated','rejected','resolved') NOT NULL DEFAULT 'pending',
	`aiScore` int,
	`severity` enum('low','medium','high','critical') NOT NULL DEFAULT 'medium',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `flood_reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `neighborhoods` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`latitude` decimal(10,7) NOT NULL,
	`longitude` decimal(10,7) NOT NULL,
	`riskLevel` enum('safe','attention','alert','danger','critical') NOT NULL DEFAULT 'safe',
	`waterLevelCm` int NOT NULL DEFAULT 0,
	`activeReports` int NOT NULL DEFAULT 0,
	`population` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `neighborhoods_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sensor_data` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sensorId` varchar(64) NOT NULL,
	`sensorType` enum('water_level','rain_gauge','camera','flow_meter') NOT NULL,
	`neighborhoodId` int,
	`value` decimal(10,2) NOT NULL,
	`unit` varchar(16) NOT NULL,
	`latitude` decimal(10,7),
	`longitude` decimal(10,7),
	`cameraAnalysis` json,
	`recordedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sensor_data_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sos_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`latitude` decimal(10,7) NOT NULL,
	`longitude` decimal(10,7) NOT NULL,
	`description` text,
	`peopleCount` int DEFAULT 1,
	`status` enum('active','responding','resolved','cancelled') NOT NULL DEFAULT 'active',
	`respondedBy` varchar(128),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`resolvedAt` timestamp,
	CONSTRAINT `sos_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`points` int NOT NULL DEFAULT 0,
	`neighborhood` varchar(128),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
