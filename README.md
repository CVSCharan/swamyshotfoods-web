# Swamy's Hot Foods - Website

A modern, SEO-optimized website for Swamy's Hot Foods, a pure vegetarian South Indian restaurant established in 1944 in Nellore, Andhra Pradesh.

## 🌟 Features

### Core Features

- **Dynamic Menu System**: Real-time menu with time-based availability filtering
- **Smart Filters**: Dynamic island-style filters with icons (Breakfast, Dinner, All Day, Anytime)
- **SEO Optimized**: Comprehensive metadata, Open Graph, Twitter Cards, and JSON-LD structured data
- **Legal Pages**: Privacy Policy and Terms of Service for compliance
- **Responsive Design**: Mobile-first approach with beautiful UI across all devices
- **Real-time Updates**: Server-Sent Events (SSE) for live store status updates

### UI/UX Highlights

- Beautiful splash screen with smooth animations
- Enhanced Google review CTA component
- Testimonials section with smooth transitions
- WhatsApp floating action button for easy contact
- Dynamic island-style menu filters (mobile-optimized)
- Professional search functionality in header

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm/bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/CVSCharan/swamyshotfoods-web.git
cd swamyshotfoods-web
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration:

```env
NEXT_PUBLIC_SITE_URL=https://swamyshotfoods.in
NEXT_PUBLIC_SITE_NAME="Swamy's Hot Foods"
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
swamyshotfoods-web/
├── app/                      # Next.js 14 App Router
│   ├── (home)/              # Home page route group
│   ├── about/               # About page with layout
│   ├── menu/                # Menu page
│   ├── privacy/             # Privacy Policy page
│   ├── terms/               # Terms of Service page
│   ├── layout.tsx           # Root layout with SEO metadata
│   ├── page-metadata.ts     # Centralized metadata configuration
│   ├── robots.ts            # robots.txt configuration
│   └── sitemap.ts           # XML sitemap generation
├── components/
│   ├── landing/             # Landing page components
│   │   ├── reviews-section.tsx
│   │   └── whatsapp-fab.tsx
│   ├── menu/                # Menu-related components
│   │   └── menu-grid.tsx    # Dynamic menu grid with filters
│   ├── ui/                  # Reusable UI components
│   │   └── animated-testimonials.tsx
│   ├── header.tsx           # Site header with navigation
│   └── footer.tsx           # Site footer
├── lib/
│   └── structured-data.ts   # JSON-LD schema generators
├── public/                  # Static assets
│   └── og-image.png        # Open Graph image
└── docs/                    # Documentation
    └── api.md              # API documentation
```

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React, Tabler Icons
- **Fonts**: Playfair Display, Lora (Google Fonts)
- **SEO**: Next.js Metadata API, JSON-LD

## 📱 Pages

- **Home** (`/`): Landing page with hero, features, and testimonials
- **Menu** (`/menu`): Dynamic menu with time-based filtering
- **About** (`/about`): Restaurant history and story
- **Privacy Policy** (`/privacy`): Data protection and privacy information
- **Terms of Service** (`/terms`): Legal terms and conditions

## 🔍 SEO Features

- ✅ Comprehensive metadata (title, description, keywords)
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card support
- ✅ JSON-LD structured data:
  - LocalBusiness schema
  - Restaurant schema
  - Menu schema
  - Breadcrumb navigation
  - AboutPage schema
- ✅ Dynamic XML sitemap
- ✅ robots.txt configuration
- ✅ Custom Open Graph image
- ✅ SEO-friendly URLs and headers

## 🎯 Key Components

### Menu Filter System

- Dynamic island-style design
- Icon-based filtering (mobile-optimized)
- Time-based availability (Breakfast, Dinner, All Day, Anytime)
- Responsive and accessible

### Google Review CTA

- Large, prominent call-to-action
- Animated elements for engagement
- Direct link to Google Business Profile

### Testimonials

- Smooth animations with Framer Motion
- Auto-rotating carousel
- Fixed height to prevent layout shifts

## 🌐 Environment Variables

| Variable                | Description            | Example                     |
| ----------------------- | ---------------------- | --------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Production website URL | `https://swamyshotfoods.in` |
| `NEXT_PUBLIC_SITE_NAME` | Business name          | `Swamy's Hot Foods`         |

## 📦 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

### Manual Deployment

```bash
npm run build
npm run start
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Proprietary Notice**: This project was crafted by CVS Charan exclusively for Swamy's Hot Foods.

## 👥 Contact

**Swamy's Hot Foods**

- Address: 7-1-931, Opposite Railway Station, Nellore, Andhra Pradesh 524001
- Phone: +91 96424 15385
- Email: hello@swamyshotfoods.in
- Website: https://swamyshotfoods.in

---

**Built with ❤️ for authentic South Indian cuisine since 1944**
