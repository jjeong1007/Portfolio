# Jason Jeong — Portfolio

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · deployed on Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Design system

Read **[design-system.md](design-system.md)** before building any UI. It is the spec for colors, type, spacing and components.

- Tokens: `src/app/globals.css` (`@theme`) and `src/lib/design-tokens.ts`
- Primitives: `src/components/ui/` (Container, SectionIntro, BackLink, Chip, Tabs, Swatch, Toast)
- Pages: `/` (landing), `/design-system` (showcase)
- Page sections: `src/components/home/`, `src/components/design-system/`
- Brand assets: `public/brand/`
