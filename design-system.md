# Jason Jeong — Design System

> **Thinking in systems. Not by each frame.**

This is the source of truth for the look and feel of Jason Jeong's portfolio. It is written for people **and coding agents**: when you build a new page or component, follow this file and use the tokens and components it names. Don't make up new values.

- **Figma source:** [JJJ Final Undergrad Portfolio › Design system](https://www.figma.com/design/wTRwgEKJ5RXgMkFktaTcTO/JJJ-Final-Undergrad-Portfolio?node-id=94-3927) (node `94:3927`)
- **Tokens in code:** [`src/app/globals.css`](src/app/globals.css) (Tailwind v4 `@theme`) and [`src/lib/design-tokens.ts`](src/lib/design-tokens.ts) (typed data)
- **Live showcase:** `/design-system` ([`src/app/design-system/page.tsx`](src/app/design-system/page.tsx)), linked from the nav bar and the companion menu. Overview, then two tabs: **Foundations** (brand board, Mood & Tone, Color palette, Typography, Spacing, Motion) and **Assets** (Logo mark, Characters, Icons), with a sticky table of contents beside them on desktop
- **Landing page:** `/` ([`src/app/page.tsx`](src/app/page.tsx)), from Figma node `94:3455`: nav bar, hero, and the projects grid (`#projects`, placeholder tiles for now)
- **About page:** `/about` ([`src/app/about/page.tsx`](src/app/about/page.tsx)), from Figma node `103:12209` ("Who are you"). Content in [`src/content/about/`](src/content/about/).
- **Case studies:** `/projects/[slug]` ([`src/app/projects/[slug]/page.tsx`](src/app/projects/[slug]/page.tsx)), content in [`src/content/case-studies/`](src/content/case-studies/). Live so far: Amazon Music, Plaza.
- **`assets/`:** raw exports from other tools (Framer, HTML prototypes), kept for reference only. TypeScript and ESLint ignore it.
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
3. Surfaces are flat: `bg-surface` with `rounded-card`. No gradients. The only shadows are the soft, centered `shadow-float` / `shadow-halo` on UI that floats over the page (menus, the speech bubble, the avatar).
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
| Subheading | `type-subheading` | Bricolage | Bold 700 | 20px | 1.2 | −4% |
| Label | `type-label` | Bricolage | Medium 500 | 20px | 1.2 | −4% |
| Control | `type-control` | Bricolage | Medium 500 | 16px | 1.2 | −4% |

- **Subheading vs. Label:** both are Bricolage 20px. `type-subheading` (Bold) is for **headings**: any small heading inside a section or card (case study sub-headings such as "Considering brand loyalty when defining user groups", card and contribution titles, persona names, spotlight titles, easing names on the showcase). Render it as an `<h3>`/`<h4>`. `type-label` (Medium) is for **labels that aren't headings**: swatch names, spacing and duration values on the showcase, the large `merge` pill. Never set a heading in `type-label` or in an ad-hoc `font-bold` combo.

The hero's second line ("I do product & strategy") is `type-title` set in Bricolage **Medium** (`font-medium!`). Stacked hero lines use a tight `leading-[1.07]`.

- **Tracking:** every style is −4% (`tracking-tight` = `-0.04em`) except Micro, which is +4% (`tracking-wide` = `0.04em`).
- **Body default:** `<body>` is already Satoshi Medium 16px, −4%, `ink`. Plain text needs no classes.
- **Paired copy** (label + answer rows, e.g. "How is it designed?") uses 16px with a tighter 20px line height (`leading-5`), from the Figma variable `typography/body-sm/line-height`.
- **Paragraph spacing:** one empty line between paragraphs = `24px` (`space-y-(--space-paragraph)`).

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
  - **576 / 568** with a **48px** gap: neutral swatch columns.
  - **Label / answer rows:** 148px label column, 72px gap, answer fills the rest.
- **Prose width:** intro paragraphs in the hero are capped at **560px** (`max-w-copy`). Section intros run the full 1192px column.
- **Narrow column:** **1000px** (`max-w-narrow`), centered inside the 1192px column. The About page story copy and photo gallery use it.

### 4.2 Spacing: the 4-point grid

**Every margin, padding, gap and offset is a multiple of 4px.** Tailwind's spacing scale is already 4px per step (`gap-3` = 12px, `mt-18` = 72px), so use whole steps only: no half steps (`1.5`, `2.5`, `12.5`) and no arbitrary values that aren't multiples of 4 (`pt-[37px]`). If a design comes in off-grid, round it to the nearest step that keeps the intent (37 → 36, 54 → 56, 7 → 8). When a value sits exactly between two steps, pick the one that keeps related things grouped (tighter inside a group, looser between groups).

The same rule applies to fixed component sizes (swatch height 68, logo 272) and to motion distances (the chip lifts 4px, menus rise 8px, `animate-rise` travels 16px, page transitions 24px).

**Off the grid on purpose:**
- 1px hairlines (`border-line`, `border-divider`) and the 2px focus ring. `--nav-height` is 81px: 80px of content plus its 1px bottom border.
- Type line heights, which come with each `type-*` style.
- Artwork drawn in its own units (the character rig, Figma-placed illustrations).

These are the steps the design actually uses (shown live on `/design-system` › Foundations › Spacing, data in `spacingScale` in `design-tokens.ts`):

| px | Tailwind / variable | Where |
|---|---|---|
| 4 | `gap-1` / `mt-1` | eyebrow → heading; between tabs; Heading → body |
| 8 | `gap-2` / `py-2` | tab padding (y), icon → label in a tab, Sub-title → body, chip gaps, specimen rows |
| 12 | `gap-3` / `px-3` | card grid gap, tab padding (x), swatch label inset, table row bottom padding, menu title → chips |
| 16 | `gap-4` / `p-4` | mobile gutter, bubble padding |
| 20 | `gap-5` | neutral swatch rows |
| 24 | `gap-6` / `--space-paragraph` | between paragraphs, stacked groups inside a block |
| 40 | `--space-intro` | section intro copy → its content block |
| 48 | `gap-12` | neutral swatch columns, large card padding |
| 72 | `gap-18` / `mt-18` / `pt-18` | column gaps, page top padding, brand board → Mood & Tone |
| 136 | `--space-section` | between sub-sections (Mood → Color → Typography). 96 on tablet, 72 on mobile |

### 4.3 Radius, borders, elevation

| Token | Value | Use |
|---|---|---|
| `rounded-control` | 8px | Chips, buttons, floating menus and the speech bubble |
| `rounded-card` | 12px | Cards, swatches, toast, character strip |
| `rounded-photo` | 8px | Photos packed tightly together: the About page gallery and collage. Single photos in a case study stay `rounded-card`. |
| `rounded-full` | — | Avatar |
| `rounded-t-tab` | 4px top corners | Tabs |
| `border-line` | 1px `#E5E5E5` | Outlines, list rules |
| `border-divider` | 1px `#D9D9D9` | Full-bleed hairline under the tab bar |
| `shadow-float` | `0 0 46px rgb(0 0 0 / 12%)` | Panels floating over the page (companion menu, speech bubble) |
| `shadow-halo` | `0 0 92px rgb(0 0 0 / 12%)` | Avatar, the About page collage photos (they float over the page) |
| Elevation rule | — | Content cards stay flat (`bg-surface`). Shadows are only for floating UI, and always centered and soft, with no offset. |

---

## 5. Components

All live in [`src/components/`](src/components/). `ui/` holds reusable primitives; `design-system/` holds the showcase sections.

### Container — `ui/container.tsx`
Centers content at 1192px with the responsive gutter. Polymorphic: `<Container as="header">`.

### SectionIntro — `ui/section-intro.tsx`
Heading plus `ink-body` paragraphs.
- `level="section"` → `type-subtitle` (44px) as `<h2>`, 8px to body.
- `level="subsection"` (default) → `type-heading` (32px) as `<h3>`, 4px to body.
- Follow it with content after `mt-(--space-intro)` (40px).

### Eyebrow group (pattern)
`type-micro` eyebrow ("THE STACK") → 4px → `type-heading` with `leading-none`. Max width 356px.

### Label / answer row (pattern)
`<dl>` rows: `type-micro text-ink-subtle` label (148px column) + 16px `ink` answer with `leading-5`. Rows stack 24px apart and become a single column on mobile.

### Tabs — `ui/tabs.tsx` (client)
- A sticky, full-bleed bar on a 1px `divider` bottom border, pinned just below the Navbar (`top-(--nav-height)`).
- Tab: 20px Lucide icon + 8px + `type-body-md` label, `px-3 py-2`, 4px top radius, 4px between tabs.
- Active and hover: `bg-surface`. Inactive: transparent.
- State lives in the URL hash (`#foundations`, `#assets`), so tabs can be linked. Left/right arrow keys move between tabs, with full ARIA `tablist`/`tab`/`tabpanel` roles.
- The bar is `--tabs-height` (37px: 8 + 20px icon + 8, plus its 1px border). Anything sticky below it sits at `top-[calc(var(--nav-height)+var(--tabs-height))]`.
- Panels render inside one `<Container>`, so panel content should not add its own. Pass `aside` to put a sticky rail beside the panels on desktop (≥1024px): a 192px column, 48px gap, content fills the rest, all inside the 1192px column. Below 1024px the rail is hidden and panels run full width.

### ContentsNav — `design-system/contents-nav.tsx` (client)
The table of contents on `/design-system`, passed to `Tabs` as its `aside`. It sticks under the tab bar and lines up with the panel's first heading (36px down).
- "Contents" in `type-micro ink-subtle`, then a list on a 1px `border-line` left rule: **Overview**, then each tab (**Foundations**, **Assets**) in `type-body-md ink` with its sections below in `type-body-sm ink-subtle`, indented 24px. Groups are 12px apart, links `py-1`.
- **Current section:** a 2px `ink` left border, text in `ink`, `aria-current="location"`. It follows the scroll: the last heading that has passed under the sticky bars. At the bottom of the page the last section wins.
- **Clicking:** a section in the other tab switches the tab first (through the URL hash, like `Tabs`), then scrolls to the heading, offset for the sticky Navbar and Tabs, and moves focus to it. Overview scrolls to the top. Hover: text goes to `ink`.
- To link a new section, give its heading an `id` and add it to `groups` in the component.

### Swatch — `ui/swatch.tsx` (client)
- `variant="bar"`: 68px tall, full width, `rounded-card`, label right-aligned with 12px inset in `type-label`. The hex appears on the left on hover or focus.
- `variant="chip"`: the same block with no label (as in Figma). The name fades in on hover or focus.
- White swatches get a `border-line` outline.
- Clicking copies the hex and shows a toast.

### Chip — `ui/chip.tsx`
A bordered quick-action pill: `rounded-control border-line bg-paper px-3 py-2`, in `type-control`.
- Pass `href` to get a Next `<Link>`; otherwise it renders a `<button>`.
- `variant="quiet"`: 12px, `ink-subtle`. Use it for the joke or least important option.
- Hover: lifts 4px with `ease-spring`, `bg-surface`, border darkens to `ink-faint`. Press: `scale(0.97)`.

### Navbar — `ui/navbar.tsx` (client)
The sticky top bar on every page, rendered once in the root layout (Figma `94:8094`). It is `--nav-height` (81px) tall, stays anchored during page transitions, and anything else sticky (e.g. the design system tab bar) sits at `top-(--nav-height)`. It has the 32px logo mark + 24px + links in `type-body-md`, all centered, `py-6`, with a `border-line` bottom edge over a slightly translucent `bg-paper`. Links come from `navLinks` in `lib/site-nav.ts`. "Projects" scrolls smoothly to `#projects`, "About me" goes to `/about`. Hover: text goes to `ink-subtle`; the logo tilts.

### Project grid — `home/project-grid.tsx`
`#projects` on the landing page: a 3-column grid (2 on tablet, 1 on mobile) of square `rounded-card bg-surface` tiles with a 12px gap. Data comes from `lib/projects.ts` (name, discipline, project color). Most tiles are still **placeholders**: no images, and plain gray at rest. **Amazon Music** shows its three cover screens and, on hover, the characters lean in to jam (`JamTile`, §7.4a). **Plaza** shows its vase logo and, on hover, Jason pops out of it (`VaseTile`, §7.4b). Both use `home/use-tile-active.ts`, which listens on the tile: active on hover or keyboard focus, and on touch screens while 60% of the tile is in view. Tiles for projects with a case study link to `/projects/<slug>` (the whole tile is the link, with the focus ring drawn on the tile).
- **Hover (Figma `94:4008`):** the project color fades up from the bottom (`linear-gradient(0deg, color @ 20% → transparent)`, 500ms). Two pills rise 12px and fade in, the name bottom-left and the discipline bottom-right, 60ms apart, with `ease-spring`. Pills: `type-control` Bold in the project color, `bg-paper/72` + `border-paper` + `backdrop-blur-sm`, `rounded-control px-4 py-2`, 12px from the tile edges.

### Companion — `ui/companion.tsx` (client)
A fixed character in the bottom-right corner (32px inset; 16px on mobile), rendered once in the root layout. - **Out of the way of the header character:** on pages with a TalkingAvatar in the header (landing, `/about`), it stays hidden while that avatar is on screen, so there's only ever one Jason in view. Once the header avatar scrolls fully out of view (or under the sticky Navbar), the companion fades in (opacity, 250ms `ease-out-soft`). Scrolling back up fades it out the same way. While hidden it's `inert`, and an open menu closes. The avatar (`data-hero-avatar`) reports itself through `home/hero-presence.ts` (`useReportHero` / `useHeroInView`). The server HTML renders the companion hidden, and the first client read looks for `[data-hero-avatar]` in that HTML, so it never flashes in while the page content is still hydrating. Pages without a header avatar show it straight away.
- **Speech bubble:** max 284px, `type-control`, right-aligned, `rounded-control border-line shadow-float`, 8px to the left of the avatar. There is no bubble at rest. Hidden on mobile.
- **Hover = talk:** hovering the character (mouse only) pops the bubble in from the right (`ease-spring`, 250ms) and types a random line from `companionLines` (`lib/dialogue.ts`) while the mouth lip-syncs (`useTalk`). The bubble grows with the typed text. On leave, it fades out.
- **Click = menu:** the menu opens **only** on click (or keyboard focus), never on hover. It appears above the character with "What do you wanna learn about me?" and the `navPrompts` chips stacked right-aligned. It closes on a second click, Escape, an outside click, or picking a chip. Opening it silences the character, and the bubble fades out while it's open.
- **Page changes:** it keeps its own view-transition snapshot, so it stays put during route changes and fades in or out when coming from or going to the landing page.

### Site navigation data — `lib/site-nav.ts`
`navPrompts` (the companion chips) and `navLinks` (the nav bar) are the single source for where things link. An entry with `href` navigates; one with `message` shows a toast. `transitionFor(href)` picks `nav-back` for links into `/` and `nav-forward` otherwise.

### Page transitions — `ui/page-transition.tsx`
Wrap each page's content in `<PageTransition>` inside `page.tsx`. Links pass `transitionTypes` (`nav-forward` / `nav-back`). The old page leaves in 220ms (fade, 12px drift, blur); the new one arrives over 520ms, 120ms later (fade, 24px rise, un-blur). Back reverses the direction. Untyped navigations, like the browser back button, swap instantly.

### Avatar — `home/avatar.tsx`
A 128px circle (`rounded-full border-2 border-line shadow-halo`) that crops the character to the head, using Figma offsets stored as percentages. The character is an inline SVG rig: the head bobs, the eyes blink at random and follow the cursor, and a `mouth` prop picks the lip-sync shape. See §7.4.

### TalkingAvatar — `home/talking-avatar.tsx` (client)
The page-header avatar (landing page and `/about`). Pass `lines` to change what it says (default `heroLines`; `/about` uses `aboutLines`). It reports whether it's on screen so the Companion can stay hidden meanwhile (see Companion). **Top room:** the bubble opens upward, so a header avatar needs at least ~80px between the Navbar and the avatar for a two-line bubble to clear the nav: the landing hero uses `pt-20` (`md:pt-23`), `/about` uses `pt-24`. Hovering the character (or tapping it on touch) says a random line from `heroLines` in [`lib/dialogue.ts`](src/lib/dialogue.ts), never the same one twice in a row. The text types into a speech bubble while the mouth lip-syncs. Bubble: `type-control`, `rounded-control border-line bg-paper shadow-float`, `px-4 py-3`, centered text, **8px above** the avatar and centered on it, max 320px wide. It pops up from the bottom with `ease-spring` (250ms) and fades out 150ms after the pointer leaves (on touch, 2.5s after the line finishes). Only the typed part of the line is laid out, so the bubble starts small and grows as the text types. Screen readers get the whole line through a polite live region. The typing and lip-sync logic lives in `home/use-talk.ts` (`useTalk(lines)`), shared with the Companion. To add dialogue, add strings to `heroLines` / `companionLines`.

### Case study page — `case-study/case-study-page.tsx`
Every project case study at `/projects/[slug]` uses this one template. Content is data, so a new case study needs no new components:
1. Add a folder `src/content/case-studies/<slug>/` with the images and an `index.ts` that exports a `CaseStudy` (type in [`lib/case-study.ts`](src/lib/case-study.ts)). Import images statically so Next knows their size.
2. Register it in `src/content/case-studies/index.ts`. The slug must match the project in `lib/projects.ts`; its grid tile then links to the page by itself.

Layout, top to bottom:
- **Header:** BackLink ("Back to projects" → `/#projects`) → eyebrow (`type-micro`, project category, a small dot in the project color) → `type-title` name → `type-body-lg` tagline (full width) → cover: three product screens on a fixed-height `bg-surface rounded-card`, the middle one raised, all running off the bottom edge. Never use an exported "cover slide" with its own title, fonts or dark backdrop. **Amazon Music** swaps in `case-study/jam-cover.tsx` (see §7.4): on hover (tap on touch) the outer screens slide out of frame and the personas and Jason peek in from the sides to jam along.
- **Overview:** Context paragraph (`type-body-lg ink-body`) beside a 2-column label / answer `<dl>` (Role, Timeline, Team, Tools), 400px wide on desktop.
- **My contributions:** `type-heading` + three `bg-surface rounded-card p-6` cards, titles in `type-subheading`, body `type-body-md`.
- **Sections:** eyebrow (`type-micro ink-subtle`) → 4px → `type-heading` (full width) → blocks 24px apart, `--space-section` between sections. Running copy in sections (paragraphs, lists, `emphasis` lines and feature text) is **Large Body** (`type-body-lg`, 20px) in `ink-body`, running the full width of the column. Text inside cards (`cards`, personas, contributions) stays **Medium Body** (`type-body-md`, 16px).
- **Blocks:** `text`, `list`, `emphasis` (one bold `ink` line), `subheading` (`type-subheading`), `cards` (titles in `type-subheading`), `features`, `merge`, `personas`, `quotes`, `stats`, `spotlights` and `figures`.
  - `features`: label / answer rows. The label is a feature pill (Chip styling at rest: `rounded-control border-line bg-paper`, `type-control`, 20px Lucide icon in the project color), 240px column, 72px gap.
  - `merge`: pills joined by `+` and `=` (`type-heading ink-subtle`) on a `bg-surface` card; the result pill is larger (`type-label`).
  - `personas`: `bg-surface rounded-card p-6` cards, 3 across: 96px circular portrait (`border-2 border-line bg-paper`), name in `type-subheading`, age and favorite artist in `type-body-sm ink-subtle`, bio in `type-body-md`. The portrait idles with `animate-bob` (pivot at the neck, `50% 67%`), each card's loop offset by 1.1s. Hovering it (or tapping on touch) types one of the persona's `lines` into a bubble 12px to the portrait's right (`useTalk`, max 224px, grows as it types).
  - `cards`: 2 across, or 3 across (≥1024px) when there are exactly three.
  - `quotes`: `bg-surface rounded-card` cards, 2 across: optional `type-micro ink-subtle` label, the quote in `type-body-lg ink` with curly quotes, attribution in `type-body-sm ink-subtle` pinned to the bottom. Use for interview quotes and testimonials instead of screenshots of speech bubbles.
  - `stats`: big numbers on `bg-surface rounded-card p-6` tiles, 4 across (2 on mobile): value in `type-subtitle`, label in `type-body-md ink-body`.
  - `spotlights`: feature rows, two columns with a 72px gap. Bare product screens sit side by side on a fixed-height `bg-surface` card and run off its bottom edge, like the cover, beside a `type-subheading` title and Large Body copy. Every other row puts the screens on the right.
  - `figures` are either `framed` (default: transparent graphics on a padded `bg-surface` card, never scaled past their pixel size; with several figures each gets its own `type-body-sm` caption) or `bleed` (photos that fill their own card, with a blur placeholder), in 1, 2, 3 or 4 columns.
  - **Rebuild, don't screenshot:** anything that is mostly text (feature lists, personas, diagrams of labels) is a block, not an image, so it uses the site's type and colors. Keep images for real screens, sketches, photos and illustrations, cropped free of baked-in captions.
- **Icons:** Lucide geometry inlined in `case-study/icons.tsx` (they take `currentColor`). Add new ones there and to `IconName` in `lib/case-study.ts`.
- **Statement:** a section with `variant: "statement"` (the core problem / HMW) sets its title in `type-subtitle` with a 4px left rule in the project color. It's the only place the accent appears at large size.
- **Footer:** another "Back to projects" link.

The slug is URL data, so the page reads it behind `<Suspense>`, and grid tiles `prefetch` so navigation stays instant (Next's instant-navigation check).

### About page — `app/about/page.tsx`
Figma `103:12209`. Copy and photos are data in [`src/content/about/index.ts`](src/content/about/index.ts) (`story`, `collage`, `galleries`).
- **Header:** `pt-24` (room for the speech bubble under the Navbar), TalkingAvatar (`aboutLines`) → 12px → `type-title` "So, who is Jason Jeong?" over "I’m a creative builder." in Bricolage Medium, `leading-[1.07]` like the landing hero. Blocks `animate-rise`, 80ms apart.
- **Collage — `about/photo-collage.tsx` (client):** a selfie (492 × 304) with four photos (296 × 216, ±15°) behind it, all `rounded-photo shadow-halo`, laid out in a 952 × 556 Figma frame. Positions are multiples of `--u` (`100cqw / 952`), so it scales as one piece. On small screens the frame is 96px wider than the column and the outer photos run off the edges (the page clips them). At rest the four photos peek out from behind the selfie. Hovering or keyboard-focusing the collage (tapping on touch) fans them out to their Figma spots: 700ms `ease-spring`, 60ms apart. The `type-subheading ink-body` "hover over me!" sits 8px above the selfie and fades away once they're out; touch screens read "tap me!".
- **Story:** `type-body-lg ink-body` paragraphs in the 1000px `max-w-narrow` column, 64px below the collage.
- **Outside of design:** `--space-section` down, a centered `type-subtitle` `<h2>`, 64px, then one gallery per hobby (`about/photo-gallery.tsx`), `--space-section` apart. Each gallery has a centered `type-subtitle` title in Bricolage Medium, 16px above its photos.
- **Gallery rows:** each photo keeps its Figma frame (`size`) and grows by its aspect ratio, so every row is justified to one height at any width, with 12px gaps. Below 640px the rows become a 2-column masonry and panoramas (wider than 2:1) span both columns. Photos are `rounded-photo` on `bg-surface` with a blur placeholder. An optional `caption` sits 12px in from the bottom left, in `type-body-md paper`, and only shows on hover, like the project tiles: an `ink` gradient (60% at the bottom, clear by halfway up) fades in over 500ms `ease-out-soft`, then the caption rises 12px and fades in (300ms `ease-spring`, 60ms later). Photos without a caption get no hover. Touch screens can't hover, so they show both at rest.
- To add a photo, drop it in `src/content/about/`, import it, and add it to a row with its frame size.

### BackLink — `ui/back-link.tsx`
"‹ Back to main page" at the top left of secondary pages (Figma `94:8004`). It is a Lucide `chevron-left` (20×24, `#525252`) + 8px + `type-body-md` in `ink-body`, `px-3 py-2`, sitting at the left edge of the content column. Hover: `bg-surface`, text goes to `ink`, chevron nudges 4px left. It links to `/` by default; pass `href`/`label` to reuse it on other pages.

### Toast — `ui/toast.tsx` (client)
`ToastProvider` + `useToast()`. Black pill (`bg-ink`, `rounded-card`), `type-body-sm`, bottom center, slides up 16px and fades in, hides after 1.6s. Announced through `role="status"`.

### Card / surface (pattern)
`rounded-card bg-surface`, no border or shadow. The brand card centers the 94px logo mark, then 8px, then "Jason Jeong" in `type-subtitle`.

### Type specimen row (pattern)
The sample on the left in its own style, the spec on the right in Satoshi Bold 16. `border-b border-line pb-3`, rows 8px apart.

### Character strip — `design-system/character-strip.tsx`
Five character illustrations placed on a 1192 × 235 `bg-surface` card at Figma coordinates, converted to percentages so the strip scales. On mobile it keeps a 640px minimum and scrolls sideways.

---

## 6. Iconography and assets

All brand assets are vectors exported from Figma, stored in [`public/brand/`](public/brand/):

| File | What it is |
|---|---|
| `logo-mark-large.svg` (270×270), `logo-mark-small.svg` (94×94) | The "JJ" monogram mark in black. The small one is also the favicon (`src/app/icon.svg`). |
| `character-1.svg` … `character-5.svg` | Hand-drawn vector character poses of Jason |
| Personas (code, not files) | The Amazon Music cast, drawn in `case-study/`. How they're built: [`personas.md`](personas.md) |
| `icon-blocks.svg`, `icon-library-big.svg` | Lucide `blocks` and `library-big` at 20px |
| `icon-chevron-left.svg` | Lucide `chevron-left` (20×24, `#525252` stroke) for BackLink |
| `icon-times.svg` | Custom bold "×" used in the font pairing |

- **Icons:** [Lucide](https://lucide.dev), 20px, black stroke. When you need a new icon, use the matching Lucide icon at 20px rather than drawing one.
- **Images:** render with `next/image` and keep the asset's intrinsic `width`/`height`.
- **Logo:** always black on white or `surface`. Don't recolor or stretch it.

---

## 7. Motion

All motion tokens live in the `@theme` block of `globals.css` (`--ease-*`, `--animate-*` and their `@keyframes`). The easings and durations are shown live on `/design-system` › Foundations › Motion (hover an easing card to play it), from `easings` and `durations` in `design-tokens.ts`. Motion distances follow the 4-point grid (§4.2). Use those utilities rather than writing one-off timings. Use this section as the reference for any new animation.

### 7.1 Easing

| Token | Curve | Use it for |
|---|---|---|
| `ease-out-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default for UI: hovers, entrances, fades |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful moments with a small overshoot: chip lift, logo-mark tilt |
| `ease-sway` | `cubic-bezier(0.37, 0, 0.63, 1)` | Looping back-and-forth motion (symmetric ease-in-out): head bob |
| `ease-lid` | `cubic-bezier(0.45, 0, 0.9, 0.55)` | Something closing fast and snapping shut: eyelids |
| `ease-rebound` | `cubic-bezier(0, 0.55, 0.45, 1)` | The release after a squash: eyes springing open |

### 7.2 Durations

- **UI feedback:** 150–200ms (hover, press, color changes). Keep it quiet.
- **Overlays and menus:** 250ms with `ease-spring`.
- **Entrances:** 700ms (`animate-rise`).
- **Character idle loops:** slow, seconds long (bob is 3.2s), so they read as breathing rather than as busy movement.
- **Character accents:** fast, under 500ms (a blink is 180ms).

### 7.3 Animations

| Utility | What it does |
|---|---|
| `animate-rise` | Fade in + 16px rise, 700ms. Stagger siblings by 80ms with `animation-delay`. |
| `animate-bob` | Idle loop: the head tips back 2.2° and returns, 3.2s, `ease-sway`, infinite. |
| `animate-blink` | One blink, 180ms: the eye squashes to a lid line (`scale(2.2, 0.2)`) instead of vanishing, holds briefly, springs open. |
| `animate-blink-twice` | A double blink, 450ms. |
| `animate-jam-nod` | Head bobs down 5° / 4 units and back, one beat per second (60 BPM), `ease-sway`. |
| `animate-jam-sway` | Body rocks ±2° over two beats (2s). |
| `animate-jam-wave` | A raised hand waves ±16° from the elbow, 1s; pair two arms half a beat apart. |
| `animate-note` | A music note pops in, drifts up in an S and fades (2.4s). Set `--dx`, `--rise` and `--tilt`. |

### 7.4 Character rig — `home/avatar.tsx`

The character is inline SVG (art in `home/character-art.tsx`, drawn in a 418 × 235 frame, from `assets/wave-animation.html`) so its parts can move on their own. Parts pivot in **art units** with `transform-view` (`transform-box: view-box`) + `origin-[Xpx_Ypx]`:

| Part | Pivot | Motion |
|---|---|---|
| Head | `240px 106px` (neck) | `animate-bob`, always on |
| Left eye | `210.31px 61.98px` | Blinks; follows the cursor |
| Right eye | `235.19px 58px` | Same, but 15ms late so a blink doesn't look mechanical |
| Mouth | — | Swaps between `rest`, `small`, `wide` and `round` shapes while talking (no tweening) |

- **Blinking is random:** JS waits 2.2–6.5s between blinks, and a quarter of them are double blinks. It sets `data-blink="once" | "twice"` on the avatar root, and the eyes pick that up with `group-data-[blink=…]:animate-blink(-twice)`.
- **Eye tracking:** the eyes move together toward the cursor, up to 3 × 2 art units (about 2px at 128px), reaching full travel 240px away from the face. They ease with a 200ms `ease-out-soft` transition and look back to center when the cursor leaves the window.
- **Talking:** text types at 25ms per character, and the mouth shape follows the character just typed: `a e i` → `wide`, `o u w` → `round`, other letters and digits → `small`, spaces and punctuation → `rest`. Once the line is done the mouth rests. Under reduced motion the line appears at once and the mouth doesn't move.
- **Hover:** the character doesn't swing or wiggle on hover; hover makes it talk (`useTalk`, used by TalkingAvatar and Companion).
- **Layering:** each part owns one motion (head bobs, eyes blink and track, mouth talks), so motions combine without overriding each other. Put any new looping motion on its own part.
- **Not used:** the waving arm from the source file. If you add it later, follow the same pivots and timings as `assets/wave-animation.html`.

### 7.4a Jam cover — `case-study/jam-cover.tsx` (client)

The Amazon Music cover, in two hosts: `JamCover` on the case study (hover, or tap to toggle on touch) and `JamTile` on the landing page's project tile. The tile's link covers it, so `JamTile` listens on its parent tile: it jams on hover or keyboard focus, and on touch screens (`hover: none`) while 60% of the tile is in view.

**Characters** (`case-study/persona-art.tsx`): all four share one anatomy, the full-body figure in the "Characters" Figma file (`Wwi1NkPuotXha6PAinCnqm`, Frame 1, 739 × 739 units): face, ear, brows, neck, sweater. Hair, glasses and outfit are swapped per character. Frame 3 head variants reuse the same face and are moved into place with a translate. Jason's hair and glasses are `CharacterHair` / `CharacterGlasses` from his avatar rig, whose face is the persona face mirrored at 0.882 scale. While jamming, eyes close, brows lift 3 units and mouths stay in a closed smile (bopping, not singing).

**Arms** are jointed so each character holds its own pose, but they're drawn the way Frame 1 draws them, not as separate outlined parts:
- **One outline.** The sweater (`TORSO_D`) and both sleeves (`SLEEVE`) are stroked together at 4 units under all the fills, so only the outer silhouette is left, at 2 units. The shoulder runs straight into the sleeve with no seam.
- **Open interior lines,** only where a sleeve lies over the body or head: the inner edge of a hanging sleeve (from the armpit down, leaving the shoulder open, like Frame 1's lowered arm), both edges of a forearm folded across the chest, and a short crease inside a bent elbow. Each pose lists which it needs (`lines`).
- **Frame 1's sleeve shapes:** wide and dropped. A sleeve over an open hand flares into a bell the hand comes out of (the raised arm); one over a fist tapers into the thick cuff (the lowered arm).
- A pose sets where each wrist goes plus which way the elbow bends, and `solveArm` (two-bone IK: upper arm 95, forearm 80) works out the angles.
- With both arms raised (`wave`), the sweater's print (Sally's stripes) is drawn over the sleeves' shoulders.

| Character | Pose | Motion |
|---|---|---|
| Social Sally | `wave`: both hands up beside the head | Forearms wave from the elbow (`animate-jam-wave`), half a beat apart |
| Lurking Louise | `ear`: elbow raised, palm over the ear (drawn over the head) | — |
| Quiet Quincy | `crossed`: forearms folded across the chest | — |
| Jason | `relaxed`: arms hanging by the hips | — |

Every head bobs at the neck (`341px 250px`, `animate-jam-nod`) and every body sways from the hips (`animate-jam-sway`). Loops are paused at rest and offset per character (`--phase`).

**Layout**
- **Landing tile** (Figma "JJJ Final Undergrad Portfolio", Low-fi v2: `98:11896` at rest, `100:11904` on hover; positions in `cqw`): at rest the middle screen (45.8cqw wide) sits over the other two, which peek out behind it and run off the sides. On hover the middle screen grows to 57.1cqw and rises 8.5cqw (500ms `ease-out-soft`), the others slide out sideways, and two characters lean in from each side at 27°, stacked: Sally over Louise on the left, Jason over Quincy on the right (mirrored to face in), faces at 9 / 91cqw across and 25.7 / 63cqw down.
- **Case study cover:** the outer screens slide out of frame and the characters stand at the sides, back row Louise and Quincy, front row Sally and Jason. Sizes and offsets are multiples of `--h` (one character's height, `min(82cqh, 44cqw)`).
- **Choreography:** characters slide in leaning, with `ease-spring` (700ms, staggered 140–320ms). Eyes close 550ms in; notes start 500ms in. Leaving reverses it in 350ms with no stagger.
- **Notes** use the Figma hair colors plus Amazon Rain; they're decorative art, so their hex values live in the component. Each host places them with `--note-x`, `--note-size`, `--note-bottom` and `--note-rise`.
- **Reduced motion:** the characters still swap in, but loops stop and notes are hidden.

### 7.4b Vase tile — `home/vase-tile.tsx` (client)

The Plaza tile on the landing page. Art: the Plaza vase logo (`public/brand/plaza-vase.svg`, Figma `1080:1535`) and Jason in his bucket hat (`public/brand/plaza-character.svg`: design-system character 5, cropped to the head, hat recolored Plaza Earth).
- **Rest:** the vase, 44cqw tall, centered.
- **Active:** the camera zooms 2× into the vase's mouth and moves it to 56cqw down (450ms `ease-out-soft`), the vase rocks on its base left-right twice (±4°, `animate-vase-shake`, 600ms), then Jason springs up out of the mouth (600ms `ease-spring`). He's drawn behind the vase and clipped to the mouth below the rim, so the lip hides where he comes out.
- **Leaving:** everything reverses in 350ms with no stagger.
- **Reduced motion:** no shake; Jason still swaps in.

### 7.5 Interaction states

- Hover on interactive surfaces → `bg-surface`. Press on swatches → `scale(0.99)`.
- Focus → 2px Nyck Blue outline, 2px offset (global `:focus-visible`).

### 7.6 Reduced motion

All transitions turn off under `prefers-reduced-motion`. Looping animations must also stop: add `motion-reduce:animate-none`, and skip JS-driven motion (blinking, eye tracking) when `matchMedia("(prefers-reduced-motion: reduce)")` matches.

---

## 8. Recipes for agents

**New section on a page**
```tsx
<Container className="pt-9 pb-30">
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
- Set small headings inside sections and cards in `type-subheading`.
- Keep spacing on the 4-point grid: whole Tailwind steps or the `--space-*` variables.
- Use token classes (`text-ink-body`, `bg-surface`, `border-line`, `rounded-card`).
- Keep one project accent per page.
- Add new tokens to **both** `globals.css` and `design-tokens.ts`, then document them here.

**Don't**
- Hard-code hex values in class names (`text-[#525252]`).
- Use half steps (`gap-2.5`) or off-grid arbitrary values (`mt-[35px]`).
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
- **4-point grid migration:** the Figma file had off-grid spacing (5, 7, 10, 22, 35, 37, 42, 50, 54, 93px, a 67px swatch, a 147px label column). Each was rounded to the nearest multiple of 4 (§4.2), so the build is a few pixels off Figma in those places on purpose.
- About page (`103:12209`): the photo radius in Figma mixes 12, 8 and ~6px. It's built with one `rounded-photo` (8px). The gallery is 986px wide in Figma and the copy 1000px. Both use the 1000px `max-w-narrow`. The 200px gap above "Outside of design" is `--space-section` (136px). The title's second line uses the hero's tight `leading-[1.07]` rather than Figma's auto line height.
- About page collage: Figma shows only the fanned-out layout, with a "hover over me!" label. The build reads that as the hover state and tucks the photos behind the selfie at rest.
- The **Assets** tab has no Figma design yet. Its page reuses the Foundations patterns to show logo marks, characters and icons.
