import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import {
  businessModels,
  programs,
  instructors,
  instructorSpecialties,
  pricingTiers,
  scheduleSlots,
  faqs,
  legalPages,
  pageContent,
  siteSettings,
  leads,
  insertBusinessModelSchema,
  insertProgramSchema,
  insertInstructorSchema,
  insertInstructorSpecialtySchema,
  insertPricingTierSchema,
  insertScheduleSlotSchema,
  insertFaqSchema,
  insertLegalPageSchema,
  insertPageContentSchema,
  insertSiteSettingSchema,
  insertLeadSchema,
} from "@shared/schema";
import { eq, desc, and, inArray } from "drizzle-orm";
import { z } from "zod";

// Helper function to remove undefined values from objects
function removeUndefined<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: any = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Business Models
  app.get("/api/business-models", async (req, res) => {
    try {
      const result = await db.select().from(businessModels).where(eq(businessModels.published, true)).orderBy(businessModels.order);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch business models" });
    }
  });

  app.get("/api/business-models/:id", async (req, res) => {
    try {
      const result = await db.select().from(businessModels).where(eq(businessModels.id, req.params.id));
      if (result.length === 0) {
        res.status(404).json({ error: "Business model not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch business model" });
    }
  });

  app.post("/api/business-models", async (req, res) => {
    try {
      const validatedData = insertBusinessModelSchema.parse(req.body);
      const result = await db.insert(businessModels).values(validatedData).returning();
      res.status(201).json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create business model" });
      }
    }
  });

  app.put("/api/business-models/:id", async (req, res) => {
    try {
      const validatedData = insertBusinessModelSchema.partial().parse(req.body);
      const cleanedData = removeUndefined(validatedData);
      
      if (Object.keys(cleanedData).length === 0) {
        res.status(400).json({ error: "No fields to update" });
        return;
      }
      
      const result = await db.update(businessModels)
        .set({ ...cleanedData, updatedAt: new Date() })
        .where(eq(businessModels.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Business model not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update business model" });
      }
    }
  });

  app.delete("/api/business-models/:id", async (req, res) => {
    try {
      const result = await db.delete(businessModels)
        .where(eq(businessModels.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Business model not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete business model" });
    }
  });

  // Programs
  app.get("/api/programs", async (req, res) => {
    try {
      const result = await db.select().from(programs).where(eq(programs.published, true));
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch programs" });
    }
  });

  app.get("/api/programs/:id", async (req, res) => {
    try {
      const result = await db.select().from(programs).where(eq(programs.id, req.params.id));
      if (result.length === 0) {
        res.status(404).json({ error: "Program not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch program" });
    }
  });

  app.post("/api/programs", async (req, res) => {
    try {
      const validatedData = insertProgramSchema.parse(req.body);
      const result = await db.insert(programs).values(validatedData).returning();
      res.status(201).json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create program" });
      }
    }
  });

  app.put("/api/programs/:id", async (req, res) => {
    try {
      const validatedData = insertProgramSchema.partial().parse(req.body);
      const cleanedData = removeUndefined(validatedData);
      
      if (Object.keys(cleanedData).length === 0) {
        res.status(400).json({ error: "No fields to update" });
        return;
      }
      
      const result = await db.update(programs)
        .set({ ...cleanedData, updatedAt: new Date() })
        .where(eq(programs.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Program not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update program" });
      }
    }
  });

  app.delete("/api/programs/:id", async (req, res) => {
    try {
      const result = await db.delete(programs)
        .where(eq(programs.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Program not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete program" });
    }
  });

  // Instructors
  app.get("/api/instructors", async (req, res) => {
    try {
      // Optimized query: fetch all published instructors
      const allInstructors = await db.select().from(instructors)
        .where(eq(instructors.published, true))
        .orderBy(instructors.order);
      
      if (allInstructors.length === 0) {
        res.json([]);
        return;
      }
      
      // Fetch all specialties for these instructors in one query
      const instructorIds = allInstructors.map(i => i.id);
      const specialtiesData = await db.select({
        instructorId: instructorSpecialties.instructorId,
        programName: programs.name,
      })
        .from(instructorSpecialties)
        .innerJoin(programs, eq(instructorSpecialties.programId, programs.id))
        .where(inArray(instructorSpecialties.instructorId, instructorIds));
      
      // Group specialties by instructor
      const specialtiesByInstructor = specialtiesData.reduce((acc, row) => {
        if (!acc[row.instructorId]) {
          acc[row.instructorId] = [];
        }
        acc[row.instructorId].push(row.programName);
        return acc;
      }, {} as Record<string, string[]>);
      
      // Combine instructors with their specialties
      const instructorsWithSpecialties = allInstructors.map(instructor => ({
        ...instructor,
        specialties: specialtiesByInstructor[instructor.id] || [],
      }));
      
      res.json(instructorsWithSpecialties);
    } catch (error) {
      console.error("Error fetching instructors:", error);
      res.status(500).json({ error: "Failed to fetch instructors" });
    }
  });

  app.get("/api/instructors/:id", async (req, res) => {
    try {
      const result = await db.select().from(instructors).where(eq(instructors.id, req.params.id));
      if (result.length === 0) {
        res.status(404).json({ error: "Instructor not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch instructor" });
    }
  });

  app.post("/api/instructors", async (req, res) => {
    try {
      const validatedData = insertInstructorSchema.parse(req.body);
      const result = await db.insert(instructors).values(validatedData).returning();
      res.status(201).json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create instructor" });
      }
    }
  });

  app.put("/api/instructors/:id", async (req, res) => {
    try {
      const validatedData = insertInstructorSchema.partial().parse(req.body);
      const cleanedData = removeUndefined(validatedData);
      
      if (Object.keys(cleanedData).length === 0) {
        res.status(400).json({ error: "No fields to update" });
        return;
      }
      
      const result = await db.update(instructors)
        .set({ ...cleanedData, updatedAt: new Date() })
        .where(eq(instructors.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Instructor not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update instructor" });
      }
    }
  });

  app.delete("/api/instructors/:id", async (req, res) => {
    try {
      const result = await db.delete(instructors)
        .where(eq(instructors.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Instructor not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete instructor" });
    }
  });

  // Instructor Specialties (M:N relationship between instructors and programs)
  app.get("/api/instructor-specialties", async (req, res) => {
    try {
      const { instructorId, programId } = req.query;
      const conditions = [];
      
      if (instructorId) {
        conditions.push(eq(instructorSpecialties.instructorId, instructorId as string));
      }
      if (programId) {
        conditions.push(eq(instructorSpecialties.programId, programId as string));
      }
      
      let query = db.select().from(instructorSpecialties);
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
      
      const result = await query;
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch instructor specialties" });
    }
  });

  app.post("/api/instructor-specialties", async (req, res) => {
    try {
      const validatedData = insertInstructorSpecialtySchema.parse(req.body);
      const result = await db.insert(instructorSpecialties).values(validatedData).returning();
      res.status(201).json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create instructor specialty" });
      }
    }
  });

  app.delete("/api/instructor-specialties/:id", async (req, res) => {
    try {
      const result = await db.delete(instructorSpecialties)
        .where(eq(instructorSpecialties.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Instructor specialty not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete instructor specialty" });
    }
  });

  // Pricing Tiers
  app.get("/api/pricing-tiers", async (req, res) => {
    try {
      const result = await db.select().from(pricingTiers)
        .where(eq(pricingTiers.published, true))
        .orderBy(pricingTiers.order);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pricing tiers" });
    }
  });

  app.get("/api/pricing-tiers/:id", async (req, res) => {
    try {
      const result = await db.select().from(pricingTiers).where(eq(pricingTiers.id, req.params.id));
      if (result.length === 0) {
        res.status(404).json({ error: "Pricing tier not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pricing tier" });
    }
  });

  app.post("/api/pricing-tiers", async (req, res) => {
    try {
      const validatedData = insertPricingTierSchema.parse(req.body);
      const result = await db.insert(pricingTiers).values(validatedData).returning();
      res.status(201).json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create pricing tier" });
      }
    }
  });

  app.put("/api/pricing-tiers/:id", async (req, res) => {
    try {
      const validatedData = insertPricingTierSchema.partial().parse(req.body);
      const cleanedData = removeUndefined(validatedData);
      
      if (Object.keys(cleanedData).length === 0) {
        res.status(400).json({ error: "No fields to update" });
        return;
      }
      
      const result = await db.update(pricingTiers)
        .set({ ...cleanedData, updatedAt: new Date() })
        .where(eq(pricingTiers.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Pricing tier not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update pricing tier" });
      }
    }
  });

  app.delete("/api/pricing-tiers/:id", async (req, res) => {
    try {
      const result = await db.delete(pricingTiers)
        .where(eq(pricingTiers.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Pricing tier not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete pricing tier" });
    }
  });

  // Schedule Slots
  app.get("/api/schedule-slots", async (req, res) => {
    try {
      const result = await db
        .select({
          id: scheduleSlots.id,
          programId: scheduleSlots.programId,
          programName: programs.name,
          programPublished: programs.published,
          dayOfWeek: scheduleSlots.dayOfWeek,
          startTime: scheduleSlots.startTime,
          endTime: scheduleSlots.endTime,
          room: scheduleSlots.room,
          maxCapacity: scheduleSlots.maxCapacity,
          published: scheduleSlots.published,
        })
        .from(scheduleSlots)
        .leftJoin(programs, eq(scheduleSlots.programId, programs.id))
        .where(
          and(
            eq(scheduleSlots.published, true),
            eq(programs.published, true)
          )
        );
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch schedule slots" });
    }
  });

  app.get("/api/schedule-slots/:id", async (req, res) => {
    try {
      const result = await db.select().from(scheduleSlots).where(eq(scheduleSlots.id, req.params.id));
      if (result.length === 0) {
        res.status(404).json({ error: "Schedule slot not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch schedule slot" });
    }
  });

  app.post("/api/schedule-slots", async (req, res) => {
    try {
      const validatedData = insertScheduleSlotSchema.parse(req.body);
      const result = await db.insert(scheduleSlots).values(validatedData).returning();
      res.status(201).json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create schedule slot" });
      }
    }
  });

  app.put("/api/schedule-slots/:id", async (req, res) => {
    try {
      const validatedData = insertScheduleSlotSchema.partial().parse(req.body);
      const cleanedData = removeUndefined(validatedData);
      
      if (Object.keys(cleanedData).length === 0) {
        res.status(400).json({ error: "No fields to update" });
        return;
      }
      
      const result = await db.update(scheduleSlots)
        .set(cleanedData)
        .where(eq(scheduleSlots.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Schedule slot not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update schedule slot" });
      }
    }
  });

  app.delete("/api/schedule-slots/:id", async (req, res) => {
    try {
      const result = await db.delete(scheduleSlots)
        .where(eq(scheduleSlots.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Schedule slot not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete schedule slot" });
    }
  });

  // FAQs
  app.get("/api/faqs", async (req, res) => {
    try {
      const result = await db.select().from(faqs)
        .where(eq(faqs.published, true))
        .orderBy(faqs.order);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch FAQs" });
    }
  });

  app.get("/api/faqs/:id", async (req, res) => {
    try {
      const result = await db.select().from(faqs).where(eq(faqs.id, req.params.id));
      if (result.length === 0) {
        res.status(404).json({ error: "FAQ not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch FAQ" });
    }
  });

  app.post("/api/faqs", async (req, res) => {
    try {
      const validatedData = insertFaqSchema.parse(req.body);
      const result = await db.insert(faqs).values(validatedData).returning();
      res.status(201).json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create FAQ" });
      }
    }
  });

  app.put("/api/faqs/:id", async (req, res) => {
    try {
      const validatedData = insertFaqSchema.partial().parse(req.body);
      const cleanedData = removeUndefined(validatedData);
      
      if (Object.keys(cleanedData).length === 0) {
        res.status(400).json({ error: "No fields to update" });
        return;
      }
      
      const result = await db.update(faqs)
        .set({ ...cleanedData, updatedAt: new Date() })
        .where(eq(faqs.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "FAQ not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update FAQ" });
      }
    }
  });

  app.delete("/api/faqs/:id", async (req, res) => {
    try {
      const result = await db.delete(faqs)
        .where(eq(faqs.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "FAQ not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete FAQ" });
    }
  });

  // Legal Pages
  app.get("/api/legal", async (req, res) => {
    try {
      const result = await db.select().from(legalPages).where(eq(legalPages.published, true));
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch legal pages" });
    }
  });

  app.get("/api/legal/:slug", async (req, res) => {
    try {
      const result = await db.select().from(legalPages)
        .where(eq(legalPages.slug, req.params.slug));
      if (result.length === 0) {
        res.status(404).json({ error: "Legal page not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch legal page" });
    }
  });

  app.post("/api/legal", async (req, res) => {
    try {
      const validatedData = insertLegalPageSchema.parse(req.body);
      const result = await db.insert(legalPages).values(validatedData).returning();
      res.status(201).json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create legal page" });
      }
    }
  });

  app.put("/api/legal/:id", async (req, res) => {
    try {
      const validatedData = insertLegalPageSchema.partial().parse(req.body);
      const cleanedData = removeUndefined(validatedData);
      
      if (Object.keys(cleanedData).length === 0) {
        res.status(400).json({ error: "No fields to update" });
        return;
      }
      
      const result = await db.update(legalPages)
        .set({ ...cleanedData, updatedAt: new Date() })
        .where(eq(legalPages.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Legal page not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update legal page" });
      }
    }
  });

  app.delete("/api/legal/:id", async (req, res) => {
    try {
      const result = await db.delete(legalPages)
        .where(eq(legalPages.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Legal page not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete legal page" });
    }
  });

  // Page Content
  app.get("/api/pages", async (req, res) => {
    try {
      const result = await db.select().from(pageContent).where(eq(pageContent.published, true));
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pages" });
    }
  });

  app.get("/api/pages/:slug", async (req, res) => {
    try {
      const result = await db.select().from(pageContent)
        .where(eq(pageContent.slug, req.params.slug));
      if (result.length === 0) {
        res.status(404).json({ error: "Page not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch page" });
    }
  });

  app.post("/api/pages", async (req, res) => {
    try {
      const validatedData = insertPageContentSchema.parse(req.body);
      const result = await db.insert(pageContent).values(validatedData).returning();
      res.status(201).json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create page" });
      }
    }
  });

  app.put("/api/pages/:id", async (req, res) => {
    try {
      const validatedData = insertPageContentSchema.partial().parse(req.body);
      const cleanedData = removeUndefined(validatedData);
      
      if (Object.keys(cleanedData).length === 0) {
        res.status(400).json({ error: "No fields to update" });
        return;
      }
      
      const result = await db.update(pageContent)
        .set({ ...cleanedData, updatedAt: new Date() })
        .where(eq(pageContent.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Page not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update page" });
      }
    }
  });

  app.delete("/api/pages/:id", async (req, res) => {
    try {
      const result = await db.delete(pageContent)
        .where(eq(pageContent.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Page not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete page" });
    }
  });

  // Site Settings
  app.get("/api/settings", async (req, res) => {
    try {
      const result = await db.select().from(siteSettings);
      const settingsMap = result.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, string>);
      res.json(settingsMap);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.put("/api/settings/:key", async (req, res) => {
    try {
      const { value } = req.body;
      if (typeof value !== "string") {
        res.status(400).json({ error: "Value must be a string" });
        return;
      }

      const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, req.params.key));
      
      let result;
      if (existing.length > 0) {
        result = await db.update(siteSettings)
          .set({ value, updatedAt: new Date() })
          .where(eq(siteSettings.key, req.params.key))
          .returning();
      } else {
        result = await db.insert(siteSettings)
          .values({ key: req.params.key, value })
          .returning();
      }
      
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to update setting" });
    }
  });

  // Leads (with status workflow)
  app.get("/api/leads", async (req, res) => {
    try {
      const { status, type } = req.query;
      const conditions = [];
      
      if (status) {
        conditions.push(eq(leads.status, status as any));
      }
      if (type) {
        conditions.push(eq(leads.type, type as any));
      }
      
      let query = db.select().from(leads);
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
      
      const result = await query.orderBy(desc(leads.createdAt));
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.get("/api/leads/:id", async (req, res) => {
    try {
      const result = await db.select().from(leads).where(eq(leads.id, req.params.id));
      if (result.length === 0) {
        res.status(404).json({ error: "Lead not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lead" });
    }
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const result = await db.insert(leads).values(validatedData).returning();
      res.status(201).json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create lead" });
      }
    }
  });

  app.put("/api/leads/:id", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.partial().parse(req.body);
      const cleanedData = removeUndefined(validatedData);
      
      if (Object.keys(cleanedData).length === 0) {
        res.status(400).json({ error: "No fields to update" });
        return;
      }
      
      const result = await db.update(leads)
        .set({ ...cleanedData, updatedAt: new Date() })
        .where(eq(leads.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Lead not found" });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Validation error", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update lead" });
      }
    }
  });

  app.delete("/api/leads/:id", async (req, res) => {
    try {
      const result = await db.delete(leads)
        .where(eq(leads.id, req.params.id))
        .returning();
      
      if (result.length === 0) {
        res.status(404).json({ error: "Lead not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete lead" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
