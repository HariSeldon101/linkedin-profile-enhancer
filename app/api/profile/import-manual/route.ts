import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function analyzeAndOptimize(profileData: any) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a LinkedIn profile optimization expert. Analyze the provided profile data and return:
          1. A score from 0-100
          2. Specific suggestions for improvement
          3. Keywords that should be included
          4. Optimized versions of weak sections
          
          Return as JSON with structure:
          {
            "score": number,
            "suggestions": {
              "headline": ["suggestion1", "suggestion2"],
              "summary": ["suggestion1", "suggestion2"],
              "experience": ["suggestion1", "suggestion2"],
              "skills": ["suggestion1", "suggestion2"]
            },
            "keywords": ["keyword1", "keyword2"],
            "optimized": {
              "headline": "optimized headline if needed",
              "summary": "optimized summary if needed"
            }
          }`
        },
        {
          role: "user",
          content: JSON.stringify(profileData)
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })

    return JSON.parse(completion.choices[0].message.content || '{}')
  } catch (error) {
    console.error('OpenAI API error:', error)
    return {
      score: 50,
      suggestions: {
        headline: ["Add more keywords relevant to your industry"],
        summary: ["Include quantifiable achievements"],
        experience: ["Use action verbs and metrics"],
        skills: ["Add trending skills in your field"]
      },
      keywords: [],
      optimized: {}
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

    const body = await request.json()
    const { headline, summary, experience, education, skills, certifications } = body

    // Parse skills if provided as string
    const skillsArray = typeof skills === 'string' 
      ? skills.split(',').map((s: string) => s.trim()).filter(Boolean)
      : skills || []

    // Parse experience if provided as string
    const experienceArray = typeof experience === 'string'
      ? experience.split('\n').filter(Boolean).map((exp: string) => ({
          description: exp,
          title: exp.split('-')[0]?.trim() || 'Position',
          company: 'Company'
        }))
      : experience || []

    // Parse education if provided as string
    const educationArray = typeof education === 'string'
      ? education.split('\n').filter(Boolean).map((edu: string) => ({
          school: edu.split('-')[0]?.trim() || 'School',
          degree: 'Degree'
        }))
      : education || []

    const profileData = {
      headline,
      summary,
      experience: experienceArray,
      education: educationArray,
      skills: skillsArray,
      certifications
    }

    // Analyze with AI
    const analysis = await analyzeAndOptimize(profileData)

    // Save to database
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        headline: headline || '',
        summary: summary || '',
        experience: experienceArray,
        education: educationArray,
        skills: skillsArray,
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
        suggestions: analysis.suggestions,
        keywords: { items: analysis.keywords }
      })

    return NextResponse.json({
      success: true,
      profile: {
        ...profile,
        analysis: {
          overallScore: analysis.score,
          suggestions: analysis.suggestions,
          keywords: analysis.keywords,
          optimized: analysis.optimized
        }
      }
    })

  } catch (error) {
    console.error('Manual import error:', error)
    return NextResponse.json(
      { error: 'Failed to process profile data' },
      { status: 500 }
    )
  }
}