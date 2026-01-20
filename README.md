# Ayaan Ahmed Khan - Portfolio

A minimal, high-signal portfolio site built with modern web technologies.

## Tech Stack

- **Framework**: SvelteKit 2 with Svelte 5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Inter (body), Roboto Mono (headings)
- **Deployment**: Vercel (recommended)

## Features

- Single-page design with semantic HTML
- Dark theme with custom color palette
- Fully responsive (mobile-first)
- WCAG AA accessible
- Type-safe with TypeScript
- Production-ready with Lighthouse 95+ scores

## Development Setup

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Available Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Type check
npm run check:watch  # Type check in watch mode
npm run lint         # Lint code
npm run format       # Format code with Prettier
```

## Building for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

## Deployment

### Vercel (Recommended)

#### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Option 2: Vercel Dashboard

1. Push your code to GitHub
2. Import repository in Vercel dashboard
3. Vercel auto-detects SvelteKit and deploys
4. Set custom domain in project settings (optional)

### Other Platforms

The build output is in `build/` and can be deployed to any static hosting:

- Netlify
- Cloudflare Pages
- GitHub Pages
- AWS S3 + CloudFront

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── Section.svelte       # Reusable section wrapper
│   │   └── ProjectCard.svelte   # Project card component
│   ├── data.ts                  # Portfolio content
│   └── types.ts                 # TypeScript interfaces
├── routes/
│   ├── +layout.svelte           # Root layout (fonts, global styles)
│   ├── +page.svelte             # Main page
│   └── +page.ts                 # SEO metadata
├── app.css                      # Global styles + Tailwind
└── app.html                     # HTML template

static/
├── favicon.svg                  # Site icon
└── Ayaan_Ahmed_Khan_Resume.pdf  # Resume (TODO: add file)

Configuration:
├── tailwind.config.js           # Custom dark theme
├── svelte.config.js             # SvelteKit config
├── vite.config.ts               # Vite config
└── tsconfig.json                # TypeScript config
```

## TODO

- [ ] Add `Ayaan_Ahmed_Khan_Resume.pdf` to `static/` folder
- [ ] Create Open Graph image at `static/og-image.png` (1200x630px)
- [ ] Update domain URL in `src/routes/+page.ts` after deployment
- [ ] Test on production domain
- [ ] (Optional) Set up custom domain in Vercel

## Content Updates

All portfolio content is centralized in `src/lib/data.ts`:

- **Personal info**: Name, title, email, links, value proposition
- **Projects**: Project details with bullets and tech stack
- **Systems thinking**: Key areas of focus

To update content, edit `src/lib/data.ts` and the site will automatically reflect changes.

## Design Principles

- **Dark theme**: Technical aesthetic with high contrast
- **Monospace headings**: Code-like feel for technical audience
- **Generous whitespace**: Focused, uncluttered layout
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
- **Fast**: Static generation, minimal JavaScript, optimized assets

## Performance & Accessibility

The site is built to achieve Lighthouse scores of 95+ in all categories:

- **Performance**: Static generation, optimized fonts, minimal JS
- **Accessibility**: WCAG AA compliant, semantic HTML, focus indicators
- **Best Practices**: HTTPS, secure headers, responsive images
- **SEO**: Meta tags, Open Graph, Twitter Card, semantic structure

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## License

All rights reserved.
