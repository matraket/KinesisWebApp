# Kinesis Dance School - Project Documentation

## Overview

Kinesis is a comprehensive dance school platform consisting of a public-facing corporate website and an internal CMS. The project is built as a full-stack TypeScript application targeting the dance education sector in Zaragoza, Spain.

**Core Purpose:** To democratize excellence in dance by offering four distinct business models - from professional training to children's programs and wedding preparation - all managed through a unified digital platform.

**Tech Stack:**
- Frontend: React + TypeScript + Vite
- UI Framework: shadcn/ui components with Tailwind CSS
- Backend: Express.js
- Database: PostgreSQL with Drizzle ORM
- Deployment: Neon serverless PostgreSQL

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Application Structure

**Monorepo Organization:**
The project follows a modular monorepo structure with three main directories:
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared TypeScript schemas and types

This architecture enables code reuse between frontend and backend while maintaining clear separation of concerns.

### Frontend Architecture

**Component Framework:**
Uses shadcn/ui, a collection of accessible, copy-paste React components built on Radix UI primitives. Components are copied into the codebase rather than installed as dependencies, providing full control and customization.

**Design System:**
- **Typography:** Montserrat for display/headings (600-800 weights), Inter for body text (400-600 weights)
- **Color Scheme:** Dark-first aesthetic with controlled palette - primary pink (#FF3366), accent purple (#8B5CF6), dark backgrounds (Kinesis Night)
- **Layout System:** Tailwind utility classes with consistent spacing primitives (4, 6, 8, 12, 16, 20, 24)
- **Responsive Strategy:** Mobile-first with breakpoints at md: and lg:

**Routing:**
Uses Wouter for lightweight client-side routing. Two main route groups:
- Public pages (/, /quienes-somos, /modelos, /programas, /equipo, /tarifas, /contacto, /faq)
- CMS admin pages (/cms/*)

**State Management:**
TanStack Query (React Query) for server state management with centralized query client configuration. API requests use a custom `apiRequest` helper with consistent error handling.

**Asset Management:**
Static images stored in `attached_assets/generated_images/` and imported via Vite's asset handling system with type-safe imports.

### Backend Architecture

**API Design:**
RESTful API with Express.js serving JSON responses. All API routes prefixed with `/api/` for clear separation from frontend routes.

**Route Structure:**
CRUD operations for core entities:
- `/api/business-models` - Four business pillars
- `/api/programs` - Dance programs/disciplines
- `/api/instructors` - Teaching staff
- `/api/pricing-tiers` - Pricing plans
- `/api/schedule-slots` - Class schedules
- `/api/faqs` - FAQ content
- `/api/leads` - Contact/registration forms
- `/api/legal-pages` - Legal content
- `/api/page-content` - Dynamic page sections
- `/api/site-settings` - Global site configuration

**Middleware Stack:**
- JSON body parsing with raw body preservation for webhooks
- CORS and security headers
- Request/response logging for API routes
- Development-only Vite middleware for HMR

**Error Handling:**
Centralized error handling with try-catch blocks returning appropriate HTTP status codes and JSON error messages.

### Database Architecture

**ORM Choice:**
Drizzle ORM chosen for type-safe database operations with PostgreSQL. Provides excellent TypeScript integration and migration tooling.

**Schema Design:**
Core tables with relationships:
- `business_models` - Four business pillars (Élite On Demand, Ritmo Constante, Generación Dance, Sí Quiero Bailar)
- `programs` - Dance disciplines linked to business models
- `instructors` - Teaching staff profiles
- `instructor_specialties` - Many-to-many relationship between instructors and programs
- `pricing_tiers` - Flexible pricing for each business model
- `schedule_slots` - Weekly class schedule with day/time/program assignments
- `faqs` - Categorized frequently asked questions
- `leads` - Contact/registration submissions with status tracking
- `legal_pages` - Terms, privacy policy, etc.
- `page_content` - Dynamic content sections for CMS editing
- `site_settings` - Key-value configuration store

**Data Validation:**
Zod schemas generated from Drizzle schemas using `drizzle-zod` for runtime validation of API inputs and form submissions.

**Connection Pooling:**
Uses Neon serverless driver with WebSocket support for efficient connection management in serverless environments.

### Build & Deployment Strategy

**Development Mode:**
- Vite dev server with HMR for instant feedback
- Express backend runs concurrently via `tsx` for TypeScript execution
- Single dev command: `npm run dev`

**Production Build:**
- Frontend: Vite builds optimized React bundle to `dist/public/`
- Backend: esbuild bundles Express server to `dist/index.js` with external packages
- Unified build command: `npm run build`

**Environment Variables:**
- `DATABASE_URL` - Required PostgreSQL connection string
- `NODE_ENV` - Development vs production mode detection

### Authentication & Authorization

**Current Implementation:**
In-memory user storage via `MemStorage` class (server/storage.ts). Prepared for future session-based authentication but not currently enforced.

**Future Considerations:**
Session management infrastructure present (connect-pg-simple dependency) but not yet implemented. CMS routes currently unprotected.

## External Dependencies

### UI Component Library
**shadcn/ui + Radix UI:**
Complete set of accessible React components. Not installed as npm package - components are copied into `client/src/components/ui/`. Includes: buttons, cards, dialogs, forms, inputs, navigation, toasts, and 40+ other primitives.

### Database Service
**Neon Serverless PostgreSQL:**
Cloud-hosted PostgreSQL with serverless driver (`@neondatabase/serverless`). Requires `DATABASE_URL` environment variable. WebSocket-based connection pooling for edge deployment compatibility.

### Styling Framework
**Tailwind CSS:**
Utility-first CSS framework configured with custom design tokens. Theme extends default with custom colors, fonts, border radii, and spacing. Supports light/dark modes via class strategy.

### Forms & Validation
**React Hook Form + Zod:**
- `react-hook-form` - Form state management
- `@hookform/resolvers` - Zod integration
- `zod` - Runtime type validation
- `drizzle-zod` - Auto-generate Zod schemas from database schema

### API Client
**TanStack Query:**
Client-side data fetching, caching, and synchronization. Configured with custom query functions for consistent API integration and error handling.

### Fonts
**Google Fonts:**
- Montserrat (weights: 400, 600, 700, 800) - Display typography
- Inter (weights: 400, 500, 600) - Body typography
Loaded via Google Fonts CDN in `client/index.html`.

### Development Tools
**Replit Plugins (Dev Only):**
- `@replit/vite-plugin-runtime-error-modal` - Error overlay
- `@replit/vite-plugin-cartographer` - Code navigation
- `@replit/vite-plugin-dev-banner` - Environment indicator

### Asset References
**Design Inspiration:**
- Launch UI Components - Open-source React blocks built on shadcn/ui
- Serene Yoga Landing (TailFlux) - Template reference for layout structure
Referenced in `attached_assets/Stack-UI-WebCms_1763669089943.md` and `attached_assets/kinesis-inspiracion-diseño-ux_1763669089942.md`

### Database Migrations
**Drizzle Kit:**
Schema migration tool configured to output to `./migrations` directory. Run via `npm run db:push` to sync schema changes to database.