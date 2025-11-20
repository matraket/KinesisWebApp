# Kinesis Dance School - Design Guidelines

## Design Approach

**Selected Approach**: Reference-Based + Design System Hybrid
- **Primary References**: Airbnb (cards, spacing), Linear (typography hierarchy), Stripe (restraint)
- **Design System Foundation**: shadcn/ui components with Tailwind utilities
- **Aesthetic Direction**: Dark, modern, tech-forward with emotional dance imagery

## Typography System

**Font Families**:
- **Display/Headlines**: Montserrat (600, 700, 800 weights)
- **Body/UI**: Inter (400, 500, 600 weights)

**Hierarchy**:
- H1 (Hero): text-5xl md:text-6xl lg:text-7xl, Montserrat Bold
- H2 (Section): text-4xl md:text-5xl, Montserrat SemiBold
- H3 (Subsection): text-2xl md:text-3xl, Montserrat SemiBold
- H4 (Card titles): text-xl md:text-2xl, Montserrat Medium
- Body Large: text-lg, Inter Regular
- Body: text-base, Inter Regular
- Small/Meta: text-sm, Inter Medium

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistency
- Component padding: p-6, p-8
- Section spacing: py-20 md:py-32
- Card gaps: gap-8 md:gap-12
- Element margins: mb-4, mb-6, mb-8

**Container Strategy**:
- Full-width sections with inner max-w-7xl mx-auto px-6 md:px-8
- Content sections: max-w-6xl
- Text-heavy content: max-w-3xl
- Cards grid: max-w-7xl

## Core Page Sections

### Hero Section (Full viewport impact)
- Height: min-h-screen with centered content
- Large background image (dancer in motion, high-contrast, dramatic)
- Headline + subheadline + dual CTA buttons
- Buttons with backdrop-blur-md bg-white/10 treatment over image
- Scroll indicator at bottom

### Business Models Showcase (4 cards)
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Card structure: Image top, icon badge, title, description, CTA link
- Hover effect: subtle scale transform (scale-105)
- Each model gets distinct accent treatment

### Programs Catalog
- Filterable grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Filter pills: Level, Age, Style (horizontal scrollable on mobile)
- Program cards: Image, badge (level), title, quick stats, view details
- Expandable details view (modal or slide-over panel)

### Team/Instructors
- Asymmetric grid layout: alternating 2-col and 3-col rows
- Profile cards: Portrait image, name, specialties (pills), brief bio
- Click to expand full profile with experience and programs taught

### Schedule Timetable
- Visual grid: Days (columns) × Time slots (rows)
- Responsive: Horizontal scroll on mobile, full grid on desktop
- Color-coded by program type
- Interactive cells: Click for program details

### Pricing Section
- 2-column comparison on desktop (stacked on mobile)
- Clear plan cards with feature lists
- Highlight "most popular" option
- CTAs per plan

### Contact/Lead Forms
- Multi-purpose form with type selector (General, Pre-registration, Élite Booking)
- Progressive disclosure: Show relevant fields based on selection
- Validation states with clear feedback
- Success state with confirmation message

## Component Library

### Navigation
- Sticky header: backdrop-blur-lg with subtle shadow on scroll
- Logo left, nav center, CTAs right on desktop
- Hamburger menu on mobile → full-screen overlay navigation

### Cards
- Rounded borders: rounded-xl or rounded-2xl
- Subtle elevation: shadow-lg hover:shadow-2xl
- Padding: p-6 md:p-8
- Border treatment for emphasis on key cards

### Buttons
- Primary: Large, rounded-full, px-8 py-4, bold text
- Secondary: Outline variant, same sizing
- Ghost: Text-only with underline on hover
- All buttons: transition-all duration-200

### Forms
- Input fields: Generous padding (px-4 py-3), rounded-lg
- Labels: Small, medium weight, mb-2
- Error states: Border change + error message below
- Success states: Checkmark icon + confirmation text

### Badges/Pills
- Small rounded-full tags for levels, styles, ages
- Padding: px-3 py-1, text-xs font-medium

## Images

**Hero Section**: Full-screen background image of dancer mid-movement, dramatic lighting, high contrast
**Business Model Cards**: Representative images per model (Élite: professional dancer, Generación: children dancing, etc.)
**Programs**: Action shots of specific dance styles
**Team Profiles**: Professional headshots on consistent background
**About Section**: Studio interior shots, group class imagery

## Animations & Interactions

**Sparingly Used**:
- Hero: Subtle fade-in on load
- Scroll-triggered: Cards fade-up as they enter viewport (intersection observer)
- Button hovers: Slight scale + shadow change
- Form validation: Smooth error/success state transitions
- NO auto-playing carousels or excessive motion

## Responsive Strategy

**Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- Mobile-first: Single column, stacked sections
- Tablet: 2-column grids, side-by-side content blocks
- Desktop: Multi-column grids, full timetable view
- Consistent touch targets: min-h-12 for all interactive elements

## Accessibility

- ARIA labels on all interactive elements
- Focus states: Visible outline on keyboard navigation
- Color contrast: AAA standard for all text
- Alt text for all images
- Form labels properly associated with inputs
- Skip navigation link

This design creates a sophisticated, professional platform that balances technical precision (reflecting Kinesis' philosophy) with the emotional, dynamic nature of dance.