# Kinesis Dance School - Project Documentation

## Overview

Kinesis is a full-stack TypeScript dance school platform, comprising a public website and an internal Content Management System (CMS). Its primary goal is to provide diverse dance education—from professional training to children's programs and wedding preparation—managed through a single digital platform for the Zaragoza, Spain market.

**Core Purpose:** To democratize excellence in dance through a unified, comprehensive digital platform.

**Tech Stack:**
- Frontend: React, TypeScript, Vite, shadcn/ui, Tailwind CSS
- Backend: Express.js
- Database: PostgreSQL with Drizzle ORM
- Deployment: Neon serverless PostgreSQL

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Application Structure

The project uses a monorepo structure with `client/` (React frontend), `server/` (Express.js backend), and `shared/` (shared TypeScript schemas/types) directories. This promotes code reuse and clear separation of concerns.

### Frontend Architecture

- **Component Framework:** `shadcn/ui` (copied, customizable components built on Radix UI).
- **Design System:** Dark-first aesthetic with Montserrat (headings) and Inter (body) fonts. Uses a controlled color palette including primary pink (`#FF3366`) and accent purple (`#8B5CF6`). Tailwind CSS is used for responsive, mobile-first layouts.
- **Routing:** `Wouter` for client-side routing, separating public and CMS admin pages.
- **State Management:** `TanStack Query` for server state, handling data fetching, caching, and synchronization.
- **Asset Management:** Static images stored in `attached_assets/generated_images/` and type-safely imported.

### Backend Architecture

- **API Design:** RESTful API using Express.js, prefixed with `/api/`.
- **Route Structure:** CRUD operations for entities like business models, programs, instructors, pricing, schedules, FAQs, leads, legal pages, and site settings.
- **Middleware:** JSON parsing, CORS, security headers, and logging.
- **Error Handling:** Centralized error handling providing HTTP status codes and JSON messages.
- **Authentication:** Currently uses in-memory storage, with session-based authentication planned for CMS routes.

### Database Architecture

- **ORM Choice:** Drizzle ORM for type-safe PostgreSQL interactions.
- **Schema Design:** Core tables include `business_models`, `programs`, `instructors`, `pricing_tiers`, `schedule_slots`, `faqs`, `leads`, `legal_pages`, `page_content`, and `site_settings` with defined relationships.
- **Data Validation:** Zod schemas, generated from Drizzle, for runtime validation of API inputs.
- **Connection Pooling:** Neon serverless driver with WebSocket support for efficient connections.

### Build & Deployment Strategy

- **Development:** Vite dev server and Express backend run concurrently.
- **Production:** Vite builds the frontend, esbuild bundles the backend.
- **Environment Variables:** `DATABASE_URL` and `NODE_ENV`.

## External Dependencies

### UI Component Library
**shadcn/ui + Radix UI:** Accessible React components, copied directly into the codebase for full control.

### Database Service
**Neon Serverless PostgreSQL:** Cloud-hosted PostgreSQL with `@neondatabase/serverless` driver for serverless environments.

### Styling Framework
**Tailwind CSS:** Utility-first CSS framework with custom configuration for colors, fonts, and responsiveness. Supports light/dark modes.

### Forms & Validation
**React Hook Form + Zod:** `react-hook-form` for state management, `zod` for schema validation, and `@hookform/resolvers` for integration. `drizzle-zod` generates Zod schemas from database schemas.

### API Client
**TanStack Query:** Manages client-side data fetching, caching, and synchronization.

### Fonts
**Google Fonts:** Montserrat (display) and Inter (body) loaded via CDN.

### Development Tools
**Replit Plugins:** Error modal, cartographer, and dev banner (development only).

### Database Migrations
**Drizzle Kit:** Used for schema migration to synchronize database changes.