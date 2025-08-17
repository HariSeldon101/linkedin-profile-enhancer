import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Note: PDF parsing would require additional setup with pdf-parse
// For now, we'll simulate the parsing
async function parsePDF(buffer: Buffer): Promise<string> {
  // In production, you would use pdf-parse here
  // const pdfParse = require('pdf-parse')
  // const data = await pdfParse(buffer)
  // return data.text
  
  // Simulated text extraction
  return `
    John Doe
    Senior Software Engineer at Tech Company
    San Francisco Bay Area
    
    About:
    Experienced software engineer with 8+ years building scalable web applications.
    Passionate about clean code, team collaboration, and continuous learning.
    
    Experience:
    Senior Software Engineer
    Tech Company
    2020 - Present
    - Led development of microservices architecture
    - Mentored junior developers
    - Improved system performance by 40%
    
    Software Engineer
    Previous Company
    2016 - 2020
    - Developed RESTful APIs
    - Implemented CI/CD pipelines
    - Worked with React and Node.js
    
    Education:
    BS Computer Science
    University of California
    2012 - 2016
    
    Skills:
    JavaScript, TypeScript, React, Node.js, Python, AWS, Docker, Kubernetes
  `
}

async function analyzeProfile(profileText: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a LinkedIn profile analyzer. Extract and structure profile information from the provided text.
          Return a JSON object with the following structure:
          {
            "headline": "professional headline",
            "summary": "profile summary",
            "location": "location",
            "experience": [{"title": "", "company": "", "duration": "", "description": ""}],
            "education": [{"school": "", "degree": "", "field": "", "duration": ""}],
            "skills": ["skill1", "skill2"],
            "score": 0-100,
            "suggestions": ["suggestion1", "suggestion2"]
          }`
        },
        {
          role: "user",
          content: profileText
        }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    })

    return JSON.parse(completion.choices[0].message.content || '{}')
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Failed to analyze profile')
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

    // Parse PDF
    const profileText = await parsePDF(buffer)

    // Analyze with AI
    const analysis = await analyzeProfile(profileText)

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