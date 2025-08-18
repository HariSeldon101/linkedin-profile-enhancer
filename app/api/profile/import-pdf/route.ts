import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Parse PDF and extract text
async function parsePDF(buffer: Buffer): Promise<string> {
  try {
    // Dynamic import to avoid build issues
    const pdf = await import('pdf-parse')
    const data = await pdf.default(buffer)
    return data.text
  } catch (error) {
    console.error('PDF parsing error:', error)
    throw new Error('Failed to parse PDF file')
  }
}

interface ProfileData {
  headline: string
  summary: string
  location: string
  experience: Array<{
    duration: string
    title: string
    company: string
    description: string
  }>
  education: Array<{
    duration: string
    school: string
    degree: string
    field: string
  }>
  skills: string[]
  certifications: string[]
  languages: string[]
}

// Extract structured profile data from PDF text
function extractProfileData(text: string): ProfileData {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line)
  
  const profile: ProfileData = {
    headline: '',
    summary: '',
    location: '',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    languages: []
  }

  // Extract headline (usually near the top, contains role keywords)
  const headlineKeywords = ['Senior', 'Lead', 'Manager', 'Developer', 'Engineer', 'Designer', 'Analyst', 'Consultant', 'Director', 'Specialist']
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    if (headlineKeywords.some(keyword => lines[i].includes(keyword))) {
      profile.headline = lines[i]
      break
    }
  }

  // Extract location
  const locationKeywords = ['Area', 'United States', 'USA', 'UK', 'Canada', 'San Francisco', 'New York', 'London', 'Remote']
  for (const line of lines) {
    if (locationKeywords.some(keyword => line.includes(keyword))) {
      profile.location = line
      break
    }
  }

  // Extract sections
  let currentSection = ''
  let experienceBuffer: ProfileData['experience'][0] | null = null
  let educationBuffer: ProfileData['education'][0] | null = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lowerLine = line.toLowerCase()

    // Detect section headers
    if (lowerLine === 'about' || lowerLine === 'summary' || lowerLine === 'profile') {
      currentSection = 'summary'
      continue
    } else if (lowerLine === 'experience' || lowerLine === 'work experience') {
      currentSection = 'experience'
      continue
    } else if (lowerLine === 'education') {
      currentSection = 'education'
      continue
    } else if (lowerLine === 'skills' || lowerLine === 'technical skills') {
      currentSection = 'skills'
      continue
    } else if (lowerLine === 'certifications' || lowerLine === 'licenses & certifications') {
      currentSection = 'certifications'
      continue
    } else if (lowerLine === 'languages') {
      currentSection = 'languages'
      continue
    }

    // Process content based on current section
    switch (currentSection) {
      case 'summary':
        if (line && !['experience', 'education', 'skills'].some(s => lowerLine.startsWith(s))) {
          profile.summary += (profile.summary ? ' ' : '') + line
        }
        break

      case 'experience':
        // Check for date patterns indicating new job entry
        if (line.match(/\b(\d{4})\s*[-–]\s*(\d{4}|Present|Current)/i)) {
          if (experienceBuffer) {
            profile.experience.push(experienceBuffer)
          }
          experienceBuffer = {
            duration: line,
            title: '',
            company: '',
            description: ''
          }
        } else if (experienceBuffer) {
          if (!experienceBuffer.title && i > 0) {
            // Previous line might be the title
            const prevLine = lines[i - 1]
            if (prevLine && !prevLine.match(/\b\d{4}\b/)) {
              experienceBuffer.title = prevLine
            }
          }
          if (!experienceBuffer.company && line.length < 100) {
            experienceBuffer.company = line
          } else if (line.startsWith('•') || line.startsWith('-')) {
            experienceBuffer.description += (experienceBuffer.description ? ' ' : '') + line
          }
        }
        break

      case 'education':
        if (line.match(/\b(\d{4})\s*[-–]\s*(\d{4})/i) || line.match(/\b\d{4}\b/)) {
          if (educationBuffer) {
            profile.education.push(educationBuffer)
          }
          educationBuffer = {
            duration: line.match(/\b\d{4}.*\d{4}\b/) ? line : '',
            school: '',
            degree: '',
            field: ''
          }
        } else if (educationBuffer) {
          if (!educationBuffer.degree && (line.includes('Bachelor') || line.includes('Master') || line.includes('PhD') || line.includes('BS') || line.includes('MS'))) {
            educationBuffer.degree = line
          } else if (!educationBuffer.school) {
            educationBuffer.school = line
          }
        }
        break

      case 'skills':
        if (line.includes(',')) {
          profile.skills.push(...line.split(',').map((s: string) => s.trim()))
        } else if (line.startsWith('•') || line.startsWith('-')) {
          profile.skills.push(line.replace(/^[•-]\s*/, ''))
        } else if (line.length < 50) {
          profile.skills.push(line)
        }
        break

      case 'certifications':
        if (line && !line.toLowerCase().includes('issued')) {
          profile.certifications.push(line.replace(/^[•-]\s*/, ''))
        }
        break

      case 'languages':
        if (line.includes(',')) {
          profile.languages.push(...line.split(',').map((s: string) => s.trim()))
        } else if (line.length < 30) {
          profile.languages.push(line)
        }
        break
    }
  }

  // Add any remaining buffers
  if (experienceBuffer) profile.experience.push(experienceBuffer)
  if (educationBuffer) profile.education.push(educationBuffer)

  // Clean up arrays
  profile.skills = [...new Set(profile.skills.filter((s: string) => s && s.length > 1))]
  profile.certifications = profile.certifications.filter((c: string) => c && c.length > 2)
  profile.languages = profile.languages.filter((l: string) => l && l.length > 1)

  return profile
}

