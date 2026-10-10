# Jason Jeong — Design System

> **Thinking in systems. Not by each frame.**

This is the source of truth for the look and feel of Jason Jeong's portfolio. It is written for people **and coding agents**: when you build a new page or component, follow this file and use the tokens and components it names. Don't make up new values.

- **Figma source:** [JJJ Final Undergrad Portfolio › Design system](https://www.figma.com/design/wTRwgEKJ5RXgMkFktaTcTO/JJJ-Final-Undergrad-Portfolio?node-id=94-3927) (node `94:3927`)
- **Tokens in code:** [`src/app/globals.css`](src/app/globals.css) (Tailwind v4 `@theme`) and [`src/lib/design-tokens.ts`](src/lib/design-tokens.ts) (typed data)
- **Live showcase:** `/design-system` ([`src/app/design-system/page.tsx`](src/app/design-system/page.tsx)), linked from the landing page's "How’d you make this website??" chip
- **Landing page:** `/` ([`src/app/page.tsx`](src/app/page.tsx)), from Figma node `94:3455`
- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. Deployed on Vercel.

---

## 1. Principles: playful minimalism

The system pairs **minimal structure** with **small moments of play**.

| Minimal | Playful |
|---|---|
| Black and white do most of the work. | Each project has one vibrant accent color, used in small specks: a chip, a tag, a highlight. It never floods a page. |
| Satoshi carries body copy so content is easy to read. | Bricolage Grotesque carries headlines and gives them character. |
| Plenty of whitespace, flat surfaces, no shadows. | A hand-drawn vector character of Jason appears across the site. |

**Rules of thumb**

1. When unsure, use black, white or gray. Add accent color on purpose, never as decoration.
2. A project page uses **only its own** project color. Don't mix accents on one page.
3. Surfaces are flat: `bg-surface` with `rounded-card`. No gradients. The only shadows are the soft, centered `shadow-float` / `shadow-halo` on UI that floats over the page (the prompt card, the avatar).
4. Headlines use the display face (Bricolage). Everything else uses the body face (Satoshi).

---

## 2. Color

### 2.1 Neutrals (primary palette)

| Figma name | Token / Tailwind class | Hex | Use for |
|---|---|---|---|
| Primary Black | `ink` → `text-ink`, `bg-ink` | `#000000` | Headings, primary text, dark fills, the toast |
| Text | `ink-body` → `text-ink-body` | `#525252` | Long-form body paragraphs (section intros) |
| Subtle Text | `ink-subtle` → `text-ink-subtle` | `#808080` | Labels, meta, Micro captions (Figma variable `semantic/muted-foreground`) |
| *(faint)* | `ink-faint` → `text-ink-faint` | `#BCBCBC` | Playful asides inside body copy, e.g. "(haha get it)". Decorative only: ≈1.9:1 contrast, so never use it for meaningful text. |
| Borders | `line` → `border-line` | `#E5E5E5` | Outlines, table and list rules, white swatch border |
| *(divider)* | `divider` → `border-divider` | `#D9D9D9` | The full-bleed 1px hairline under the tab bar only |
| Secondary BG | `surface` → `bg-surface` | `#F2F2F2` | Cards, active tab, hover state on tabs |
| White | `paper` → `bg-paper`, `text-paper` | `#FFFFFF` | Page background, text on dark fills |

Text hierarchy: `ink` for headings and paired answer copy → `ink-body` for paragraphs → `ink-subtle` for labels.

### 2.2 Project accents

There are six project colors, one per project. Use them for small accents on that project's page and its card.

| Figma name | Token / class | Hex |
|---|---|---|
| Desy Burnt Sienna | `desy` → `bg-desy`, `text-desy` | `#DF5732` |
| Nyck Blue | `nyck` → `bg-nyck`, `text-nyck` | `#0E6DF9` |
| Root Carrot | `root` → `bg-root`, `text-root` | `#FD5726` |
| Plaza Earth | `plaza` → `bg-plaza`, `text-plaza` | `#A34414` |
| Shopify Forest | `shopify` → `bg-shopify`, `text-shopify` | `#95BF47` |
| Amazon Rain | `amazon` → `bg-amazon`, `text-amazon` | `#26CAD3` |

Nyck Blue (`#0E6DF9`) is also the **focus ring** color across the site.

**Accessibility notes**

- White text on **Shopify Forest** (≈2.2:1) and **Amazon Rain** (≈2.0:1) fails WCAG contrast. The Figma swatches use it, but in real UI put **black** text on these two, or use them only for non-text accents.
- White on Desy Burnt Sienna (≈3.8:1) and Root Carrot (≈3.2:1) is fine for large text (19px+ bold / 24px+) but not small body text.
- White on Nyck Blue (≈4.6:1) and Plaza Earth (≈6.2:1) passes AA for all sizes.
- Don't use `ink-subtle` (#808080, ≈3.9:1 on white) for long passages. It is for short labels only.

---

## 3. Typography

### 3.1 Typefaces

| Role | Family | Weights | Loaded via | CSS var / class |
|---|---|---|---|---|
| Display ("playfulness") | **Bricolage Grotesque** | 500, 700 (variable, optical size fixed at `opsz 14`) | `next/font/google` | `--font-display` / `font-display` |
| Body ("minimalism") | **Satoshi** | 500 (Medium), 700 (Bold) | `next/font/local` from `src/app/fonts/` (Fontshare, ITF Free Font License) | `--font-body` / `font-body` |

Bricolage is always set with `font-variation-settings: "opsz" 14`, as in Figma. The `type-*` utilities already do this.

### 3.2 Type scale

Use the **`type-*` utilities**. They set family, size, weight, line height and tracking together. Don't rebuild them from separate `text-*`/`font-*` classes.

| Style | Utility | Family | Weight | Size (desktop) | Line height | Tracking |
|---|---|---|---|---|---|---|
| Title | `type-title` | Bricolage | Bold 700 | 72px | 1.2 | −4% (−2.88px) |
| Sub-title | `type-subtitle` | Bricolage | Bold 700 | 44px | 1.2 | −4% (−1.76px) |
| Heading | `type-heading` | Bricolage | Bold 700 | 32px | 1.2 | −4% (−1.28px) |
| Large Body | `type-body-lg` | Satoshi | Medium 500 | 20px | 1.35 | −4% (−0.8px) |
| Medium Body | `type-body-md` | Satoshi | Medium 500 | 16px | 1.35 | −4% (−0.64px) |
| Small Body | `type-body-sm` | Satoshi | Medium 500 | 14px | 1.35 | −4% (−0.56px) |
| Micro / Caption | `type-micro` | Satoshi | Bold 700 | 12px | 14px | **+4%** (0.48px), UPPERCASE |
| Swatch label | `type-label` | Bricolage | Medium 500 | 20px | 1.2 | −4% |
| Control | `type-control` | Bricolage | Medium 500 | 16px | 1.2 | −4% |

The hero's second line ("I do product & strategy") is `type-title` set in Bricolage **Medium** (`font-medium!`). Stacked hero lines use a tight `leading-[1.07]`.

- **Tracking:** every style is −4% (`tracking-tight` = `-0.04em`) except Micro, which is +4% (`tracking-wide` = `0.04em`).
- **Body default:** `<body>` is already Satoshi Medium 16px, −4%, `ink`. Plain text needs no classes.
- **Paired copy** (label + answer rows, e.g. "How is it designed?") uses 16px with a tighter 20px line height (`leading-5`), from the Figma variable `typography/body-sm/line-height`.
- **Paragraph spacing:** one empty line between paragraphs = `22px` (`space-y-(--space-paragraph)`).

### 3.3 Responsive scale

Display sizes step down at Tailwind's breakpoints. The variables are redefined in `globals.css`, so `type-*` utilities adapt on their own.

| Style | ≥1024px | 768–1023px | <768px |
|---|---|---|---|
| Title | 72 | 56 | 44 |
| Sub-title | 44 | 36 | 32 |
| Heading | 32 | 28 | 26 |
| Body / Micro | unchanged | unchanged | unchanged |

---

## 4. Layout and spacing

### 4.1 Grid

- **Design canvas:** 1440px wide.
- **Content column:** 1192px, centered. Use `<Container>` ([`src/components/ui/container.tsx`](src/components/ui/container.tsx)).
- **Side gutter** (`--gutter`): 124px at ≥1280 → 64px at ≥1024 → 40px at ≥768 → 16px on mobile.
- **Two-column splits** (desktop):
  - Equal halves with a **72px** gap: Overview "Stack / System" blocks.
  - **660 / 520** with a **12px** gap: brand card + swatch stack.
  - **576 / 567** with a **50px** gap: neutral swatch columns.
  - **Label / answer rows:** 147px label column, 72px gap, answer fills the rest.
- **Prose width:** intro paragraphs in the hero are capped at **560px** (`max-w-copy`). Section intros run the full 1192px column.

### 4.2 Spacing scale

Tailwind's 4px scale is the base. These are the values the design actually uses:

| px | Tailwind | Where |
|---|---|---|
| 5 | `gap-1.25` | eyebrow → heading; between tabs; Heading → body |
| 8 | `gap-2` / `py-2` | tab padding (y), icon → label in a tab, Sub-title → body |
| 12 | `gap-3` / `px-3` | swatch gap, card grid gap, tab padding (x), swatch label inset, table row bottom padding |
| 20 | `gap-5` | neutral swatch rows |
| 24 | `gap-6` | stacked groups inside a block |
| 42 | `--space-intro` | section intro copy → its content block |
| 72 | `gap-18` / `mt-18` / `pt-18` | column gaps, page top padding, brand board → Mood & Tone |
| 136 | `--space-section` | between sub-sections (Mood → Color → Typography). 96 on tablet, 72 on mobile |

### 4.3 Radius, borders, elevation

| Token | Value | Use |
|---|---|---|
| `rounded-control` | 8px | Chips, buttons, the floating prompt card |
| `rounded-card` | 12px | Cards, swatches, toast, character strip |
| `rounded-full` | — | Avatar |
| `rounded-t-tab` | 4px top corners | Tabs |
| `border-line` | 1px `#E5E5E5` | Outlines, list rules |
| `border-divider` | 1px `#D9D9D9` | Full-bleed hairline under the tab bar |
| `shadow-float` | `0 0 46px rgb(0 0 0 / 12%)` | Panels floating over the page (prompt card) |
| `shadow-halo` | `0 0 92px rgb(0 0 0 / 12%)` | Avatar |
| Elevation rule | — | Content cards stay flat (`bg-surface`). Shadows are only for floating UI, and always centered and soft, with no offset. |

---

## 5. Components

All live in [`src/components/`](src/components/). `ui/` holds reusable primitives; `design-system/` holds the showcase sections.

### Container — `ui/container.tsx`
Centers content at 1192px with the responsive gutter. Polymorphic: `<Container as="header">`.

### SectionIntro — `ui/section-intro.tsx`
Heading plus `ink-body` paragraphs.
- `level="section"` → `type-subtitle` (44px) as `<h2>`, 8px to body.
- `level="subsection"` (default) → `type-heading` (32px) as `<h3>`, 5px to body.
- Follow it with content after `mt-(--space-intro)` (42px).

### Eyebrow group (pattern)
`type-micro` eyebrow ("THE STACK") → 5px → `type-heading` with `leading-none`. Max width 356px.

### Label / answer row (pattern)
`<dl>` rows: `type-micro text-ink-subtle` label (147px column) + 16px `ink` answer with `leading-5`. Rows stack 24px apart and become a single column on mobile.

### Tabs — `ui/tabs.tsx` (client)
- A sticky, full-bleed bar on a 1px `divider` bottom border.
- Tab: 20px Lucide icon + 8px + `type-body-md` label, `px-3 py-2`, 4px top radius, 5px between tabs.
- Active and hover: `bg-surface`. Inactive: transparent.
- State lives in the URL hash (`#foundations`, `#assets`), so tabs can be linked. Left/right arrow keys move between tabs, with full ARIA `tablist`/`tab`/`tabpanel` roles.

### Swatch — `ui/swatch.tsx` (client)
- `variant="bar"`: 67px tall, full width, `rounded-card`, label right-aligned with 12px inset in `type-label`. The hex appears on the left on hover or focus.
- `variant="chip"`: the same block with no label (as in Figma). The name fades in on hover or focus.
- White swatches get a `border-line` outline.
- Clicking copies the hex and shows a toast.

### Chip — `ui/chip.tsx`
A bordered quick-action pill: `rounded-control border-line bg-paper px-3 py-2`, in `type-control`.
- Pass `href` to get a Next `<Link>`; otherwise it renders a `<button>`.
- `variant="quiet"`: 12px, `ink-subtle`. Use it for the joke or least important option.
- Hover: lifts 2px with `ease-spring`, `bg-surface`, border darkens to `ink-faint`. Press: `scale(0.97)`.

### Prompt card — `home/prompt-card.tsx` (client)
A floating panel: `rounded-control border-line bg-paper px-4 py-3 shadow-float`. A `type-control` question sits above a wrapping row of chips with 10px gaps. Chips either link to a page or show a toast while that page doesn't exist yet. Edit the `prompts` array to change them.

### Avatar — `home/avatar.tsx`
A 128px circle (`rounded-full border-2 border-line shadow-halo`) that crops `avatar-character.svg` to the head, using Figma offsets stored as percentages. On hover the character waves (`animate-wave`).

### BackLink — `ui/back-link.tsx`
"‹ Back to main page" at the top left of secondary pages (Figma `94:8004`). It is a Lucide `chevron-left` (20×24, `#525252`) + 8px + `type-body-md` in `ink-body`, `px-3 py-2`, sitting at the left edge of the content column. Hover: `bg-surface`, text goes to `ink`, chevron nudges 2px left. It links to `/` by default; pass `href`/`label` to reuse it on other pages.

### Toast — `ui/toast.tsx` (client)
`ToastProvider` + `useToast()`. Black pill (`bg-ink`, `rounded-card`), `type-body-sm`, bottom center, slides up 16px and fades in, hides after 1.6s. Announced through `role="status"`.

### Card / surface (pattern)
`rounded-card bg-surface`, no border or shadow. The brand card centers the 94px logo mark, then 7px, then "Jason Jeong" in `type-subtitle`.

### Type specimen row (pattern)
The sample on the left in its own style, the spec on the right in Satoshi Bold 16. `border-b border-line pb-3`, rows 7px apart.

### Character strip — `design-system/character-strip.tsx`
Five character illustrations placed on a 1192 × 235 `bg-surface` card at Figma coordinates, converted to percentages so the strip scales. On mobile it keeps a 640px minimum and scrolls sideways.

---

## 6. Iconography and assets

All brand assets are vectors exported from Figma, stored in [`public/brand/`](public/brand/):

| File | What it is |
|---|---|
| `logo-mark-large.svg` (270×270), `logo-mark-small.svg` (94×94) | The "JJ" monogram mark in black. The small one is also the favicon (`src/app/icon.svg`). |
| `character-1.svg` … `character-5.svg` | Hand-drawn vector character poses of Jason |
| `icon-blocks.svg`, `icon-library-big.svg` | Lucide `blocks` and `library-big` at 20px |
| `icon-chevron-left.svg` | Lucide `chevron-left` (20×24, `#525252` stroke) for BackLink |
| `icon-times.svg` | Custom bold "×" used in the font pairing |

- **Icons:** [Lucide](https://lucide.dev), 20px, black stroke. When you need a new icon, use the matching Lucide icon at 20px rather than drawing one.
- **Images:** render with `next/image` and keep the asset's intrinsic `width`/`height`.
- **Logo:** always black on white or `surface`. Don't recolor or stretch it.

---

## 7. Motion and interaction

- Keep motion quiet: 150–200ms, `ease-out-soft` (`cubic-bezier(0.22, 1, 0.36, 1)`).
- Playful moments use `ease-spring` (`cubic-bezier(0.34, 1.56, 0.64, 1)`, a small overshoot): chip lift, logo-mark tilt on hover.
- **Entrance:** `animate-rise` (fade in + 16px rise, 700ms). Stagger siblings by 80ms with `animation-delay`.
- **Wave:** `animate-wave` (a 900ms head wiggle) for the character on hover.
- Hover on interactive surfaces → `bg-surface`. Press on swatches → `scale(0.99)`.
- Focus → 2px Nyck Blue outline, 2px offset (global `:focus-visible`).
- All transitions turn off under `prefers-reduced-motion`.

---

## 8. Recipes for agents

**New section on a page**
```tsx
<Container className="pt-[37px] pb-30">
  <SectionIntro title="Case studies" level="section">
    <p>Short muted intro paragraph.</p>
  </SectionIntro>
  <div className="mt-(--space-intro) grid gap-3 md:grid-cols-2">
    {/* cards: rounded-card bg-surface */}
  </div>
</Container>
```

**Project-colored accent**
```tsx
import { projectColors } from "@/lib/design-tokens";
const accent = projectColors.nyck;
<span className="type-micro rounded-tab px-2 py-1 text-paper" style={{ backgroundColor: accent.hex }}>
  Case study
</span>
```

**Do**
- Use `type-*` utilities for all text styles.
- Use token classes (`text-ink-body`, `bg-surface`, `border-line`, `rounded-card`).
- Keep one project accent per page.
- Add new tokens to **both** `globals.css` and `design-tokens.ts`, then document them here.

**Don't**
- Hard-code hex values in class names (`text-[#525252]`).
- Add gradients or extra font families, or put shadows on content cards.
- Use white text on Shopify Forest or Amazon Rain.

---

## 9. Notes and decisions while translating Figma

- Figma line heights are "auto". They are written down as 1.2 for Bricolage and 1.35 for Satoshi, which matches the rendered box heights in Figma (for example 44px → 53px).
- The Figma variable `typography/micro-s/letter-spacing` is 0.44px, but the type-scale spec says "4% LSP" (0.48px). The system uses **4%**.
- In Figma, the type-scale list sits at x=130 instead of the 124px column edge. The build aligns it to the column.
- Gaps between sub-sections vary in Figma (72, 137 and 141px). The system sets them to **72px** after the brand board and **136px** between the rest.
- Project chips in the Figma palette row cut off their labels, so the label is hidden by default and shows on hover.
- Landing page: the avatar border in Figma is `#EDEDED` at 1.78px. It's built with `border-2 border-line` (#E5E5E5), which looks the same, so the system doesn't gain a near-duplicate gray.
- The **Assets** tab has no Figma design yet. Its page reuses the Foundations patterns to show logo marks, characters and icons.
