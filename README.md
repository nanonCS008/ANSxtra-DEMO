# ANSXtra - Amnuaysilpa School Extracurricular Portal

A professional, visually impressive extracurricular activities portal for Amnuaysilpa School. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Modern Design**: Professional UI with gradient accents, smooth animations, and thoughtful spacing
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- ♿ **Accessible**: WCAG AA compliant with keyboard navigation and screen reader support
- 🎭 **8 Active Clubs**: Operation Smile, Interact, Duke of Edinburgh, Eco Committee, UNICEF, MUN, TEDx, and School Production
- 📝 **Application System**: Students can browse clubs, submit applications, and track their status
- 🎯 **Smart Filtering**: Search and filter clubs by category and application status
- 💾 **Local Storage**: Applications are saved locally (ready for backend integration)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4+
- **Animations**: Framer Motion 11+
- **Form Validation**: Zod + React Hook Form
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
ansxtra-clubsweb/
├── app/                          # Next.js 14 app directory
│   ├── layout.tsx               # Root layout with header/footer
│   ├── page.tsx                 # Home page
│   ├── clubs/                   # Clubs catalog and detail pages
│   ├── apply/                   # Application form and confirmation
│   ├── applications/            # User's application history
│   ├── about/                   # About page
│   └── not-found.tsx           # Custom 404 page
├── components/
│   ├── layout/                  # Header and Footer
│   ├── ui/                      # Reusable UI components
│   ├── clubs/                   # Club-specific components
│   └── home/                    # Home page sections
├── lib/
│   ├── hooks/                   # Custom React hooks
│   ├── utils/                   # Utility functions
│   ├── validations/             # Zod schemas
│   └── types/                   # TypeScript types
├── data/
│   └── clubs.json              # Club data
└── public/
    └── clubs/                   # Club images (optional)
```

## Managing Club Data

Club information is stored in `data/clubs.json`. To add or update clubs:

1. **Edit the JSON file**: Add/modify club objects with the following structure:
   ```json
   {
     "id": "unique-club-id",
     "name": "Club Name",
     "tagline": "Brief description",
     "category": "Service & Charity",
     "description": "Full description...",
     "meeting": {
       "day": "Monday",
       "time": "3:30 PM - 4:30 PM",
       "location": "Room 101"
     },
     "contacts": {
       "leader": "Student Name",
       "advisor": "Teacher Name"
     },
     "acceptingApplications": true,
     "faq": [
       {
         "question": "Question?",
         "answer": "Answer..."
       }
     ],
     "image": null
   }
   ```

2. **Categories**: Use one of these:
   - Service & Charity
   - Leadership & Development
   - Environment
   - Arts & Media

3. **Images** (optional): Place images in `public/clubs/` and reference them in the `image` field

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  brand: {
    pink: '#D946EF',
    purple: '#7C3AED',
    blue: '#3B82F6',
    navy: '#0F172A',
  }
}
```

### Content

- **Home page**: Edit components in `components/home/`
- **About page**: Edit `app/about/page.tsx`
- **Footer**: Edit `components/layout/Footer.tsx`

## Accessibility

This project follows WCAG AA guidelines:

- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Screen reader friendly
- ✅ `prefers-reduced-motion` support

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Future Enhancements

- Backend API integration for applications
- Admin dashboard for club management
- Email notifications
- User authentication
- Advanced analytics

## License

© 2025 Amnuaysilpa School. All rights reserved.

## Support

For questions or assistance, contact: clubs@amnuaysilpa.ac.th





