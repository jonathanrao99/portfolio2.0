# Jonathan Thota's Portfolio

A modern, interactive portfolio website showcasing my work as a Data Scientist, UI/UX Designer, AI Tinkerer, and Full-Stack Developer.

## 🚀 Features

- **Interactive Preloader** - Mouse-triggered reveals with tech icons and work samples
- **Hero Section** - Upside-down design with video background and hypertext roles
- **Portfolio Showcase** - Featured projects with impact indicators
- **Lab Experiments** - 20 experimental projects with modal details
- **Services Section** - Web development, app development, and UI/UX design
- **Skills Display** - Technology logos with hover effects
- **Contact Modal** - Comprehensive contact form with file upload
- **Responsive Design** - Mobile-first approach

## 🛠️ Tech Stack

- **Next.js 15** with TypeScript
- **GSAP** for advanced animations
- **Motion** for scroll animations
- **Zustand** for state management
- **Tailwind CSS** for styling

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.tsx              # Hero section with video background
│   ├── Portfolio.tsx         # Portfolio showcase
│   ├── Lab.tsx              # Experimental projects
│   ├── Services.tsx         # Services offered
│   ├── Skills.tsx           # Technology skills
│   ├── ContactModal.tsx     # Contact form modal
│   ├── StickyHeader.tsx     # Sticky navigation header
│   ├── Preloader.tsx        # Loading screen
│   ├── CursorDot.tsx        # Custom cursor
│   └── Footer.tsx           # Footer with newsletter
├── lib/
│   └── zustand/
│       └── stores.ts        # State management
└── resources/
    └── custom.css           # Custom styles and animations
```

## 🎥 Video Assets

To complete the portfolio, you'll need to add the following video files:

1. **Hero Video**: `/public/videos/hero-video.mp4`
   - A high-quality video that represents your work
   - Recommended: 1920x1080 or higher resolution
   - Duration: 10-30 seconds, looping

2. **Project Videos**: `/public/videos/swiftguard-preview.mp4`
   - Preview videos for your featured projects
   - Recommended: 16:9 aspect ratio

## 🎨 Customization

### Colors
The portfolio uses a clean, minimal color scheme:
- **Primary**: White (#ffffff)
- **Neutral**: Gray tones (#f8f9fa, #e9ecef, #dee2e6)
- **Dark**: Dark grays (#212529, #343a40, #495057)
- **Accent**: Purple (#6f42c1)

### Content
Update the following files with your content:
- `src/components/Portfolio.tsx` - Your projects
- `src/components/Lab.tsx` - Your experimental work
- `src/components/Services.tsx` - Your services
- `src/components/Skills.tsx` - Your technology stack

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Add video assets**:
   - Place your hero video at `/public/videos/hero-video.mp4`
   - Add project preview videos as needed

3. **Update content**:
   - Replace placeholder images with your project screenshots
   - Update project descriptions and case studies
   - Customize your technology stack

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 📧 Contact Integration

The contact form is ready for backend integration. Recommended services:
- **Resend** - Developer-friendly email service
- **Mailchimp** - User-friendly with good templates
- **ConvertKit** - Creator-focused automation

## 🎯 Performance

- Optimized images and videos
- Lazy loading for components
- Smooth animations with GSAP
- Responsive design for all devices

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).