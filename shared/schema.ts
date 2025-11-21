import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, pgEnum, json, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Enums
export const leadTypeEnum = pgEnum("lead_type", ["contact", "pre_registration", "elite_booking", "wedding"]);
export const leadStatusEnum = pgEnum("lead_status", ["new", "contacted", "closed"]);
export const programLevelEnum = pgEnum("program_level", ["beginner", "intermediate", "advanced", "professional"]);
export const programAgeGroupEnum = pgEnum("program_age_group", ["children", "youth", "adult", "all_ages"]);
export const dayOfWeekEnum = pgEnum("day_of_week", ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]);

// Business Models (4 pilares de negocio)
export const businessModels = pgTable("business_models", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: varchar("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline"),
  description: text("description").notNull(),
  features: json("features").$type<string[]>().notNull().default(sql`'[]'::json`),
  advantages: json("advantages").$type<string[]>().notNull().default(sql`'[]'::json`),
  benefits: json("benefits").$type<string[]>().notNull().default(sql`'[]'::json`),
  imageUrl: text("image_url"),
  iconName: varchar("icon_name"),
  order: integer("order").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Programs/Services (disciplinas y actividades)
export const programs = pgTable("programs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  businessModelId: varchar("business_model_id").references(() => businessModels.id),
  slug: varchar("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  level: programLevelEnum("level").notNull(),
  ageGroup: programAgeGroupEnum("age_group").notNull(),
  weeklyHours: integer("weekly_hours"),
  imageUrl: text("image_url"),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Instructors (equipo docente)
export const instructors = pgTable("instructors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  quote: text("quote"),
  bio: text("bio").notNull(),
  photoUrl: text("photo_url"),
  featured: boolean("featured").notNull().default(false),
  order: integer("order").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Instructor Specialties (relación M:N con programas)
export const instructorSpecialties = pgTable("instructor_specialties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  instructorId: varchar("instructor_id").notNull().references(() => instructors.id, { onDelete: "cascade" }),
  programId: varchar("program_id").notNull().references(() => programs.id, { onDelete: "cascade" }),
  isPrimary: boolean("is_primary").notNull().default(false),
});

// Pricing Tiers (tarifas)
export const pricingTiers = pgTable("pricing_tiers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  businessModelId: varchar("business_model_id").references(() => businessModels.id),
  name: text("name").notNull(),
  description: text("description"),
  priceAmount: integer("price_amount").notNull(),
  priceCurrency: varchar("price_currency").notNull().default("EUR"),
  billingPeriod: varchar("billing_period"),
  features: json("features").$type<string[]>(),
  highlighted: boolean("highlighted").notNull().default(false),
  order: integer("order").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Schedule Slots (cuadrante horario)
export const scheduleSlots = pgTable("schedule_slots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  programId: varchar("program_id").references(() => programs.id, { onDelete: "cascade" }),
  dayOfWeek: dayOfWeekEnum("day_of_week").notNull(),
  startTime: varchar("start_time").notNull(),
  endTime: varchar("end_time").notNull(),
  room: text("room"),
  maxCapacity: integer("max_capacity"),
  published: boolean("published").notNull().default(true),
});

// FAQs (preguntas frecuentes)
export const faqs = pgTable("faqs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: varchar("category").notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: integer("order").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Legal Pages (textos legales)
export const legalPages = pgTable("legal_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: varchar("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Page Content (páginas estáticas como "Quiénes Somos")
export const pageContent = pgTable("page_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: varchar("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Site Settings (configuración general del sitio)
export const siteSettings = pgTable("site_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: varchar("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Leads (formularios de contacto, preinscripciones, reservas)
export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: leadTypeEnum("type").notNull(),
  status: leadStatusEnum("status").notNull().default("new"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message"),
  programId: varchar("program_id").references(() => programs.id),
  businessModelId: varchar("business_model_id").references(() => businessModels.id),
  metadata: json("metadata").$type<Record<string, any>>(),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Relations
export const businessModelsRelations = relations(businessModels, ({ many }) => ({
  programs: many(programs),
  pricingTiers: many(pricingTiers),
  leads: many(leads),
}));

export const programsRelations = relations(programs, ({ one, many }) => ({
  businessModel: one(businessModels, {
    fields: [programs.businessModelId],
    references: [businessModels.id],
  }),
  instructorSpecialties: many(instructorSpecialties),
  scheduleSlots: many(scheduleSlots),
  leads: many(leads),
}));

export const instructorsRelations = relations(instructors, ({ many }) => ({
  specialties: many(instructorSpecialties),
}));

export const instructorSpecialtiesRelations = relations(instructorSpecialties, ({ one }) => ({
  instructor: one(instructors, {
    fields: [instructorSpecialties.instructorId],
    references: [instructors.id],
  }),
  program: one(programs, {
    fields: [instructorSpecialties.programId],
    references: [programs.id],
  }),
}));

export const pricingTiersRelations = relations(pricingTiers, ({ one }) => ({
  businessModel: one(businessModels, {
    fields: [pricingTiers.businessModelId],
    references: [businessModels.id],
  }),
}));

export const scheduleRelations = relations(scheduleSlots, ({ one }) => ({
  program: one(programs, {
    fields: [scheduleSlots.programId],
    references: [programs.id],
  }),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  program: one(programs, {
    fields: [leads.programId],
    references: [programs.id],
  }),
  businessModel: one(businessModels, {
    fields: [leads.businessModelId],
    references: [businessModels.id],
  }),
}));

// Insert Schemas
export const insertBusinessModelSchema = createInsertSchema(businessModels)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    features: z.array(z.string()).min(1, "At least one feature is required"),
    advantages: z.array(z.string()).min(1, "At least one advantage is required"),
    benefits: z.array(z.string()).min(1, "At least one benefit is required"),
  });

export const insertProgramSchema = createInsertSchema(programs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInstructorSchema = createInsertSchema(instructors).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInstructorSpecialtySchema = createInsertSchema(instructorSpecialties).omit({
  id: true,
});

export const insertPricingTierSchema = createInsertSchema(pricingTiers)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    features: z.array(z.string()).optional(),
  });

export const insertScheduleSlotSchema = createInsertSchema(scheduleSlots).omit({
  id: true,
});

export const insertFaqSchema = createInsertSchema(faqs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLegalPageSchema = createInsertSchema(legalPages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPageContentSchema = createInsertSchema(pageContent).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSiteSettingSchema = createInsertSchema(siteSettings).omit({
  id: true,
  updatedAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Select Types
export type BusinessModel = typeof businessModels.$inferSelect;
export type SelectBusinessModel = BusinessModel;
export type InsertBusinessModel = z.infer<typeof insertBusinessModelSchema>;

export type Program = typeof programs.$inferSelect;
export type SelectProgram = Program;
export type InsertProgram = z.infer<typeof insertProgramSchema>;

export type Instructor = typeof instructors.$inferSelect;
export type SelectInstructor = Instructor;
export type InsertInstructor = z.infer<typeof insertInstructorSchema>;
export type InstructorWithSpecialties = Instructor & { specialties: string[] };

export type InstructorSpecialty = typeof instructorSpecialties.$inferSelect;
export type InsertInstructorSpecialty = z.infer<typeof insertInstructorSpecialtySchema>;

export type PricingTier = typeof pricingTiers.$inferSelect;
export type SelectPricingTier = PricingTier;
export type InsertPricingTier = z.infer<typeof insertPricingTierSchema>;

export type ScheduleSlot = typeof scheduleSlots.$inferSelect;
export type SelectScheduleSlot = ScheduleSlot;
export type ScheduleSlotWithProgram = ScheduleSlot & { programName: string | null };
export type InsertScheduleSlot = z.infer<typeof insertScheduleSlotSchema>;

export type Faq = typeof faqs.$inferSelect;
export type SelectFaq = Faq;
export type InsertFaq = z.infer<typeof insertFaqSchema>;

export type LegalPage = typeof legalPages.$inferSelect;
export type SelectLegalPage = LegalPage;
export type InsertLegalPage = z.infer<typeof insertLegalPageSchema>;

export type PageContent = typeof pageContent.$inferSelect;
export type SelectPageContent = PageContent;
export type InsertPageContent = z.infer<typeof insertPageContentSchema>;

export type SiteSetting = typeof siteSettings.$inferSelect;
export type SelectSiteSetting = SiteSetting;
export type InsertSiteSetting = z.infer<typeof insertSiteSettingSchema>;

export type Lead = typeof leads.$inferSelect;
export type SelectLead = Lead;
export type InsertLead = z.infer<typeof insertLeadSchema>;

// Session storage table (Replit Auth integration)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (Replit Auth integration)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