async function analyzeProfile(profileData: ProfileData) {
  try {
    // Calculate profile score
    let score = 0

    if (profileData.headline) score += 15
    if (profileData.summary && profileData.summary.length > 100) score += 20
    if (profileData.experience.length > 0) score += 25
    if (profileData.education.length > 0) score += 15
    if (profileData.skills.length >= 5) score += 15
    if (profileData.skills.length >= 10) score += 5
    if (profileData.certifications.length > 0) score += 5

    // Generate suggestions
    const suggestions = []
    
    if (!profileData.headline || profileData.headline.length < 30) {
      suggestions.push('Add a more descriptive headline with your role and key skills')
    }
    if (!profileData.summary || profileData.summary.length < 150) {
      suggestions.push('Write a comprehensive summary highlighting your experience and achievements')
    }
    if (profileData.skills.length < 10) {
      suggestions.push('Add more relevant skills to improve discoverability')
    }
    if (profileData.experience.length > 0) {
      const hasDescriptions = profileData.experience.some((exp) => exp.description && exp.description.length > 50)
      if (!hasDescriptions) {
        suggestions.push('Add detailed descriptions with achievements for your experience')
      }
    }

    // Use OpenAI for enhanced analysis if available
    if (process.env.OPENAI_API_KEY) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Analyze this LinkedIn profile data and provide 2-3 specific, actionable suggestions for improvement. Focus on keywords, completeness, and impact."
            },
            {
              role: "user",
              content: JSON.stringify(profileData)
            }
          ],
          temperature: 0.7,
          max_tokens: 200
        })

        const aiSuggestions = completion.choices[0].message.content
        if (aiSuggestions) {
          suggestions.push(...aiSuggestions.split('\n').filter(s => s.trim()))
        }
      } catch (error) {
        console.error('OpenAI enhancement failed:', error)
      }
    }

    return {
      score,
      suggestions: suggestions.slice(0, 5), // Limit to 5 suggestions
      ...profileData
    }
  } catch (error) {
    console.error('Profile analysis error:', error)
    return {
      score: 0,
      suggestions: ['Failed to analyze profile completely'],
      ...profileData
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Parse PDF to extract text
    const profileText = await parsePDF(buffer)

    // Extract structured data from PDF text
    const profileData = extractProfileData(profileText)

    // Analyze and enhance the profile data
    const analysis = await analyzeProfile(profileData)

    // Save to database
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        headline: analysis.headline,
        summary: analysis.summary,
        location: analysis.location,
        experience: analysis.experience,
        education: analysis.education,
        skills: analysis.skills,
        version: 1
      })
      .select()
      .single()

    if (profileError) {
      throw profileError
    }

    // Save analysis
    await supabase
      .from('profile_analyses')
      .insert({
        profile_id: profile.id,
        overall_score: analysis.score,
        suggestions: { items: analysis.suggestions }
      })

    return NextResponse.json({
      success: true,
      profile: {
        ...profile,
        analysis: {
          overallScore: analysis.score,
          suggestions: analysis.suggestions
        }
      }
    })

  } catch (error) {
    console.error('PDF import error:', error)
    return NextResponse.json(
      { error: 'Failed to import PDF' },
      { status: 500 }
    )
  }
}