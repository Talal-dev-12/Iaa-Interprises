# IAA Enterprises – Update Summary

## Changes Applied

### 🎨 Theme
- New color palette: `#232A49` (navy) · `#4C4E64` (mid) · `#7F8087` (gray) · `#A7A9B1` (light) · `#DF6D5C` (coral accent)
- All CSS custom properties updated in `src/index.css`

### ✨ Animations
- Scroll progress bar (coral line at top of every page)
- 3D card hover effects with `perspective()` and `rotateX/Y`
- Framer Motion `useScroll` + `useSpring` for smooth parallax
- Service cards with sliding bottom-border reveal on hover
- "Get a Quote" button: shimmer sweep + lift + glow on hover
- Floating background shapes on hero sections
- All sections use staggered `whileInView` entrance animations

### 🗑️ Content Fixes
- Removed "J." and "Ethnic" from all client lists
- Changed "Sindh Secretariat" → "PPHI Sindh" across all pages

### 🏢 Clients Page (Redesigned)
- Distinctive SVG logo per client (shape varies by category: square=govt, circle=corporate, hexagon=military, rounded=banking)
- Color-coded category badges
- 3D hover lift effect on cards
- Stats bar with icon categories

### 🏗️ Projects Page (Redesigned)
- Visual header with gradient + icon per project type
- Year badge and highlight tag
- Hover: title turns coral, card lifts with shadow
- Stats bar (200+ projects, 15+ years, 50+ clients, 0 missed deadlines)
- 4-step process section on Services page

### 🔧 Services Page (Enhanced)
- 7 service cards with animated bottom border reveal
- "Get a Quote" button glows with `animate-pulse-glow`
- Shimmer sweep on hover for all CTA buttons
- 4-step process section
- Hero CTA with `animate-pulse-glow` on primary button

### 🗄️ MongoDB Backend
- `server/index.js` — Express + Mongoose server
- `POST /api/quote` — saves quote requests to MongoDB
- `GET /api/quotes` — admin: list all submissions
- `GET /api/health` — health check
- `vite.config.ts` updated with `/api` proxy to `localhost:3001`
- `QuoteForm.tsx` sends data to backend via `fetch('/api/quote')`

### 📱 Social Media (Footer)
- Facebook, Instagram, X (Twitter), LinkedIn, Threads icons
- Hover: accent background + scale

### 👨‍💻 Developer Credit
- "Designed & Developed by Muhammad Abdullah" → links to LinkedIn

---

## Setup Instructions

### Frontend
```bash
npm install
npm run dev       # runs on http://localhost:8080
```

### Backend
```bash
cd server
npm install
cp .env.example .env
# Edit .env → set DB_PASSWORD=your_actual_mongodb_password
node index.js     # runs on http://localhost:3001
```

### MongoDB Password
Replace `<db_password>` in `server/.env` with your actual Atlas password.
The connection string is:
```
mongodb+srv://Asadkhaniaa:<db_password>@cluster0.au9od9d.mongodb.net/iaa_enterprises?appName=Cluster0
```
