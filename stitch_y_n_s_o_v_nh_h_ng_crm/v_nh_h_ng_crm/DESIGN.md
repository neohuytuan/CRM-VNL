---
name: Vĩnh Hưng CRM
colors:
  surface: '#fff8f5'
  surface-dim: '#e5d8ce'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1e7'
  surface-container: '#f9ebe2'
  surface-container-high: '#f3e6dc'
  surface-container-highest: '#ede0d7'
  on-surface: '#211a15'
  on-surface-variant: '#4f4538'
  inverse-surface: '#362f29'
  inverse-on-surface: '#fceee5'
  outline: '#817566'
  outline-variant: '#d2c4b2'
  surface-tint: '#7c5808'
  primary: '#7c5808'
  on-primary: '#ffffff'
  primary-container: '#c89b4a'
  on-primary-container: '#4d3400'
  inverse-primary: '#f0bf6a'
  secondary: '#635e54'
  on-secondary: '#ffffff'
  secondary-container: '#e7ded2'
  on-secondary-container: '#686258'
  tertiary: '#506444'
  on-tertiary: '#ffffff'
  tertiary-container: '#93a984'
  on-tertiary-container: '#2b3e21'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdeaa'
  primary-fixed-dim: '#f0bf6a'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5f4100'
  secondary-fixed: '#eae1d5'
  secondary-fixed-dim: '#cec5ba'
  on-secondary-fixed: '#1f1b14'
  on-secondary-fixed-variant: '#4b463d'
  tertiary-fixed: '#d2eac1'
  tertiary-fixed-dim: '#b6cea6'
  on-tertiary-fixed: '#0e2006'
  on-tertiary-fixed-variant: '#394c2e'
  background: '#fff8f5'
  on-background: '#211a15'
  surface-variant: '#ede0d7'
typography:
  display-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 48px
    fontWeight: '300'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-md:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  sidebar-width: 260px
  topbar-height: 72px
  gutter: 24px
  margin-desktop: 32px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style
The design system is crafted for a premium Bird's Nest (Yến Sào) enterprise, blending traditional heritage with modern management. The brand personality is sophisticated, organic, and trustworthy. 

To achieve this, the system utilizes a **Minimalist Glassmorphism** style. It relies on a "breathable" layout with significant whitespace to evoke a sense of luxury and calm. UI elements should feel like delicate layers of glass resting on a warm, organic surface, mirroring the purity and value of the product. The visual language avoids heavy shadows in favor of light-refracting borders and subtle backdrop blurs.

## Colors
The palette is inspired by natural, earthy tones. The **Primary Accent (Honey Gold)** is used for high-importance actions and brand recognition. The **Neutral** palette uses "Charcoal Brown" instead of pure black to maintain warmth against the "Warm White" background.

- **Background:** Use `#FAF8F4` for the main canvas to reduce eye strain and provide a soft, organic feel.
- **Surface:** Use `#FFFDF9` with transparency for glass effects.
- **Borders:** Use `#E6DDD1` for all structural divisions. It is low-contrast to ensure the "Glass" effect remains subtle.
- **Semantic Colors:** Muted versions of Green, Gold, and Red are used to maintain the premium aesthetic without appearing too "neon" or clinical.

## Typography
This design system employs **Be Vietnam Pro** to celebrate the brand's roots while maintaining a modern, global tech feel. 

To achieve the "Premium" look, use lighter font weights (300 and 400) for large display text and headlines. Reserve medium and semi-bold weights for interactive labels and small body text to ensure legibility. Tracking (letter spacing) should be slightly tightened for large displays and slightly opened for small labels to maintain a sophisticated editorial rhythm.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model. 
- **Sidebar:** A fixed 260px navigation pane on the left. It must use a backdrop-blur effect to allow the background colors to bleed through.
- **Main Content:** A fluid area that expands to fill the remaining width.
- **Grid:** Use a 12-column grid for the main content area with 24px gutters.
- **Vertical Rhythm:** All spacing should be multiples of 8px. Use generous padding (32px+) inside cards to maintain the "airy" minimalist requirement.

## Elevation & Depth
Depth is created through **Glassmorphism** rather than traditional shadows. 
- **Levels:**
  1. **Base:** The `#FAF8F4` background.
  2. **Flat Surfaces:** Cards and containers using `#FFFDF9` with a subtle `1px` border in `#E6DDD1`.
  3. **Floating/Glass:** Navigation elements (Sidebar, Topbar) should have `backdrop-filter: blur(16px)` and a background opacity of roughly 80%.
- **Shadows:** Use a single, extremely soft "Ambient" shadow for active cards: `0 4px 20px -2px rgba(45, 38, 32, 0.05)`. Avoid dark or heavy shadows at all costs.

## Shapes
The shape language is organic and soft. 
- **Cards & Modals:** Use `2xl` (1.5rem / 24px) corner radius to create a high-end, friendly feel.
- **Buttons & Inputs:** Use `xl` (0.75rem / 12px) for a slightly more structured but still modern appearance.
- **Icons:** Use a thin stroke (1.5px) with rounded caps to match the typography's light weight.

## Components
- **Buttons:** Primary buttons use the Honey Gold (`#C89B4A`) background with white text. Secondary buttons should have a ghost style with the `#E6DDD1` border and `#2D2620` text.
- **Cards:** Must have `backdrop-blur-md`, a 1px border of `#E6DDD1`, and the surface color `#FFFDF9`. Padding should be a minimum of `24px` for small cards and `40px` for large data sections.
- **Input Fields:** Use a "Soft-Underline" or "Ghost-Box" style. Background should be slightly darker than the surface (`#F4EFE8`) with no shadow, only a subtle border on focus in Honey Gold.
- **Sidebar:** The sidebar is the anchor of the glass effect. It should span the full height, have a right-side border of `#E6DDD1`, and use an active state indicator consisting of a vertical Gold bar on the left of the active menu item.
- **Chips/Badges:** Small, rounded-pill shapes with low-opacity backgrounds of the semantic colors (e.g., Success green at 10% opacity with 100% opacity text).
- **CRM Specifics:** Customer profile summaries and "Nest Quality" indicators should be treated as high-priority glass cards with editorial-style typography.