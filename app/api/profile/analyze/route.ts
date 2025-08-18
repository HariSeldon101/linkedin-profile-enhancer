import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface ProfileAnalysisRequest {
  headline?: string
  summary?: string
  experience?: Array<{
    title: string
    company: string
    description: string
    startDate: string
    endDate?: string
  }>
  education?: Array<{
    degree: string
    field: string
    school: string
    graduationYear?: string
  }>
  skills?: string[]
  targetRole?: string
}

export async function POST(req: NextRequest) {
  try {
    const profile: ProfileAnalysisRequest = await req.json()

    if (!profile || (!profile.headline && !profile.summary && !profile.experience)) {
      return NextResponse.json(
        { error: 'Profile data is required' },
        { status: 400 }
      )
    }

    const profileText = `
      Headline: ${profile.headline || 'Not provided'}
      
      Summary: ${profile.summary || 'Not provided'}
      
      Experience: 
      ${profile.experience?.map(exp => 
        `${exp.title} at ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'}): ${exp.description}`
      ).join('\n') || 'Not provided'}
      
      Education: 
      ${profile.education?.map(edu => 
        `${edu.degree} in ${edu.field} from ${edu.school}${edu.graduationYear ? ` (${edu.graduationYear})` : ''}`
      ).join('\n') || 'Not provided'}
      
      Skills: ${profile.skills?.join(', ') || 'Not provided'}
      
      Target Role: ${profile.targetRole || 'Not specified'}
    `

    const systemPrompt = `You are an expert LinkedIn profile optimizer and career coach. Analyze the provided LinkedIn profile and provide detailed, actionable recommendations to improve it. Focus on:
    1. Keyword optimization for ATS and LinkedIn search
    2. Professional branding and positioning
    3. Quantifiable achievements and impact
    4. Industry-specific best practices
    5. Content structure and readability
    
    Provide your analysis in a structured JSON format.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { 
          role: "user", 
          content: `Analyze this LinkedIn profile and provide improvement recommendations:\n\n${profileText}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000
    })

    const analysisContent = completion.choices[0].message.content
    if (!analysisContent) {
      throw new Error('No analysis generated')
    }

    const analysis = JSON.parse(analysisContent)

    // Structure the response
    const structuredAnalysis = {
      score: analysis.score || calculateScore(profile),
      suggestions: analysis.suggestions || [],
      keywords: {
        current: extractKeywords(profileText),
        recommended: analysis.recommended_keywords || [],
        missing: analysis.missing_keywords || []
      },
      strengths: analysis.strengths || [],
      improvements: analysis.improvements || [],
      competitorInsights: analysis.competitor_insights || null,
      industryBenchmarks: analysis.industry_benchmarks || null
    }

    return NextResponse.json({
      success: true,
      analysis: structuredAnalysis,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Profile analysis error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to analyze profile',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

function calculateScore(profile: ProfileAnalysisRequest): number {
  let score = 0
  let maxScore = 0

  // Headline scoring (20 points)
  if (profile.headline) {
    maxScore += 20
    const headlineLength = profile.headline.length
    if (headlineLength >= 50 && headlineLength <= 120) score += 15
    else if (headlineLength > 0) score += 10
    if (profile.headline.includes('|')) score += 5 // Indicates multiple value props
  }

  // Summary scoring (25 points)
  if (profile.summary) {
    maxScore += 25
    const summaryLength = profile.summary.length
    if (summaryLength >= 300) score += 20
    else if (summaryLength >= 150) score += 15
    else if (summaryLength > 0) score += 10
    if (profile.summary.match(/\d+/g)) score += 5 // Contains numbers/metrics
  }

  // Experience scoring (30 points)
  if (profile.experience && profile.experience.length > 0) {
    maxScore += 30
    score += Math.min(profile.experience.length * 5, 15) // Up to 15 points for multiple roles
    
    // Check for descriptions with achievements
    const hasDetailedDescriptions = profile.experience.some(
      exp => exp.description && exp.description.length > 100
    )
    if (hasDetailedDescriptions) score += 10
    
    // Check for quantifiable results
    const hasMetrics = profile.experience.some(
      exp => exp.description && /\d+/.test(exp.description)
    )
    if (hasMetrics) score += 5
  }

  // Skills scoring (15 points)
  if (profile.skills && profile.skills.length > 0) {
    maxScore += 15
    score += Math.min(profile.skills.length, 15) // 1 point per skill, max 15
  }

  // Education scoring (10 points)
  if (profile.education && profile.education.length > 0) {
    maxScore += 10
    score += 10
  }

  // Calculate percentage score
  return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
}

function extractKeywords(text: string): string[] {
  // Simple keyword extraction - in production, use more sophisticated NLP
  const commonWords = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at'
  ])
  
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word))
  
  // Count word frequency
  const wordFreq = new Map<string, number>()
  words.forEach(word => {
    wordFreq.set(word, (wordFreq.get(word) || 0) + 1)
  })
  
  // Return top keywords by frequency
  return Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word]) => word)
}