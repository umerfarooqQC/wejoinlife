# WJL Seller Portal Design System Foundation

## Goal
Build a reusable, professional frontend foundation for all future WJL seller screens, following the supplied Figma’s visual language without copying its screens. No backend, API, authentication, database, or business-logic changes.

## Scope
- Centralize the WJL palette, typography, spacing, radii, shadows, and responsive rules in the frontend theme.
- Create reusable, accessible components for layout, navigation, forms, actions, data display, and feedback.
- Add a responsive WJL seller shell with sidebar, header, page container, page header, and breadcrumbs.
- Add a dedicated Design System showcase page as the visual source of truth.
- Preserve existing seller-screen behavior and all non-frontend code.

## Build Steps
1. **Theme and tokens**
   - Replace scattered visual values with semantic light-theme WJL tokens for brand, surfaces, borders, text, feedback states, elevation, radii, spacing, and typography.
   - Map tokens into Tailwind utilities so future screens never require hardcoded colors.
   - Use a restrained SaaS/e-commerce admin style with crisp surfaces, subtle borders, compact information density, and clear focus states.

2. **Reusable component library**
   - Extend the existing UI primitives instead of duplicating them.
   - Provide variants for buttons, inputs, selects, checkboxes, radios, switches, textarea, cards, badges, alerts, dialogs, drawers, tooltips, tabs, pagination, avatars, and loading states.
   - Add focused WJL composites: SearchInput, MultiSelect, DatePicker, FormField, FormSection, StatCard, StatusBadge, EmptyState, ErrorState, FileUpload, ImagePreview, TableToolbar, and reusable DataTable.

3. **Application layout**
   - Create AppShell, Sidebar, Header, PageContainer, PageHeader, Breadcrumbs, and sidebar navigation items.
   - Make navigation responsive: persistent sidebar on larger screens and an accessible drawer on smaller screens.
   - Keep the shell ready for future seller routes without inventing those screens now.

4. **Data and form patterns**
   - Build a reusable typed DataTable with sorting, filtering, row selection, row actions, pagination, loading, empty, and responsive overflow states.
   - Standardize labels, required markers, descriptions, validation errors, disabled controls, and section spacing.

5. **Design System showcase**
   - Add a `/design-system` frontend page showing every component and important state: default, hover/focus-ready, active, selected, disabled, loading, error, empty, and status variants.
   - Use representative seller-portal sample content only; no real data or backend calls.

6. **Quality and verification**
   - Ensure keyboard access, visible focus treatment, semantic labels, contrast, and reduced-motion support.
   - Verify the showcase and shell at desktop, tablet, and mobile widths.
   - Confirm all existing frontend routes still compile and no backend files changed.

## Technical Details
- Keep TanStack Start routing and Tailwind v4.
- Organize additions under `src/components` by UI, layout, forms, data display, and feedback responsibilities.
- Keep all brand values in `src/styles.css`; components consume semantic classes only.
- Use existing Radix/shadcn primitives, Lucide icons, and Sonner where available; avoid unnecessary dependencies.
- Add route-specific metadata to the new showcase route.
