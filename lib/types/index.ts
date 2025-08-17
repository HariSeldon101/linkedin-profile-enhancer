export interface User {
  id: string
  email: string
  linkedinId?: string
  name?: string
  avatarUrl?: string
  subscriptionTier: 'free' | 'pro' | 'team' | 'enterprise'
  createdAt: Date
  updatedAt: Date
}

export interface LinkedInProfile {
  id: string
  userId: string
  headline?: string
  summary?: string
  location?: string
  industry?: string
  currentPosition?: string
  experience: Experience[]
  education: Education[]
  skills: string[]
  certifications: Certification[]
  projects: Project[]
  languages: Language[]
  profileUrl?: string
  connections?: number
  profileViews?: number
  searchAppearances?: number
  postImpressions?: number
  version: number
  createdAt: Date
  updatedAt: Date
}

export interface Experience {
  id: string
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  description?: string
  highlights: string[]
  skills: string[]
}

export interface Education {
  id: string
  school: string
  degree?: string
  fieldOfStudy?: string
  startDate?: string
  endDate?: string
  grade?: string
  activities?: string
  description?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expirationDate?: string
  credentialId?: string
  credentialUrl?: string
}

export interface Project {
  id: string
  name: string
  description?: string
  url?: string
  startDate?: string
  endDate?: string
  current: boolean
  highlights: string[]
  technologies: string[]
}

export interface Language {
  name: string
  proficiency: 'Elementary' | 'Limited Working' | 'Professional Working' | 'Full Professional' | 'Native'
}

export interface Job {
  id: string
  userId: string
  url: string
  title: string
  company: string
  location?: string
  description: string
  requirements: string[]
  preferredQualifications: string[]
  extractedKeywords: string[]
  tailoredProfile?: LinkedInProfile
  matchScore?: number
  createdAt: Date
  updatedAt: Date
}

export interface ProfileAnalysis {
  overallScore: number
  sections: {
    headline: SectionScore
    summary: SectionScore
    experience: SectionScore
    skills: SectionScore
    education: SectionScore
  }
  suggestions: Suggestion[]
  keywords: KeywordAnalysis
  competitorComparison?: CompetitorAnalysis
}

export interface SectionScore {
  score: number
  maxScore: number
  feedback: string[]
  improvements: string[]
}

export interface Suggestion {
  id: string
  section: string
  priority: 'high' | 'medium' | 'low'
  type: 'add' | 'edit' | 'remove'
  message: string
  example?: string
}

export interface KeywordAnalysis {
  current: string[]
  missing: string[]
  recommended: string[]
  density: number
}

export interface CompetitorAnalysis {
  averageProfileScore: number
  topKeywords: string[]
  commonSkills: string[]
  averageExperience: number
  insights: string[]
}

export interface Analytics {
  profileViews: number
  searchAppearances: number
  connectionRequests: number
  messagesReceived: number
  postViews: number
  engagementRate: number
  date: Date
}