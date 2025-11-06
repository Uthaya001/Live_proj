# ReachInbox Frontend Design Guidelines

## Design Approach
**Reference-Based + System Hybrid**: Drawing inspiration from the provided screenshot and modern email productivity tools (Linear, Superhuman, Gmail) with emphasis on information density and efficiency. This is a utility-focused B2B SaaS application requiring clean, professional aesthetics with strong information hierarchy.

## Core Design Principles
1. **Information First**: Maximize content visibility while maintaining breathing room
2. **Scan-able Hierarchy**: Clear visual distinction between UI chrome and content
3. **Consistent Density**: Balanced spacing that feels neither cramped nor wasteful
4. **Professional Polish**: Enterprise-grade appearance suitable for business users

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 3, 4, 6, 8, 12** for consistent rhythm
- Component padding: p-4, p-6
- Section gaps: gap-4, gap-6
- Margins: m-2, m-4, m-8

**Grid Structure**:
```
Three-column layout (desktop):
- Sidebar: w-64 (fixed, collapsible on tablet)
- Email List: flex-1, min-w-[400px]
- Detail Panel: w-[600px] (toggleable)

Mobile: Single column stack with drawer navigation
```

## Typography

**Font Stack**: Inter or DM Sans via Google Fonts
- Headers: font-semibold, text-lg to text-2xl
- Body: font-normal, text-sm to text-base
- Labels/Meta: font-medium, text-xs to text-sm
- Monospace for email addresses: font-mono, text-sm

**Hierarchy**:
- Page titles: text-xl, font-semibold
- Email subjects: text-base, font-medium
- Email preview: text-sm, truncate
- Timestamps: text-xs
- Category badges: text-xs, uppercase tracking-wide

## Component Library

### Navigation & Structure
**Top Header**: 
- Height: h-16, flex items-center, border-b
- Logo left, workspace selector center, profile/notifications right
- "Get Free Credits" CTA button (prominent, brand accent)

**Sidebar** (matches screenshot):
- Category filters as list items with icons and counts
- Active state: background highlight, border-left accent
- Hover: subtle background change
- Icons: 20px, aligned left with gap-3 from text

**Email List Panel**:
- Tabs: Primary/Others with underline indicator
- Search bar: h-10, rounded-lg, with icon prefix
- Bulk actions toolbar: Appears on selection, sticky top
- Email cards: p-4, border-b, hover:bg-gray-50

### Email Components
**Email Card**:
- Sender: font-medium, text-sm
- Subject: font-normal, text-base, truncate
- Preview: text-sm, text-gray-600, line-clamp-2
- Timestamp: text-xs, text-gray-500, absolute top-right
- Category badge: Floating top-right or inline with preview
- Unread indicator: border-l-4 accent or bold text

**Category Badges**:
- Small pill: px-2, py-1, rounded-full, text-xs
- Icon + label on larger viewports
- Color-coded (assigned by engineer, not specified here)

**Detail View Panel**:
- Email header: Sender avatar (h-10 w-10), name, email, timestamp
- Thread view: Collapsible previous messages
- Reply area: Bottom-fixed or inline
- AI suggestion: Card above reply box with "Suggested Reply" header

### Interactive Elements
**Search Bar**:
- Full-width in list panel
- Icon: Magnifying glass left, filter icon right
- Placeholder: "Search emails..."
- Focus: Subtle ring, no dramatic effects

**Filters Dropdown**:
- Account selector: Dropdown showing connected IMAP accounts
- Folder filter: Checkbox list (Inbox, Sent, Drafts, etc.)
- Apply button at bottom

**AI Reply Suggestions**:
- Card component: border, rounded-lg, p-4, bg-gray-50
- Header: "AI Suggested Reply" with sparkle icon
- Generated text: p-3, bg-white, rounded, border-l-4 accent
- Actions: "Use This" button primary, "Regenerate" secondary

### States & Feedback
**Empty States**:
- Illustration placeholder (centered, max-w-md)
- "No Emails" heading
- Descriptive text about syncing or filtering
- Optional CTA if actionable

**Loading States**:
- Skeleton screens for email cards
- Shimmer effect on placeholders
- Spinner for search/AI operations

**Error States**:
- Inline error messages (red accent, with icon)
- Toast notifications for system errors
- Retry actions where applicable

## Responsive Breakpoints

**Desktop (lg+)**: Full three-column layout
**Tablet (md)**: Two columns (sidebar collapses to icon-only or drawer)
**Mobile (base)**: Single column, hamburger menu, bottom sheet for filters

**Touch Targets**: Minimum 44px height for all interactive elements

## Animations
**Minimal & Purposeful Only**:
- Sidebar collapse/expand: 200ms ease
- Panel slide-in: 300ms ease-out
- No scroll-triggered animations
- No decorative motion

## Images
**No Hero Section**: This is a productivity application, not a marketing page
**Profile Avatars**: 32px (list), 40px (detail), 48px (header)
**Empty State Illustration**: Simple, minimal line art - centered in empty list view
**Logo**: Header left, compact version for mobile

## Key UI Patterns from Screenshot

1. **Sidebar Categories**: Vertical list with icons, label, count badge on right
2. **Split View**: Classic email client layout (list + detail)
3. **Compact Density**: Information-rich without feeling cluttered
4. **Professional Palette**: Clean, minimal, business-appropriate
5. **Clear Hierarchy**: Strong contrast between active/inactive states
6. **Persistent Navigation**: Fixed header and sidebar, scrollable content areas

## Accessibility
- Keyboard navigation for all actions
- Screen reader labels on icon buttons
- Focus indicators on all interactive elements
- ARIA labels for email status (read/unread, category)
- Color-independent category indicators (use icons + text)

## Technical Notes
- Real-time updates: Use optimistic UI updates, then sync
- Search: Debounce input, show loading state
- Infinite scroll or pagination for email list
- LocalStorage for UI preferences (sidebar collapsed, panel width)
- WebSocket connection indicator in header

This design prioritizes efficiency and professionalism suitable for a B2B email productivity tool while maintaining visual appeal through thoughtful spacing, typography, and component design.