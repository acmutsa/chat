import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql, relations } from "drizzle-orm";

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

export const usersRelations = relations(usersTable, ({ many }) => ({
	threads: many(threadsTable),
	messages: many(messagesTable),
}));

export const threadsTable = sqliteTable("threads_table", (t) => ({
	id: t.text().primaryKey(),
	name: t.text().notNull(),
	ownerId: t
		.text()
		.notNull()
		.references(() => usersTable.id),
	createdAt: t
		.integer({ mode: "timestamp" })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: t
		.integer({ mode: "timestamp" })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
}));

export const threadsRelations = relations(threadsTable, ({ one, many }) => ({
	owner: one(usersTable, {
		fields: [threadsTable.ownerId],
		references: [usersTable.id],
	}),
	messages: many(messagesTable),
}));

export const messagesTable = sqliteTable("messages_table", (t) => ({
	id: t.text().primaryKey(),
	threadId: t
		.text()
		.notNull()
		.references(() => threadsTable.id),
	userId: t
		.text()
		.notNull()
		.references(() => usersTable.id),
	role: t.text().notNull().$type<"user" | "assistant">(),
	content: t.text().notNull(),
	createdAt: t
		.integer({ mode: "timestamp" })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
}));

export const messagesRelations = relations(messagesTable, ({ one }) => ({
	thread: one(threadsTable, {
		fields: [messagesTable.threadId],
		references: [threadsTable.id],
	}),
	author: one(usersTable, {
		fields: [messagesTable.userId],
		references: [usersTable.id],
	}),
}));
