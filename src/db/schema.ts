import { sqliteTable } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const usersTable = sqliteTable("users_table", (t) => ({
	id: t.text().primaryKey(),
	firstName: t.text().notNull(),
	lastName: t.text().notNull(),
	email: t.text().notNull(),
	profileImage: t.text().notNull(),
	createdAt: t
		.integer({ mode: "timestamp" })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
}));
