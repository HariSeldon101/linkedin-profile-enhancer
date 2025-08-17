# LinkedIn Profile Enhancer

An AI-powered web application that helps professionals optimize their LinkedIn profiles to maximize visibility, attract recruiters, and land their dream jobs.

## Features

- **AI-Powered Profile Analysis**: Advanced AI analyzes your profile and provides actionable insights
- **Job-Specific Optimization**: Tailor your profile for specific job postings with keyword matching
- **WYSIWYG Canvas Editor**: Intuitive profile editing with real-time preview using Tiptap
- **Competitor Benchmarking**: Compare your profile against successful professionals
- **Analytics Dashboard**: Track profile views, engagement metrics, and optimization progress
- **Smart Content Generation**: AI-powered headline, summary, and experience bullet point generation
- **Profile Version History**: Track changes and revert to previous versions

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, React 19
- **Styling**: Tailwind CSS, Shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with LinkedIn OAuth
- **Rich Text Editor**: Tiptap
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query
- **Analytics**: Recharts

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- npm or yarn
- Git

You'll also need:
- A Supabase account (free tier available)
- An OpenAI API key for AI features
- LinkedIn App credentials (for OAuth)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/linkedin-profile-enhancer.git
cd linkedin-profile-enhancer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the database schema:
   - Go to SQL Editor in your Supabase dashboard
   - Copy the contents of `supabase/schema.sql`
   - Run the SQL to create all tables and functions

### 4. Configure LinkedIn OAuth in Supabase

1. In Supabase Dashboard, go to Authentication > Providers
2. Enable LinkedIn provider
3. Add your LinkedIn OAuth credentials:
   - Client ID
   - Client Secret
   - Redirect URL: `https://your-project.supabase.co/auth/v1/callback`

### 5. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI API (for profile analysis)
OPENAI_API_KEY=your_openai_api_key
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
linkedin-profile-enhancer/
├── app/                      # Next.js 15 app directory
│   ├── api/                  # API routes
│   ├── auth/                 # Authentication pages
│   ├── dashboard/            # Dashboard pages
│   ├── editor/               # Profile editor pages
│   └── profile/              # Profile pages
├── components/               # React components
│   ├── ui/                   # Shadcn/ui components
│   ├── editor/               # Editor components
│   ├── profile/              # Profile components
│   └── dashboard/            # Dashboard components
├── lib/                      # Utility functions
│   ├── supabase/             # Supabase clients
│   ├── hooks/                # Custom React hooks
│   ├── store/                # Zustand stores
│   └── types/                # TypeScript types
├── public/                   # Static assets
└── supabase/                 # Database schema
```

## Key Features Implementation

### Profile Import
Due to LinkedIn API restrictions, the app uses multiple methods:
1. Manual copy/paste of profile data
2. Chrome extension for profile scraping (planned)
3. LinkedIn OAuth for basic profile data

### AI Analysis
- Uses OpenAI GPT-4 for profile analysis
- Provides section-by-section scoring
- Generates improvement suggestions
- Keyword optimization for ATS

### WYSIWYG Editor
- Built with Tiptap for rich text editing
- Real-time preview in LinkedIn style
- Drag-and-drop section reordering
- Version history with rollback

### Job Matching
- Parses job descriptions
- Extracts keywords and requirements
- Suggests profile modifications
- Calculates match percentage

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker containers

## Security Considerations

- All user data is encrypted at rest in Supabase
- Row Level Security (RLS) policies ensure data isolation
- API keys should never be exposed client-side
- LinkedIn OAuth tokens are securely managed by Supabase

## API Limitations

**Important**: LinkedIn has strict API limitations:
- Public API access is heavily restricted
- Profile updates are not available via API
- The app uses workarounds like manual export/import

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Roadmap

- [ ] Chrome extension for easier profile import
- [ ] AI-powered post generator
- [ ] Network growth recommendations
- [ ] Interview preparation based on profile
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Enterprise features (team management)

## Support

For support, email support@profileboost.com or open an issue on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tiptap](https://tiptap.dev/) - Headless rich text editor
- [OpenAI](https://openai.com/) - AI capabilities

---

Built with ❤️ for job seekers and professionals looking to level up their careers.